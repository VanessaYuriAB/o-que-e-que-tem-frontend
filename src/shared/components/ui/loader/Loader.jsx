import PropTypes from 'prop-types';
import './Loader.css';

function Loader({ children }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <p className="loader__content">{children ? children : 'Carregando...'}</p>
    </div>
  );
}

Loader.propTypes = {
  children: PropTypes.string,
};

export default Loader;
