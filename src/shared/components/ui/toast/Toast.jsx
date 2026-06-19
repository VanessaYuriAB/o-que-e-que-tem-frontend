import PropTypes from 'prop-types';
import './Toast.css';

function Toast({ message = '', children = '' }) {
  return (
    <div className="toast">
      <p className="toast__message">{message}</p>
      <div className="toast__content">{children}</div>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string,
  children: PropTypes.node,
};

export default Toast;
