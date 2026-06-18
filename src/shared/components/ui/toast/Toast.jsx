import PropTypes from 'prop-types';
import './Toast.css';

function Toast({ message }) {
  return (
    <div className="toast">
      <p className="toast__content">{message}</p>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Toast;
