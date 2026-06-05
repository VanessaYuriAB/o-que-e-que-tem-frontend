import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <section className="not-found content__not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__content">Página não encontrada</p>
      <Link className="not-found__link link" to="/">
        Voltar para Home
      </Link>
    </section>
  );
}

export default NotFound;
