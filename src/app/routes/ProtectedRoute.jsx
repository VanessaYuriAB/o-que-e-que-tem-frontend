import PropTypes from 'prop-types';
import UnauthorizedRoute from '../../pages/unauthorized-route/UnauthorizedRoute.jsx';
import useAuthStore from '../../store/useAuthStore.js';
import { useShallow } from 'zustand/react/shallow';
import Loader from '../../shared/components/ui/loader/Loader.jsx';

function ProtectedRoute({ children }) {
  const { user, loading, authChecked } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      loading: state.loading,
      authChecked: state.authChecked,
    }))
  );

  // Espera o refresh terminar, com checagem de autenticação em andamento (false)
  if (loading && !authChecked) {
    return <Loader>Validando credenciais...</Loader>;
  }

  return user ? children : <UnauthorizedRoute />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
