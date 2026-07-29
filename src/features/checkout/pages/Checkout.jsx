import './Checkout.css';
import { Link } from 'react-router-dom';

function Checkout() {
  return (
    <section className="checkout content__checkout">
      <div className="checkout__empty-box">
        <h1 className="checkout__empty-title">Não há checkout a ser realizado!</h1>
        <strong className="checkout__empty-text">
          O carrinho está vazio ou incompleto, não existem produtos selecionados e/ou informações de
          compra.
        </strong>
        <div className="checkout__empty-links-box">
          <p className="checkout__empty-text">
            Selecione os ingredientes para montar a sua sopa, creme ou patê e/ou preencha os dados
            do carrinho para finalizar o pagamento.
          </p>
          <div className="checkout__empty-links">
            <Link className="checkout__empty-link link-to-button" to="/menu">
              Cardápio
            </Link>
            <Link className="checkout__empty-link link-to-button" to="/cart">
              Carrinho
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
