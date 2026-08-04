import { Link, useNavigate } from 'react-router-dom';
import Toast from '../../shared/components/ui/toast/Toast.jsx';
import Button from '../../shared/components/ui/button/Button.jsx';
import PropTypes from 'prop-types';

import './UnauthorizedRoute.css';

function UnauthorizedRoute({ from }) {
  const navigate = useNavigate();

  return (
    <section className="protected-route content__protected-route">
      <Toast className="protected-route__toast">
        <h1 className="protected-route__title">É preciso estar logado(a)!</h1>
        <nav className="protected-route__links" aria-label="Ações para conectar.">
          <ul className="protected-route__list nav__list">
            <li className="protected-route__item">
              <Link className="protected-route__link link-to-button" to="/login" state={{ from }}>
                Logar
              </Link>
            </li>
            <li className="protected-route__item">
              <Link
                className="protected-route__link link-to-button"
                to="/register"
                state={{ from }}
              >
                Inscrever-se
              </Link>
            </li>
          </ul>
        </nav>

        <Button className="protected-route__button" onClick={() => navigate(-1)}>
          Voltar para página anterior
        </Button>
      </Toast>
    </section>
  );
}

UnauthorizedRoute.propTypes = {
  from: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
  }),
};

/*
UnauthorizedRoute.propTypes = {
  from: PropTypes.object,
};
*/

export default UnauthorizedRoute;
