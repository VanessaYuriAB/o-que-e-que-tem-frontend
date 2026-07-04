import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuthStore from '../../store/useAuthStore';

function PublicRoute({ children }) {
  const location = useLocation();
  const from = location.state?.from;
  const redirectPath = from ? `${from.pathname}${from.search}${from.hash}` : '/profile'; // reconstrói a URL original (pathname + search + hash) e o usuário volta exatamente para onde estava

  const user = useAuthStore((state) => state.user);

  return user ? <Navigate to={redirectPath} replace /> : children;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
