import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuthStore from '../../store/useAuthStore';

function PublicRoute({ children }) {
  const user = useAuthStore((state) => state.user);

  return user ? <Navigate to="/profile" replace /> : children;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
