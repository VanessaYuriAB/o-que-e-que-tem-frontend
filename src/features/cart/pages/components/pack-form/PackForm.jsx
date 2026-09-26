import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Input from '../../../../../shared/components/ui/input/Input.jsx';
import Textarea from '../../../../../shared/components/ui/textarea/Textarea.jsx';
import getNextDate from '../../../../../shared/utils/nextSubscriptionDate.js';
import Toast from '../../../../../shared/components/ui/toast/Toast.jsx';
import Button from '../../../../../shared/components/ui/button/Button.jsx';
import PropTypes from 'prop-types';
import './PackForm.css';

function PackForm(props) {
  const { user, setFormData, total, setCartDataAction, formData, setLoading, typeOfMeal } = props;

  const navigate = useNavigate();

  const [localCartError, setLocalCartError] = useState(null);

  const nextMealAt = getNextDate(
    user?.subscriptionDetails?.daysOn || [],
    user?.subscriptionDetails?.schedules || {}
  );

  const weekDays = ['seg', 'ter', 'qua', 'qui', 'sex'];
  const nextDayAt = nextMealAt ? weekDays[new Date(nextMealAt).getDay()] : '';
  const nextTimeAt = user?.subscriptionDetails?.schedules?.[nextDayAt] || '';

  const isSubscribeActive =
    user?.subscription === true && user?.subscriptionDetails?.status === true;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleCart = async (data) => {
    try {
      const orderData =
        !user?.subscription || !user?.subscriptionDetails.status
          ? { ...data, amount: total }
          : { ...data };

      await setCartDataAction(orderData);

      setFormData({
        meal: '',
        method: '',
        userName: '',
        email: '',
        tel: '',
        address: '',
        number: '',
        complement: '',
        district: '',
        cep: '',
        infoText: '',
      });

      setLocalCartError(null);

      navigate('/checkout');
    } catch (error) {
      setLocalCartError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCart(formData);
  };

  return (
    <form className="form pack__form" name="pack" onSubmit={handleSubmit} /*noValidate*/>
      <fieldset className="form__fieldset form__fieldset_radio">
        <legend className="form__legend">Sua opção de refeição:</legend>
        <div className="form__input-box form__input-box_radio">
          <label className="form__label" htmlFor="sopa">
            Sopa
          </label>
          <Input
            className="form__input form__input_radio"
            type="radio"
            id="sopa"
            name="meal"
            value="sopa"
            checked={formData.meal === 'sopa'}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form__input-box form__input-box_radio">
          <label className="form__label" htmlFor="creme">
            Creme
          </label>
          <Input
            className="form__input form__input_radio"
            type="radio"
            id="creme"
            name="meal"
            value="creme"
            checked={formData.meal === 'creme'}
            onChange={handleChange}
          />
        </div>
        <div className="form__input-box form__input-box_radio">
          <label className="form__label" htmlFor="pate">
            Patê
          </label>
          <Input
            className="form__input form__input_radio"
            type="radio"
            id="pate"
            name="meal"
            value="pate"
            checked={formData.meal === 'pate'}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      {isSubscribeActive ? (
        <fieldset className="form__fieldset form__fieldset_radio">
          <legend className="form__legend">Forma de entrega:</legend>
          <div className="form__radio-box">
            <div className="form__input-box form__input-box_radio">
              <label className="form__label" htmlFor="delivery">
                Delivery
              </label>
              <Input
                className="form__input form__input_radio"
                type="radio"
                id="delivery"
                name="method"
                value="delivery"
                checked={user?.subscriptionDetails?.method === 'delivery'}
                disabled
              />
            </div>
          </div>
          <div className="form__radio-box">
            <div className="form__input-box form__input-box_radio">
              <label className="form__label" htmlFor="drive-thru">
                Drive-thru
              </label>
              <Input
                className="form__input form__input_radio"
                type="radio"
                id="drive-thru"
                name="method"
                value="drive-thru"
                checked={user?.subscriptionDetails?.method === 'drive-thru'}
                disabled
              />
            </div>
          </div>
        </fieldset>
      ) : (
        <fieldset className="form__fieldset form__fieldset_radio">
          <legend className="form__legend">Forma de entrega:</legend>
          <div className="form__radio-box">
            <div className="form__input-box form__input-box_radio">
              <label className="form__label" htmlFor="delivery">
                Delivery
              </label>
              <Input
                className="form__input form__input_radio"
                type="radio"
                id="delivery"
                name="method"
                value="delivery"
                checked={formData.method === 'delivery'}
                onChange={handleChange}
                required
              />
            </div>
            <span className="form__span">Entregue na sua porta (R$10,00)</span>
          </div>
          <div className="form__radio-box">
            <div className="form__input-box form__input-box_radio">
              <label className="form__label" htmlFor="drive-thru">
                Drive-thru
              </label>
              <Input
                className="form__input form__input_radio"
                type="radio"
                id="drive-thru"
                name="method"
                value="drive-thru"
                checked={formData.method === 'drive-thru'}
                onChange={handleChange}
              />
            </div>
            <span className="form__span">Retire no nosso endereço (grátis)</span>
          </div>
        </fieldset>
      )}

      {isSubscribeActive && (
        <fieldset className="form__fieldset form__fieldset_next">
          <legend className="form__legend">Data e hora:</legend>
          <div className="form__input-box">
            <label className="form__label" htmlFor="nextMeal">
              Próxima entrega em:
            </label>
            <Input
              className="form__input form__input_date"
              type="date"
              id="nextMeal"
              name="nextMeal"
              value={nextMealAt}
              disabled
            />
          </div>
          <div className="form__input-box">
            <label className="form__label" htmlFor="schedule">
              Horário:
            </label>
            <Input
              className="form__input form__input_schedule"
              type="time"
              id="schedule"
              name="schedule"
              min="10:45"
              max="19:45"
              value={nextTimeAt}
              disabled
            />
          </div>
        </fieldset>
      )}

      <fieldset className="form__fieldset">
        <legend className="form__legend">Informações de contato:</legend>
        <div className="form__input-box">
          <label className="form__label" htmlFor="userName">
            Nome completo:
          </label>
          <Input
            className="form__input"
            type="text"
            id="userName"
            name="userName"
            pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
            title="Seu nome: não são permitidos '<' e '>'."
            placeholder="Seu nome completo"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form__input-box">
          <label className="form__label" htmlFor="email">
            E-mail:
          </label>
          <Input
            className="form__input"
            type="email"
            id="email"
            name="email"
            pattern="^[a-zA-Z0-9_.\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
            title="E-mail válido: contento apenas letras, números, sublinhados, pontos ou hífens."
            placeholder="Um e-mail para contato"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form__input-box">
          <label className="form__label" htmlFor="tel">
            Telefone:
          </label>
          <Input
            className="form__input"
            type="tel"
            id="tel"
            name="tel"
            inputMode="numeric"
            minLength={14}
            maxLength={15}
            pattern="^\([1-9]{2}\)\s[0-9]?[0-9]{4}-[0-9]{4}$"
            title="Fixo ou celular. Formato: (xx) xxxxx-xxxx."
            placeholder="Formato: (XX) XXXXX-XXXX"
            value={formData.tel}
            onChange={handleChange}
            required
          />
        </div>
      </fieldset>

      {formData.method === 'delivery' && (
        <fieldset className="form__fieldset">
          <legend className="form__legend">Endereço para entrega:</legend>
          <div className="form__input-box">
            <label className="form__label" htmlFor="address">
              Logradouro (rua, avenida, praça, etc):
            </label>
            <Input
              className="form__input"
              type="text"
              id="address"
              name="address"
              pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
              title="Seu endereço para delivery: não são permitidos '<' e '>'."
              placeholder="Endereço para entrega"
              value={formData.address}
              onChange={handleChange}
              required={formData.method === 'delivery'}
            />
          </div>

          <div className="form__input-box">
            <label className="form__label" htmlFor="number">
              Nº:
            </label>
            <Input
              className="form__input"
              type="text"
              id="number"
              name="number"
              inputMode="numeric"
              pattern="^[a-zA-Z0-9\s]*$" /* apenas números, letras e espaços em branco */
              title="O número do seu endereço para delivery: apenas números e/ou letras."
              placeholder="Nº do endereço"
              value={formData.number}
              onChange={handleChange}
              required={formData.method === 'delivery'}
            />
          </div>

          <div className="form__input-box">
            <label className="form__label" htmlFor="complement">
              Complemento:
            </label>
            <Input
              className="form__input"
              type="text"
              id="complement"
              name="complement"
              pattern="^[a-zA-Z0-9\s.\-]*$" /* apenas números, letras, espaços em branco, pontos e traços */
              title="O complemento do seu endereço para delivery: apenas números, letras, espaços em branco, pontos e/ou traços."
              placeholder="Se não houver, digite traço (-)"
              value={formData.complement}
              onChange={handleChange}
              required={formData.method === 'delivery'}
            />
          </div>

          <div className="form__input-box">
            <label className="form__label" htmlFor="district">
              Bairro:
            </label>
            <Input
              className="form__input"
              type="text"
              id="district"
              name="district"
              pattern="^[a-zA-ZÀ-ÿ0-9\s]*$" /* apenas números, letras, acentos, e espaços em branco */
              title="O bairro do seu endereço para delivery: apenas números e/ou letras."
              placeholder="O bairro do local"
              value={formData.district}
              onChange={handleChange}
              required={formData.method === 'delivery'}
            />
          </div>

          <div className="form__input-box">
            <label className="form__label" htmlFor="cep">
              CEP:
            </label>
            <Input
              className="form__input"
              type="text"
              id="cep"
              name="cep"
              inputMode="numeric"
              pattern="^[0-9]{5}-[0-9]{3}$" /* apenas números e traço */
              title="O CEP do seu endereço para delivery: apenas números e traço."
              placeholder="Formato: XXXXX-XXX"
              value={formData.cep}
              onChange={handleChange}
              required={formData.method === 'delivery'}
            />
          </div>
        </fieldset>
      )}

      <fieldset className="form__fieldset">
        <legend className="form__legend">Informações adicionais:</legend>
        <div className="form__input-box">
          <label className="form__label" htmlFor="infoText">
            Observações relevantes:
          </label>
          <Textarea
            className="form__textarea"
            id="infoText"
            name="infoText"
            pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
            title="Informações relevantes, exemplo: ponto de referência ou contato para entrega (nome, tel e RG/CPF)."
            placeholder="Opcional. Ex: um ponto de referência ou um contato oficial para entrega (nome, tel e RG/CPF)."
            value={formData.infoText}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      {localCartError && <Toast className="form__toast" message={localCartError}></Toast>}

      {isSubscribeActive ? (
        <Button className="form__button" type="submit">
          {!setLoading && typeOfMeal !== ''
            ? `Finalizar ${typeOfMeal}`
            : setLoading && typeOfMeal !== ''
              ? 'Finalizando...'
              : 'Finalizar'}
        </Button>
      ) : (
        <Button className="form__button" type="submit">
          {!setLoading && typeOfMeal !== ''
            ? `Finalizar ${typeOfMeal}: R$ ${total},00`
            : setLoading && typeOfMeal !== ''
              ? 'Finalizando...'
              : 'Finalizar'}
        </Button>
      )}
    </form>
  );
}

PackForm.propTypes = {
  user: PropTypes.object,
  setFormData: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  setCartDataAction: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setLoading: PropTypes.bool.isRequired,
  typeOfMeal: PropTypes.string.isRequired,
};

export default PackForm;
