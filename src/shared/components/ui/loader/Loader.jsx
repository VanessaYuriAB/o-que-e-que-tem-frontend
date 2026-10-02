import PropTypes from 'prop-types';
import styles from './Loader.module.css';

function Loader({ children = '', className = '' }) {
  return (
    <div className={`${styles.loader} ${className}`} role="status" aria-live="polite">
      {children && typeof children === 'string' && (
        <p className={styles.loader__text}>{children}</p>
      )}

      {!children && <p className={styles.loader__text}>Carregando...</p>}

      {children && typeof children !== 'string' && (
        <div className={styles.loader__content}>{children}</div>
      )}
    </div>
  );
}

Loader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Loader;
