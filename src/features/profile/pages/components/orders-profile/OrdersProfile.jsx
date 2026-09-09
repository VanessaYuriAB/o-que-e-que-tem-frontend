import './OrdersProfile.css';
import { Link } from 'react-router-dom';
import useAuthStore from '../../../../../store/useAuthStore.js';
import useOrders from '../../../../orders/hooks/useOrders.js';
import Loader from '../../../../../shared/components/ui/loader/Loader.jsx';
import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import { useEffect } from 'react';

function OrdersProfile() {
  const user = useAuthStore((state) => state.user);

  const { userAllOrders, loadingProfile, errorProfile, getUserAllOrders } = useOrders();

  useEffect(() => {
    getUserAllOrders(user._id);
  }, [user._id, getUserAllOrders]);

  if (loadingProfile) {
    return <Loader className="profile__orders-loader" />;
  }

  if (errorProfile) {
    return <Toast className="profile__orders-toast" message={errorProfile.message} />;
  }

  return (
    <section className="profile__orders">
      <h3 className="profile__orders-title">Histórico de pedidos</h3>

      {userAllOrders?.length === 0 ? (
        <Toast className="profile__no-orders-toast">
          <p className="profile__no-orders-text">
            Você ainda não comprou nenhuma sopa, creme ou patê...
          </p>
          <p className="profile__no-orders-text">
            Quer escolher os ingredientes para fazer seu primeiro pedido? :)
          </p>
          <Link className="profile__no-orders-link link-to-button" to="/menu">
            Ver cardápio
          </Link>
        </Toast>
      ) : (
        <ul className="profile__orders-list nav__list">
          {userAllOrders?.map((order) => {
            const formattedDate = order ? order.createdAt : '';

            const pay =
              order?.payment === 'pix'
                ? 'PIX'
                : order?.payment === 'debito'
                  ? 'cartão de débito'
                  : 'cartão de crédito';
            const typeOfPayment = order ? pay : '';

            const meal =
              order?.meal === 'pate' ? 'patê' : order?.meal === 'sopa' ? 'sopa' : 'creme';
            const typeOfMeal = order ? meal : '';

            const isSubscriptionOrder = order?.orderNumber.startsWith('S');

            return (
              <li className="profile__orders-item" key={order._id}>
                {isSubscriptionOrder ? (
                  <dl className="profile__orders-details">
                    <div className="profile__orders-item-box profile__orders-item-box_center">
                      <dt className="profile__orders-term">Nº do pedido:</dt>
                      <dd className="profile__orders-description">{order.orderNumber}</dd>
                    </div>
                    <div className="profile__orders-item-box">
                      <dt className="profile__orders-term">Tipo:</dt>
                      <dd className="profile__orders-description">assinatura</dd>
                    </div>
                    <div className="profile__orders-item-box">
                      <dt className="profile__orders-term">Data:</dt>
                      <dd className="profile__orders-description">{formattedDate}</dd>
                    </div>
                    <div className="profile__orders-item-box">
                      <dt className="profile__orders-term">Forma de entrega:</dt>
                      <dd className="profile__orders-description">{order.method}</dd>
                    </div>
                    {order.method === 'delivery' && (
                      <div className="profile__orders-item-box">
                        <dt className="profile__orders-term">Endereço:</dt>
                        <dd className="profile__orders-description">
                          {order.addressSnapshot.address}, {order.addressSnapshot.number}
                          {order.addressSnapshot.complement !== '-' &&
                            `, ${order.addressSnapshot.complement}`}
                          , {order.addressSnapshot.district}, {order.addressSnapshot.cep}
                        </dd>
                      </div>
                    )}
                    {order.obs && (
                      <div className="profile__orders-item-box">
                        <dt className="profile__orders-term">Informações adicionais:</dt>
                        <dd className="profile__orders-description">{order.obs}</dd>
                      </div>
                    )}
                    <div className="profile__orders-item-box">
                      <dt className="profile__orders-term">Contato:</dt>
                      <dd className="profile__orders-description">
                        <address className="profile__orders-contact-info">
                          {order.customerSnapshot.userName} | {order.customerSnapshot.email} |{' '}
                          {order.customerSnapshot.tel}
                        </address>
                      </dd>
                    </div>
                    <div className="profile__orders-item-box">
                      <dt className="profile__orders-term">
                        Data de {order.method === 'delivery' ? 'entrega' : 'retirada'}:
                      </dt>
                      <dd className="profile__orders-description">{order.day}</dd>
                    </div>
                    <div className="profile__orders-item-box profile__orders-item-box_inline">
                      <dt className="profile__orders-term">Horário:</dt>
                      <dd className="profile__orders-description">{order.time}</dd>
                    </div>
                    <div className="profile__orders-item-box profile__orders-item-box_inline">
                      <dt className="profile__orders-term">Tipo de refeição:</dt>
                      <dd className="profile__orders-description">{typeOfMeal}</dd>
                    </div>
                    <div className="profile__orders-item-box">
                      <dt className="profile__orders-term">Itens:</dt>
                      <dd className="profile__orders-description">
                        <ul className="profile__orders-description-list nav__list">
                          {order.itemsSnapshot.map((item) => {
                            return (
                              <li
                                className="profile__orders-description profile__orders-description_list"
                                key={item._id}
                              >
                                {item.productName}
                              </li>
                            );
                          })}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                ) : (
                  <dl className="profile__orders-details">
                    <div className="profile__orders-item-box profile__orders-item-box_center">
                      <dt className="profile__orders-term">Nº do pedido:</dt>
                      <dd className="profile__orders-description">{order.orderNumber}</dd>
                    </div>
                    <div className="profile__orders-item-box">
                      <dt className="profile__orders-term">Tipo:</dt>
                      <dd className="profile__orders-description">avulso</dd>
                    </div>
                    <div className="profile__orders-item-box">
                      <dt className="profile__orders-term">Data:</dt>
                      <dd className="profile__orders-description">{formattedDate}</dd>
                    </div>
                    <div className="profile__orders-item-box">
                      <dt className="profile__orders-term">Forma de entrega:</dt>
                      <dd className="profile__orders-description">{order.method}</dd>
                    </div>
                    {order.method === 'delivery' && (
                      <div className="profile__orders-item-box">
                        <dt className="profile__orders-term">Endereço:</dt>
                        <dd className="profile__orders-description">
                          {order.addressSnapshot.address}, {order.addressSnapshot.number}
                          {order.addressSnapshot.complement !== '-' &&
                            `, ${order.addressSnapshot.complement}`}
                          , {order.addressSnapshot.district}, {order.addressSnapshot.cep}
                        </dd>
                      </div>
                    )}
                    {order.obs && (
                      <div className="profile__orders-item-box">
                        <dt className="profile__orders-term">Informações adicionais:</dt>
                        <dd className="profile__orders-description">{order.obs}</dd>
                      </div>
                    )}
                    <div className="profile__orders-item-box">
                      <dt className="profile__orders-term">Contato:</dt>
                      <dd className="profile__orders-description">
                        <address className="profile__orders-contact-info">
                          {order.customerSnapshot.userName} | {order.customerSnapshot.email} |{' '}
                          {order.customerSnapshot.tel}
                        </address>
                      </dd>
                    </div>
                    <div className="profile__orders-item-box">
                      <dt className="profile__orders-term">Forma de pagamento:</dt>
                      <dd className="profile__orders-description">{typeOfPayment}</dd>
                    </div>
                    <div className="profile__orders-item-box profile__orders-item-box_inline">
                      <dt className="profile__orders-term">R$:</dt>
                      <dd className="profile__orders-description">{order.amount},00</dd>
                    </div>
                    <div className="profile__orders-item-box profile__orders-item-box_inline">
                      <dt className="profile__orders-term">Tipo de refeição:</dt>
                      <dd className="profile__orders-description">{typeOfMeal}</dd>
                    </div>
                    <div className="profile__orders-item-box">
                      <dt className="profile__orders-term">Itens:</dt>
                      <dd className="profile__orders-description">
                        <ul className="profile__orders-description-list nav__list">
                          {order.itemsSnapshot.map((item) => {
                            return (
                              <li
                                className="profile__orders-description profile__orders-description_list"
                                key={item._id}
                              >
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
