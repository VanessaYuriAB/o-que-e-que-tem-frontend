import qrCodeImg from '../../../../../assets/images/qrcode.jpg';
import Input from '../../../../../shared/components/ui/input/Input.jsx';
import Loader from '../../../../../shared/components/ui/loader/Loader.jsx';
import Button from '../../../../../shared/components/ui/button/Button.jsx';
import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import { useState } from 'react';
import useOrders from '../../../../orders/hooks/useOrders.js';
import PropTypes from 'prop-types';
import styles from './CheckoutForm.module.css';

function CheckoutForm(props) {
  const { cleanCartAction, user, navigate, cartData, cartItems } = props;

  const [formData, setFormData] = useState({
    pay: '',
  });

  const { loadingSendOrder, localErrorSendOrder, sendOrder } = useOrders();

  const typeOfPay =
    formData.pay === 'debito'
      ? 'débito'
      : formData.pay === 'credito'
        ? 'crédito'
        : formData.pay === 'pix'
          ? 'PIX'
          : '';

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleOrderCheckout = async (orderData) => {
    // Service (+ hook)
    const result = await sendOrder(orderData);

    // Se success
    if (result.success === true) {
      // Seta persistência para SucessOrder com dados retornados da API ou fake
      localStorage.setItem('successOrder', JSON.stringify(result.data));

      setFormData({ pay: '' });
      cleanCartAction(user?._id);
      navigate('/success-order');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      meal: cartData.meal,
      method: cartData.method,
      payment: formData.pay,
      amount: cartData.amount,

      customerSnapshot: {
        userName: cartData.userName,
        email: cartData.email,
        tel: cartData.tel,
      },

      addressSnapshot:
        cartData.method === 'delivery'
          ? {
              address: cartData.address,
              number: cartData.number,
              complement: cartData.complement,
              district: cartData.district,
              cep: cartData.cep,
            }
          : undefined,

      itemsSnapshot: cartItems,

      obs: cartData.infoText,
    };

    handleOrderCheckout(order);
  };

  return (
    <form
      className={`${styles.form} ${styles.checkout__form}`}
      name="checkout"
      onSubmit={handleSubmit} /*noValidate*/
    >
      <fieldset className={`${styles.form__fieldset} ${styles.form__fieldset_radio}`}>
        <legend className={styles.form__legend}>Forma de pagamento:</legend>
        <div className={`${styles['form__input-box']} ${styles['form__input-box_radio']}`}>
          <label className={styles.form__label} htmlFor="pix">
            PIX
          </label>
          <Input
            className={`${styles.form__input} ${styles.form__input_radio}`}
            type="radio"
            id="pix"
            name="pay"
            value="pix"
            checked={formData.pay === 'pix'}
            onChange={handleChange}
            required
          />
        </div>
        <div className={`${styles['form__input-box']} ${styles['form__input-box_radio']}`}>
          <label className={styles.form__label} htmlFor="debito">
            Cartão de débito
          </label>
          <Input
            className={`${styles.form__input} ${styles.form__input_radio}`}
            type="radio"
            id="debito"
            name="pay"
            value="debito"
            checked={formData.pay === 'debito'}
            onChange={handleChange}
          />
        </div>
        <div className={`${styles['form__input-box']} ${styles['form__input-box_radio']}`}>
          <label className={styles.form__label} htmlFor="credito">
            Cartão de crédito
          </label>
          <Input
            className={`${styles.form__input} ${styles.form__input_radio}`}
            type="radio"
            id="credito"
            name="pay"
            value="credito"
            checked={formData.pay === 'credito'}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      {formData.pay === 'pix' && (
        <fieldset className={styles.form__fieldset}>
          <legend className={styles.form__legend}>Dados para PIX:</legend>
          <dl className={styles['form__pix-details']}>
            <dt className={styles['form__pix-term']}>Chave PIX: </dt>
            <dd className={styles['form__pix-description']}>portfolio@exemplo.com</dd>
          </dl>

          <p className={styles['form__pix-label']}>QR Code:</p>
          <img
            className={styles['form__pix-qr-img']}
            src={qrCodeImg}
            alt="Imagem demonstrativa de um QR Code com desenho centralizado de coração."
          />
        </fieldset>
      )}

      {formData.pay === 'debito' && (
        <fieldset className={styles.form__fieldset}>
          <legend className={styles.form__legend}>Dados do cartão de débito:</legend>
          <div className={`${styles['form__input-box']} ${styles['form__input-box_pay']}`}>
            <label className={styles.form__label}>Nome: </label>
            <input className={styles.form__input} disabled />
          </div>
          <div className={`${styles['form__input-box']} ${styles['form__input-box_pay']}`}>
            <label className={styles.form__label}>Nº do cartão: </label>
            <input className={styles.form__input} disabled />
          </div>
          <div className={`${styles['form__input-box']} ${styles['form__input-box_pay']}`}>
            <label className={styles.form__label}>Bandeira: </label>
            <input className={styles.form__input} disabled />
          </div>
          <div className={`${styles['form__input-box']} ${styles['form__input-box_pay']}`}>
            <label className={styles.form__label}>Validade: </label>
            <input className={styles.form__input} disabled />
          </div>
          <div className={`${styles['form__input-box']} ${styles['form__input-box_pay']}`}>
            <label className={styles.form__label}>Código: </label>
            <input className={styles.form__input} disabled />
          </div>
        </fieldset>
      )}

      {formData.pay === 'credito' && (
        <fieldset className={styles.form__fieldset}>
          <legend className={styles.form__legend}>Dados do cartão de crédito:</legend>
          <div className={`${styles['form__input-box']} ${styles['form__input-box_pay']}`}>
            <label className={styles.form__label}>Nome: </label>
            <input className={styles.form__input} disabled />
          </div>
          <div className={`${styles['form__input-box']} ${styles['form__input-box_pay']}`}>
            <label className={styles.form__label}>Nº do cartão: </label>
            <input className={styles.form__input} disabled />
          </div>
          <div className={`${styles['form__input-box']} ${styles['form__input-box_pay']}`}>
            <label className={styles.form__label}>Bandeira: </label>
            <input className={styles.form__input} disabled />
          </div>
          <div className={`${styles['form__input-box']} ${styles['form__input-box_pay']}`}>
            <label className={styles.form__label}>Validade: </label>
            <input className={styles.form__input} disabled />
          </div>
          <div className={`${styles['form__input-box']} ${styles['form__input-box_pay']}`}>
            <label className={styles.form__label}>Código: </label>
            <input className={styles.form__input} disabled />
          </div>
          <div className={`${styles['form__input-box']} ${styles['form__input-box_pay']}`}>
            <label className={styles.form__label}>Parcelas: </label>
            <input className={styles.form__input} disabled />
          </div>
        </fieldset>
      )}

      <p className={styles.form__notice}>
        ***Ambiente de demonstração. Nenhum dado de pagamento é processado ou armazenado.
      </p>

      {loadingSendOrder && (
        <Loader className={styles.form__loader}>
          Mais um pouco menos de desperdício... Enviando pedido...
        </Loader>
      )}

      {localErrorSendOrder && (
        <Toast className={styles.form__toast} message={localErrorSendOrder.message}></Toast>
      )}

      <Button className={styles.form__button} type="submit">
        Comprar {formData.pay !== '' && `no ${typeOfPay}`}
      </Button>
    </form>
  );
}

CheckoutForm.propTypes = {
  cleanCartAction: PropTypes.func.isRequired,
  user: PropTypes.object,
  navigate: PropTypes.func.isRequired,
  cartData: PropTypes.object.isRequired,
  cartItems: PropTypes.array.isRequired,
};

export default CheckoutForm;
