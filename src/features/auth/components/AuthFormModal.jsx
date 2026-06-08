import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../../shared/components/ui/button/Button.jsx';

import './AuthFormModal.css';

function AuthFormModal({ children }) {
  const navigate = useNavigate();

  return (
    <div className="auth-form-modal">
      <div className="auth-form-modal__background">
        <div className="auth-form-modal__box">
          <Button className="auth-form-modal__btn" onClick={() => navigate(-1)}>
            X
          </Button>
          <div className="auth-form-modal__form-box">{children}</div>
        </div>
      </div>
    </div>
  );
}

AuthFormModal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthFormModal;
