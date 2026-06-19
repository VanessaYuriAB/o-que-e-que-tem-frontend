import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function PublicRoute({ children }) {
  const isLoggedIn = true;

  return isLoggedIn ? <Navigate to="/profile" replace /> : children;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
