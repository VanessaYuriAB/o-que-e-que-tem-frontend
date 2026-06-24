import PropTypes from 'prop-types';
import './Toast.css';

function Toast({ message = '', children = '', className = '' }) {
  return (
    <div className={`toast ${className}`}>
      <p className="toast__message">{message}</p>
      <div className="toast__content">{children}</div>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Toast;
