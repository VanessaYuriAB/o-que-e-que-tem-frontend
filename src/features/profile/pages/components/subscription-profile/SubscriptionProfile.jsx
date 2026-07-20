import Button from '../../../../../shared/components/ui/button/Button.jsx';
import Input from '../../../../../shared/components/ui/input/Input.jsx';
import { useState } from 'react';
import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import useAuthStore from '../../../../../store/useAuthStore.js';
import { useShallow } from 'zustand/react/shallow';
import '../../../styles/profile-form.css';
import './SubscriptionProfile.css';

/* CASO SEJA ASSINANTE, RENDERIZAR PERFIL DE ASSINATURA - CASO NÃO, RENDERIZAR REDIRECIONAMENTO PARA ASSINATURA */

function SubscriptionProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const { user, loading, globalError } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      loading: state.loading,
      globalError: state.globalError,
    }))
  );

  const [formData, setFormData] = useState({
    status: '',
    begin: '',
    end: '',
    daysOn: '',
    method: '',
    next: '',
  });

  const [isActive, setIsActive] = useState(user.subscriptionStatus);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Diferenciação dos envios
    const action = event.nativeEvent.submitter.value;

    if (action === 'send') {
      // Enviar
      // ...

      // Se erro local, seta toast e retorna
      // setLocalError('Erro local');
      // return;

      // Se bem sucedido, reativa 'disabled'
      setConfirmAction('Assinatura atualizada');
      setIsEditing(false);
    } else if (action === 'pause') {
      // Pausar

      // Limpa msgs de Toasts
      setLocalError(null);
      setConfirmAction(null);

      // ...

      // Se erro local, seta toast e retorna
      // setLocalError('Erro local');
      // return;

      // Se bem sucedido, desativa 'isActive'
      setConfirmAction('Assinatura pausada');
      setIsActive(false); // alterar user.subscriptionStatus !
    } else if (action === 'retake') {
      // Retomar

      // Limpa msgs de Toasts
      setLocalError(null);
      setConfirmAction(null);

      // ...

      // Se erro local, seta toast e retorna
      // setLocalError('Erro local');
      // return;

      // Se bem sucedido, ativa 'isActive'
      setConfirmAction('Assinatura retomada');
      setIsActive(true); // alterar user.subscriptionStatus !
    }
  };

  return (
    <>
      {user.subscription ? (
        <form
          className="subscription-form profile__subscription-form profile-form"
          name="profile-subscription"
          onSubmit={handleSubmit} /*noValidate*/
        >
          <fieldset className="subscription-form__field profile-form__field">
            <h3
              className="subscription-form__title profile-form__title"
              title="O status da sua assinatura: on ou off."
            >
              Status:
            </h3>
            <div className="subscription-form__items-box">
              <div className="subscription-form__item-box">
                <label className="subscription-form__label profile-form__label" htmlFor="on">
                  On
                </label>
                <Input
                  className="subscription-form__input  profile-form__input"
                  type="radio"
                  id="on"
                  name="status"
                  value="on"
                  disabled
                />
              </div>
              <div className="subscription-form__item-box">
                <label
                  className="subscription-form__label profile-form__label"
                  htmlFor="drive-thru"
                >
                  Off
                </label>
                <Input
                  className="subscription-form__input  profile-form__input"
                  type="radio"
                  id="off"
                  name="status"
                  value="off"
                  disabled
                />
              </div>
            </div>

            <h3 className="subscription-form__title profile-form__title">Início:</h3>
            <label className="subscription-form__label profile-form__label" htmlFor="begin">
              <Input
                className="subscription-form__input profile-form__input"
                type="date"
                id="begin"
                name="begin"
                pattern=""
                title="A data de início da sua assinatura."
                value={formData.begin}
                disabled
              />
            </label>

            <h3 className="subscription-form__title profile-form__title">Fim:</h3>
            <label className="subscription-form__label profile-form__label" htmlFor="end">
              <Input
                className="subscription-form__input profile-form__input"
                type="date"
                id="end"
                name="end"
                pattern=""
                title="A data final de sua assinatura."
                value={formData.end}
                disabled
              />
            </label>
          </fieldset>

          <fieldset className="subscription-form__field profile-form__field">
            <h3
              className="subscription-form__title profile-form__title"
              title="Os dias da semana selecionados na sua assinatura."
            >
              Quais dias da semana:
            </h3>
            <div className="subscription-form__items-box subscription-form__items-box_days-on">
              <div className="subscription-form__item-box subscription-form__item-box_days-on">
                <label className="subscription-form__label profile-form__label" htmlFor="seg">
                  Segunda
                </label>
                <Input
                  className="subscription-form__input profile-form__input"
                  type="checkbox"
                  id="daysOn"
                  name="daysOn"
                  value="seg"
                  disabled={!isEditing}
                />
              </div>
              <div className="subscription-form__item-box subscription-form__item-box_days-on">
                <label className="subscription-form__label profile-form__label" htmlFor="ter">
                  Terça
                </label>
                <Input
                  className="subscription-form__input  profile-form__input"
                  type="checkbox"
                  id="daysOn"
                  name="daysOn"
                  value="ter"
                  disabled={!isEditing}
                />
              </div>
              <div className="subscription-form__item-box subscription-form__item-box_days-on">
                <label className="subscription-form__label profile-form__label" htmlFor="qua">
                  Quarta
                </label>
                <Input
                  className="subscription-form__input profile-form__input"
                  type="checkbox"
                  id="daysOn"
                  name="daysOn"
                  value="qua"
                  disabled={!isEditing}
                />
              </div>
              <div className="subscription-form__item-box subscription-form__item-box_days-on">
                <label className="subscription-form__label profile-form__label" htmlFor="qui">
                  Quinta
                </label>
                <Input
                  className="subscription-form__input  profile-form__input"
                  type="checkbox"
                  id="daysOn"
                  name="daysOn"
                  value="qui"
                  disabled={!isEditing}
                />
              </div>
              <div className="subscription-form__item-box subscription-form__item-box_days-on">
                <label className="subscription-form__label profile-form__label" htmlFor="sex">
                  Sexta
                </label>
                <Input
                  className="subscription-form__input  profile-form__input"
                  type="checkbox"
                  id="daysOn"
                  name="daysOn"
                  value="sex"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <h3
              className="subscription-form__title profile-form__title"
              title="A forma de entrega selecionada na sua assinatura."
            >
              Delivery ou drive-thru:
            </h3>
            <div className="subscription-form__items-box">
              <div className="subscription-form__item-box">
                <label className="subscription-form__label profile-form__label" htmlFor="delivery">
                  Delivery
                </label>
                <Input
                  className="subscription-form__input  profile-form__input"
                  type="radio"
                  id="delivery"
                  name="method"
                  value="delivery"
                  disabled={!isEditing}
                />
              </div>
              <div className="subscription-form__item-box">
                <label
                  className="subscription-form__label profile-form__label"
                  htmlFor="drive-thru"
                >
                  Drive-thru
                </label>
                <Input
                  className="subscription-form__input  profile-form__input"
                  type="radio"
                  id="drive-thru"
                  name="method"
                  value="drive-thru"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="subscription-form__field profile-form__field">
            <h3
              className="subscription-form__title profile-form__title"
              title="A data da próxima refeição."
            >
              Próxima entrega em:
            </h3>
            <label className="subscription-form__label profile-form__label" htmlFor="next">
              <Input
                className="subscription-form__input profile-form__input"
                type="date"
                id="next"
                name="next"
                pattern=""
                value={formData.next}
                disabled
              />
            </label>
          </fieldset>

          <p className="subscription-form__note">
            *Você pode alterar algumas escolhas na sua assinatura a qualquer momento e, também,
            pausá-la por um período máximo de 2 meses, uma vez ao ano.
          </p>

          {/* loader profile-form__loader */}

          {localError && (
            <Toast
              className="subscription-form__toast profile-form__toast"
              message={localError}
            ></Toast>
          )}

          {/* toast global profile-form__toast */}

          {confirmAction && (
            <Toast
              className="subscription-form__toast profile-form__toast"
              message={confirmAction}
            ></Toast>
          )}

          <div className="subscription-form__button-box">
            {!isEditing && (
              <>
                <Button
                  className="subscription-form__button profile-form__button"
                  type="button"
                  onClick={() => {
                    setLocalError(null);
                    setConfirmAction(null);
                    setIsEditing(true);
                  }}
                >
                  Editar
                </Button>

                {isActive ? (
                  <Button
                    className="subscription-form__button profile-form__button"
                    type="submit"
                    value="pause"
                    /*disabled={loading}*/
                  >
                    Pausar
                  </Button>
                ) : (
                  <Button
                    className="subscription-form__button profile-form__button"
                    type="submit"
                    value="retake"
                    /*disabled={loading}*/
                  >
                    Retomar
                  </Button>
                )}
              </>
            )}

            {isEditing && (
              <Button
                className="subscription-form__button profile-form__button"
                type="submit"
                value="send"
                /*disabled={loading}*/
              >
                Enviar
              </Button>
            )}
          </div>
        </form>
      ) : (
        <>
          <>Ainda não é um assinante?</>
          <> Faça agora sua assinatura :)</>
          <> Link</>
        </>
      )}
    </>
  );
}

export default SubscriptionProfile;
