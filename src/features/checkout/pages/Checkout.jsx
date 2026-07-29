import './Checkout.css';
import { Link } from 'react-router-dom';
import Input from '../../../shared/components/ui/input/Input.jsx';
import { useState } from 'react';
import Button from '../../../shared/components/ui/button/Button.jsx';
import useCartStore from '../../../store/useCartStore.js';
import { useShallow } from 'zustand/react/shallow';

function Checkout() {
  const [formData, setFormData] = useState({
    pay: '',
  });

  const typeOfPay =
    formData.pay === 'debito'
      ? 'débito'
      : formData.pay === 'credito'
        ? 'crédito'
        : formData.pay === 'pix'
          ? 'PIX'
          : '';

  const { cartItems, cartData } = useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      cartData: state.cartData,
    }))
  );

  console.log('Pedido:', cartData);
  console.log('Items:', cartItems);

  const hasCartItems = cartItems.length > 0;
  const hasCartData = (cartData.meal !== '') & (cartData.meal !== undefined);

  const isCartReady = hasCartItems && hasCartData;

  const order = {
    items: cartItems.map((item) => item.productName),
    itemsDetails: cartItems,
    meal: cartData.meal,
    method: cartData.method,
    userName: cartData.userName,
    userContact: {
      email: cartData.email,
      tel: cartData.tel,
    },
    userAddress: {
      address: cartData.address,
      number: cartData.number,
      complement: cartData.complement,
      district: cartData.district,
      cep: cartData.cep,
    },
    obs: cartData.infoText,
    payment: formData.pay,
  };

  console.log('Order', order);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleCheckout = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCheckout(order);
  };

  return (
    <section className="checkout content__checkout">
      {!isCartReady ? (
        <div className="checkout__empty-box">
          <h1 className="checkout__empty-title">Não há checkout a ser realizado!</h1>
          <strong className="checkout__empty-text">
            O carrinho está vazio ou incompleto, não existem produtos selecionados e/ou informações
            de compra.
          </strong>
          <div className="checkout__empty-links-box">
            <p className="checkout__empty-text">
              Selecione os ingredientes para montar a sua sopa, creme ou patê e/ou preencha os dados
              do carrinho para finalizar o pagamento.
            </p>
            <div className="checkout__empty-links">
              <Link className="checkout__empty-link link-to-button" to="/menu">
                Cardápio
              </Link>
              <Link className="checkout__empty-link link-to-button" to="/cart">
                Carrinho
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="checkout__title">Finalize sua compra</h1>
          <div className="checkout__box">
            <form
              className="order-form checkout__order-form"
              name="order"
              onSubmit={handleSubmit} /*noValidate*/
            >
              <fieldset className="order-form__field">
                <legend className="order-form__legend">Forma de pagamento:</legend>
                <div className="order-form__input-box">
                  <label className="order-form__label" htmlFor="pix">
                    PIX
                  </label>
                  <Input
                    className="order-form__input"
                    type="radio"
                    id="pix"
                    name="pay"
                    value="pix"
                    checked={formData.pay === 'pix'}
                    onChange={handleChange}
                  />
                </div>
                <div className="order-form__input-box">
                  <label className="order-form__label" htmlFor="debito">
                    Cartão de débito
                  </label>
                  <Input
                    className="order-form__input"
                    type="radio"
                    id="debito"
                    name="pay"
                    value="debito"
                    checked={formData.pay === 'debito'}
                    onChange={handleChange}
                  />
                </div>
                <div className="order-form__input-box">
                  <label className="order-form__label" htmlFor="credito">
                    Cartão de crédito
                  </label>
                  <Input
                    className="order-form__input"
                    type="radio"
                    id="credito"
                    name="pay"
                    value="credito"
                    checked={formData.pay === 'credito'}
                    onChange={handleChange}
                  />
                </div>
              </fieldset>

              {formData.pay === 'pix' && (
                <fieldset className="order-form__field">
                  <legend className="order-form__legend">Dados para PIX:</legend>
                  <div className="order-form__pix-box">
                    <p className="order-form__pix-code">Código:</p>
                    <p className="order-form__pix-code">xxxxxxxxxx</p>
                  </div>
                  <div className="order-form__pix-box">
                    <p className="order-form__pix-qr">QR Code:</p>
                    <img className="order-form__pix-qr" src="" alt="Imagem do QR Code do PIX" />
                  </div>
                </fieldset>
              )}

              {formData.pay === 'debito' && (
                <fieldset className="order-form__field">
                  <legend className="order-form__legend">Dados do cartão de débito:</legend>
                  <div className="order-form__input-box">
                    <label className="order-form__label">Nome: </label>
                    <Input className="order-form__input" />
                  </div>
                  <div className="order-form__input-box">
                    <label className="order-form__label">Nº do cartão: </label>
                    <Input className="order-form__input" />
                  </div>
                  <div className="order-form__input-box">
                    <label className="order-form__label">Bandeira: </label>
                    <Input className="order-form__input" />
                  </div>
                  <div className="order-form__input-box">
                    <label className="order-form__label">Validade: </label>
                    <Input className="order-form__input" />
                  </div>
                  <div className="order-form__input-box">
                    <label className="order-form__label">Código: </label>
                    <Input className="order-form__input" />
                  </div>
                </fieldset>
              )}

              {formData.pay === 'credito' && (
                <fieldset className="order-form__field">
                  <legend className="order-form__legend">Dados do cartão de crédito:</legend>
                  <div className="order-form__input-box">
                    <label className="order-form__label">Nome: </label>
                    <Input className="order-form__input" />
                  </div>
                  <div className="order-form__input-box">
                    <label className="order-form__label">Nº do cartão: </label>
                    <Input className="order-form__input" />
                  </div>
                  <div className="order-form__input-box">
                    <label className="order-form__label">Bandeira: </label>
                    <Input className="order-form__input" />
                  </div>
                  <div className="order-form__input-box">
                    <label className="order-form__label">Validade: </label>
                    <Input className="order-form__input" />
                  </div>
                  <div className="order-form__input-box">
                    <label className="order-form__label">Código: </label>
                    <Input className="order-form__input" />
                  </div>
                  <div className="order-form__input-box">
                    <label className="order-form__label">Parcelas: </label>
                    <Input className="order-form__input" />
                  </div>
                </fieldset>
              )}

              <Button className="order-form__button" type="submit" /*disabled={}*/>
                Comprar {formData.pay !== '' && `no ${typeOfPay}`}
              </Button>

              <Link className="order-form__link link-to-button" to="/menu">
                Voltar ao cardápio
              </Link>
              <Link className="order-form__link link-to-button" to="/cart">
                Voltar ao carrinho
              </Link>
            </form>

            <aside className="checkout__aside">
              <h2 className="checkout__subtitle">Detalhes do pedido:</h2>
              <div className="checkout__item-box">
                <h3 className="checkout__item-title">Items:</h3>
                <ul className="checkout__item-list">
                  {cartItems.map((item) => {
                    return (
                      <li className="checkout__item-item" key={item.inventoryLotId}>
                        <p className="checkout__item-description">{item.productName}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="checkout__item-box">
                <h3 className="checkout__item-title">Tipo:</h3>
                <p className="checkout__item-description">{cartData.meal}</p>
              </div>

              <div className="checkout__item-box">
                <h3 className="checkout__item-title">Entrega:</h3>
                <p className="checkout__item-description">{cartData.method}</p>
              </div>

              <div className="checkout__item-box">
                <h3 className="checkout__item-title">Endereço:</h3>
                <p className="checkout__item-description">
                  {cartData.address}, {cartData.number},
                  {cartData.complement === '-' ? ' ' : ' ' + cartData.complement + ', '}
                  {cartData.district}, {cartData.cep}
                </p>
              </div>

              {cartData.infoText !== '' && (
                <div className="checkout__item-box">
                  <h3 className="checkout__item-title">Observação:</h3>
                  <p className="checkout__item-description">{cartData.infoText}</p>
                </div>
              )}

              <div className="checkout__item-box">
                <h3 className="checkout__item-title">Total:</h3>
                <p className="checkout__item-description"> R$ xx,xx</p>
              </div>
            </aside>
          </div>
        </>
      )}
    </section>
  );
}

export default Checkout;
