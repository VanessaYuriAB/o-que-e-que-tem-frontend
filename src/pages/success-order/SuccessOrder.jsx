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
    <section className="order content__order" aria-live="polite">
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

          <article className="order__card">
            <h2 className="order__subtitle">
              Aqui estão as informações {hasOrder.meal === 'sopa' ? 'da sua' : 'do seu'}{' '}
              {hasOrder.meal === 'pate' ? 'patê' : hasOrder.meal}:
            </h2>
            <dl className="order__details">
              <div className="order__detail-box order__detail-box_inline">
                <dt className="order__term">Nº do pedido:</dt>
                <dd className="order__description">{hasOrder.orderNumber}</dd>
              </div>
              <div className="order__detail-box order__detail-box_inline">
                <dt className="order__term">Forma de entrega:</dt>
                <dd className="order__description">{hasOrder.method}</dd>
              </div>
              {hasOrder.method === 'delivery' && (
                <div className="order__detail-box">
                  <dt className="order__term">Endereço:</dt>
                  <dd className="order__description">
                    {hasOrder.addressSnapshot.address}, {hasOrder.addressSnapshot.number}
                    {hasOrder.addressSnapshot.complement !== '-' &&
                      `, ${hasOrder.addressSnapshot.complement}`}
                    , {hasOrder.addressSnapshot.district}, {hasOrder.addressSnapshot.cep}
                  </dd>
                </div>
              )}
              <div className="order__detail-box">
                <dt className="order__term">Infos adicionais:</dt>
                <dd className="order__description">{hasOrder.obs}</dd>
              </div>
              <div className="order__detail-box">
                <dt className="order__term">Contato:</dt>
                <dd className="order__description">
                  <address className="order__address">
                    {hasOrder.customerSnapshot.userName} | {hasOrder.customerSnapshot.email} |{' '}
                    {hasOrder.customerSnapshot.tel}
                  </address>
                </dd>
              </div>

              <div className="order__detail-box order__detail-box_inline">
                <dt className="order__term">Forma de pagamento:</dt>
                <dd className="order__description">{hasOrder.payment}</dd>
              </div>
              <div className="order__detail-box order__detail-box_inline">
                <dt className="order__term">R$:</dt>
                <dd className="order__description">{hasOrder.amount},00</dd>
              </div>
              <div className="order__detail-box order__detail-box_inline">
                <dt className="order__term">Tipo de refeição:</dt>
                <dd className="order__description">{hasOrder.meal}</dd>
              </div>
              <div className="order__detail-box">
                <dt className="order__term">Ingredientes:</dt>
                <dd className="order__description">
                  <ul className="order__ingredients-list nav__list">
                    {hasOrder.itemsSnapshot.map((item) => {
                      return (
                        <li className="order__ingredients-item" key={item._id}>
                          {item.productName}
                        </li>
                      );
                    })}
                  </ul>
                </dd>
              </div>
            </dl>
          </article>
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
