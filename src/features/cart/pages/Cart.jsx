import { Link } from 'react-router-dom';
import useCartStore from '../../../store/useCartStore.js';
import Toast from '../../../shared/components/ui/toast/Toast.jsx';
import PackCart from './components/pack-cart/PackCart.jsx';
import styles from './Cart.module.css';

function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <section className={`${styles.cart} ${styles.content__cart}`}>
      <h1 className={styles.cart__title}>Carrinho de sopas...</h1>
      <strong className={styles.cart__strong}>...cremes ou patês</strong>

      {/* se não houver items, renderiza mensagem; se houver, renderiza carrinho */}

      {cartItems.length === 0 ? (
        <section className={styles['cart__null-box']}>
          <Toast className={styles['cart__null-toast']}>
            <h2 className={styles['cart__null-title']}>Está vazio, no momento!</h2>
            <p className={styles['cart__null-text']}>
              Veja o que está disponível em nosso cardápio :)
            </p>
            <Link className={`${styles['cart__null-link']} link-to-button`} to="/menu">
              Acesse o menu aqui
            </Link>
          </Toast>
        </section>
      ) : (
        <PackCart />
      )}
    </section>
  );
}

export default Cart;
