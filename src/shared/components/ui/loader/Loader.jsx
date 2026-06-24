import PropTypes from 'prop-types';
import './Loader.css';

function Loader({ children = '', className = '' }) {
  return (
    <div className={`loader ${className}`} role="status" aria-live="polite">
      <p className="loader__content">{children ? children : 'Carregando...'}</p>
    </div>
  );
}

Loader.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
};

export default Loader;
