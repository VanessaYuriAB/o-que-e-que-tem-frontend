import './Subscription.css';
import Button from '../../../shared/components/ui/button/Button.jsx';
import Input from '../../../shared/components/ui/input/Input.jsx';
import Textarea from '../../../shared/components/ui/textarea/Textarea.jsx';
import qrCodeImg from '../../../assets/images/qrcode.jpg';
import useAuthStore from '../../../store/useAuthStore.js';
import { useState } from 'react';

function Subscription() {
  const user = useAuthStore((state) => state.user);

  const [formData, setFormData] = useState({
    userName: user?.userName ?? '',
    email: user?.email ?? '',
    confirmEmail: '',
    tel: user?.tel ?? '',
    password: '',
    confirmPassword: '',

    howLong: '',
    daysOn: [],
    schedules: {},
    method: '',

    cep: user?.cep ?? '',
    address: user?.address ?? '',
    number: user?.number ?? '',
    complement: user?.complement ?? '',
    district: user?.district ?? '',
    infoText: user?.infoText ?? '',

    pay: '',
  });

  const howLong =
    formData.howLong === 'two'
      ? '2 meses'
      : formData.howLong === 'four'
        ? '4 meses'
        : formData.howLong === 'six'
          ? '6 meses'
          : formData.howLong === 'twelve'
            ? '1 ano'
            : '';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => {
        return {
          ...prevData,
          daysOn:
            checked === true
              ? [...prevData.daysOn, value]
              : prevData.daysOn.filter((day) => day !== value),
        };
      });
    } else {
      setFormData((prevData) => {
        return { ...prevData, [name]: value };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleSubscribe();
  };

  return (
    <section className="subscription content__subscription">
      <h1 className="subscription__title">Seja um assinante</h1>
      <div className="subscription__content">
        <p className="subscription__text">
          Você escolhe com qual frequência quer receber ou retirar nossas refeições.
        </p>
        <p className="subscription__text">
          Deixa definido os dias e horários, e escolhe uma forma padrão de entrega, que pode ser por
          delivery ou drive-thru.
        </p>
        <p className="subscription__text">
          O restante você vai escolhendo conforme consumo: você decide quais ingredientes quer
          juntar para fazer sua sopa, creme ou patê. De acordo com o que estiver diponível no
          momento, nosso cardápio não é fixo, mas a variedade de ingredientes é grande. Conseguimos
          um bom estoque que evita bastante desperdícios.
        </p>
        <p className="subscription__text">
          Você pode assinar por 2 meses, por 4, por 6 e até por um ano todo. E pode pausar a sua
          assinatura por até 2 meses, num período de um ano.
        </p>
      </div>

      <form
        className="subscription__form"
        name="subscription"
        onSubmit={handleSubmit}
        /*noValidate*/
      >
        <h2 className="subscription__form-title">Assine aqui</h2>

        <fieldset className="subscription__field">
          <legend className="subscription__legend">Dados cadastrais</legend>

          <div className="subscription__input-box">
            <label className="subscription__label subscription__label_bold" htmlFor="userName">
              Seu nome completo:
            </label>
            <Input
              className="subscription__input"
              type="text"
              id="userName"
              name="userName"
              pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
              title="Seu nome: não são permitidos '<' e '>'."
              placeholder="Digite seu nome completo"
              value={formData.userName}
              onChange={handleChange}
              autoFocus
              required
            />
          </div>

          <div className="subscription__input-box">
            <label className="subscription__label subscription__label_bold" htmlFor="email">
              E-mail:
            </label>
            <Input
              className="subscription__input"
              type="email"
              id="email"
              name="email"
              pattern="^[a-zA-Z0-9_.\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
              title="E-mail válido: contento apenas letras, números, sublinhados, pontos ou hífens."
              placeholder="Digite um e-mail para contato"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {!user && (
            <div className="subscription__input-box">
              <label
                className="subscription__label subscription__label_bold"
                htmlFor="confirmEmail"
              >
                Confirmação de e-mail:
              </label>
              <Input
                className="subscription__input"
                type="email"
                id="confirmEmail"
                name="confirmEmail"
                pattern="^[a-zA-Z0-9_.\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                title="E-mail válido: contento apenas letras, números, sublinhados, pontos ou hífens."
                placeholder="Confirme seu e-mail"
                value={formData.confirmEmail}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="subscription__input-box">
            <label className="subscription__label subscription__label_bold" htmlFor="tel">
              Telefone:
            </label>
            <Input
              className="subscription__input"
              type="tel"
              id="tel"
              name="tel"
              inputMode="numeric"
              minLength={14}
              maxLength={15}
              pattern="^\([1-9]{2}\)\s[0-9]?[0-9]{4}-[0-9]{4}$"
              title="Fixo ou celular. Formato: (xx) xxxxx-xxxx."
              placeholder="Digite seu telefone para contato, no formato: (XX) XXXXX-XXXX"
              value={formData.tel}
              onChange={handleChange}
              required
            />
          </div>

          {!user && (
            <div className="subscription__input-box">
              <label className="subscription__label subscription__label_bold" htmlFor="password">
                Senha:
              </label>
              <Input
                className="subscription__input"
                type="password"
                id="password"
                name="password"
                minLength={8}
                pattern="^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$"
                title="Senha: mínimo 8 caracteres - pelo menos, uma letra minúscula e um número (maiúsculas tbm são permitidas)."
                placeholder="Digite uma senha para sua conta"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {!user && (
            <div className="subscription__input-box">
              <label
                className="subscription__label subscription__label_bold"
                htmlFor="confirmPassword"
              >
                Confirmação se senha:
              </label>
              <Input
                className="subscription__input"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                pattern="^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$"
                title="Senha: mínimo 8 caracteres - pelo menos, uma letra minúscula e um número (maiúsculas tbm são permitidas)."
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}
        </fieldset>

        <fieldset className="subscription__field">
          <legend className="subscription__legend">Configurações da assinatura</legend>

          <div className="subscription__radios-box">
            <p className="subscription__radios-name">Por quanto tempo?</p>

            <div className="subscription__input-box subscription__input-box_inline">
              <label className="subscription__label" htmlFor="two">
                Dois meses
              </label>
              <Input
                className="subscription__input"
                type="radio"
                id="two"
                name="howLong"
                value="two"
                checked={formData.howLong === 'two'}
                onChange={handleChange}
                required
              />
            </div>

            <div className="subscription__input-box subscription__input-box_inline">
              <label className="subscription__label" htmlFor="four">
                Quatro meses
              </label>
              <Input
                className="subscription__input"
                type="radio"
                id="four"
                name="howLong"
                value="four"
                checked={formData.howLong === 'four'}
                onChange={handleChange}
              />
            </div>

            <div className="subscription__input-box subscription__input-box_inline">
              <label className="subscription__label" htmlFor="six">
                Seis meses
              </label>
              <Input
                className="subscription__input"
                type="radio"
                id="six"
                name="howLong"
                value="six"
                checked={formData.howLong === 'six'}
                onChange={handleChange}
              />
            </div>

            <div className="subscription__input-box subscription__input-box_inline">
              <label className="subscription__label" htmlFor="twelve">
                Um ano
              </label>
              <Input
                className="subscription__input"
                type="radio"
                id="twelve"
                name="howLong"
                value="twelve"
                checked={formData.howLong === 'twelve'}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="subscription__checkboxes-box">
            <p className="subscription__checkboxes-name">Em quais dias da semana?</p>

            <div className="subscription__input-box subscription__input-box_inline">
              <label className="subscription__label" htmlFor="seg">
                Segunda
              </label>
              <Input
                className="subscription__input"
                type="checkbox"
                id="seg"
                name="daysOn"
                value="seg"
                checked={formData.daysOn.includes('seg')}
                onChange={handleChange}
              />
            </div>

            <div className="subscription__input-box subscription__input-box_inline">
              <label className="subscription__label" htmlFor="ter">
                Terça
              </label>
              <Input
                className="subscription__input"
                type="checkbox"
                id="ter"
                name="daysOn"
                value="ter"
                checked={formData.daysOn.includes('ter')}
                onChange={handleChange}
              />
            </div>

            <div className="subscription__input-box subscription__input-box_inline">
              <label className="subscription__label" htmlFor="qua">
                Quarta
              </label>
              <Input
                className="subscription__input"
                type="checkbox"
                id="qua"
                name="daysOn"
                value="qua"
                checked={formData.daysOn.includes('qua')}
                onChange={handleChange}
              />
            </div>

            <div className="subscription__input-box subscription__input-box_inline">
              <label className="subscription__label" htmlFor="qui">
                Quinta
              </label>
              <Input
                className="subscription__input"
                type="checkbox"
                id="qui"
                name="daysOn"
                value="qui"
                checked={formData.daysOn.includes('qui')}
                onChange={handleChange}
              />
            </div>

            <div className="subscription__input-box subscription__input-box_inline">
              <label className="subscription__label" htmlFor="sex">
                Sexta
              </label>
              <Input
                className="subscription__input"
                type="checkbox"
                id="sex"
                name="daysOn"
                value="sex"
                checked={formData.daysOn.includes('sex')}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="subscription__radios-box">
            <p className="subscription__radios-name">Qual a forma de entrega padrão?</p>

            <div className="subscription__input-box subscription__input-box_inline">
              <label className="subscription__label" htmlFor="delivery">
                Delivery
              </label>
              <Input
                className="subscription__input"
                type="radio"
                id="delivery"
                name="method"
                value="delivery"
                checked={formData.method === 'delivery'}
                onChange={handleChange}
                required
              />
            </div>

            <div className="subscription__input-box subscription__input-box_inline">
              <label className="subscription__label" htmlFor="drive-thru">
                Drive-thru
              </label>
              <Input
                className="subscription__input"
                type="radio"
                id="drive-thru"
                name="method"
                value="drive-thru"
                checked={formData.method === 'drive-thru'}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

        {formData.method === 'delivery' && (
          <fieldset className="subscription__field">
            <legend className="subscription__legend">Endereço para entrega</legend>

            <div className="subscription__input-box">
              <label className="subscription__label subscription__label_bold" htmlFor="cep">
                CEP:
              </label>
              <Input
                className="subscription__input"
                type="text"
                id="cep"
                name="cep"
                inputMode="numeric"
                pattern="^[0-9]{5}-[0-9]{3}$" /* apenas números e traço */
                title="O CEP do seu endereço para delivery: apenas números e traço."
                value={formData.cep}
                onChange={handleChange}
                required={formData.method === 'delivery'}
              />
            </div>

            <div className="subscription__input-box">
              <label className="subscription__label subscription__label_bold" htmlFor="address">
                Logradouro (rua, avenida, praça, etc):
              </label>
              <Input
                className="subscription__input"
                type="text"
                id="address"
                name="address"
                pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
                title="Seu endereço para delivery: não são permitidos '<' e '>'."
                value={formData.address}
                onChange={handleChange}
                required={formData.method === 'delivery'}
              />
            </div>

            <div className="subscription__input-box">
              <label className="subscription__label subscription__label_bold" htmlFor="number">
                Nº:
              </label>
              <Input
                className="subscription__input"
                type="text"
                id="number"
                name="number"
                inputMode="numeric"
                pattern="^[a-zA-Z0-9\s]*$" /* apenas números, letras e espaços em branco */
                title="O número do seu endereço para delivery: apenas números e/ou letras."
                value={formData.number}
                onChange={handleChange}
                required={formData.method === 'delivery'}
              />
            </div>

            <div className="subscription__input-box">
              <label className="subscription__label subscription__label_bold" htmlFor="complement">
                Complemento:
              </label>
              <Input
                className="subscription__input"
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

            <div className="subscription__input-box">
              <label className="subscription__label subscription__label_bold" htmlFor="district">
                Bairro:
              </label>
              <Input
                className="subscription__input"
                type="text"
                id="district"
                name="district"
                pattern="^[a-zA-Z0-9\s]*$" /* apenas números, letras e espaços em branco */
                title="O bairro do seu endereço para delivery: apenas números e/ou letras."
                value={formData.district}
                onChange={handleChange}
                required={formData.method === 'delivery'}
              />
            </div>
          </fieldset>
        )}

        <fieldset className="subscription__field">
          <legend className="subscription__legend">Observação</legend>
          <div className="subscription__input-box">
            <label className="subscription__label subscription__label_bold" htmlFor="infoText">
              Informações adicionais:
            </label>
            <Textarea
              className="subscription__textarea"
              id="infoText"
              name="infoText"
              pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
              title="Informações relevantes, exemplo: ponto de referência ou contato para entrega (nome, tel e RG/CPF)."
              placeholder="Opcional. Por exemplo, um ponto de referência (se delivery) ou um contato oficial para entrega (nome, tel e RG/CPF)."
              value={formData.infoText}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <fieldset className="subscription__field">
          <legend className="subscription__legend">Forma de pagamento:</legend>

          <div className="subscription__input-box subscription__input-box_inline">
            <label className="subscription__label" htmlFor="pix">
              PIX
            </label>
            <Input
              className="subscription__input"
              type="radio"
              id="pix"
              name="pay"
              value="pix"
              checked={formData.pay === 'pix'}
              onChange={handleChange}
              required
            />
          </div>

          <div className="subscription__input-box subscription__input-box_inline">
            <label className="subscription__label" htmlFor="debito">
              Cartão de débito
            </label>
            <Input
              className="subscription__input"
              type="radio"
              id="debito"
              name="pay"
              value="debito"
              checked={formData.pay === 'debito'}
              onChange={handleChange}
            />
          </div>

          <div className="subscription__input-box subscription__input-box_inline">
            <label className="subscription__label" htmlFor="credito">
              Cartão de crédito
            </label>
            <Input
              className="subscription__input"
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
          <fieldset className="subscription__field subscription__field_payment">
            <legend className="subscription__legend">Dados para PIX:</legend>
            <dl className="subscription__pix-details">
              <dt className="subscription__pix-term">Chave PIX: </dt>
              <dd className="subscription__pix-description">portfolio@exemplo.com</dd>
            </dl>

            <p className="subscription__pix-qr-label">QR Code:</p>
            <img
              className="subscription__pix-qr-img"
              src={qrCodeImg}
              alt="Imagem demonstrativa de um QR Code com desenho centralizado de coração."
            />
          </fieldset>
        )}

        {formData.pay === 'debito' && (
          <fieldset className="subscription__field subscription__field_payment">
            <legend className="subscription__legend">Dados do cartão de débito:</legend>
            <div className="subscription__input-box">
              <label className="subscription__label">Nome: </label>
              <input className="subscription__input" disabled />
            </div>
            <div className="subscription__input-box">
              <label className="subscription__label">Nº do cartão: </label>
              <input className="subscription__input" disabled />
            </div>
            <div className="subscription__input-box">
              <label className="subscription__label">Bandeira: </label>
              <input className="subscription__input" disabled />
            </div>
            <div className="subscription__input-box">
              <label className="subscription__label">Validade: </label>
              <input className="subscription__input" disabled />
            </div>
            <div className="subscription__input-box">
              <label className="subscription__label">Código: </label>
              <input className="subscription__input" disabled />
            </div>
          </fieldset>
        )}

        {formData.pay === 'credito' && (
          <fieldset className="subscription__field subscription__field_payment">
            <legend className="subscription__legend">Dados do cartão de crédito:</legend>
            <div className="subscription__input-box">
              <label className="subscription__label">Nome: </label>
              <input className="subscription__input" disabled />
            </div>
            <div className="subscription__input-box">
              <label className="subscription__label">Nº do cartão: </label>
              <input className="subscription__input" disabled />
            </div>
            <div className="subscription__input-box">
              <label className="subscription__label">Bandeira: </label>
              <input className="subscription__input" disabled />
            </div>
            <div className="subscription__input-box">
              <label className="subscription__label">Validade: </label>
              <input className="subscription__input" disabled />
            </div>
            <div className="subscription__input-box">
              <label className="subscription__label">Código: </label>
              <input className="subscription__input" disabled />
            </div>
            <div className="subscription__input-box">
              <label className="subscription__label">Parcelas: </label>
              <input className="subscription__input" disabled />
            </div>
          </fieldset>
        )}

        <p className="subscription__form-note">
          ***Ambiente de demonstração. Nenhum dado de pagamento é processado ou armazenado.
        </p>

        <Button className="subscription__button" type="submit">
          Assinar {formData.howLong && `por ${howLong}`} :)
        </Button>
      </form>
    </section>
  );
}

export default Subscription;
