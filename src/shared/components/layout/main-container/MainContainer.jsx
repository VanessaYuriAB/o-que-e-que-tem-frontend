import { Outlet } from 'react-router-dom';
import useAuthStore from '../../../../store/useAuthStore.js';
import Toast from '../../ui/toast/Toast.jsx';
import useCartStore from '../../../../store/useCartStore.js';
import Button from '../../ui/button/Button.jsx';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import './MainContainer.css';

function MainContainer() {
  const { globalError, setGlobalErrorAction } = useAuthStore(
    useShallow((state) => ({
      globalError: state.globalError,
      setGlobalErrorAction: state.setGlobalErrorAction,
    }))
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setGlobalErrorAction(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setGlobalErrorAction]);

  const syncCartError = useCartStore((state) => state.syncCartError);

  return (
    <main className="content page__content">
      {globalError && (
        <div className="content__toast-modal">
          <div className="content__toast-container">
            <Button className="content__toast-button" onClick={() => setGlobalErrorAction(null)}>
              X
            </Button>
            <Toast
              className="content__toast content__toast_global"
              message={
                globalError.source === 'refresh'
                  ? `Não foi possível verificar a sua sessão. ${globalError.message}`
                  : globalError.message
              }
            />
          </div>
        </div>
      )}

      {syncCartError && (
        <Toast
          className="content__toast content__toast_sync-cart"
          message="Não foi possível ajustar os dados para o carrinho. Algumas funcionalidades de compra podem ficar indisponíveis. Tente recarregar a página."
        />
      )}

      <Outlet />
    </main>
  );
}

export default MainContainer;
