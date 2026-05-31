import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <section className="not-found__container">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__content">Página não encontrada</p>
      <Link className="not-found__link" to="/">
        Voltar para Home
      </Link>
    </section>
  );
}

export default NotFound;
