import PropTypes from 'prop-types';
import UnauthorizedRoute from '../../pages/unauthorized-route/UnauthorizedRoute.jsx';

function ProtectedRoute({ children }) {
  const isLoggedIn = false;

  return isLoggedIn ? children : <UnauthorizedRoute />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
