import Button from '../../../../../shared/components/ui/button/Button.jsx';
import useAuthStore from '../../../../../store/useAuthStore.js';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Loader from '../../../../../shared/components/ui/loader/Loader.jsx';
import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import Input from '../../../../../shared/components/ui/input/Input.jsx';
import Textarea from '../../../../../shared/components/ui/textarea/Textarea.jsx';
import './UserProfile.css';
import '../../../styles/profile-form.css';

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [localError, setLocalError] = useState(null);

  const { user, updateUserAction, loading, globalError } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      updateUserAction: state.updateUserAction,
      loading: state.loading,
      globalError: state.globalError,
    }))
  );

  const [formData, setFormData] = useState({
    userName: user.userName ?? '',
    email: user.email ?? '',
    tel: user.tel ?? '',
    address: user.address ?? '',
    number: user.number ?? '',
    complement: user.complement ?? '',
    district: user.district ?? '',
    cep: user.cep ?? '',
    infoText: user.infoText ?? '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (data) => {
    // Envia dados de atualização e seta perfil
    const result = await updateUserAction(data);

    // Se o fetch não for bem sucedido e o erro for local, define msg de erro
    if (result.success === false && result.error.scope === 'local') {
      setLocalError(result.error.message);
    }

    // Reativa 'disabled', desativando edição e voltando para botão 'Editar'
    setIsEditing(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate(formData);
  };

  return (
    <form
      className="user-form profile__user-form profile-form"
      name="profile-form"
      onSubmit={handleSubmit} /*noValidate*/
    >
      <label className="user-form__label profile-form__label" htmlFor="userName">
        Nome completo:
      </label>
      <Input
        className="user-form__input profile-form__input"
        type="text"
        id="userName"
        name="userName"
        pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
        title="Seu nome: não são permitidos '<' e '>'."
        value={formData.userName}
        onChange={handleChange}
        disabled={!isEditing}
      />
      <label className="user-form__label profile-form__label" htmlFor="email">
        E-mail:
      </label>
      <Input
        className="user-form__input profile-form__input"
        type="email"
        id="email"
        name="email"
        pattern="^[a-zA-Z0-9_.\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
        title="E-mail válido: contento apenas letras, números, sublinhados, pontos ou hífens."
        value={formData.email}
        onChange={handleChange}
        disabled={!isEditing}
      />
      <label className="user-form__label profile-form__label" htmlFor="tel">
        Telefone:
      </label>
      <Input
        className="user-form__input profile-form__input"
        type="tel"
        id="tel"
        name="tel"
        minLength={14}
        maxLength={15}
        pattern="^\([1-9]{2}\)\s[0-9]?[0-9]{4}-[0-9]{4}$"
        title="Fixo ou celular. Formato: (xx) xxxxx-xxxx."
        value={formData.tel}
        onChange={handleChange}
        disabled={!isEditing}
      />
      <label className="user-form__label profile-form__label" htmlFor="address">
        Endereço:
      </label>
      <Input
        className="user-form__input profile-form__input"
        type="text"
        id="address"
        name="address"
        pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
        title="Seu endereço para delivery: não são permitidos '<' e '>'."
        value={formData.address}
        onChange={handleChange}
        disabled={!isEditing}
      />
      <label className="user-form__label profile-form__label" htmlFor="number">
        nº:
      </label>
      <Input
        className="user-form__input profile-form__input"
        type="text"
        id="number"
        name="number"
        pattern="^[a-zA-Z0-9\s]*$" /* apenas números, letras e espaços em branco */
        title="O número do seu endereço para delivery: apenas números e/ou letras."
        value={formData.number}
        onChange={handleChange}
        disabled={!isEditing}
      />
      <label className="user-form__label profile-form__label" htmlFor="complement">
        Complemento:
      </label>
      <Input
        className="user-form__input profile-form__input"
        type="text"
        id="complement"
        name="complement"
        pattern="^[a-zA-Z0-9\s]*$" /* apenas números, letras e espaços em branco */
        title="O complemento do seu endereço para delivery: apenas números e/ou letras."
        value={formData.complement}
        onChange={handleChange}
        disabled={!isEditing}
      />
      <label className="user-form__label profile-form__label" htmlFor="district">
        Bairro:
      </label>
      <Input
        className="user-form__input profile-form__input"
        type="text"
        id="district"
        name="district"
        pattern="^[a-zA-Z0-9\s]*$" /* apenas números, letras e espaços em branco */
        title="O bairro do seu endereço para delivery: apenas números e/ou letras."
        value={formData.district}
        onChange={handleChange}
        disabled={!isEditing}
      />
      <label className="user-form__label profile-form__label" htmlFor="cep">
        CEP:
      </label>
      <Input
        className="user-form__input profile-form__input"
        type="text"
        id="cep"
        name="cep"
        pattern="^[0-9]{5}-[0-9]{3}$" /* apenas números e traço */
        title="O CEP do seu endereço para delivery: apenas números e traço."
        value={formData.cep}
        onChange={handleChange}
        disabled={!isEditing}
      />

      <label className="user-form__label profile-form__label" htmlFor="infoText">
        Informação(ões) Adicional(ais):
      </label>
      <Textarea
        className="user-form__textarea profile-form__textarea"
        id="infoText"
        name="infoText"
        pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
        title="Informações relevantes, exemplo: ponto de referência ou contato para entrega (nome e RG/CPF)."
        placeholder="Por exemplo, um ponto de referência ou um contato oficial para entrega (nome e RG/CPF)."
        value={formData.infoText}
        onChange={handleChange}
        disabled={!isEditing}
      />

      {loading && (
        <Loader className="user-form__loader profile-form__loader ">
          Atualizando dados de perfil...
        </Loader>
      )}

      {globalError && !isEditing && (
        <Toast className="user-form__toast profile-form__toast" message={globalError.message} />
      )}

      {localError && (
        <Toast className="user-form__toast profile-form__toast" message={localError} />
      )}

      <div className="user-form__button-box">
        {!isEditing && (
          <Button
            className="user-form__button profile-form__button"
            type="button"
            onClick={() => {
              setLocalError(null);
              setIsEditing(true); // desativa atributo 'disabled', habilitando edição e alternando para botão 'Enviar'
            }}
          >
            Editar
          </Button>
        )}

        {isEditing && (
          <Button
            className="user-form__button profile-form__button"
            type="submit"
            disabled={loading}
          >
            Enviar
          </Button>
        )}
      </div>
    </form>
  );
}

export default UserProfile;
