import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../shared/components/ui/button/Button.jsx';
import useCartStore from '../../../store/useCartStore.js';
import { useShallow } from 'zustand/react/shallow';
import Toast from '../../../shared/components/ui/toast/Toast.jsx';
import Loader from '../../../shared/components/ui/loader/Loader.jsx';
import getNextDate from '../../../shared/utils/nextSubscriptionDate.js';
import useAuthStore from '../../../store/useAuthStore.js';
import useSubscription from '../../subscription/hooks/useSubscription.js';
import CheckoutForm from './components/CheckoutForm.jsx';
import CheckoutEmpty from './components/checkout-empty/CheckoutEmpty.jsx';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();

  const { loadingSendSubscribeOrder, localErrorSendSubscribeOrder, sendSubscribeOrder } =
    useSubscription();

  const { cartItems, cleanCartAction, cartData } = useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      cleanCartAction: state.cleanCartAction,
      cartData: state.cartData,
    }))
  );

  const user = useAuthStore((state) => state.user);

  const hasCartItems = cartItems.length > 0;
  const hasCartData = cartData.meal !== '' && cartData.meal !== undefined;

  const isCartReady = hasCartItems && hasCartData;

  const canBuy =
    !user ||
    user?.subscription === false ||
    (user?.subscription === true && user?.subscriptionDetails?.status === false);

  const nextMeal = getNextDate(
    user?.subscriptionDetails?.daysOn || [],
    user?.subscriptionDetails?.schedules || {}
  );

  const [year, month, day] = nextMeal ? nextMeal.split('-') : '';
  const nextMealAt = `${day}/${month}/${year}`;

  const weekDays = ['seg', 'ter', 'qua', 'qui', 'sex'];
  const nextDayAt = nextMeal ? weekDays[new Date(nextMeal).getDay()] : '';

  const nextTimeAt = user?.subscriptionDetails?.schedules?.[nextDayAt] || '';

  const handleSubscribeOrderCheckout = async () => {
    const subscriptionOrder = {
      meal: cartData.meal,
      method: cartData.method,
      day: `${nextMealAt} (${nextDayAt})`,
      time: nextTimeAt,

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

    // Service (+ hook)
    const result = await sendSubscribeOrder(subscriptionOrder);

    // Se success
    if (result.success === true) {
      // Seta persistência para SucessOrder com dados retornados da API ou fake
      localStorage.setItem('successOrder', JSON.stringify(result.data));

      cleanCartAction(user?._id);
      navigate('/success-order');
    }
  };

  return (
    <section className="checkout content__checkout">
      {!isCartReady ? (
        <CheckoutEmpty />
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
                    <ul className="checkout__item-list list-reset">
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
                  <dd className="checkout__item-description">
                    {cartData.meal === 'pate' ? 'patê' : cartData.meal}
                  </dd>
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
              <CheckoutForm
                cleanCartAction={cleanCartAction}
                user={user}
                navigate={navigate}
                cartData={cartData}
                cartItems={cartItems}
              />
            )}

            {!canBuy && (
              <>
                {loadingSendSubscribeOrder && (
                  <Loader className="checkout__loader">
                    Mais um pouco menos de desperdício... Enviando pedido...
                  </Loader>
                )}

                {localErrorSendSubscribeOrder && (
                  <Toast
                    className="checkout__toast"
                    message={localErrorSendSubscribeOrder.message}
                  ></Toast>
                )}

                <Button
                  className="checkout__button"
                  type="submit"
                  onClick={handleSubscribeOrderCheckout}
                >
                  Confirmar
                </Button>
              </>
            )}

            <nav className="checkout__links" aria-label="Ações para editar a compra">
              <ul className="checkout__list nav__list">
                <li className="checkout__list-item">
                  <Link className="checkout__link link-to-button" to="/menu">
                    Voltar ao cardápio
                  </Link>
                </li>
                <li className="checkout__list-item">
                  <Link className="checkout__link link-to-button" to="/cart">
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
