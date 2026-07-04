import AuthFormModal from '../../components/AuthFormModal.jsx';
import Button from '../../../../shared/components/ui/button/Button.jsx';
import Input from '../../../../shared/components/ui/input/Input.jsx';
import useAuthStore from '../../../../store/useAuthStore.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { User1 } from '../../../../mocks/fakeAuthDb.js';
import Toast from '../../../../shared/components/ui/toast/Toast.jsx';
import Loader from '../../../../shared/components/ui/loader/Loader.jsx';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import '../../styles/auth-form.css';

function Login() {
  const [data, setData] = useState(User1);
  // { email: '', tel: '', password: '' }

  const [localError, setLocalError] = useState(null);

  const navigate = useNavigate();

  const location = useLocation();

  const { loginAction, loading, globalError } = useAuthStore(
    useShallow((state) => ({
      loginAction: state.loginAction,
      loading: state.loading,
      globalError: state.globalError,
    }))
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (data) => {
    if (data.email === '' || data.password === '') {
      return;
    }

    const result = await loginAction(data);

    // Se chegou aqui, login ok e cookie (httpOnly) setado pelo backend > Sucesso: cookie já foi definido automaticamente > credentials: 'include' na apiFetch
    // Front não vê o token, só o sucesso

    if (result.success === true) {
      console.log('logado');

      const from = location.state?.from;
      const redirectPath = from ? `${from.pathname}${from.search}${from.hash}` : '/profile'; // preserva a rota completa originalmente acessada, incluindo query params (?page=2) e âncoras (#section) e o usuário volta exatamente para onde estava

      navigate(redirectPath, { replace: true });
    } else if (result.success === false && result.error.scope === 'local') {
      setLocalError(result.error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(data);
  };

  return (
    <AuthFormModal>
      <form className="form-login auth-form" name="login" onSubmit={handleSubmit} noValidate>
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
              placeholder="Digite seu e-mail cadastrado"
              value={data.email}
              onChange={handleChange}
              autoFocus
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
              /*pattern="^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$"*/
              title="Fixo ou celular. Formato: (xx) xxxx-xxxx."
              placeholder="Digite seu telefone cadastrado, no formato: (xx) xxxx-xxxx"
              value={data.tel}
              onChange={handleChange}
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
              value={data.password}
              onChange={handleChange}
              required
            />
          </label>
        </fieldset>

        {loading && (
          <Loader className="form-login__loader auth-form__loader">
            Enviando dados de login...
          </Loader>
        )}

        {localError && (
          <Toast className="form-login__toast auth-form__toast" message={localError} />
        )}

        {globalError && (
          <Toast className="form-login__toast auth-form__toast" message={globalError.message} />
        )}

        <div className="form-login__button-box">
          <Button className="form-login__button" type="submit">
            ENVIAR
          </Button>
        </div>
      </form>
    </AuthFormModal>
  );
}

export default Login;
