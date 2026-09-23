import { Link } from 'react-router-dom';
import useAuthStore from '../../../../../store/useAuthStore.js';
import Loader from '../../../../../shared/components/ui/loader/Loader.jsx';
import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import { useEffect } from 'react';
import parsePtBrDate from '../../../utils/parsePtBrDate.js';
import useProfile from '../../../hooks/useProfile.js';
import '../../../styles/profile-history.css';
import './OrdersProfile.css';

function OrdersProfile() {
  const user = useAuthStore((state) => state.user);

  const { userAllOrders, loadingAllOrders, errorAllOrders, getUserAllOrders } = useProfile();

  const orderedUserAllOrders =
    userAllOrders.length > 0
      ? [...userAllOrders].sort((a, b) => parsePtBrDate(b.createdAt) - parsePtBrDate(a.createdAt))
      : [];

  useEffect(() => {
    getUserAllOrders(user._id);
  }, [user._id, getUserAllOrders]);

  if (loadingAllOrders) {
    return <Loader className="profile__orders-loader" />;
  }

  if (errorAllOrders) {
    return (
      <Toast
        className="profile__orders-toast profile-history__toast"
        message={errorAllOrders.message}
      />
    );
  }

  return (
    <section className="profile__orders profile-history__section">
      <h3 className="profile__orders-title">Histórico de pedidos</h3>

      {userAllOrders.length === 0 ? (
        <Toast className="profile__no-orders-toast profile-history__no-content-toast">
          <p className="profile__no-orders-text profile-history__no-content-text">
            Você ainda não comprou nenhuma sopa, creme ou patê...
          </p>
          <p className="profile__no-orders-text profile-history__no-content-text">
            Quer escolher os ingredientes para fazer seu primeiro pedido? :)
          </p>
          <Link className="profile__no-orders-link link-to-button" to="/menu">
            Ver cardápio
          </Link>
        </Toast>
      ) : (
        <ul className="profile__orders-list profile-history__list nav__list">
          {orderedUserAllOrders.map((order) => {
            const isSubscriptionOrder = order.orderNumber.startsWith('S');

            const formattedCreatedAt = new Date(order.createdAt).toLocaleString('pt-BR');
            const orderCreatedAt = order.createdAt.includes('T')
              ? formattedCreatedAt
              : order.createdAt;

            const meal = order.meal === 'pate' ? 'patê' : order.meal === 'sopa' ? 'sopa' : 'creme';
            const typeOfMeal = order ? meal : '';

            const pay =
              order.payment === 'pix'
                ? 'PIX'
                : order.payment === 'debito'
                  ? 'cartão de débito'
                  : 'cartão de crédito';
            const typeOfPayment = order ? pay : '';

            return (
              <li className="profile__orders-item" key={order._id}>
                {isSubscriptionOrder ? (
                  <dl className="profile__orders-details profile-history__details">
                    <div className="profile__orders-item-box profile__orders-item-box_center profile-history__item-box profile-history__item-box_center">
                      <dt className="profile__orders-term profile-history__term">Nº do pedido:</dt>
                      <dd className="profile__orders-description profile-history__description">
                        {order.orderNumber}
                      </dd>
                    </div>
                    <div className="profile__orders-item-box profile-history__item-box">
                      <dt className="profile__orders-term profile-history__term">Tipo:</dt>
                      <dd className="profile__orders-description profile-history__description">
                        assinatura
                      </dd>
                    </div>
                    <div className="profile__orders-item-box profile-history__item-box">
                      <dt className="profile__orders-term profile-history__term">Data:</dt>
                      <dd className="profile__orders-description profile-history__description">
                        {orderCreatedAt}
                      </dd>
                    </div>
                    <div className="profile__orders-item-box profile-history__item-box">
                      <dt className="profile__orders-term profile-history__term">
                        Forma de entrega:
                      </dt>
                      <dd className="profile__orders-description profile-history__description">
                        {order.method}
                      </dd>
                    </div>
                    {order.method === 'delivery' && (
                      <div className="profile__orders-item-box profile-history__item-box">
                        <dt className="profile__orders-term profile-history__term">Endereço:</dt>
                        <dd className="profile__orders-description profile-history__description">
                          {order.addressSnapshot.address}, {order.addressSnapshot.number}
                          {order.addressSnapshot.complement !== '-' &&
                            `, ${order.addressSnapshot.complement}`}
                          , {order.addressSnapshot.district}, {order.addressSnapshot.cep}
                        </dd>
                      </div>
                    )}
                    {order.obs && (
                      <div className="profile__orders-item-box profile-history__item-box">
                        <dt className="profile__orders-term profile-history__term">
                          Informações adicionais:
                        </dt>
                        <dd className="profile__orders-description profile-history__description">
                          {order.obs}
                        </dd>
                      </div>
                    )}
                    <div className="profile__orders-item-box profile-history__item-box">
                      <dt className="profile__orders-term profile-history__term">Contato:</dt>
                      <dd className="profile__orders-description profile-history__description">
                        <address className="profile__orders-contact-info">
                          {order.customerSnapshot.userName} | {order.customerSnapshot.email} |{' '}
                          {order.customerSnapshot.tel}
                        </address>
                      </dd>
                    </div>
                    <div className="profile__orders-item-box profile-history__item-box">
                      <dt className="profile__orders-term profile-history__term">
                        Data de {order.method === 'delivery' ? 'entrega' : 'retirada'}:
                      </dt>
                      <dd className="profile__orders-description profile-history__description">
                        {order.day}
                      </dd>
                    </div>
                    <div className="profile__orders-item-box profile__orders-item-box_inline profile-history__item-box">
                      <dt className="profile__orders-term profile-history__term">Horário:</dt>
                      <dd className="profile__orders-description profile-history__description">
                        {order.time}
                      </dd>
                    </div>
                    <div className="profile__orders-item-box profile__orders-item-box_inline profile-history__item-box">
                      <dt className="profile__orders-term profile-history__term">
                        Tipo de refeição:
                      </dt>
                      <dd className="profile__orders-description profile-history__description">
                        {typeOfMeal}
                      </dd>
                    </div>
                    <div className="profile__orders-item-box profile-history__item-box">
                      <dt className="profile__orders-term profile-history__term">Itens:</dt>
                      <dd className="profile__orders-description profile-history__description">
                        <ul className="profile__orders-description-list nav__list">
                          {order.itemsSnapshot.map((item) => {
                            return (
                              <li className="profile__orders-description-item" key={item._id}>
                                {item.productName}
                              </li>
                            );
                          })}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                ) : (
                  <dl className="profile__orders-details profile-history__details">
                    <div className="profile__orders-item-box profile__orders-item-box_center profile-history__item-box profile-history__item-box_center">
                      <dt className="profile__orders-term profile-history__term">Nº do pedido:</dt>
                      <dd className="profile__orders-description profile-history__description">
                        {order.orderNumber}
                      </dd>
                    </div>
                    <div className="profile__orders-item-box profile-history__item-box">
                      <dt className="profile__orders-term profile-history__term">Tipo:</dt>
                      <dd className="profile__orders-description profile-history__description">
                        avulso
                      </dd>
                    </div>
                    <div className="profile__orders-item-box profile-history__item-box">
                      <dt className="profile__orders-term profile-history__term">Data:</dt>
                      <dd className="profile__orders-description profile-history__description">
                        {orderCreatedAt}
                      </dd>
                    </div>
                    <div className="profile__orders-item-box profile-history__item-box">
                      <dt className="profile__orders-term profile-history__term">
                        Forma de entrega:
                      </dt>
                      <dd className="profile__orders-description profile-history__description">
                        {order.method}
                      </dd>
                    </div>
                    {order.method === 'delivery' && (
                      <div className="profile__orders-item-box profile-history__item-box">
                        <dt className="profile__orders-term profile-history__term">Endereço:</dt>
                        <dd className="profile__orders-description profile-history__description">
                          {order.addressSnapshot.address}, {order.addressSnapshot.number}
                          {order.addressSnapshot.complement !== '-' &&
                            `, ${order.addressSnapshot.complement}`}
                          , {order.addressSnapshot.district}, {order.addressSnapshot.cep}
                        </dd>
                      </div>
                    )}
                    {order.obs && (
                      <div className="profile__orders-item-box profile-history__item-box">
                        <dt className="profile__orders-term profile-history__term">
                          Informações adicionais:
                        </dt>
                        <dd className="profile__orders-description profile-history__description">
                          {order.obs}
                        </dd>
                      </div>
                    )}
                    <div className="profile__orders-item-box profile-history__item-box">
                      <dt className="profile__orders-term profile-history__term">Contato:</dt>
                      <dd className="profile__orders-description profile-history__description">
                        <address className="profile__orders-contact-info">
                          {order.customerSnapshot.userName} | {order.customerSnapshot.email} |{' '}
                          {order.customerSnapshot.tel}
                        </address>
                      </dd>
                    </div>
                    <div className="profile__orders-item-box profile-history__item-box">
                      <dt className="profile__orders-term profile-history__term">
                        Forma de pagamento:
                      </dt>
                      <dd className="profile__orders-description profile-history__description">
                        {typeOfPayment}
                      </dd>
                    </div>
                    <div className="profile__orders-item-box profile__orders-item-box_inline profile-history__item-box">
                      <dt className="profile__orders-term profile-history__term">R$:</dt>
                      <dd className="profile__orders-description profile-history__description">
                        {order.amount},00
                      </dd>
                    </div>
                    <div className="profile__orders-item-box profile__orders-item-box_inline profile-history__item-box">
                      <dt className="profile__orders-term profile-history__term">
                        Tipo de refeição:
                      </dt>
                      <dd className="profile__orders-description profile-history__description">
                        {typeOfMeal}
                      </dd>
                    </div>
                    <div className="profile__orders-item-box profile-history__item-box">
                      <dt className="profile__orders-term profile-history__term">Itens:</dt>
                      <dd className="profile__orders-description profile-history__description">
                        <ul className="profile__orders-description-list nav__list">
                          {order.itemsSnapshot.map((item) => {
                            return (
                              <li className="profile__orders-description-item" key={item._id}>
                                {item.productName}
                              </li>
                            );
                          })}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default OrdersProfile;
