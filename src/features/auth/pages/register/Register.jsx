import AuthFormModal from '../../components/AuthFormModal.jsx';
import Button from '../../../../shared/components/ui/button/Button.jsx';
import Input from '../../../../shared/components/ui/input/Input.jsx';

import useAuthStore from '../../../../store/useAuthStore.js';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../../mocks/fakeAuthDb.js';
import Toast from '../../../../shared/components/ui/toast/Toast.jsx';

import '../../styles/auth-form.css';

function Register() {
  // Register.jsx — temporário, só para testar
  const { register, error } = useAuthStore();

  const navigate = useNavigate();

  if (error) {
    return <Toast message={error.message} />;
  }

  return (
    <AuthFormModal>
      <form className="form-register auth-form" name="register">
        <h1 className="form-register__title auth-form__title">Inscrever-se</h1>
        <fieldset className="form-register__field auth-form__field">
          <label className="form-register__label auth-form__label">
            Nome completo
            <Input
              className="form-register__input auth-form__input"
              type="text"
              id="name"
              name="name"
              pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
              title="Nome: não são permitidos '<' e '>'."
              placeholder="Digite seu nome completo"
              autoFocus
              required
            />
          </label>
          <label className="form-register__label auth-form__label">
            E-mail
            <Input
              className="form-register__input auth-form__input"
              type="email"
              id="email"
              name="email"
              pattern="^[a-zA-Z0-9_.\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
              title="E-mail válido: contento apenas letras, números, sublinhados, pontos ou hífens."
              placeholder="Digite um e-mail para contato"
              required
            />
          </label>
          <label className="form-register__label auth-form__label">
            Confirmação de e-mail
            <Input
              className="form-register__input auth-form__input"
              type="email"
              id="email-confirmation"
              name="email-confirmation"
              pattern="^[a-zA-Z0-9_.\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
              title="E-mail válido: contento apenas letras, números, sublinhados, pontos ou hífens."
              placeholder="Confirme seu e-mail"
              required
            />
          </label>
          <label className="form-register__label auth-form__label">
            Telefone
            <Input
              className="form-register__input auth-form__input"
              type="tel"
              id="tel"
              name="tel"
              minLength={14}
              maxLength={15}
              pattern="^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$"
              title="Fixo ou celular. Formato: (xx) xxxx-xxxx."
              placeholder="Digite seu telefone para contato, no formato: (XX) XXXX-XXXX"
              required
            />
          </label>
          <div className="form-register__line auth-form__line"></div>
          <label className="form-register__label auth-form__label">
            Senha
            <Input
              className="form-register__input auth-form__input"
              type="password"
              id="password"
              name="password"
              minLength={8}
              pattern="^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$"
              title="Senha: mínimo 8 caracteres - pelo menos, uma letra minúscula e um número (maiúsculas tbm são permitidas)."
              placeholder="Digite uma senha para sua conta"
              required
            />
          </label>
          <label className="form-register__label auth-form__label">
            Confirmação de senha
            <Input
              className="form-register__input auth-form__input"
              type="password"
              id="password-confirmation"
              name="password-confirmation"
              pattern="^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$"
              title="Senha: mínimo 8 caracteres - pelo menos, uma letra minúscula e um número (maiúsculas tbm são permitidas)."
              placeholder="Confirme sua senha"
              required
            />
          </label>
        </fieldset>
        <div className="form-register__button-box">
          <Button type="submit">ENVIAR</Button>
        </div>

        {/* botão temporário*/}
        <button
          onClick={async () => {
            const result = await register(User);

            if (result.success === true) {
              console.log('cadastrado');
              navigate('/login');
            }
          }}
        >
          Testar cadastro
        </button>
        {/* botão temporário*/}
      </form>
    </AuthFormModal>
  );
}

export default Register;
