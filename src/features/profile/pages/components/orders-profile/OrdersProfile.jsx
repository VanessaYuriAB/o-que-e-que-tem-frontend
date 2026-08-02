import './OrdersProfile.css';
import orders from '../../../../../mocks/fakeOrdersDb.js';

function OrdersProfile() {
  return (
    <section className="profile__orders">
      <h3 className="profile__orders-title">Histórico de pedidos:</h3>
      <ul className="profile__orders-list nav__list">
        {orders.map((order) => {
          return (
            <li className="profile__orders-item" key={order._id}>
              <div className="profile__orders-item-box profile__orders-item-box_center">
                <p className="profile__orders-label">Nº do pedido:</p>
                <p className="profile__orders-value">{order.orderNumber}</p>
              </div>
              <div className="profile__orders-item-box">
                <p className="profile__orders-label">Data:</p>
                <p className="profile__orders-value">
                  {new Date(order.createdAt).toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="profile__orders-item-box">
                <p className="profile__orders-label">Forma de entrega:</p>
                <p className="profile__orders-value">{order.method}</p>
              </div>
              {order.method === 'delivery' && (
                <div className="profile__orders-item-box">
                  <p className="profile__orders-label">Endereço:</p>
                  <p className="profile__orders-value">
                    {order.addressSnapshot.address}, {order.addressSnapshot.number}
                    {order.addressSnapshot.complement !== '-' &&
                      `, ${order.addressSnapshot.complement}`}
                    , {order.addressSnapshot.district}, {order.addressSnapshot.cep}
                  </p>
                </div>
              )}
              {order.obs && (
                <div className="profile__orders-item-box">
                  <p className="profile__orders-label">Informações adicionais:</p>
                  <p className="profile__orders-value">{order.obs}</p>
                </div>
              )}
              <div className="profile__orders-item-box">
                <p className="profile__orders-label">Contato:</p>
                <p className="profile__orders-value">
                  {order.customerSnapshot.userName} | {order.customerSnapshot.email} |{' '}
                  {order.customerSnapshot.tel}
                </p>
              </div>
              <div className="profile__orders-item-box">
                <p className="profile__orders-label">Forma de pagamento:</p>
                <p className="profile__orders-value">{order.payment}</p>
              </div>
              <div className="profile__orders-item-box profile__orders-item-box_inline">
                <p className="profile__orders-label">R$:</p>
                <p className="profile__orders-value">{order.amount},00</p>
              </div>
              <div className="profile__orders-item-box profile__orders-item-box_inline">
                <p className="profile__orders-label">Tipo:</p>
                <p className="profile__orders-value">{order.meal}</p>
              </div>
              <div className="profile__orders-item-box">
                <p className="profile__orders-label">Itens:</p>
                <ul className="profile__orders-value-list nav__list">
                  {order.itemsSnapshot.map((item) => {
                    return (
                      <li
                        className="profile__orders-value profile__orders-value_list"
                        key={item._id}
                      >
                        {item.productName}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default OrdersProfile;
