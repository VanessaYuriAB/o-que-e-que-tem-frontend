import parsePtBrDate from '../../../../utils/parsePtBrDate';
import PropTypes from 'prop-types';
import styles from './OrdersProfileCard.module.css';
import profileHistoryStyles from '../../../../styles/profile-history.module.css';

function OrdersProfileCard({ userAllOrders }) {
  const orderedUserAllOrders =
    userAllOrders.length > 0
      ? [...userAllOrders].sort((a, b) => parsePtBrDate(b.createdAt) - parsePtBrDate(a.createdAt))
      : [];

  return (
    <ul
      className={`${styles['profile__orders-list']} ${profileHistoryStyles['profile-history__list']} list-reset`}
    >
      {orderedUserAllOrders.map((order) => {
        const isSubscriptionOrder = order.orderNumber.startsWith('S');

        const formattedCreatedAt = new Date(order.createdAt).toLocaleString('pt-BR');
        const orderCreatedAt = order.createdAt.includes('T') ? formattedCreatedAt : order.createdAt;

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
          <li className={styles['profile__orders-item']} key={order._id}>
            <article className={styles['profile__orders-card']}>
              {isSubscriptionOrder ? (
                <dl
                  className={`${styles['profile__orders-details']} ${profileHistoryStyles['profile-history__details']}`}
                >
                  <div
                    className={`${styles['profile__orders-item-box']} ${styles['profile__orders-item-box_center']} ${profileHistoryStyles['profile-history__item-box']} ${profileHistoryStyles['profile-history__item-box_center']}`}
                  >
                    <dt
                      className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                    >
                      Nº do pedido:
                    </dt>
                    <dd
                      className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                    >
                      {order.orderNumber}
                    </dd>
                  </div>
                  <div
                    className={`${styles['profile__orders-item-box']} ${profileHistoryStyles['profile-history__item-box']}`}
                  >
                    <dt
                      className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                    >
                      Tipo:
                    </dt>
                    <dd
                      className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                    >
                      assinatura
                    </dd>
                  </div>
                  <div
                    className={`${styles['profile__orders-item-box']} ${profileHistoryStyles['profile-history__item-box']}`}
                  >
                    <dt
                      className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                    >
                      Data:
                    </dt>
                    <dd
                      className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                    >
                      {orderCreatedAt}
                    </dd>
                  </div>
                  <div
                    className={`${styles['profile__orders-item-box']} ${profileHistoryStyles['profile-history__item-box']}`}
                  >
                    <dt
                      className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                    >
                      Forma de entrega:
                    </dt>
                    <dd
                      className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                    >
                      {order.method}
                    </dd>
                  </div>
                  {order.method === 'delivery' && (
                    <div
                      className={`${styles['profile__orders-item-box']} ${profileHistoryStyles['profile-history__item-box']}`}
                    >
                      <dt
                        className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                      >
                        Endereço:
                      </dt>
                      <dd
                        className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                      >
                        {order.addressSnapshot.address}, {order.addressSnapshot.number}
                        {order.addressSnapshot.complement !== '-' &&
                          `, ${order.addressSnapshot.complement}`}
                        , {order.addressSnapshot.district}, {order.addressSnapshot.cep}
                      </dd>
                    </div>
                  )}
                  {order.obs && (
                    <div
                      className={`${styles['profile__orders-item-box']} ${profileHistoryStyles['profile-history__item-box']}`}
                    >
                      <dt
                        className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                      >
                        Informações adicionais:
                      </dt>
                      <dd
                        className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                      >
                        {order.obs}
                      </dd>
                    </div>
                  )}
                  <div
                    className={`${styles['profile__orders-item-box']} ${profileHistoryStyles['profile-history__item-box']}`}
                  >
                    <dt
                      className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                    >
                      Contato:
                    </dt>
                    <dd
                      className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                    >
                      <address className={styles['profile__orders-contact-info']}>
                        {order.customerSnapshot.userName} | {order.customerSnapshot.email} |{' '}
                        {order.customerSnapshot.tel}
                      </address>
                    </dd>
                  </div>
                  <div
                    className={`${styles['profile__orders-item-box']} ${profileHistoryStyles['profile-history__item-box']}`}
                  >
                    <dt
                      className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                    >
                      Data de {order.method === 'delivery' ? 'entrega' : 'retirada'}:
                    </dt>
                    <dd
                      className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                    >
                      {order.day}
                    </dd>
                  </div>
                  <div
                    className={`${styles['profile__orders-item-box']} ${styles['profile__orders-item-box_inline']} ${profileHistoryStyles['profile-history__item-box']}`}
                  >
                    <dt
                      className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                    >
                      Horário:
                    </dt>
                    <dd
                      className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                    >
                      {order.time}
                    </dd>
                  </div>
                  <div
                    className={`${styles['profile__orders-item-box']} ${styles['profile__orders-item-box_inline']} ${profileHistoryStyles['profile-history__item-box']}`}
                  >
                    <dt
                      className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                    >
                      Tipo de refeição:
                    </dt>
                    <dd
                      className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                    >
                      {typeOfMeal}
                    </dd>
                  </div>
                  <div
                    className={`${styles['profile__orders-item-box']} ${profileHistoryStyles['profile-history__item-box']}`}
                  >
                    <dt
                      className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                    >
                      Itens:
                    </dt>
                    <dd
                      className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                    >
                      <ul className={`${styles['profile__orders-description-list']} list-reset`}>
                        {order.itemsSnapshot.map((item) => {
                          return (
                            <li
                              className={styles['profile__orders-description-item']}
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
                <dl
                  className={`${styles['profile__orders-details']} ${profileHistoryStyles['profile-history__details']}`}
                >
                  <div
                    className={`${styles['profile__orders-item-box']} ${styles['profile__orders-item-box_center']} ${profileHistoryStyles['profile-history__item-box']} ${profileHistoryStyles['profile-history__item-box_center']}`}
                  >
                    <dt
                      className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                    >
                      Nº do pedido:
                    </dt>
                    <dd
                      className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                    >
                      {order.orderNumber}
                    </dd>
                  </div>
                  <div
                    className={`${styles['profile__orders-item-box']} ${profileHistoryStyles['profile-history__item-box']}`}
                  >
                    <dt
                      className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                    >
                      Tipo:
                    </dt>
                    <dd
                      className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                    >
                      avulso
                    </dd>
                  </div>
                  <div
                    className={`${styles['profile__orders-item-box']} ${profileHistoryStyles['profile-history__item-box']}`}
                  >
                    <dt
                      className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                    >
                      Data:
                    </dt>
                    <dd
                      className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                    >
                      {orderCreatedAt}
                    </dd>
                  </div>
                  <div
                    className={`${styles['profile__orders-item-box']} ${profileHistoryStyles['profile-history__item-box']}`}
                  >
                    <dt
                      className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                    >
                      Forma de entrega:
                    </dt>
                    <dd
                      className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                    >
                      {order.method}
                    </dd>
                  </div>
                  {order.method === 'delivery' && (
                    <div
                      className={`${styles['profile__orders-item-box']} ${profileHistoryStyles['profile-history__item-box']}`}
                    >
                      <dt
                        className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                      >
                        Endereço:
                      </dt>
                      <dd
                        className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                      >
                        {order.addressSnapshot.address}, {order.addressSnapshot.number}
                        {order.addressSnapshot.complement !== '-' &&
                          `, ${order.addressSnapshot.complement}`}
                        , {order.addressSnapshot.district}, {order.addressSnapshot.cep}
                      </dd>
                    </div>
                  )}
                  {order.obs && (
                    <div
                      className={`${styles['profile__orders-item-box']} ${profileHistoryStyles['profile-history__item-box']}`}
                    >
                      <dt
                        className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                      >
                        Informações adicionais:
                      </dt>
                      <dd
                        className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                      >
                        {order.obs}
                      </dd>
                    </div>
                  )}
                  <div
                    className={`${styles['profile__orders-item-box']} ${profileHistoryStyles['profile-history__item-box']}`}
                  >
                    <dt
                      className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                    >
                      Contato:
                    </dt>
                    <dd
                      className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                    >
                      <address className={styles['profile__orders-contact-info']}>
                        {order.customerSnapshot.userName} | {order.customerSnapshot.email} |{' '}
                        {order.customerSnapshot.tel}
                      </address>
                    </dd>
                  </div>
                  <div
                    className={`${styles['profile__orders-item-box']} ${profileHistoryStyles['profile-history__item-box']}`}
                  >
                    <dt
                      className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                    >
                      Forma de pagamento:
                    </dt>
                    <dd
                      className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                    >
                      {typeOfPayment}
                    </dd>
                  </div>
                  <div
                    className={`${styles['profile__orders-item-box']} ${styles['profile__orders-item-box_inline']} ${profileHistoryStyles['profile-history__item-box']}`}
                  >
                    <dt
                      className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                    >
                      R$:
                    </dt>
                    <dd
                      className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                    >
                      {order.amount},00
                    </dd>
                  </div>
                  <div
                    className={`${styles['profile__orders-item-box']} ${styles['profile__orders-item-box_inline']} ${profileHistoryStyles['profile-history__item-box']}`}
                  >
                    <dt
                      className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                    >
                      Tipo de refeição:
                    </dt>
                    <dd
                      className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                    >
                      {typeOfMeal}
                    </dd>
                  </div>
                  <div
                    className={`${styles['profile__orders-item-box']} ${profileHistoryStyles['profile-history__item-box']}`}
                  >
                    <dt
                      className={`${styles['profile__orders-term']} ${profileHistoryStyles['profile-history__term']}`}
                    >
                      Itens:
                    </dt>
                    <dd
                      className={`${styles['profile__orders-description']} ${profileHistoryStyles['profile-history__description']}`}
                    >
                      <ul className={`${styles['profile__orders-description-list']} list-reset`}>
                        {order.itemsSnapshot.map((item) => {
                          return (
                            <li
                              className={styles['profile__orders-description-item']}
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
            </article>
          </li>
        );
      })}
    </ul>
  );
}

OrdersProfileCard.propTypes = {
  userAllOrders: PropTypes.array.isRequired,
};

export default OrdersProfileCard;
