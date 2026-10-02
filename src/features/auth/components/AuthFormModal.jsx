import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../../shared/components/ui/button/Button.jsx';
import styles from './AuthFormModal.module.css';

function AuthFormModal({ children }) {
  const navigate = useNavigate();

  return (
    <div className={styles['auth-form-modal']}>
      <div className={styles['auth-form-modal__background']}>
        <div className={styles['auth-form-modal__box']}>
          <Button className={styles['auth-form-modal__button']} onClick={() => navigate(-1)}>
            X
          </Button>
          <div className={styles['auth-form-modal__form-box']}>{children}</div>
        </div>
      </div>
    </div>
  );
}

AuthFormModal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthFormModal;
