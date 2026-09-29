import PropTypes from 'prop-types';
import './OrderTracked.css';

function OrderTracked({ orderTracked }) {
  const formattedDate = orderTracked
    ? new Date(orderTracked.createdAt).toLocaleString('pt-BR')
    : '';

  const typeOfMeal = orderTracked.meal === 'pate' ? 'patê' : orderTracked.meal;

  return (
    <section className="result tracker__result">
      <h2 className="result__title">Pedido nº {orderTracked.orderNumber}:</h2>
      {orderTracked.orderNumber.startsWith('2') ? (
        <dl className="result__details">
          <div className="result__detail-box result__detail-box_inline">
            <dt className="result__detail">Data:</dt>
            <dd className="result__description">{formattedDate}</dd>
          </div>
          <div className="result__detail-box result__detail-box_inline">
            <dt className="result__detail">Tipo:</dt>
            <dd className="result__description">{typeOfMeal}</dd>
          </div>
          <div className="result__detail-box result__detail-box_inline">
            <dt className="result__detail">Entrega:</dt>
            <dd className="result__description">{orderTracked.method}</dd>
          </div>
          <div className="result__detail-box result__detail-box_inline">
            <dt className="result__detail">Pagamento:</dt>
            <dd className="result__description">{orderTracked.payment}</dd>
          </div>
          <div className="result__detail-box result__detail-box_inline">
            <dt className="result__detail">R$:</dt>
            <dd className="result__description">{orderTracked.amount}</dd>
          </div>
          {orderTracked.method === 'delivery' && (
            <div className="result__detail-box">
              <dt className="result__detail">Endereço:</dt>
              <dd className="result__description">
                {orderTracked.addressSnapshot.address}, {orderTracked.addressSnapshot.number}
                {orderTracked.addressSnapshot.complement !== '-'
                  ? `, ${orderTracked.addressSnapshot.complement}`
                  : ''}
                , {orderTracked.addressSnapshot.district}, {orderTracked.addressSnapshot.cep}
              </dd>
            </div>
          )}
          {orderTracked.obs && (
            <div className="result__detail-box">
              <dt className="result__detail">Informações adicionais:</dt>
              <dd className="result__description">{orderTracked.obs}</dd>
            </div>
          )}
          <div className="result__detail-box">
            <dt className="result__detail">Ingredientes:</dt>
            <dd className="result__description">
              <ul className="result__items-list list-reset">
                {orderTracked.itemsSnapshot.map((item) => {
                  return (
                    <li className="result__item-list" key={item._id}>
                      {item.productName}
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>
        </dl>
      ) : (
        <dl className="result__details">
          <div className="result__detail-box result__detail-box_inline">
            <dt className="result__detail">Data:</dt>
            <dd className="result__description">{formattedDate}</dd>
          </div>
          <div className="result__detail-box result__detail-box_inline">
            <dt className="result__detail">Tipo:</dt>
            <dd className="result__description">{typeOfMeal}</dd>
          </div>
          <div className="result__detail-box result__detail-box_inline">
            <dt className="result__detail">Entrega:</dt>
            <dd className="result__description">{orderTracked.method}</dd>
          </div>
          <div className="result__detail-box result__detail-box_inline">
            <dt className="result__detail">Em:</dt>
            <dd className="result__description">{orderTracked.day}</dd>
          </div>
          <div className="result__detail-box result__detail-box_inline">
            <dt className="result__detail">Às:</dt>
            <dd className="result__description">{orderTracked.time}</dd>
          </div>
          {orderTracked.method === 'delivery' && (
            <div className="result__detail-box">
              <dt className="result__detail">Endereço:</dt>
              <dd className="result__description">
                {orderTracked.addressSnapshot.address}, {orderTracked.addressSnapshot.number}
                {orderTracked.addressSnapshot.complement !== '-'
                  ? `, ${orderTracked.addressSnapshot.complement}`
                  : ''}
                , {orderTracked.addressSnapshot.district}, {orderTracked.addressSnapshot.cep}
              </dd>
            </div>
          )}
          {orderTracked.obs && (
            <div className="result__detail-box">
              <dt className="result__detail">Informações adicionais:</dt>
              <dd className="result__description">{orderTracked.obs}</dd>
            </div>
          )}
          <div className="result__detail-box">
            <dt className="result__detail">Ingredientes:</dt>
            <dd className="result__description">
              <ul className="result__items-list list-reset">
                {orderTracked.itemsSnapshot.map((item) => {
                  return (
                    <li className="result__item-list" key={item._id}>
                      {item.productName}
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>
        </dl>
      )}
    </section>
  );
}

OrderTracked.propTypes = {
  orderTracked: PropTypes.object.isRequired,
};

export default OrderTracked;
