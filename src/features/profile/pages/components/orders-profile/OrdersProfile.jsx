import './OrdersProfile.css';
import { Link } from 'react-router-dom';

import orders from '../../../../../mocks/fakeOrdersDb.js';

function OrdersProfile() {
  return (
    <section className="profile__orders">
      <h3 className="profile__orders-title">Histórico de pedidos</h3>

      {orders.length === 0 ? (
        <div className="profile__no-orders">
          <p className="profile__no-orders-text">
            Você ainda não comprou nenhuma sopa, creme ou patê...
          </p>
          <p className="profile__no-orders-text">
            Quer escolher os ingredientes para fazer seu primeiro pedido? :)
          </p>
          <Link className="profile__no-orders-link link-to-button" to="/menu">
            Ver cardápio
          </Link>
        </div>
      ) : (
        <ul className="profile__orders-list nav__list">
          {orders.map((order) => {
            return (
              <li className="profile__orders-item" key={order._id}>
                <dl className="profile__orders-details">
                  <div className="profile__orders-item-box profile__orders-item-box_center">
                    <dt className="profile__orders-term">Nº do pedido:</dt>
                    <dd className="profile__orders-description">{order.orderNumber}</dd>
                  </div>
                  <div className="profile__orders-item-box">
                    <dt className="profile__orders-term">Data:</dt>
                    <dd className="profile__orders-description">
                      {new Date(order.createdAt).toLocaleString('pt-BR')}
                    </dd>
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
                    <dd className="profile__orders-description">{order.payment}</dd>
                  </div>
                  <div className="profile__orders-item-box profile__orders-item-box_inline">
                    <dt className="profile__orders-term">R$:</dt>
                    <dd className="profile__orders-description">{order.amount},00</dd>
                  </div>
                  <div className="profile__orders-item-box profile__orders-item-box_inline">
                    <dt className="profile__orders-term">Tipo:</dt>
                    <dd className="profile__orders-description">{order.meal}</dd>
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
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default OrdersProfile;
