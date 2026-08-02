import { Link } from 'react-router-dom';
import './SuccessOrder.css';
import useAuthStore from '../../store/useAuthStore.js';

function SuccessOrder() {
  const user = useAuthStore((state) => state.user);

  let hasOrder = null;

  try {
    hasOrder = JSON.parse(localStorage.getItem('successOrder'));
  } catch {
    hasOrder = null;
  }

  console.log('hasOrder', hasOrder);

  return (
    <section className="order content__order">
      {hasOrder !== null ? (
        <>
          <h1 className="order__title">Pedido enviado com sucesso</h1>
          <div className="order__box">
            <p className="order__text">
              Logo você pode saborear uma super refeição nutritiva preparada com muito amor e
              carinho s2
            </p>
            <p className="order__text">
              E ainda ajudou a reduzir um pouquinho o desperdício alimentar e o meio ambiente
            </p>
            <p className="order__text">Agradecemos muito :)</p>
          </div>

          <h2 className="order__subtitle">
            Aqui estão as informações {hasOrder.meal === 'sopa' ? 'da sua' : 'do seu'}{' '}
            {hasOrder.meal === 'pate' ? 'patê' : hasOrder.meal}:
          </h2>
          <div className="order__details">
            <div className="order__item-box order__item-box_inline">
              <p className="order__item-label">Nº do pedido:</p>
              <p className="order__item">{hasOrder.orderNumber}</p>
            </div>
            <div className="order__item-box order__item-box_inline">
              <p className="order__item-label">Forma de entrega:</p>
              <p className="order__item">{hasOrder.method}</p>
            </div>
            {hasOrder.method === 'delivery' && (
              <div className="order__item-box">
                <p className="order__item-label">Endereço:</p>
                <p className="order__item">
                  {hasOrder.addressSnapshot.address}, {hasOrder.addressSnapshot.number}
                  {hasOrder.addressSnapshot.complement !== '-' &&
                    `, ${hasOrder.addressSnapshot.complement}`}
                  , {hasOrder.addressSnapshot.district}, {hasOrder.addressSnapshot.cep}
                </p>
              </div>
            )}
            <div className="order__item-box">
              <p className="order__item-label">Infos adicionais:</p>
              <p className="order__item">{hasOrder.obs}</p>
            </div>
            <div className="order__item-box">
              <p className="order__item-label">Contato:</p>
              <p className="order__item">
                {hasOrder.customerSnapshot.userName} | {hasOrder.customerSnapshot.email} |{' '}
                {hasOrder.customerSnapshot.tel}
              </p>
            </div>

            <div className="order__item-box order__item-box_inline">
              <p className="order__item-label">Forma de pagamento:</p>
              <p className="order__item">{hasOrder.payment}</p>
            </div>
            <div className="order__item-box order__item-box_inline">
              <p className="order__item-label">R$:</p>
              <p className="order__item">{hasOrder.amount},00</p>
            </div>
            <div className="order__item-box order__item-box_inline">
              <p className="order__item-label">Tipo de refeição:</p>
              <p className="order__item">{hasOrder.meal}</p>
            </div>
            <div className="order__item-box">
              <p className="order__item-label">Ingredientes:</p>
              <ul className="order__ingredients-list nav__list">
                {hasOrder.itemsSnapshot.map((item) => {
                  return (
                    <li className="order__item" key={item.inventoryLotId}>
                      {item.productName}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="order__empty-title">
            Ops, você não tem um pedido finalizado e enviado agora
          </h1>
          {user !== null && (
            <>
              <p className="order__empty-prompt">Quer ver seu histórico de pedidos?</p>
              <Link className="order__empty-link link-to-button" to="/profile/orders-profile">
                Pedidos anteriores
              </Link>
            </>
          )}

          <p className="order__empty-prompt">Quer fazer um novo pedido?</p>
          <Link className="order__empty-link link-to-button" to="/menu">
            Ver cardápio
          </Link>

          <p className="order__empty-prompt">Quer finalizar um pedido em andamento?</p>
          <Link className="order__empty-link link-to-button" to="/cart">
            Ir para carrinho
          </Link>

          <p className="order__empty-prompt">Precisa apenas fazer o pagamento?</p>
          <Link className="order__empty-link link-to-button" to="/checkout">
            Ir para checkout
          </Link>
        </>
      )}
    </section>
  );
}

export default SuccessOrder;
