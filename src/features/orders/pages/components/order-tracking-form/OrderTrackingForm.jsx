import { useState } from 'react';
import Input from '../../../../../shared/components/ui/input/Input.jsx';
import Button from '../../../../../shared/components/ui/button/Button.jsx';
import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import PropTypes from 'prop-types';
import './OrderTrackingForm.css';

function OrderTrackingForm(props) {
  const { loadingTracker, localErrorTracker, trackOrder } = props;

  const [formData, setFormData] = useState({
    orderNumber: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleTracker = async (data) => {
    const result = await trackOrder(data);

    if (result.success === true) {
      setFormData({
        orderNumber: '',
        email: '',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTracker(formData);
  };

  return (
    <form
      className="form tracker__form"
      name="tracker"
      onSubmit={handleSubmit}
      /*noValidate*/
    >
      <fieldset className="form__field">
        <legend className="form__legend">Rastreamento de pedidos:</legend>
        <div className="form__input-box">
          <label className="form__label" htmlFor="order">
            Nº do pedido:
          </label>
          <Input
            className="form__input"
            type="text"
            id="order"
            name="orderNumber"
            minLength={12}
            maxLength={13}
            pattern="^S?[0-9]{12}$"
            title="O número do pedido que você deseja reastrear: pedido avulso contém apenas números e tem o total de 12 dígitos, pedido de assinatura começa com a letra 'S' e tem o total de 13 dígitos."
            placeholder="Qual o número do pedido?"
            value={formData.orderNumber}
            onChange={handleChange}
            autoFocus
            required
          />
        </div>
        <div className="form__input-box">
          <label className="form__label" htmlFor="email">
            E-mail:
          </label>
          <Input
            className="form__input"
            type="email"
            id="email"
            name="email"
            pattern="^[a-zA-Z0-9_.\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
            title="Seu e-mail utilizado na compra: contento apenas letras, números, sublinhados, pontos ou hífens."
            placeholder="Digite o e-mail utilizado na compra."
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {localErrorTracker && <Toast className="form__toast" message={localErrorTracker.message} />}

        <Button className="form__button" type="submit">
          {loadingTracker ? 'Rastreando...' : 'Rastrear'}
        </Button>
      </fieldset>
    </form>
  );
}

OrderTrackingForm.propTypes = {
  loadingTracker: PropTypes.bool.isRequired,
  localErrorTracker: PropTypes.object.isRequired,
  trackOrder: PropTypes.func.isRequired,
};

export default OrderTrackingForm;
