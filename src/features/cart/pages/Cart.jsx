import { Link } from 'react-router-dom';
import './Cart.css';

function Cart() {
  return (
    <section className="cart content__cart">
      <h1 className="cart__title">Carrinho de sopas...</h1>
      <strong className="cart__strong">...cremes ou patês</strong>
      {/* se houver items selecionados, renderiza carrinho; se não houver, renderiza mensagem */}
      <div className="cart__null-box">
        <h2 className="cart__null-title">Está vazio, no momento!</h2>
        <p className="cart__null-text">Veja o que está disponível em nosso cardápio :)</p>
        <Link className="cart__null-link link-to-button" to="/menu">
          Acesse o menu aqui
        </Link>
      </div>
    </section>
  );
}

export default Cart;
