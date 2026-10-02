import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import { Link } from 'react-router-dom';
import styles from './CheckoutEmpty.module.css';

function CheckoutEmpty() {
  return (
    <section className={`${styles.empty} ${styles.checkout__empty}`}>
      <h1 className={styles.empty__title}>Não há checkout a ser realizado!</h1>
      <p className={styles.empty__text}>
        <strong className={styles.empty__text}>
          O carrinho está vazio ou incompleto, não existem produtos selecionados e/ou informações de
          compra.
        </strong>
      </p>
      <Toast className={styles.empty__toast}>
        <p className={`${styles.empty__text} ${styles.empty__text_toast}`}>
          Selecione os ingredientes para montar a sua sopa, creme ou patê e/ou preencha os dados do
          carrinho para finalizar o pagamento.
        </p>
        <nav className={styles.empty__links} aria-label="Ações para continuar a compra">
          <ul className={`${styles.empty__list} nav__list`}>
            <li className={styles['empty__list-item']}>
              <Link className={`${styles.empty__link} link-to-button`} to="/menu">
                Cardápio
              </Link>
            </li>
            <li className={styles['empty__list-item']}>
              <Link className={`${styles.empty__link} link-to-button`} to="/cart">
                Carrinho
              </Link>
            </li>
          </ul>
        </nav>
      </Toast>
    </section>
  );
}

export default CheckoutEmpty;
