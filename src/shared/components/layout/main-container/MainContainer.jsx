import { Outlet } from 'react-router-dom';
import useAuthStore from '../../../../store/useAuthStore.js';
import Toast from '../../ui/toast/Toast.jsx';
import useCartStore from '../../../../store/useCartStore.js';
import './MainContainer.css';

function MainContainer() {
  const globalError = useAuthStore((state) => state.globalError);
  const syncCartError = useCartStore((state) => state.syncCartError);

  return (
    <main className="content page__content">
      {globalError && (
        <Toast
          className="content__toast content__toast_global"
          message={
            globalError.source === 'refresh'
              ? `Não foi possível verificar a sua sessão. ${globalError.message}`
              : globalError.message
          }
        />
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
