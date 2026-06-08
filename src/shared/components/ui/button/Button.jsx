import PropTypes from 'prop-types';
import './Button.css';

function Button({ children, type, className = '', ...props }) {
  return (
    <button className={`button ${className}`} type={type} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
