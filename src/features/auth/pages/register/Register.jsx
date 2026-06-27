import AuthFormModal from '../../components/AuthFormModal.jsx';
import Button from '../../../../shared/components/ui/button/Button.jsx';
import Input from '../../../../shared/components/ui/input/Input.jsx';

import useAuthStore from '../../../../store/useAuthStore.js';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../../mocks/fakeAuthDb.js';
import Toast from '../../../../shared/components/ui/toast/Toast.jsx';
import Loader from '../../../../shared/components/ui/loader/Loader.jsx';

import { useState } from 'react';

import '../../styles/auth-form.css';

function Register() {
  /* Hooks */

  const [localError, setLocalError] = useState(null);

  const { register, loading, globalError } = useAuthStore();

  const navigate = useNavigate();

  /* Estados */

  const [data, setData] = useState(User);

  /* Handles */

  // Manipulador de entradas (inputs)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manipulador de registro (register)
  const handleRegister = async (data) => {
    if (data.email === data.confirmEmail && data.password === data.confirmPassword) {
      // Se email e senhas forem confirmados
      const result = await register(data);

      if (result.success === true) {
        console.log('cadastrado');
        navigate('/login');
      } else if (result.success === false && result.error.scope === 'local') {
        setLocalError(result.error.message);
      }
    } else {
      // Se email e senha não forem confirmados
      setLocalError('Email ou senha não correspondem.');
    }
  };

  // Manipulador de envio
  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegister(data);
  };

  return (
    <AuthFormModal>
      <form className="form-register auth-form" name="register" onSubmit={handleSubmit} noValidate>
        <h1 className="form-register__title auth-form__title">Inscrever-se</h1>
        <fieldset className="form-register__field auth-form__field">
          <label className="form-register__label auth-form__label">
            Nome completo
            <Input
              className="form-register__input auth-form__input"
              type="text"
              id="userName"
              name="userName"
              pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
              title="Seu nome: não são permitidos '<' e '>'."
              placeholder="Digite seu nome completo"
              value={data.userName}
              onChange={handleChange}
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
              value={data.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-register__label auth-form__label">
            Confirmação de e-mail
            <Input
              className="form-register__input auth-form__input"
              type="email"
              id="confirmEmail"
              name="confirmEmail"
              pattern="^[a-zA-Z0-9_.\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
              title="E-mail válido: contento apenas letras, números, sublinhados, pontos ou hífens."
              placeholder="Confirme seu e-mail"
              value={data.confirmEmail}
              onChange={handleChange}
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
              /*pattern="^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$"*/
              title="Fixo ou celular. Formato: (xx) xxxx-xxxx."
              placeholder="Digite seu telefone para contato, no formato: (XX) XXXX-XXXX"
              value={data.tel}
              onChange={handleChange}
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
              value={data.password}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-register__label auth-form__label">
            Confirmação de senha
            <Input
              className="form-register__input auth-form__input"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              pattern="^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$"
              title="Senha: mínimo 8 caracteres - pelo menos, uma letra minúscula e um número (maiúsculas tbm são permitidas)."
              placeholder="Confirme sua senha"
              value={data.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
        </fieldset>

        {loading && (
          <Loader className="form-register__loader auth-form__loader">Enviando inscrição...</Loader>
        )}

        {localError && (
          <Toast className="form-register__toast auth-form__toast" message={localError} />
        )}

        {globalError && (
          <Toast className="form-register__toast auth-form__toast" message={globalError.message} />
        )}

        <div className="form-register__button-box">
          <Button className="form-register__button" type="submit">
            ENVIAR
          </Button>
        </div>
      </form>
    </AuthFormModal>
  );
}

export default Register;
