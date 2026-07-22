import Button from '../../../../../shared/components/ui/button/Button.jsx';
import Input from '../../../../../shared/components/ui/input/Input.jsx';
import { useState } from 'react';
import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import useAuthStore from '../../../../../store/useAuthStore.js';
import { useShallow } from 'zustand/react/shallow';
import { Link } from 'react-router-dom';
import Loader from '../../../../../shared/components/ui/loader/Loader.jsx';
import '../../../styles/profile-form.css';
import './SubscriptionProfile.css';

function SubscriptionProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const { user, updateSubscriptionAction, loading, globalError } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      updateSubscriptionAction: state.updateSubscriptionAction,
      loading: state.loading,
      globalError: state.globalError,
    }))
  );

  console.log('Usuário em SubscriptionProfile:', user);

  const [formData, setFormData] = useState({
    daysOn: user?.subscriptionDetails?.daysOn ?? [],
    method: user?.subscriptionDetails?.method ?? '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'daysOn') {
      // concatena os novos valores dos checkboxs
    }

    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleUpdate = async (data, action) => {
    // Configura data para cada ação de envio
    const payload =
      action === 'pause' ? { status: false } : action === 'retake' ? { status: true } : data;

    // Envia dados de atualização e seta perfil
    const result = await updateSubscriptionAction(payload);

    // Se o fetch não for bem sucedido e o erro for local, define msg de erro
    if (result.success === false && result.error.scope === 'local') {
      setLocalError(result.error.message);
    }

    // Se o envio for de edição
    if (action === 'send') {
      setIsEditing(false);
    }

    // Se bem sucedido
    if (result.success === true) {
      setLocalError(null);

      if (action === 'send') {
        setConfirmAction('Assinatura atualizada');
      }

      if (action === 'pause') {
        setConfirmAction('Assinatura pausada');
      }

      if (action === 'retake') {
        setConfirmAction('Assinatura retomada');
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Diferenciação dos envios de dados (enviar, pausar ou retomar)
    const action = event.nativeEvent.submitter.value;

    handleUpdate(formData, action);
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
                    checked={user.subscriptionDetails.status === true}
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
                    checked={user.subscriptionDetails.status === false}
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
                    title="A data de início da sua assinatura."
                    value={user.subscriptionDetails.begin}
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
                    title="A data final de sua assinatura."
                    value={user.subscriptionDetails.end}
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
                    id="seg"
                    name="daysOn"
                    value="seg"
                    checked={formData.daysOn.includes('seg')}
                    onChange={handleChange}
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
                    id="ter"
                    name="daysOn"
                    value="ter"
                    checked={formData.daysOn.includes('ter')}
                    onChange={handleChange}
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
                    id="qua"
                    name="daysOn"
                    value="qua"
                    checked={formData.daysOn.includes('qua')}
                    onChange={handleChange}
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
                    id="qui"
                    name="daysOn"
                    value="qui"
                    checked={formData.daysOn.includes('qui')}
                    onChange={handleChange}
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
                    id="sex"
                    name="daysOn"
                    value="sex"
                    checked={formData.daysOn.includes('sex')}
                    onChange={handleChange}
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
                    checked={formData.method === 'delivery'}
                    onChange={handleChange}
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
                    checked={formData.method === 'drive-thru'}
                    onChange={handleChange}
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
                  value={user.subscriptionDetails.next}
                  disabled
                />
              </label>
            </div>
          </fieldset>

          <p className="subscription-form__note">
            *Você pode alterar algumas escolhas na sua assinatura a qualquer momento e, também,
            pausá-la por um período máximo de 2 meses, uma vez ao ano.
          </p>

          {loading && (
            <Loader className="subscription-form__loader profile-form__loader ">
              Atualizando configuração de assinatura...
            </Loader>
          )}

          {globalError && !isEditing && (
            <Toast
              className="subscription-form__toast profile-form__toast"
              message={globalError.message}
            />
          )}

          {localError && (
            <Toast
              className="subscription-form__toast profile-form__toast"
              message={localError}
            ></Toast>
          )}

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

                {user.subscriptionDetails.status === true ? (
                  <Button
                    className="subscription-form__button profile-form__button"
                    type="submit"
                    value="pause"
                    disabled={loading}
                  >
                    Pausar
                  </Button>
                ) : (
                  <Button
                    className="subscription-form__button profile-form__button"
                    type="submit"
                    value="retake"
                    disabled={loading}
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
                disabled={loading}
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
