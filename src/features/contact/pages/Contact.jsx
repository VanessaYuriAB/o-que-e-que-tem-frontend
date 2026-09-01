import './Contact.css';
import Button from '../../../shared/components/ui/button/Button.jsx';
import Input from '../../../shared/components/ui/input/Input.jsx';
import Textarea from '../../../shared/components/ui/textarea/Textarea.jsx';
import { useState } from 'react';
import useAuthStore from '../../../store/useAuthStore.js';
import useContact from '../hooks/useContact.js';
import { useShallow } from 'zustand/react/shallow';
import Toast from '../../../shared/components/ui/toast/Toast.jsx';

function Contact() {
  const { sendMsg, loading, error, success } = useContact();

  const { user, globalError } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      globalError: state.globalError,
    }))
  );

  const [formData, setFormData] = useState({
    userName: user?.userName ?? '',
    email: user?.email ?? '',
    tel: user?.tel ?? '',
    message: '',
    method: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleContact = async (data) => {
    const result = await sendMsg(data);

    if (result.success === true) {
      setFormData({
        userName: user?.userName ?? '',
        email: user?.email ?? '',
        tel: user?.tel ?? '',
        message: '',
        method: '',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleContact(formData);
  };

  return (
    <section className="contact content__contact">
      <h1 className="contact__title">Fale conosco</h1>
      <form className="contact__form" name="contact" onSubmit={handleSubmit} /*noValidate*/>
        <fieldset className="contact__fieldset">
          <legend className="contact__legend">Seus dados</legend>
          <div className="contact__input-box">
            <label className="contact__label" htmlFor="userName">
              Nome:
            </label>
            <Input
              className="contact__input contact__input_space"
              type="text"
              id="userName"
              name="userName"
              pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
              title="Seu nome: não são permitidos '<' e '>'."
              placeholder="Seu nome completo"
              value={formData.userName}
              onChange={handleChange}
              autoFocus
              required
            />
          </div>
          <div className="contact__input-box">
            <label className="contact__label" htmlFor="email">
              E-mail:
            </label>
            <Input
              className="contact__input contact__input_space"
              type="email"
              id="email"
              name="email"
              pattern="^[a-zA-Z0-9_.\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
              title="E-mail válido: contento apenas letras, números, sublinhados, pontos ou hífens."
              placeholder="exemplo@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact__input-box">
            <label className="contact__label" htmlFor="tel">
              WhatsApp:
            </label>
            <Input
              className="contact__input"
              type="tel"
              id="tel"
              name="tel"
              inputMode="numeric"
              minLength={14}
              maxLength={15}
              pattern="^\([1-9]{2}\)\s[0-9]?[0-9]{4}-[0-9]{4}$"
              title="Fixo ou celular. Formato: (xx) xxxxx-xxxx."
              placeholder="(XX) XXXXX-XXXX"
              value={formData.tel}
              onChange={handleChange}
              required
            />
          </div>
        </fieldset>
        <fieldset className="contact__fieldset">
          <legend className="contact__legend">Sua mensagem</legend>
          <div className="contact__textarea-box">
            <label className="contact__label" htmlFor="message">
              Costumamos responder rápido :)
            </label>
            <Textarea
              className="contact__textarea"
              id="message"
              name="message"
              pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
              title="Sua mensagem."
              placeholder="Deixa aqui sua mensagem para gente. Não é permitido o uso de '<' e '>', por questões de segurança."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
        </fieldset>
        <fieldset className="contact__fieldset contact__fieldset_radio">
          <legend className="contact__legend">Como prefere que retornemos?</legend>
          <div className="contact__input-box contact__input-box_radio">
            <label className="contact__label contact__label_radio" htmlFor="email-radio">
              E-mail
            </label>
            <Input
              className="contact__input"
              type="radio"
              id="email-radio"
              name="method"
              value="email-radio"
              checked={formData.method === 'email-radio'}
              onChange={handleChange}
            />
          </div>
          <div className="contact__input-box contact__input-box_radio">
            <label className="contact__label contact__label_radio" htmlFor="tel-radio">
              WhatsApp
            </label>
            <Input
              className="contact__input"
              type="radio"
              id="tel-radio"
              name="method"
              value="tel-radio"
              checked={formData.method === 'tel-radio'}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {(error || globalError || success) && (
          <Toast
            className="contact__error-toast"
            message={error ? error.message : globalError ? globalError.message : success}
          />
        )}

        <Button className="contact__button" type="submit">
          {loading ? 'Enviando mensagem...' : 'Enviar'}
        </Button>
      </form>
    </section>
  );
}

export default Contact;
