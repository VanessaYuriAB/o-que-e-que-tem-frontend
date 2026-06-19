import { Link, useNavigate } from 'react-router-dom';
import Toast from '../../shared/components/ui/toast/Toast.jsx';
import Button from '../../shared/components/ui/button/Button.jsx';

import './UnauthorizedRoute.css';

function UnauthorizedRoute() {
  const navigate = useNavigate();

  return (
    <Toast>
      <h1 className="content-protected__title">É preciso estar logado(a)!</h1>
      <Link className="content-protected__logon" to="/login">
        Logar
      </Link>
      <Link className="content-protected__signon" to="/register">
        Inscrever-se
      </Link>
      <Button className="content-protected__backon" onClick={() => navigate(-1)}>
        Voltar para página anterior
      </Button>
    </Toast>
  );
}

export default UnauthorizedRoute;
