import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../../store/useAuthStore.js';
import Button from '../../../../shared/components/ui/button/Button.jsx';
import Toast from '../../../../shared/components/ui/toast/Toast.jsx';
import Loader from '../../../../shared/components/ui/loader/Loader.jsx';
import { useShallow } from 'zustand/react/shallow';

import './Logout.css';

function Logout() {
  const { logoutAction, loading, globalError } = useAuthStore(
    useShallow((state) => ({
      logoutAction: state.logoutAction,
      loading: state.loading,
      globalError: state.globalError,
    }))
  );

  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logoutAction();

    if (result.success === true) {
      console.log('deslogado');
      navigate('/');
    }
  };

  if (loading) {
    return <Loader>Desconectando...</Loader>;
  }

  return (
    <section className="logout content__logout">
      <h1 className="logout__title">Você quer desconectar da sua conta?</h1>

      {globalError && <Toast className="logout__toast" message={globalError.message} />}

      <Button className="logout__btn" onClick={handleLogout}>
        Deslogar
      </Button>
      <Button className="logout__btn" onClick={() => navigate(-1)}>
        Voltar para página anterior
      </Button>
    </section>
  );
}

export default Logout;
