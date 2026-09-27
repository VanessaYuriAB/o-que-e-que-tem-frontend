import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import { Link } from 'react-router-dom';
import './CheckoutEmpty.css';

function CheckoutEmpty() {
  return (
    <section className="empty checkout__empty">
      <h1 className="empty__title">Não há checkout a ser realizado!</h1>
      <p className="empty__text">
        <strong className="empty__text">
          O carrinho está vazio ou incompleto, não existem produtos selecionados e/ou informações de
          compra.
        </strong>
      </p>
      <Toast className="empty__toast">
        <p className="empty__text empty__text_toast">
          Selecione os ingredientes para montar a sua sopa, creme ou patê e/ou preencha os dados do
          carrinho para finalizar o pagamento.
        </p>
        <nav className="empty__links" aria-label="Ações para continuar a compra">
          <ul className="empty__list nav__list">
            <li className="empty__list-item">
              <Link className="empty__link link-to-button" to="/menu">
                Cardápio
              </Link>
            </li>
            <li className="empty__list-item">
              <Link className="empty__link link-to-button" to="/cart">
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
