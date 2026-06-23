import AuthFormModal from '../../components/AuthFormModal.jsx';
import Button from '../../../../shared/components/ui/button/Button.jsx';
import Input from '../../../../shared/components/ui/input/Input.jsx';

import useAuthStore from '../../../../store/useAuthStore.js';
import { useNavigate } from 'react-router-dom';
import { User1 } from '../../../../mocks/fakeAuthDb.js';
import Toast from '../../../../shared/components/ui/toast/Toast.jsx';

import '../../styles/auth-form.css';

function Login() {
  // Login.jsx — temporário, só para testar
  const { login, error } = useAuthStore();

  const navigate = useNavigate();

  if (error) {
    return <Toast message={error.message} />;
  }

  return (
    <AuthFormModal>
      <form className="form-login auth-form" name="login">
        <h1 className="form-login__title auth-form__title">Entrar</h1>
        <fieldset className="form-login__field auth-form__field">
          <label className="form-login__label auth-form__label">
            E-mail:
            <Input
              className="form-login__input auth-form__input"
              type="email"
              id="email"
              name="email"
              pattern="^[a-zA-Z0-9_.\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
              title="E-mail válido: contento apenas letras, números, sublinhados, pontos ou hífens."
              autoFocus
              placeholder="Digite seu e-mail cadastrado"
              required
            />
          </label>
          <label className="form-login__label auth-form__label">
            Telefone:
            <Input
              className="form-login__input auth-form__input"
              type="tel"
              id="tel"
              name="tel"
              minLength={14}
              maxLength={15}
              pattern="^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$"
              title="Fixo ou celular. Formato: (xx) xxxx-xxxx."
              placeholder="Digite seu telefone cadastrado, no formato: (xx) xxxx-xxxx"
              required
              /* ARRUMAR PATTERN */
            />
          </label>
          <div className="form-login__line auth-form__line"></div>
          <label className="form-login__label auth-form__label">
            Senha:
            <Input
              className="form-login__input auth-form__input"
              type="password"
              id="password"
              name="password"
              minLength={8}
              pattern="^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$"
              title="Senha: mínimo 8 caracteres - pelo menos, uma letra minúscula e um número (maiúsculas tbm são permitidas)."
              placeholder="Digite a senha da sua conta"
              required
            />
          </label>
        </fieldset>
        <div className="form-login__button-box">
          <Button type="submit">ENVIAR</Button>
        </div>

        {/* botão temporário*/}
        <button
          onClick={async () => {
            const result = await login(User1);

            if (result.success === true) {
              console.log('logado');
              navigate('/profile');
            }
          }}
        >
          Testar login
        </button>
        {/* botão temporário*/}
      </form>
    </AuthFormModal>
  );
}

export default Login;
