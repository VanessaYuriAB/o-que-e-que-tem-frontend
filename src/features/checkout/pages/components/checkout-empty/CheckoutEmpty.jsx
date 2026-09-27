import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import { Link } from 'react-router-dom';
import './CheckoutEmpty.css';

function CheckoutEmpty() {
  return (
    <section className="checkout__empty-box">
      <h1 className="checkout__empty-title">Não há checkout a ser realizado!</h1>
      <p className="checkout__empty-text">
        <strong className="checkout__empty-text">
          O carrinho está vazio ou incompleto, não existem produtos selecionados e/ou informações de
          compra.
        </strong>
      </p>
      <Toast className="checkout__empty-links-toast">
        <p className="checkout__empty-text checkout__empty-text_toast">
          Selecione os ingredientes para montar a sua sopa, creme ou patê e/ou preencha os dados do
          carrinho para finalizar o pagamento.
        </p>
        <nav className="checkout__empty-links" aria-label="Ações para continuar a compra">
          <ul className="checkout__empty-list nav__list">
            <li className="checkout__empty-list-item">
              <Link className="checkout__empty-link link-to-button" to="/menu">
                Cardápio
              </Link>
            </li>
            <li className="checkout__empty-list-item">
              <Link className="checkout__empty-link link-to-button" to="/cart">
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
