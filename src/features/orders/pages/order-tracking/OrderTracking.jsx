import './OrderTracking.css';
import Input from '../../../../shared/components/ui/input/Input.jsx';
import Button from '../../../../shared/components/ui/button/Button.jsx';
import { useState } from 'react';
import useOrders from '../../hooks/useOrders.js';
import Toast from '../../../../shared/components/ui/toast/Toast.jsx';

function OrderTracking() {
  const [formData, setFormData] = useState({
    orderNumber: '',
    email: '',
  });

  const { orderTracked, loadingTracker, errorTracker, trackOrder } = useOrders();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await trackOrder(formData);
  };

  console.log('orderTracked', orderTracked);

  return (
    <section className="tracker tracker__content">
      <h1 className="tracker__title">Quer saber sobre um pedido feito?</h1>
      <form
        className="tracker__form"
        name="tracker-form"
        onSubmit={handleSubmit}
        /*noValidate*/
      >
        <fieldset className="tracker__field">
          <legend className="tracker__legend">Rastreamento de pedidos:</legend>
          <div className="tracker__input-box">
            <label className="tracker__label" htmlFor="order">
              Nº do pedido:
            </label>
            <Input
              className="tracker__input"
              type="text"
              id="order"
              name="orderNumber"
              inputMode="numeric"
              minLength={12}
              maxLength={12}
              pattern="^[0-9]{12}$"
              title="O número do pedido que você deseja reastrear: ele contém apenas números, tem o total de 12 dígitos."
              placeholder="Qual o número do pedido?"
              value={formData.orderNumber}
              onChange={handleChange}
              autoFocus
              required
            />
          </div>
          <div className="tracker__input-box">
            <label className="tracker__label" htmlFor="email">
              E-mail:
            </label>
            <Input
              className="tracker__input"
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

          {errorTracker && <Toast className="tracker__toast" message={errorTracker.message} />}

          <Button className="tracker__button" type="submit">
            {loadingTracker ? 'Rastreando...' : 'Rastrear'}
          </Button>
        </fieldset>
      </form>

      {orderTracked && (
        <section className="tracker__infos">
          <h2 className="tracker__subtitle">Pedido nº {orderTracked.orderNumber}:</h2>
          <dl className="tracker__details">
            <div className="tracker__detail-box tracker__detail-box_inline">
              <dt className="tracker__detail">Data:</dt>
              <dd className="tracker__description">
                {new Date(orderTracked.createdAt).toLocaleString('pt-BR')}
              </dd>
            </div>
            <div className="tracker__detail-box tracker__detail-box_inline">
              <dt className="tracker__detail">Tipo:</dt>
              <dd className="tracker__description">{orderTracked.meal}</dd>
            </div>
            <div className="tracker__detail-box tracker__detail-box_inline">
              <dt className="tracker__detail">Entrega:</dt>
              <dd className="tracker__description">{orderTracked.method}</dd>
            </div>
            <div className="tracker__detail-box tracker__detail-box_inline">
              <dt className="tracker__detail">Pagamento:</dt>
              <dd className="tracker__description">{orderTracked.payment}</dd>
            </div>
            <div className="tracker__detail-box tracker__detail-box_inline">
              <dt className="tracker__detail">R$:</dt>
              <dd className="tracker__description">{orderTracked.amount}</dd>
            </div>
            {orderTracked.method === 'delivery' && (
              <div className="tracker__detail-box">
                <dt className="tracker__detail">Endereço:</dt>
                <dd className="tracker__description">
                  {orderTracked.addressSnapshot.address}, {orderTracked.addressSnapshot.number}
                  {orderTracked.addressSnapshot.complement !== '-'
                    ? `, ${orderTracked.addressSnapshot.complement}`
                    : ''}
                  , {orderTracked.addressSnapshot.district}, {orderTracked.addressSnapshot.cep}
                </dd>
              </div>
            )}
            {orderTracked.obs && (
              <div className="tracker__detail-box">
                <dt className="tracker__detail">Informações adicionais:</dt>
                <dd className="tracker__description">{orderTracked.obs}</dd>
              </div>
            )}
            <div className="tracker__detail-box">
              <dt className="tracker__detail">Ingredientes:</dt>
              <dd className="tracker__description">
                <ul className="tracker__items-list nav__list">
                  {orderTracked.itemsSnapshot.map((item) => {
                    return (
                      <li className="tracker__item-list" key={item._id}>
                        {item.productName}
                      </li>
                    );
                  })}
                </ul>
              </dd>
            </div>
          </dl>
        </section>
      )}
    </section>
  );
}

export default OrderTracking;
