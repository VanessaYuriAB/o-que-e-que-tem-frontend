import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../../store/useAuthStore.js';
import Button from '../../../../shared/components/ui/button/Button.jsx';
import Toast from '../../../../shared/components/ui/toast/Toast.jsx';
import Loader from '../../../../shared/components/ui/loader/Loader.jsx';
import { useShallow } from 'zustand/react/shallow';
import { useState } from 'react';

import './Logout.css';

function Logout() {
  const [localError, setLocalError] = useState(null);

  const navigate = useNavigate();

  const { logoutAction, loading, globalError, authChecked } = useAuthStore(
    useShallow((state) => ({
      logoutAction: state.logoutAction,
      loading: state.loading,
      globalError: state.globalError,
      authChecked: state.authChecked,
    }))
  );

  const handleLogout = async () => {
    const result = await logoutAction();

    if (result.success === true) {
      console.log('deslogado');
      navigate('/', { replace: true });
    } else if (result.success === false && result.error.scope === 'local') {
      setLocalError(result.error.message);
    }
  };

  return (
    <section className="logout content__logout">
      <h1 className="logout__title">Você quer desconectar da sua conta?</h1>

      {/* Se estiver em loading de logout, com checagem de autenticação concluída (true) */}
      {loading && authChecked && <Loader className="logout__loader">Desconectando...</Loader>}

      {localError && <Toast className="logout__toast" message={localError} />}

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
