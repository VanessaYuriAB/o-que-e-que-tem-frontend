import PropTypes from 'prop-types';
import styles from './Toast.module.css';

function Toast({ message = '', children = '', className = '' }) {
  return (
    <div className={`${styles.toast} ${className}`} role="alert" aria-live="assertive">
      {message && <p className={styles.toast__message}>{message}</p>}
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
