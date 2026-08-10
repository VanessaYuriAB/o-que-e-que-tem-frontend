import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore.js';
import Loader from '../../shared/components/ui/loader/Loader.jsx';
import { useShallow } from 'zustand/react/shallow';

function SubscriptionRoute({ children }) {
  const { user, loading, authChecked } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      loading: state.loading,
      authChecked: state.authChecked,
    }))
  );

  // Espera o refresh terminar, com checagem de autenticação em andamento (false)
  if (loading && !authChecked) {
    return <Loader>Verificando perfil...</Loader>;
  }

  if (user?.subscription) {
    return <Navigate to="/profile/subscription-profile" replace />;
  }

  return children;
}

SubscriptionRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SubscriptionRoute;
