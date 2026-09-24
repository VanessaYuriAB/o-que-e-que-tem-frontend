import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './app/routes/AppRoutes.jsx';
import { useEffect } from 'react';
import useAuthStore from './store/useAuthStore.js';
import useCartStore from './store/useCartStore.js';
import { useShallow } from 'zustand/react/shallow';
import Loader from './shared/components/ui/loader/Loader.jsx';

function App() {
  const { refreshAction, user, authChecked } = useAuthStore(
    useShallow((state) => ({
      refreshAction: state.refreshAction,
      user: state.user,
      authChecked: state.authChecked,
    }))
  );

  const syncCartStorageAction = useCartStore((state) => state.syncCartStorageAction);

  // App Bootstrap: verifica e hidrata sessão de usuário
  useEffect(() => {
    async function verifyUserSession() {
      await refreshAction('bootstrap');
    }

    verifyUserSession();
  }, [refreshAction]);

  // Seta persistência do carrinho certo, já verificado pelo migrateAnonymousCartAction
  useEffect(() => {
    if (!authChecked) return;

    async function setCartPersistence() {
      await syncCartStorageAction(user?._id);
    }

    setCartPersistence();
  }, [authChecked, user?._id, syncCartStorageAction]);

  // Loading do bootstrap
  if (!authChecked) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
