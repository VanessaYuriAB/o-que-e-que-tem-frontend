import Button from '../../../../../shared/components/ui/button/Button.jsx';
import Input from '../../../../../shared/components/ui/input/Input.jsx';
import { useState } from 'react';
import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import useAuthStore from '../../../../../store/useAuthStore.js';
import { useShallow } from 'zustand/react/shallow';
import { Link } from 'react-router-dom';
import '../../../styles/profile-form.css';
import './SubscriptionProfile.css';

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
    status: user?.subscriptionStatus ?? '',
    begin: user?.subscriptionDetails?.begin ?? '',
    end: user?.subscriptionDetails?.end ?? '',
    daysOn: user?.subscriptionDetails?.daysOn ?? '',
    method: user?.subscriptionDetails?.method ?? '',
    next: user?.subscriptionDetails?.next ?? '',
  });

  const [isActive, setIsActive] = useState(user?.subscriptionStatus ?? '');

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
    <div className="profile__subscription">
      {/* Se usuário for assinante, renderiza página de perfil de assinatura; se não, renderiza link de redirecionamento para assinatura */}

      {user.subscription ? (
        <form
          className="subscription-form profile__subscription-form profile-form"
          name="profile-subscription"
          onSubmit={handleSubmit} /*noValidate*/
        >
          <fieldset className="subscription-form__field profile-form__field">
            <div className="subscription-form__status-box">
              <h3
                className="subscription-form__title profile-form__title"
                title="O status da sua assinatura: on ou off."
              >
                Status:
              </h3>
              <div className="subscription-form__on-off-box">
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
                    checked={formData.status}
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
                    checked={!formData.status}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="subscription-form__begin-end-box">
              <div className="subscription-form__item-box">
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
              </div>

              <div className="subscription-form__item-box">
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
              </div>
            </div>
          </fieldset>

          <fieldset className="subscription-form__field profile-form__field">
            <div className="subscription-form__days-on-box">
              <h3
                className="subscription-form__title profile-form__title"
                title="Os dias da semana selecionados na sua assinatura."
              >
                Dias da semana:
              </h3>
              <div className="subscription-form__days-box">
                <div className="subscription-form__item-box subscription-form__item-box_days">
                  <label className="subscription-form__label profile-form__label" htmlFor="seg">
                    Segunda
                  </label>
                  <Input
                    className="subscription-form__input profile-form__input"
                    type="checkbox"
                    id="daysOn"
                    name="daysOn"
                    value="seg"
                    checked={formData.daysOn.includes('seg')}
                    disabled={!isEditing}
                  />
                </div>
                <div className="subscription-form__item-box subscription-form__item-box_days">
                  <label className="subscription-form__label profile-form__label" htmlFor="ter">
                    Terça
                  </label>
                  <Input
                    className="subscription-form__input  profile-form__input"
                    type="checkbox"
                    id="daysOn"
                    name="daysOn"
                    value="ter"
                    checked={formData.daysOn.includes('ter')}
                    disabled={!isEditing}
                  />
                </div>
                <div className="subscription-form__item-box subscription-form__item-box_days">
                  <label className="subscription-form__label profile-form__label" htmlFor="qua">
                    Quarta
                  </label>
                  <Input
                    className="subscription-form__input profile-form__input"
                    type="checkbox"
                    id="daysOn"
                    name="daysOn"
                    value="qua"
                    checked={formData.daysOn.includes('qua')}
                    disabled={!isEditing}
                  />
                </div>
                <div className="subscription-form__item-box subscription-form__item-box_days">
                  <label className="subscription-form__label profile-form__label" htmlFor="qui">
                    Quinta
                  </label>
                  <Input
                    className="subscription-form__input  profile-form__input"
                    type="checkbox"
                    id="daysOn"
                    name="daysOn"
                    value="qui"
                    checked={formData.daysOn.includes('qui')}
                    disabled={!isEditing}
                  />
                </div>
                <div className="subscription-form__item-box subscription-form__item-box_days">
                  <label className="subscription-form__label profile-form__label" htmlFor="sex">
                    Sexta
                  </label>
                  <Input
                    className="subscription-form__input  profile-form__input"
                    type="checkbox"
                    id="daysOn"
                    name="daysOn"
                    value="sex"
                    checked={formData.daysOn.includes('sex')}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="subscription-form__method-box">
              <h3
                className="subscription-form__title profile-form__title"
                title="A forma de entrega selecionada na sua assinatura."
              >
                Forma de entrega:
              </h3>
              <div className="subscription-form__delivery-drive-box">
                <div className="subscription-form__item-box">
                  <label
                    className="subscription-form__label profile-form__label"
                    htmlFor="delivery"
                  >
                    Delivery
                  </label>
                  <Input
                    className="subscription-form__input  profile-form__input"
                    type="radio"
                    id="delivery"
                    name="method"
                    value="delivery"
                    checked={formData.method.includes('delivery')}
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
                    checked={formData.method.includes('drive-thru')}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="subscription-form__field profile-form__field">
            <div className="subscription-form__next-box">
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
            </div>
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
        <div className="profile__subscription-box">
          <h3 className="profile__subscription-title">Ainda não é um assinante e quer ser?</h3>
          <Link className="profile__subscription-link link-to-button" to="/subscription">
            Assine agora :)
          </Link>
        </div>
      )}
    </div>
  );
}

export default SubscriptionProfile;
