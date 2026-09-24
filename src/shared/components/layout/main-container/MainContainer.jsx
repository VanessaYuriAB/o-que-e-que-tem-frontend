import { Outlet } from 'react-router-dom';
import useAuthStore from '../../../../store/useAuthStore.js';
import Toast from '../../ui/toast/Toast.jsx';
import useCartStore from '../../../../store/useCartStore.js';
import Button from '../../ui/button/Button.jsx';
import './MainContainer.css';

function MainContainer() {
  const globalError = useAuthStore((state) => state.globalError);
  const syncCartError = useCartStore((state) => state.syncCartError);

  return (
    <main className="content page__content">
      {globalError && (
        <div className="content__toast-modal">
          <div className="content__toast-container">
            <Button className="content__toast-button" onClick={() => {}}>
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
