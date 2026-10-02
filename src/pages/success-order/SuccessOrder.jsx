import { Link } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore.js';
import Toast from '../../shared/components/ui/toast/Toast.jsx';
import styles from './SuccessOrder.module.css';

function SuccessOrder() {
  const user = useAuthStore((state) => state.user);

  let hasOrder = null;

  try {
    hasOrder = JSON.parse(localStorage.getItem('successOrder'));
  } catch {
    hasOrder = null;
  }

  return (
    <section className={`${styles.order} ${styles.content__order}`}>
      <h1 className={hasOrder !== null ? styles.order__title : styles['order__empty-title']}>
        {hasOrder !== null
          ? 'Pedido enviado com sucesso'
          : 'Ops, você não tem um pedido finalizado e enviado salvo no seu navegador'}
      </h1>

      {hasOrder !== null ? (
        <>
          <div className={styles.order__box}>
            <p className={styles.order__text}>
              Logo você pode saborear uma super refeição nutritiva preparada com muito amor e
              carinho s2
            </p>
            <p className={styles.order__text}>
              E ainda ajudou a reduzir um pouquinho o desperdício alimentar e o meio ambiente
            </p>
            <p className={styles.order__text}>Agradecemos muito :)</p>
          </div>

          <article className={styles.order__card}>
            <h2 className={styles.order__subtitle}>
              Aqui estão as informações {hasOrder.meal === 'sopa' ? 'da sua' : 'do seu'}{' '}
              {hasOrder.meal === 'pate' ? 'patê' : hasOrder.meal}:
            </h2>
            <dl className={styles.order__details}>
              <div
                className={`${styles['order__detail-box']} ${styles['order__detail-box_inline']}`}
              >
                <dt className={styles.order__term}>Nº do pedido:</dt>
                <dd className={styles.order__description}>{hasOrder.orderNumber}</dd>
              </div>
              <div
                className={`${styles['order__detail-box']} ${styles['order__detail-box_inline']}`}
              >
                <dt className={styles.order__term}>Data: </dt>
                <dd className={styles.order__description}>
                  {new Date(hasOrder.createdAt).toLocaleString('pt-BR')}
                </dd>
              </div>
              <div
                className={`${styles['order__detail-box']} ${styles['order__detail-box_inline']}`}
              >
                <dt className={styles.order__term}>Forma de entrega:</dt>
                <dd className={styles.order__description}>{hasOrder.method}</dd>
              </div>
              {hasOrder.method === 'delivery' && (
                <div className={styles['order__detail-box']}>
                  <dt className={styles.order__term}>Endereço:</dt>
                  <dd className={styles.order__description}>
                    {hasOrder.addressSnapshot.address}, {hasOrder.addressSnapshot.number}
                    {hasOrder.addressSnapshot.complement !== '-' &&
                      `, ${hasOrder.addressSnapshot.complement}`}
                    , {hasOrder.addressSnapshot.district}, {hasOrder.addressSnapshot.cep}
                  </dd>
                </div>
              )}
              {hasOrder.obs && (
                <div className={styles['order__detail-box']}>
                  <dt className={styles.order__term}>Infos adicionais:</dt>
                  <dd className={styles.order__description}>{hasOrder.obs}</dd>
                </div>
              )}

              <div className={styles['order__detail-box']}>
                <dt className={styles.order__term}>Contato:</dt>
                <dd className={styles.order__description}>
                  <address className={styles.order__address}>
                    {hasOrder.customerSnapshot.userName} | {hasOrder.customerSnapshot.email} |{' '}
                    {hasOrder.customerSnapshot.tel}
                  </address>
                </dd>
              </div>

              {hasOrder.orderNumber.startsWith('2') && (
                <>
                  <div
                    className={`${styles['order__detail-box']} ${styles['order__detail-box_inline']}`}
                  >
                    <dt className={styles.order__term}>Forma de pagamento:</dt>
                    <dd className={styles.order__description}>
                      {hasOrder.payment === 'pix'
                        ? 'PIX'
                        : hasOrder.payment === 'debito'
                          ? 'cartão de débito'
                          : 'cartão de crédito'}
                    </dd>
                  </div>
                  <div
                    className={`${styles['order__detail-box']} ${styles['order__detail-box_inline']}`}
                  >
                    <dt className={styles.order__term}>R$:</dt>
                    <dd className={styles.order__description}>{hasOrder.amount},00</dd>
                  </div>
                </>
              )}

              {hasOrder.orderNumber.startsWith('S') && (
                <>
                  <div
                    className={`${styles['order__detail-box']} ${styles['order__detail-box_inline']}`}
                  >
                    <dt className={styles.order__term}>
                      Data de {hasOrder.method === 'delivery' ? 'entrega' : 'retirada'}:
                    </dt>
                    <dd className={styles.order__description}>{hasOrder.day}</dd>
                  </div>

                  <div
                    className={`${styles['order__detail-box']} ${styles['order__detail-box_inline']}`}
                  >
                    <dt className={styles.order__term}>Às:</dt>
                    <dd className={styles.order__description}>{hasOrder.time}</dd>
                  </div>
                </>
              )}

              <div
                className={`${styles['order__detail-box']} ${styles['order__detail-box_inline']}`}
              >
                <dt className={styles.order__term}>Tipo de refeição:</dt>
                <dd className={styles.order__description}>
                  {hasOrder.meal === 'pate' ? 'patê' : hasOrder.meal}
                </dd>
              </div>
              <div className={styles['order__detail-box']}>
                <dt className={styles.order__term}>Ingredientes:</dt>
                <dd className={styles.order__description}>
                  <ul className={`${styles['order__ingredients-list']} list-reset`}>
                    {hasOrder.itemsSnapshot.map((item) => {
                      return (
                        <li className={styles['order__ingredients-item']} key={item._id}>
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
        <Toast className={styles['order__empty-toast']}>
          <p className={styles['order__empty-prompt']}>
            Você pode rastrear um pedido pelo nº do pedido + e-mail:
          </p>
          <Link className={`${styles['order__empty-link']} link-to-button`} to="/order-tracker">
            Rastrear um pedido
          </Link>

          {user !== null && (
            <>
              <p className={styles['order__empty-prompt']}>Quer ver seu histórico de pedidos?</p>
              <Link
                className={`${styles['order__empty-link']} link-to-button`}
                to="/profile/orders-profile"
              >
                Pedidos anteriores
              </Link>
            </>
          )}

          <p className={styles['order__empty-prompt']}>Quer fazer um novo pedido?</p>
          <Link className={`${styles['order__empty-link']} link-to-button`} to="/menu">
            Ver cardápio
          </Link>

          <p className={styles['order__empty-prompt']}>Quer finalizar um pedido em andamento?</p>
          <Link className={`${styles['order__empty-link']} link-to-button`} to="/cart">
            Ir para carrinho
          </Link>

          <p className={styles['order__empty-prompt']}>Precisa apenas fazer o pagamento?</p>
          <Link className={`${styles['order__empty-link']} link-to-button`} to="/checkout">
            Ir para checkout
          </Link>
        </Toast>
      )}
    </section>
  );
}

export default SuccessOrder;
