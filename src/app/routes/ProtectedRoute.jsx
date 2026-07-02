import PropTypes from 'prop-types';
import UnauthorizedRoute from '../../pages/unauthorized-route/UnauthorizedRoute.jsx';
import useAuthStore from '../../store/useAuthStore.js';

function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);

  return user ? children : <UnauthorizedRoute />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
