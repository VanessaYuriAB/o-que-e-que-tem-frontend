import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './app/routes/AppRoutes.jsx';
import { useEffect } from 'react';
import useAuthStore from './store/useAuthStore.js';
import useCartStore from './store/useCartStore.js';
import { useShallow } from 'zustand/react/shallow';

function App() {
  const { refreshAction, user } = useAuthStore(
    useShallow((state) => ({
      refreshAction: state.refreshAction,
      user: state.user,
    }))
  );

  const syncCartStorageAction = useCartStore((state) => state.syncCartStorageAction);

  // Verifica usuário logado
  useEffect(() => {
    async function verifyUserSession() {
      await refreshAction();
    }

    verifyUserSession();
  }, [refreshAction]);

  // Seta persistência do carrinho
  useEffect(() => {
    async function setCartPersistence() {
      await syncCartStorageAction(user?._id);
    }

    setCartPersistence();
  }, [user?._id, syncCartStorageAction]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
