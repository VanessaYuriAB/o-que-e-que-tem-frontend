import './Loader.css';

function Loader() {
  return (
    <div className="loader" role="status" aria-live="polite">
      <p className="loader__content">Carregando...</p>
    </div>
  );
}

export default Loader;
