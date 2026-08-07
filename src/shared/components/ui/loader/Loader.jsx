import PropTypes from 'prop-types';
import './Loader.css';

function Loader({ children = '', className = '' }) {
  return (
    <div className={`loader ${className}`} role="status" aria-live="polite">
      {children && typeof children === 'string' && <p className="loader__text">{children}</p>}

      {!children && <p className="loader__text">Carregando...</p>}

      {children && typeof children !== 'string' && (
        <div className="loader__content">{children}</div>
      )}
    </div>
  );
}

Loader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Loader;
