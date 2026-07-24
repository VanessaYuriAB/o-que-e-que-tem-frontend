import './Cart.css';
import { Link } from 'react-router-dom';
import Input from '../../../shared/components/ui/input/Input.jsx';
import Textarea from '../../../shared/components/ui/textarea/Textarea.jsx';
import Button from '../../../shared/components/ui/button/Button.jsx';

function Cart() {
  const isItem = true;
  const total = 'R$25,00';
  const isDelivery = true;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="cart content__cart">
      <h1 className="cart__title">Carrinho de sopas...</h1>
      <strong className="cart__strong">...cremes ou patês</strong>

      {/* se não houver items, renderiza mensagem; se houver, renderiza carrinho*/}

      {isItem === false ? (
        <div className="cart__null-box">
          <h2 className="cart__null-title">Está vazio, no momento!</h2>
          <p className="cart__null-text">Veja o que está disponível em nosso cardápio :)</p>
          <Link className="cart__null-link link-to-button" to="/menu">
            Acesse o menu aqui
          </Link>
        </div>
      ) : (
        <div className="cart__order-box">
          <form
            className="order-form cart__order-form"
            name="order"
            onSubmit={handleSubmit} /*noValidate*/
          >
            <h2 className="order-form__title">Finalize sua compra</h2>
            <fieldset className="order-form__field">
              <legend className="order-form__legend">Forma de entrega:</legend>
              <div className="order-form__input-box">
                <label className="order-form__label" htmlFor="delivery">
                  Delivery
                </label>
                <Input
                  className="order-form__input"
                  type="radio"
                  id="delivery"
                  name="method"
                  value="delivery"
                  // onChange={handleChange}
                />
                <span className="order-form__span">Entregue na sua porta (R$10,00)</span>
              </div>
              <div className="order-form__input-box">
                <label className="order-form__label" htmlFor="drive-thru">
                  Drive-thru
                </label>
                <Input
                  className="order-form__input"
                  type="radio"
                  id="drive-thru"
                  name="method"
                  value="drive-thru"
                  // onChange={handleChange}
                />
                <span className="order-form__span">Retire no nosso endereço (grátis)</span>
              </div>
            </fieldset>

            <fieldset className="order-form__field">
              <legend className="order-form__legend">Informações de contato:</legend>
              <div className="order-form__input-box">
                <label className="order-form__label" htmlFor="userName">
                  Nome completo:
                </label>
                <Input
                  className="order-form__input"
                  type="text"
                  id="userName"
                  name="userName"
                  pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
                  title="Seu nome: não são permitidos '<' e '>'."
                  placeholder="Seu nome completo"
                  // value={data.userName}
                  // onChange={handleChange}
                  required
                />
              </div>
              <div className="order-form__input-box">
                <label className="order-form__label" htmlFor="email">
                  E-mail:
                </label>
                <Input
                  className="order-form__input"
                  type="email"
                  id="email"
                  name="email"
                  pattern="^[a-zA-Z0-9_.\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                  title="E-mail válido: contento apenas letras, números, sublinhados, pontos ou hífens."
                  placeholder="Um e-mail para contato"
                  // value={data.email}
                  // onChange={handleChange}
                  required
                />
              </div>
              <div className="order-form__input-box">
                <label className="order-form__label" htmlFor="tel">
                  Telefone:
                </label>
                <Input
                  className="order-form__input"
                  type="tel"
                  id="tel"
                  name="tel"
                  minLength={14}
                  maxLength={15}
                  pattern="^\([1-9]{2}\)\s[0-9]?[0-9]{4}-[0-9]{4}$"
                  title="Fixo ou celular. Formato: (xx) xxxxx-xxxx."
                  placeholder="Formato: (XX) XXXXX-XXXX"
                  // value={data.tel}
                  // onChange={handleChange}
                  required
                />
              </div>
            </fieldset>

            <fieldset className="order-form__field">
              <legend className="order-form__legend">Endereço para entrega:</legend>
              <div className="order-form__input-box">
                <label className="order-form__label" htmlFor="address">
                  Logradouro (rua, avenida, praça, etc):
                </label>
                <Input
                  className="order-form__input"
                  type="text"
                  id="address"
                  name="address"
                  pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
                  title="Seu endereço para delivery: não são permitidos '<' e '>'."
                  placeholder="Endereço para entrega"
                  // value={formData.address}
                  // onChange={handleChange}
                  required={isDelivery}
                />
              </div>

              <div className="order-form__input-box">
                <label className="order-form__label" htmlFor="number">
                  Nº:
                </label>
                <Input
                  className="order-form__input"
                  type="text"
                  id="number"
                  name="number"
                  pattern="^[a-zA-Z0-9\s]*$" /* apenas números, letras e espaços em branco */
                  title="O número do seu endereço para delivery: apenas números e/ou letras."
                  placeholder="Nº do endereço"
                  // value={formData.number}
                  // onChange={handleChange}
                  required={isDelivery}
                />
              </div>

              <div className="order-form__input-box">
                <label className="order-form__label" htmlFor="complement">
                  Complemento:
                </label>
                <Input
                  className="order-form__input"
                  type="text"
                  id="complement"
                  name="complement"
                  pattern="^[a-zA-Z0-9\s]*$" /* apenas números, letras e espaços em branco */
                  title="O complemento do seu endereço para delivery: apenas números e/ou letras."
                  placeholder="Se não houver, digite traço (-)."
                  // value={formData.complement}
                  // onChange={handleChange}
                  required={isDelivery}
                />
              </div>

              <div className="order-form__input-box">
                <label className="order-form__label" htmlFor="district">
                  Bairro:
                </label>
                <Input
                  className="order-form__input"
                  type="text"
                  id="district"
                  name="district"
                  pattern="^[a-zA-Z0-9\s]*$" /* apenas números, letras e espaços em branco */
                  title="O bairro do seu endereço para delivery: apenas números e/ou letras."
                  placeholder="O bairro do local"
                  // value={formData.district}
                  // onChange={handleChange}
                  required={isDelivery}
                />
              </div>

              <div className="order-form__input-box">
                <label className="order-form__label" htmlFor="cep">
                  CEP:
                </label>
                <Input
                  className="order-form__input"
                  type="text"
                  id="cep"
                  name="cep"
                  pattern="^[0-9]{5}-[0-9]{3}$" /* apenas números e traço */
                  title="O CEP do seu endereço para delivery: apenas números e traço."
                  placeholder="Formato: XXXXX-XXX"
                  // value={formData.cep}
                  // onChange={handleChange}
                  required={isDelivery}
                />
              </div>
            </fieldset>

            <fieldset className="order-form__field">
              <legend className="order-form__legend">Informações adicionais:</legend>
              <div className="order-form__input-box">
                <label className="order-form__label" htmlFor="infoText">
                  Observações relevantes:
                </label>
                <Textarea
                  className="order-form__textarea"
                  id="infoText"
                  name="infoText"
                  pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
                  title="Informações relevantes, exemplo: ponto de referência ou contato para entrega (nome e RG/CPF)."
                  placeholder="Opcional. Ex: um ponto de referência ou um contato oficial para entrega (nome e RG/CPF)."
                  // value={formData.infoText}
                  // onChange={handleChange}
                />
              </div>
            </fieldset>

            <Button className="order-form__button" type="submit" /*disabled={loading}*/>
              Finalizar compra: {total}
            </Button>
          </form>

          <aside className="order-form__aside">
            <div className="order-form__details-card">
              <h3 className="order-form__details-title">Detalhes do pedido:</h3>
              <div className="order-form__details-box">
                <p className="order-form__details-item">Item</p>
                <Button
                  className="order-form__details-remove"
                  type="button"
                  // onClick={handleRemove}
                >
                  Remover item
                </Button>
              </div>
              <div className="order-form__details-line">Linha divisória</div>
              <div className="order-form__details-box">
                <p className="order-form__details-text">Subtotal</p>
                <p className="order-form__details-text">R$</p>
              </div>
              <div className="order-form__details-box">
                <p className="order-form__details-text">Entrega</p>
                <p className="order-form__details-text">R$</p>
              </div>
              <div className="order-form__details-line">Linha divisória</div>
              <div className="order-form__details-box">
                <p className="order-form__details-text">Total</p>
                <p className="order-form__details-text">R$</p>
              </div>
            </div>
            <strong className="order-form__msg">Mais um pouco menos de desperdício :)</strong>
          </aside>
        </div>
      )}
    </section>
  );
}

export default Cart;
