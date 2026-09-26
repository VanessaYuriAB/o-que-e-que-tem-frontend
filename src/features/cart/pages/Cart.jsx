import { Link } from 'react-router-dom';
import useCartStore from '../../../store/useCartStore.js';
import Toast from '../../../shared/components/ui/toast/Toast.jsx';
import PackCart from './components/pack-cart/PackCart.jsx';
import './Cart.css';

function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <section className="cart content__cart">
      <h1 className="cart__title">Carrinho de sopas...</h1>
      <strong className="cart__strong">...cremes ou patês</strong>

      {/* se não houver items, renderiza mensagem; se houver, renderiza carrinho */}

      {cartItems.length === 0 ? (
        <section className="cart__null-box">
          <Toast className="cart__null-toast">
            <h2 className="cart__null-title">Está vazio, no momento!</h2>
            <p className="cart__null-text">Veja o que está disponível em nosso cardápio :)</p>
            <Link className="cart__null-link link-to-button" to="/menu">
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
