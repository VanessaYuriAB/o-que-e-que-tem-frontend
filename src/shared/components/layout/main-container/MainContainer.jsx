import { Outlet } from 'react-router-dom';
import useAuthStore from '../../../../store/useAuthStore.js';
import Toast from '../../ui/toast/Toast.jsx';
import useCartStore from '../../../../store/useCartStore.js';
import './MainContainer.css';

function MainContainer() {
  const refreshError = useAuthStore((state) => state.refreshError);
  const syncCartError = useCartStore((state) => state.syncCartError);

  return (
    <main className="content page__content">
      {refreshError && (
        <Toast
          className="content__toast"
          message={`Não foi possível verificar a sua sessão. ${refreshError.message}`}
        />
      )}

      {syncCartError && (
        <Toast
          className="content__toast"
          message="Não foi possível ajustar os dados para o carrinho. Algumas funcionalidades de compra podem ficar indisponíveis. Tente recarregar a página."
        />
      )}

      <Outlet />
    </main>
  );
}

export default MainContainer;
