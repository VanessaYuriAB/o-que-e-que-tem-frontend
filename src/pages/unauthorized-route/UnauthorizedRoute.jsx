import { Link, useNavigate } from 'react-router-dom';
import Toast from '../../shared/components/ui/toast/Toast.jsx';
import Button from '../../shared/components/ui/button/Button.jsx';

import './UnauthorizedRoute.css';

function UnauthorizedRoute() {
  const navigate = useNavigate();

  return (
    <section className="protected-route content__protected-route">
      <Toast>
        <h1 className="protected-route__title">É preciso estar logado(a)!</h1>
        <Link className="protected-route__logon link-to-button" to="/login">
          Logar
        </Link>
        <Link className="protected-route__signon link-to-button" to="/register">
          Inscrever-se
        </Link>
        <Button className="protected-route__backon" onClick={() => navigate(-1)}>
          Voltar para página anterior
        </Button>
      </Toast>
    </section>
  );
}

export default UnauthorizedRoute;
