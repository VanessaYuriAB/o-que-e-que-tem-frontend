import PropTypes from 'prop-types';
import './Textarea.css';

function Textarea({ placeholder, name, id, className = '', ...props }) {
  return (
    <textarea
      className={`textarea ${className}`}
      id={id}
      name={name}
      placeholder={placeholder}
      {...props}
    />
  );
}

Textarea.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default Textarea;
