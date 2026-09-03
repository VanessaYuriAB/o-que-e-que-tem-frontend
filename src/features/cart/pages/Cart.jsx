import './Cart.css';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../../shared/components/ui/input/Input.jsx';
import Textarea from '../../../shared/components/ui/textarea/Textarea.jsx';
import Button from '../../../shared/components/ui/button/Button.jsx';
import { useState } from 'react';
import Toast from '../../../shared/components/ui/toast/Toast.jsx';
import useCartStore from '../../../store/useCartStore.js';
import { useShallow } from 'zustand/react/shallow';
import errorHandler from '../../../shared/utils/errorHandler.js';
import Loader from '../../../shared/components/ui/loader/Loader.jsx';
import useAuthStore from '../../../store/useAuthStore.js';
import getNextDate from '../../../shared/utils/nextSubscriptionDate.js';

function Cart() {
  const navigate = useNavigate();

  const [localRemovedError, setLocalRemovedError] = useState(null);
  const [localCartError, setLocalCartError] = useState(null);

  const user = useAuthStore((state) => state.user);

  const {
    cartItems,
    removeItemToCartAction,
    removeLoading,
    setCartDataAction,
    setLoading, // loading da função de setar, não set de estado
    cartData,
  } = useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      removeItemToCartAction: state.removeItemToCartAction,
      removeLoading: state.removeLoading,
      setCartDataAction: state.setCartDataAction,
      setLoading: state.setLoading,
      cartData: state.cartData,
    }))
  );

  const [formData, setFormData] = useState({
    meal: cartData.meal || '',
    method: cartData.method || user?.subscriptionDetails?.method || '',
    userName: cartData.userName || user?.userName || '',
    email: cartData.email || user?.email || '',
    tel: cartData.tel || user?.tel || '',
    address: cartData.address || user?.address || '',
    number: cartData.number || user?.number || '',
    complement: cartData.complement || user?.complement || '',
    district: cartData.district || user?.district || '',
    cep: cartData.cep || user?.cep || '',
    infoText: cartData.infoText || user?.infoText || '',
  });

  const subtotal = formData.meal === 'pate' ? 35 : formData.meal === 'creme' ? 30 : 25;
  const total = formData.method === 'delivery' ? subtotal + 10 : subtotal;

  const typeOfMeal = formData.meal === 'pate' ? 'patê' : formData.meal;

  const nextMealAt = getNextDate(
    user?.subscriptionDetails?.daysOn || [],
    user?.subscriptionDetails?.schedules || {}
  );

  const weekDays = ['seg', 'ter', 'qua', 'qui', 'sex'];
  const nextDayAt = nextMealAt ? weekDays[new Date(nextMealAt).getDay()] : '';
  const nextTimeAt = user?.subscriptionDetails?.schedules?.[nextDayAt] || '';

  const isSubscribeActive =
    user?.subscription === true && user?.subscriptionDetails?.status === true;

  const handleRemoveItem = async (item) => {
    try {
      await removeItemToCartAction(item);
      setLocalRemovedError(null);
    } catch (error) {
      const handledError = errorHandler(error);
      setLocalRemovedError(handledError.message);
    }
  };

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
      const handledError = errorHandler(error);
      setLocalCartError(handledError.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCart(formData);
  };

  return (
    <section className="cart content__cart">
      <h1 className="cart__title">Carrinho de sopas...</h1>
      <strong className="cart__strong">...cremes ou patês</strong>

      {/* se não houver items, renderiza mensagem; se houver, renderiza carrinho */}

      {cartItems.length === 0 ? (
        <section className="cart__null-box">
          <Toast className="cart__null-toast">
            <h2 className="cart__null-title">Está vazio, no momento!</h2>
            <p className="cart__null-text">Veja o que está disponível em nosso cardápio :)</p>
            <Link className="cart__null-link link-to-button" to="/menu">
              Acesse o menu aqui
            </Link>
          </Toast>
        </section>
      ) : (
        <section className="cart__pack">
          <h2 className="cart__pack-title">Finalize seu pedido</h2>
          <div className="cart__pack-box">
            <aside className="cart__pack-aside">
              <section className="cart__pack-card">
                <h3 className="cart__pack-card-title">Detalhes do pedido:</h3>

                <ul className="cart__pack-card-list nav__list">
                  {cartItems.map((item) => {
                    return (
                      <li className="cart__pack-card-item" key={item._id}>
                        <div className="cart__pack-card-box">
                          <p className="cart__pack-card-product">{item.productName}</p>
                          <Button
                            className="cart__pack-card-button"
                            type="button"
                            onClick={() => handleRemoveItem(item)}
                          ></Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {removeLoading && (
                  <Loader className="cart__pack-card-loader">Removendo item...</Loader>
                )}

                {localRemovedError && (
                  <Toast className="cart__pack-card-toast" message={localRemovedError}></Toast>
                )}

                <div className="cart__pack-card-link-box">
                  <Link className="cart__pack-card-link link-to-button" to="/menu">
                    Voltar ao cardápio
                  </Link>
                </div>

                <dl className="cart__pack-card-details">
                  <div className="cart__pack-card-line"></div>
                  <div className="cart__pack-card-box">
                    <dt className="cart__pack-card-term">Tipo de refeição</dt>
                    <dd className="cart__pack-card-description">
                      {formData.meal === '' ? '-' : typeOfMeal}
                    </dd>
                  </div>

                  {user?.subscription !== true && (
                    <>
                      <div className="cart__pack-card-line"></div>
                      <div className="cart__pack-card-box">
                        <dt className="cart__pack-card-term">Subtotal</dt>
                        <dd className="cart__pack-card-description">R$ {subtotal},00</dd>
                      </div>
                      <div className="cart__pack-card-box">
                        <dt className="cart__pack-card-term">Entrega</dt>
                        <dd className="cart__pack-card-description">
                          R$ {formData.method === 'delivery' ? 10 : 0},00
                        </dd>
                      </div>
                      <div className="cart__pack-card-line"></div>
                      <div className="cart__pack-card-box">
                        <dt className="cart__pack-card-term">Total</dt>
                        <dd className="cart__pack-card-description">R$ {total},00</dd>
                      </div>
                    </>
                  )}
                </dl>
                <p className="cart__pack-card-msg">Mais um pouco menos de desperdício :)</p>
              </section>
            </aside>

            <form
              className="pack-form cart__pack-form"
              name="pack"
              onSubmit={handleSubmit} /*noValidate*/
            >
              <fieldset className="pack-form__field pack-form__field_radio">
                <legend className="pack-form__legend">Sua opção de refeição:</legend>
                <div className="pack-form__input-box pack-form__input-box_radio">
                  <label className="pack-form__label" htmlFor="sopa">
                    Sopa
                  </label>
                  <Input
                    className="pack-form__input pack-form__input_radio"
                    type="radio"
                    id="sopa"
                    name="meal"
                    value="sopa"
                    checked={formData.meal === 'sopa'}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="pack-form__input-box pack-form__input-box_radio">
                  <label className="pack-form__label" htmlFor="creme">
                    Creme
                  </label>
                  <Input
                    className="pack-form__input pack-form__input_radio"
                    type="radio"
                    id="creme"
                    name="meal"
                    value="creme"
                    checked={formData.meal === 'creme'}
                    onChange={handleChange}
                  />
                </div>
                <div className="pack-form__input-box pack-form__input-box_radio">
                  <label className="pack-form__label" htmlFor="pate">
                    Patê
                  </label>
                  <Input
                    className="pack-form__input pack-form__input_radio"
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
                <fieldset className="pack-form__field pack-form__field_radio">
                  <legend className="pack-form__legend">Forma de entrega:</legend>
                  <div className="pack-form__radio-box">
                    <div className="pack-form__input-box pack-form__input-box_radio">
                      <label className="pack-form__label" htmlFor="delivery">
                        Delivery
                      </label>
                      <Input
                        className="pack-form__input pack-form__input_radio"
                        type="radio"
                        id="delivery"
                        name="method"
                        value="delivery"
                        checked={user?.subscriptionDetails?.method === 'delivery'}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="pack-form__radio-box">
                    <div className="pack-form__input-box pack-form__input-box_radio">
                      <label className="pack-form__label" htmlFor="drive-thru">
                        Drive-thru
                      </label>
                      <Input
                        className="pack-form__input pack-form__input_radio"
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
                <fieldset className="pack-form__field pack-form__field_radio">
                  <legend className="pack-form__legend">Forma de entrega:</legend>
                  <div className="pack-form__radio-box">
                    <div className="pack-form__input-box pack-form__input-box_radio">
                      <label className="pack-form__label" htmlFor="delivery">
                        Delivery
                      </label>
                      <Input
                        className="pack-form__input pack-form__input_radio"
                        type="radio"
                        id="delivery"
                        name="method"
                        value="delivery"
                        checked={formData.method === 'delivery'}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <span className="pack-form__span">Entregue na sua porta (R$10,00)</span>
                  </div>
                  <div className="pack-form__radio-box">
                    <div className="pack-form__input-box pack-form__input-box_radio">
                      <label className="pack-form__label" htmlFor="drive-thru">
                        Drive-thru
                      </label>
                      <Input
                        className="pack-form__input pack-form__input_radio"
                        type="radio"
                        id="drive-thru"
                        name="method"
                        value="drive-thru"
                        checked={formData.method === 'drive-thru'}
                        onChange={handleChange}
                      />
                    </div>
                    <span className="pack-form__span">Retire no nosso endereço (grátis)</span>
                  </div>
                </fieldset>
              )}

              {isSubscribeActive && (
                <fieldset className="pack-form__field pack-form__field_next">
                  <legend className="pack-form__legend">Data e hora:</legend>
                  <div className="pack-form__input-box">
                    <label className="pack-form__label" htmlFor="nextMeal">
                      Próxima entrega em:
                    </label>
                    <Input
                      className="pack-form__input pack-form__input_date"
                      type="date"
                      id="nextMeal"
                      name="nextMeal"
                      value={nextMealAt}
                      disabled
                    />
                  </div>
                  <div className="pack-form__input-box">
                    <label className="pack-form__label" htmlFor="schedule">
                      Horário:
                    </label>
                    <Input
                      className="pack-form__input pack-form__input_schedule"
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

              <fieldset className="">
                <legend className="pack-form__legend">Informações de contato:</legend>
                <div className="pack-form__input-box">
                  <label className="pack-form__label" htmlFor="userName">
                    Nome completo:
                  </label>
                  <Input
                    className="pack-form__input"
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
                <div className="pack-form__input-box">
                  <label className="pack-form__label" htmlFor="email">
                    E-mail:
                  </label>
                  <Input
                    className="pack-form__input"
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
                <div className="pack-form__input-box">
                  <label className="pack-form__label" htmlFor="tel">
                    Telefone:
                  </label>
                  <Input
                    className="pack-form__input"
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
                <fieldset className="pack-form__field">
                  <legend className="pack-form__legend">Endereço para entrega:</legend>
                  <div className="pack-form__input-box">
                    <label className="pack-form__label" htmlFor="address">
                      Logradouro (rua, avenida, praça, etc):
                    </label>
                    <Input
                      className="pack-form__input"
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

                  <div className="pack-form__input-box">
                    <label className="pack-form__label" htmlFor="number">
                      Nº:
                    </label>
                    <Input
                      className="pack-form__input"
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

                  <div className="pack-form__input-box">
                    <label className="pack-form__label" htmlFor="complement">
                      Complemento:
                    </label>
                    <Input
                      className="pack-form__input"
                      type="text"
                      id="complement"
                      name="complement"
                      pattern="^[a-zA-Z0-9\s.\-]*$" /* apenas números, letras, espaços em branco, pontos e traços */
                      title="O complemento do seu endereço para delivery: apenas números, letras, espaços em branco, pontos e/ou traços."
                      placeholder="Se não houver, digite traço (-)."
                      value={formData.complement}
                      onChange={handleChange}
                      required={formData.method === 'delivery'}
                    />
                  </div>

                  <div className="pack-form__input-box">
                    <label className="pack-form__label" htmlFor="district">
                      Bairro:
                    </label>
                    <Input
                      className="pack-form__input"
                      type="text"
                      id="district"
                      name="district"
                      pattern="^[a-zA-Z0-9\s]*$" /* apenas números, letras e espaços em branco */
                      title="O bairro do seu endereço para delivery: apenas números e/ou letras."
                      placeholder="O bairro do local"
                      value={formData.district}
                      onChange={handleChange}
                      required={formData.method === 'delivery'}
                    />
                  </div>

                  <div className="pack-form__input-box">
                    <label className="pack-form__label" htmlFor="cep">
                      CEP:
                    </label>
                    <Input
                      className="pack-form__input"
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

              <fieldset className="pack-form__field">
                <legend className="pack-form__legend">Informações adicionais:</legend>
                <div className="pack-form__input-box">
                  <label className="pack-form__label" htmlFor="infoText">
                    Observações relevantes:
                  </label>
                  <Textarea
                    className="pack-form__textarea"
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

              {localCartError && (
                <Toast className="pack-form__toast" message={localCartError}></Toast>
              )}

              {isSubscribeActive ? (
                <Button className="pack-form__button" type="submit">
                  {!setLoading && typeOfMeal !== ''
                    ? `Finalizar ${typeOfMeal}`
                    : setLoading && typeOfMeal !== ''
                      ? 'Finalizando...'
                      : 'Finalizar'}
                </Button>
              ) : (
                <Button className="pack-form__button" type="submit">
                  {!setLoading && typeOfMeal !== ''
                    ? `Finalizar ${typeOfMeal}: R$ ${total},00`
                    : setLoading && typeOfMeal !== ''
                      ? 'Finalizando...'
                      : 'Finalizar'}
                </Button>
              )}
            </form>
          </div>
        </section>
      )}
    </section>
  );
}

export default Cart;
