import './Checkout.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../../shared/components/ui/button/Button.jsx';
import useCartStore from '../../../store/useCartStore.js';
import { useShallow } from 'zustand/react/shallow';
import Toast from '../../../shared/components/ui/toast/Toast.jsx';
import qrCodeImg from '../../../assets/images/qrcode.jpg';
import Input from '../../../shared/components/ui/input/Input.jsx';
import Loader from '../../../shared/components/ui/loader/Loader.jsx';
import getNextDate from '../../../shared/utils/nextSubscriptionDate.js';
import useAuthStore from '../../../store/useAuthStore.js';

function Checkout() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pay: '',
  });

  const [localError, setLocalError] = useState(null);

  const typeOfPay =
    formData.pay === 'debito'
      ? 'débito'
      : formData.pay === 'credito'
        ? 'crédito'
        : formData.pay === 'pix'
          ? 'PIX'
          : '';

  const { cartItems, cleanCartAction, cartData, sendOrderToServerAction, loading, globalError } =
    useCartStore(
      useShallow((state) => ({
        cartItems: state.cartItems,
        cleanCartAction: state.cleanCartAction,
        cartData: state.cartData,
        sendOrderToServerAction: state.sendOrderToServerAction,
        loading: state.loading,
        globalError: state.globalError,
      }))
    );

  console.log('Pedido:', cartData);
  console.log('Items:', cartItems);

  const user = useAuthStore((state) => state.user);

  const hasCartItems = cartItems.length > 0;
  const hasCartData = cartData.meal !== '' && cartData.meal !== undefined;

  const isCartReady = hasCartItems && hasCartData;

  const canBuy =
    user?.subscription === false ||
    (user?.subscription === true && user?.subscriptionDetails?.status === false);

  const nextMeal = getNextDate(user?.subscriptionDetails?.daysOn || []);

  const nextMealAt = new Date(nextMeal).toLocaleString('pt-BR').split(',')[0];

  const weekDays = ['seg', 'ter', 'qua', 'qui', 'sex'];
  const nextDayAt = nextMeal ? weekDays[new Date(nextMeal).getDay()] : '';
  const nextTimeAt = user?.subscriptionDetails?.schedules?.[nextDayAt] || '';

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubscribeOrderCheckout = async () => {
    // ...
  };

  const handleOrderCheckout = async (orderData) => {
    setLocalError(null);

    // Service (+ action/store)
    const result = await sendOrderToServerAction(orderData);

    if (result.success === true) {
      // Se success
      console.log('Pedido enviado', result.data);

      // Seta persistência para SucessOrder com dados retornados da API ou fake
      localStorage.setItem('successOrder', JSON.stringify(result.data));

      setFormData({ pay: '' });
      cleanCartAction();
      navigate('/success-order');
    } else if (result.error.scope === 'local') {
      // Se error
      // Local
      setLocalError(result.error.message);
    }

    // Global definido por estado local da store
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
    <section className="checkout content__checkout">
      {!isCartReady ? (
        <section className="checkout__empty-box">
          <h1 className="checkout__empty-title">Não há checkout a ser realizado!</h1>
          <p className="checkout__empty-text">
            <strong className="checkout__empty-text">
              O carrinho está vazio ou incompleto, não existem produtos selecionados e/ou
              informações de compra.
            </strong>
          </p>
          <Toast className="checkout__empty-links-toast">
            <p className="checkout__empty-text checkout__empty-text_toast">
              Selecione os ingredientes para montar a sua sopa, creme ou patê e/ou preencha os dados
              do carrinho para finalizar o pagamento.
            </p>
            <nav className="checkout__empty-links" aria-label="Ações para continuar a compra">
              <ul className="checkout__empty-list nav__list">
                <li className="checkout__empty-list-item">
                  <Link className="checkout__empty-link link-to-button" to="/menu">
                    Cardápio
                  </Link>
                </li>
                <li className="checkout__empty-list-item">
                  <Link className="checkout__empty-link link-to-button" to="/cart">
                    Carrinho
                  </Link>
                </li>
              </ul>
            </nav>
          </Toast>
        </section>
      ) : (
        <section className="checkout__container">
          <h1 className="checkout__title">
            {canBuy ? 'Finalize sua compra' : 'Confirme seu próximo pedido'} (:
          </h1>
          <div className="checkout__box">
            <aside className="checkout__aside">
              <h2 className="checkout__subtitle">Detalhes{canBuy ? ' do pedido' : ''}:</h2>
              <dl className="checkout__details">
                <div className="checkout__detail checkout__detail_list">
                  <dt className="checkout__item-term">Items:</dt>
                  <dd className="checkout__item-description">
                    <ul className="checkout__item-list nav__list">
                      {cartItems.map((item) => {
                        return (
                          <li className="checkout__item-item" key={item._id}>
                            {item.productName}
                          </li>
                        );
                      })}
                    </ul>
                  </dd>
                </div>

                <div className="checkout__detail">
                  <dt className="checkout__item-term">Tipo:</dt>
                  <dd className="checkout__item-description">{cartData.meal}</dd>
                </div>

                <div className="checkout__detail">
                  <dt className="checkout__item-term">Entrega:</dt>
                  <dd className="checkout__item-description">{cartData.method}</dd>
                </div>

                {cartData.method === 'delivery' && (
                  <div className="checkout__detail checkout__detail_address">
                    <dt className="checkout__item-term">Endereço:</dt>
                    <dd className="checkout__item-description">
                      {cartData.address}, {cartData.number},
                      {cartData.complement === '-' ? ' ' : ' ' + cartData.complement + ', '}
                      {cartData.district}, {cartData.cep}
                    </dd>
                  </div>
                )}

                {cartData.infoText !== '' && (
                  <div className="checkout__detail checkout__detail_obs">
                    <dt className="checkout__item-term">Observação:</dt>
                    <dd className="checkout__item-description">{cartData.infoText}</dd>
                  </div>
                )}

                {canBuy && (
                  <div className="checkout__detail">
                    <dt className="checkout__item-term">Total:</dt>
                    <dd className="checkout__item-description">R$ {cartData.amount},00</dd>
                  </div>
                )}

                {!canBuy && (
                  <>
                    <div className="checkout__detail">
                      <dt className="checkout__item-term">Data:</dt>
                      <dd className="checkout__item-description">
                        {nextMealAt} ({nextDayAt})
                      </dd>
                    </div>

                    <div className="checkout__detail">
                      <dt className="checkout__item-term">Às:</dt>
                      <dd className="checkout__item-description">{nextTimeAt}</dd>
                    </div>
                  </>
                )}
              </dl>
            </aside>

            {canBuy && (
              <form
                className="order-form checkout__order-form"
                name="order"
                onSubmit={handleSubmit} /*noValidate*/
              >
                <fieldset className="order-form__field order-form__field_radio">
                  <legend className="order-form__legend ">Forma de pagamento:</legend>
                  <div className="order-form__input-box order-form__input-box_radio">
                    <label className="order-form__label" htmlFor="pix">
                      PIX
                    </label>
                    <Input
                      className="order-form__input order-form__input_radio"
                      type="radio"
                      id="pix"
                      name="pay"
                      value="pix"
                      checked={formData.pay === 'pix'}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="order-form__input-box order-form__input-box_radio">
                    <label className="order-form__label" htmlFor="debito">
                      Cartão de débito
                    </label>
                    <Input
                      className="order-form__input order-form__input_radio"
                      type="radio"
                      id="debito"
                      name="pay"
                      value="debito"
                      checked={formData.pay === 'debito'}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="order-form__input-box order-form__input-box_radio">
                    <label className="order-form__label" htmlFor="credito">
                      Cartão de crédito
                    </label>
                    <Input
                      className="order-form__input order-form__input_radio"
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
                  <fieldset className="order-form__field">
                    <legend className="order-form__legend">Dados para PIX:</legend>
                    <dl className="order-form__pix-details">
                      <dt className="order-form__pix-term">Chave PIX: </dt>
                      <dd className="order-form__pix-description">portfolio@exemplo.com</dd>
                    </dl>

                    <p className="order-form__pix-label">QR Code:</p>
                    <img
                      className="order-form__pix-qr-img"
                      src={qrCodeImg}
                      alt="Imagem demonstrativa de um QR Code com desenho centralizado de coração."
                    />
                  </fieldset>
                )}

                {formData.pay === 'debito' && (
                  <fieldset className="order-form__field">
                    <legend className="order-form__legend">Dados do cartão de débito:</legend>
                    <div className="order-form__input-box">
                      <label className="order-form__label">Nome: </label>
                      <input className="order-form__input" disabled />
                    </div>
                    <div className="order-form__input-box">
                      <label className="order-form__label">Nº do cartão: </label>
                      <input className="order-form__input" disabled />
                    </div>
                    <div className="order-form__input-box">
                      <label className="order-form__label">Bandeira: </label>
                      <input className="order-form__input" disabled />
                    </div>
                    <div className="order-form__input-box">
                      <label className="order-form__label">Validade: </label>
                      <input className="order-form__input" disabled />
                    </div>
                    <div className="order-form__input-box">
                      <label className="order-form__label">Código: </label>
                      <input className="order-form__input" disabled />
                    </div>
                  </fieldset>
                )}

                {formData.pay === 'credito' && (
                  <fieldset className="order-form__field">
                    <legend className="order-form__legend">Dados do cartão de crédito:</legend>
                    <div className="order-form__input-box">
                      <label className="order-form__label">Nome: </label>
                      <input className="order-form__input" disabled />
                    </div>
                    <div className="order-form__input-box">
                      <label className="order-form__label">Nº do cartão: </label>
                      <input className="order-form__input" disabled />
                    </div>
                    <div className="order-form__input-box">
                      <label className="order-form__label">Bandeira: </label>
                      <input className="order-form__input" disabled />
                    </div>
                    <div className="order-form__input-box">
                      <label className="order-form__label">Validade: </label>
                      <input className="order-form__input" disabled />
                    </div>
                    <div className="order-form__input-box">
                      <label className="order-form__label">Código: </label>
                      <input className="order-form__input" disabled />
                    </div>
                    <div className="order-form__input-box">
                      <label className="order-form__label">Parcelas: </label>
                      <input className="order-form__input" disabled />
                    </div>
                  </fieldset>
                )}

                <p className="order-form__notice">
                  ***Ambiente de demonstração. Nenhum dado de pagamento é processado ou armazenado.
                </p>

                {loading && (
                  <Loader className="order-form__loader">
                    Mais um pouco menos de desperdício... Enviando pedido...
                  </Loader>
                )}

                {localError && <Toast className="order-form__toast" message={localError}></Toast>}

                {globalError && (
                  <Toast className="order-form__toast" message={globalError.message}></Toast>
                )}

                <Button className="order-form__button" type="submit">
                  Comprar {formData.pay !== '' && `no ${typeOfPay}`}
                </Button>
              </form>
            )}

            {!canBuy && (
              <Button
                className="order-form__button"
                type="submit"
                onClick={handleSubscribeOrderCheckout}
              >
                Confirmar
              </Button>
            )}
            <nav className="order-form__links" aria-label="Ações para editar a compra">
              <ul className="order-form__list nav__list">
                <li className="order-form__item">
                  <Link className="order-form__link link-to-button" to="/menu">
                    Voltar ao cardápio
                  </Link>
                </li>
                <li className="order-form__item">
                  <Link className="order-form__link link-to-button" to="/cart">
                    Voltar ao carrinho
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      )}
    </section>
  );
}

export default Checkout;
