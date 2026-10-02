import Button from '../../../../shared/components/ui/button/Button.jsx';
import Input from '../../../../shared/components/ui/input/Input.jsx';
import Textarea from '../../../../shared/components/ui/textarea/Textarea.jsx';
import { useState } from 'react';
import useAuthStore from '../../../../store/useAuthStore.js';
import useContact from '../../hooks/useContact.js';
import Toast from '../../../../shared/components/ui/toast/Toast.jsx';
import styles from './ContactForm.module.css';

function ContactForm() {
  const [confirmActionMsg, setConfirmActionMsg] = useState(null);

  const user = useAuthStore((state) => state.user);

  const [formData, setFormData] = useState({
    userName: user?.userName ?? '',
    email: user?.email ?? '',
    whatsapp: user?.tel ?? '',
    message: '',
    method: '',
  });

  const { sendMsg, loading, localError } = useContact();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleContact = async (data) => {
    const result = await sendMsg(data, user?._id);

    if (result.success === true) {
      setConfirmActionMsg(
        `Mensagem enviada :) Retornaremos em breve, pelo seu ${data.method === 'email' ? 'e-mail' : 'WhatsApp'}.`
      );

      setFormData({
        userName: user?.userName ?? '',
        email: user?.email ?? '',
        whatsapp: user?.tel ?? '',
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
    <form
      className={`${styles.form} ${styles.contact__form}`}
      name="contact"
      onSubmit={handleSubmit} /*noValidate*/
    >
      <fieldset className={styles.form__fieldset}>
        <legend className={styles.form__legend}>Seus dados</legend>
        <div className={styles['form__input-box']}>
          <label className={styles.form__label} htmlFor="userName">
            Nome:
          </label>
          <Input
            className={`${styles.form__input} ${styles.form__input_space}`}
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
        <div className={styles['form__input-box']}>
          <label className={styles.form__label} htmlFor="email">
            E-mail:
          </label>
          <Input
            className={`${styles.form__input} ${styles.form__input_space}`}
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
        <div className={styles['form__input-box']}>
          <label className={styles.form__label} htmlFor="whatsapp">
            WhatsApp:
          </label>
          <Input
            className={styles.form__input}
            type="tel"
            id="whatsapp"
            name="whatsapp"
            inputMode="numeric"
            minLength={14}
            maxLength={15}
            pattern="^\([1-9]{2}\)\s[0-9]?[0-9]{4}-[0-9]{4}$"
            title="Fixo ou celular. Formato: (xx) xxxxx-xxxx."
            placeholder="(XX) XXXXX-XXXX"
            value={formData.whatsapp}
            onChange={handleChange}
            required
          />
        </div>
      </fieldset>
      <fieldset className={styles.form__fieldset}>
        <legend className={styles.form__legend}>Sua mensagem</legend>
        <div className={styles['form__textarea-box']}>
          <label className={styles.form__label} htmlFor="message">
            Costumamos responder rápido :)
          </label>
          <Textarea
            className={styles.form__textarea}
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
      <fieldset className={`${styles.form__fieldset} ${styles.form__fieldset_radio}`}>
        <legend className={styles.form__legend}>Como prefere que retornemos?</legend>
        <div className={`${styles['form__input-box']} ${styles['form__input-box_radio']}`}>
          <label
            className={`${styles.form__label} ${styles.form__label_radio}`}
            htmlFor="email-radio"
          >
            E-mail
          </label>
          <Input
            className={styles.form__input}
            type="radio"
            id="email-radio"
            name="method"
            value="email"
            checked={formData.method === 'email'}
            onChange={handleChange}
          />
        </div>
        <div className={`${styles['form__input-box']} ${styles['form__input-box_radio']}`}>
          <label
            className={`${styles.form__label} ${styles.form__label_radio}`}
            htmlFor="whatsapp-radio"
          >
            WhatsApp
          </label>
          <Input
            className={styles.form__input}
            type="radio"
            id="whatsapp-radio"
            name="method"
            value="whatsapp"
            checked={formData.method === 'whatsapp'}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      {(confirmActionMsg || localError) && (
        <Toast
          className={styles.form__toast}
          message={confirmActionMsg ? confirmActionMsg : localError.message}
        />
      )}

      <Button className={styles.form__button} type="submit">
        {loading ? 'Enviando mensagem...' : 'Enviar'}
      </Button>
    </form>
  );
}

export default ContactForm;
