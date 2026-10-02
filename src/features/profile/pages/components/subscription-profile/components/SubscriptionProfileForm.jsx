import Button from '../../../../../../shared/components/ui/button/Button.jsx';
import Input from '../../../../../../shared/components/ui/input/Input.jsx';
import { useState } from 'react';
import Toast from '../../../../../../shared/components/ui/toast/Toast.jsx';
import Loader from '../../../../../../shared/components/ui/loader/Loader.jsx';
import useProfile from '../../../../hooks/useProfile.js';
import getNextDate from '../../../../../../shared/utils/nextSubscriptionDate.js';
import PropTypes from 'prop-types';
import profileFormStyles from '../../../../styles/profile-form.module.css';
import styles from './SubscriptionProfileForm.module.css';

function SubscriptionProfileForm({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [confirmActionMsg, setConfirmActionMsg] = useState(null);

  const { loading, localError, setLocalError, updateSubscription } = useProfile();

  const [formData, setFormData] = useState({
    daysOn: user?.subscriptionDetails?.daysOn ?? [],
    schedules: user?.subscriptionDetails?.schedules ?? {},
    method: user?.subscriptionDetails?.method ?? '',
  });

  const period =
    user?.subscriptionDetails?.howLong === 'two'
      ? 'Dois meses'
      : user?.subscriptionDetails?.howLong === 'four'
        ? 'Quatro meses'
        : user?.subscriptionDetails?.howLong === 'six'
          ? 'Seis meses'
          : 'Um ano';

  const formatDate = (dateValue) => {
    const date = new Date(dateValue);
    // Verifica se a data é válida conferindo se o seu valor numérico não é NaN, para prevenção de crash (RangeError)
    return !isNaN(date.getTime()) ? date.toLocaleDateString('sv-SE') : '';
  };

  const beginDate = formatDate(user?.subscriptionDetails?.begin);
  const endDate = formatDate(user?.subscriptionDetails?.end);

  const pay =
    user?.subscriptionDetails?.pay === 'pix'
      ? 'PIX'
      : user?.subscriptionDetails?.pay === 'debito'
        ? 'Cartão de débito'
        : 'Cartão de crédito';

  const nextMealAt = getNextDate(
    user?.subscriptionDetails?.daysOn || [],
    user?.subscriptionDetails?.schedules || {}
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Se o input for do tipo checkbox, o campo daysOn, por aceitar múltiplos valores, é atualizado de forma diferente: adicionando o valor selecionado ao array com spread (...) ou removendo-o com filter(), devolvendo um novo array contendo apenas os dias diferentes do valor desmarcado - ambos de acordo com o estado de checked
    // E 'schedules' ajustado conforme 'daysOn'
    if (type === 'checkbox') {
      setFormData((prevData) => {
        const daysOn = checked
          ? [...prevData.daysOn, value]
          : prevData.daysOn.filter((day) => day !== value);

        const schedules = { ...prevData.schedules };

        if (!checked) {
          delete schedules[value];
        }

        return {
          ...prevData,
          daysOn,
          schedules,
        };
      });

      return;
    }

    if (type === 'time') {
      setFormData((prevData) => ({
        ...prevData,
        schedules: {
          ...prevData.schedules,
          [name]: value,
        },
      }));

      return;
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
    const result = await updateSubscription(payload);

    if (result.success === true) {
      // Se bem sucedido, define msg de sucesso conforme action
      if (action === 'send') {
        setConfirmActionMsg('Assinatura atualizada');
      }

      if (action === 'pause') {
        setConfirmActionMsg('Assinatura pausada');
      }

      if (action === 'retake') {
        setConfirmActionMsg('Assinatura retomada');
      }
    }

    // Se o envio for de edição
    if (action === 'send') {
      setIsEditing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Diferenciação dos envios de dados (enviar, pausar ou retomar)
    const action = e.nativeEvent.submitter.value;

    handleUpdate(formData, action);
  };

  return (
    <form
      className={`${styles['subscription-form']} ${styles['profile__subscription-form']} ${profileFormStyles['profile-form']}`}
      name="profile-subscription"
      onSubmit={handleSubmit} /*noValidate*/
    >
      <fieldset
        className={`${styles['subscription-form__field']} ${profileFormStyles['profile-form__field']}`}
      >
        <div className={styles['subscription-form__status-box']}>
          <h3
            className={`${styles['subscription-form__title']} ${profileFormStyles['profile-form__title']}`}
            title="O status da sua assinatura: on ou off."
          >
            Status:
          </h3>
          <div className={styles['subscription-form__on-off-box']}>
            <div className={styles['subscription-form__item-box']}>
              <label
                className={`${styles['subscription-form__label']} ${profileFormStyles['profile-form__label']}`}
                htmlFor="on"
              >
                On
              </label>
              <Input
                className={`${styles['subscription-form__input']} ${profileFormStyles['profile-form__input']}`}
                type="radio"
                id="on"
                name="status"
                value="on"
                checked={user.subscriptionDetails.status === true}
                disabled
              />
            </div>

            <div className={styles['subscription-form__item-box']}>
              <label
                className={`${styles['subscription-form__label']} ${profileFormStyles['profile-form__label']}`}
                htmlFor="drive-thru"
              >
                Off
              </label>
              <Input
                className={`${styles['subscription-form__input']} ${profileFormStyles['profile-form__input']}`}
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

        <div className={styles['subscription-form__period-box']}>
          <h3
            className={`${styles['subscription-form__title']} ${profileFormStyles['profile-form__title']}`}
            title="O período assinado."
          >
            Período:
          </h3>
          <label
            className={`${styles['subscription-form__label']} ${profileFormStyles['profile-form__label']}`}
            htmlFor="period"
          >
            <Input
              className={`${styles['subscription-form__input']} ${profileFormStyles['profile-form__input']}`}
              type="text"
              id="period"
              name="period"
              defaultValue={period}
              disabled
            />
          </label>
        </div>

        <div className={styles['subscription-form__begin-end-box']}>
          <div className={styles['subscription-form__item-box']}>
            <h3
              className={`${styles['subscription-form__title']} ${profileFormStyles['profile-form__title']}`}
            >
              Início:
            </h3>
            <label
              className={`${styles['subscription-form__label']} ${profileFormStyles['profile-form__label']}`}
              htmlFor="begin"
            >
              <Input
                className={`${styles['subscription-form__input']} ${profileFormStyles['profile-form__input']}`}
                type="date"
                id="begin"
                name="begin"
                title="A data de início da sua assinatura."
                defaultValue={beginDate}
                disabled
              />
            </label>
          </div>

          <div className={styles['subscription-form__item-box']}>
            <h3
              className={`${styles['subscription-form__title']} ${profileFormStyles['profile-form__title']}`}
            >
              Fim:
            </h3>
            <label
              className={`${styles['subscription-form__label']} ${profileFormStyles['profile-form__label']}`}
              htmlFor="end"
            >
              <Input
                className={`${styles['subscription-form__input']} ${profileFormStyles['profile-form__input']}`}
                type="date"
                id="end"
                name="end"
                title="A data final de sua assinatura."
                value={endDate}
                disabled
              />
            </label>
          </div>
        </div>

        <div className={styles['subscription-form__payment-box']}>
          <h3
            className={`${styles['subscription-form__title']} ${profileFormStyles['profile-form__title']}`}
            title="A forma de pagamento de sua assinatura."
          >
            Forma de pagamento:
          </h3>
          <label
            className={`${styles['subscription-form__label']} ${profileFormStyles['profile-form__label']}`}
            htmlFor="payment"
          >
            <Input
              className={`${styles['subscription-form__input']} ${profileFormStyles['profile-form__input']}`}
              type="text"
              id="payment"
              name="payment"
              defaultValue={pay}
              disabled
            />
          </label>
        </div>
      </fieldset>

      <fieldset
        className={`${styles['subscription-form__field']} ${profileFormStyles['profile-form__field']}`}
      >
        <div className={styles['subscription-form__days-on-box']}>
          <h3
            className={`${styles['subscription-form__title']} ${profileFormStyles['profile-form__title']}`}
            title="Os dias da semana selecionados na sua assinatura."
          >
            Dias da semana:
          </h3>
          <div className={styles['subscription-form__days-box']}>
            <div
              className={`${styles['subscription-form__item-box']} ${styles['subscription-form__item-box_days']}`}
            >
              <label
                className={`${styles['subscription-form__label']} ${profileFormStyles['profile-form__label']}`}
                htmlFor="seg"
              >
                Segunda
              </label>
              <Input
                className={`${styles['subscription-form__input']} ${profileFormStyles['profile-form__input']}`}
                type="checkbox"
                id="seg"
                name="daysOn"
                value="seg"
                checked={formData.daysOn.includes('seg')}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div
              className={`${styles['subscription-form__item-box']} ${styles['subscription-form__item-box_days']}`}
            >
              <label
                className={`${styles['subscription-form__label']} ${profileFormStyles['profile-form__label']}`}
                htmlFor="ter"
              >
                Terça
              </label>
              <Input
                className={`${styles['subscription-form__input']} ${profileFormStyles['profile-form__input']}`}
                type="checkbox"
                id="ter"
                name="daysOn"
                value="ter"
                checked={formData.daysOn.includes('ter')}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div
              className={`${styles['subscription-form__item-box']} ${styles['subscription-form__item-box_days']}`}
            >
              <label
                className={`${styles['subscription-form__label']} ${profileFormStyles['profile-form__label']}`}
                htmlFor="qua"
              >
                Quarta
              </label>
              <Input
                className={`${styles['subscription-form__input']} ${profileFormStyles['profile-form__input']}`}
                type="checkbox"
                id="qua"
                name="daysOn"
                value="qua"
                checked={formData.daysOn.includes('qua')}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div
              className={`${styles['subscription-form__item-box']} ${styles['subscription-form__item-box_days']}`}
            >
              <label
                className={`${styles['subscription-form__label']} ${profileFormStyles['profile-form__label']}`}
                htmlFor="qui"
              >
                Quinta
              </label>
              <Input
                className={`${styles['subscription-form__input']} ${profileFormStyles['profile-form__input']}`}
                type="checkbox"
                id="qui"
                name="daysOn"
                value="qui"
                checked={formData.daysOn.includes('qui')}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div
              className={`${styles['subscription-form__item-box']} ${styles['subscription-form__item-box_days']}`}
            >
              <label
                className={`${styles['subscription-form__label']} ${profileFormStyles['profile-form__label']}`}
                htmlFor="sex"
              >
                Sexta
              </label>
              <Input
                className={`${styles['subscription-form__input']} ${profileFormStyles['profile-form__input']}`}
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

        {formData.daysOn.length > 0 && (
          <div className={styles['subscription-form__schedules-box']}>
            <h3
              className={`${styles['subscription-form__title']} ${profileFormStyles['profile-form__title']}`}
              title="O horário selecionada para cada data assinada."
            >
              Horários:
            </h3>
            <div className={styles['subscription-form__schedules-container']}>
              {formData.daysOn.map((day) => {
                return (
                  <div key={day} className={styles['subscription-form__times-box']}>
                    <label
                      className={`${styles['subscription-form__label']} ${profileFormStyles['profile-form__label']}`}
                      htmlFor={`schedule-${day}`}
                    >
                      {day === 'seg' && 'Segunda:'}
                      {day === 'ter' && 'Terça:'}
                      {day === 'qua' && 'Quarta:'}
                      {day === 'qui' && 'Quinta:'}
                      {day === 'sex' && 'Sexta:'}
                    </label>

                    <Input
                      className={`${styles['subscription-form__input']} ${profileFormStyles['profile-form__input']}`}
                      type="time"
                      id={`schedule-${day}`}
                      name={day}
                      min="10:45"
                      max="19:45"
                      value={formData.schedules[day] || ''}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                );
              })}
            </div>
            <small className={styles['subscription-form__schedules-small']}>
              *Horário de funcionamento: 10h45 às 19h45.*
            </small>
          </div>
        )}

        <div className={styles['subscription-form__method-box']}>
          <h3
            className={`${styles['subscription-form__title']} ${profileFormStyles['profile-form__title']}`}
            title="A forma de entrega selecionada na sua assinatura."
          >
            Forma de entrega:
          </h3>
          <div className={styles['subscription-form__delivery-drive-box']}>
            <div className={styles['subscription-form__item-box']}>
              <label
                className={`${styles['subscription-form__label']} ${profileFormStyles['profile-form__label']}`}
                htmlFor="delivery"
              >
                Delivery
              </label>
              <Input
                className={`${styles['subscription-form__input']} ${profileFormStyles['profile-form__input']}`}
                type="radio"
                id="delivery"
                name="method"
                value="delivery"
                checked={formData.method === 'delivery'}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className={styles['subscription-form__item-box']}>
              <label
                className={`${styles['subscription-form__label']} ${profileFormStyles['profile-form__label']}`}
                htmlFor="drive-thru"
              >
                Drive-thru
              </label>
              <Input
                className={`${styles['subscription-form__input']} ${profileFormStyles['profile-form__input']}`}
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

      <fieldset
        className={`${styles['subscription-form__field']} ${profileFormStyles['profile-form__field']}`}
      >
        <div className={styles['subscription-form__next-box']}>
          <h3
            className={`${styles['subscription-form__title']} ${profileFormStyles['profile-form__title']}`}
            title="A data da próxima refeição."
          >
            Próxima entrega em:
          </h3>
          <label
            className={`${styles['subscription-form__label']} ${profileFormStyles['profile-form__label']}`}
            htmlFor="next"
          >
            <Input
              className={`${styles['subscription-form__input']} ${profileFormStyles['profile-form__input']}`}
              type="date"
              id="next"
              name="next"
              value={nextMealAt}
              disabled
            />
          </label>
        </div>
      </fieldset>

      <p className={styles['subscription-form__note']}>
        *Você pode alterar algumas escolhas na sua assinatura a qualquer momento e, também, pausá-la
        por um período máximo de 2 meses, uma vez ao ano.
      </p>

      {localError && (
        <Toast
          className={`${styles['subscription-form__toast']} ${profileFormStyles['profile-form__toast']}`}
          message={localError.message}
        ></Toast>
      )}

      {confirmActionMsg && (
        <Toast
          className={`${styles['subscription-form__toast']} ${profileFormStyles['profile-form__toast']}`}
          message={confirmActionMsg}
        ></Toast>
      )}

      {loading && (
        <Loader
          className={`${styles['subscription-form__loader']} ${profileFormStyles['profile-form__loader']}`}
        >
          Atualizando configuração de assinatura...
        </Loader>
      )}

      <div className={styles['subscription-form__buttons-box']}>
        {!isEditing && (
          <>
            <Button
              className={`${styles['subscription-form__button']} ${profileFormStyles['profile-form__button']}`}
              type="button"
              onClick={() => {
                setLocalError(null);
                setConfirmActionMsg(null);
                setIsEditing(true);
              }}
            >
              Editar
            </Button>

            {user.subscriptionDetails.status === true ? (
              <Button
                className={`${styles['subscription-form__button']} ${profileFormStyles['profile-form__button']}`}
                type="submit"
                value="pause"
                disabled={loading}
              >
                Pausar
              </Button>
            ) : (
              <Button
                className={`${styles['subscription-form__button']} ${profileFormStyles['profile-form__button']}`}
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
            className={`${styles['subscription-form__button']} ${profileFormStyles['profile-form__button']}`}
            type="submit"
            value="send"
            disabled={loading}
          >
            Enviar
          </Button>
        )}
      </div>
    </form>
  );
}

SubscriptionProfileForm.propTypes = {
  user: PropTypes.object.isRequired,
};

export default SubscriptionProfileForm;
