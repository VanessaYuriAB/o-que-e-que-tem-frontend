import PropTypes from 'prop-types';
import './Toast.css';

function Toast({ message = '', children = '', className = '' }) {
  return (
    <div className={`toast ${className}`}>
      {message && <p className="toast__message">{message}</p>}
      {children && children}
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Toast;
