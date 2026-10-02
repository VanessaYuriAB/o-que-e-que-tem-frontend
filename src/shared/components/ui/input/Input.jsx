import PropTypes from 'prop-types';
import styles from './Input.module.css';

function Input({ placeholder, name, id, type, className = '', ...props }) {
  return (
    <input
      className={`${styles.input} ${className}`}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      {...props}
    />
  );
}

Input.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'tel', 'password']),
  className: PropTypes.string,
};

export default Input;
