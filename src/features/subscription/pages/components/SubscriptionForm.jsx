import Button from '../../../../shared/components/ui/button/Button.jsx';
import Input from '../../../../shared/components/ui/input/Input.jsx';
import Textarea from '../../../../shared/components/ui/textarea/Textarea.jsx';
import qrCodeImg from '../../../../assets/images/qrcode.jpg';
import useAuthStore from '../../../../store/useAuthStore.js';
import { useState } from 'react';
import Toast from '../../../../shared/components/ui/toast/Toast.jsx';
import useSubscription from '../../hooks/useSubscription.js';
import Loader from '../../../../shared/components/ui/loader/Loader.jsx';
import { useNavigate } from 'react-router-dom';
import './SubscriptionForm.css';

function SubscriptionForm() {
  const navigate = useNavigate();

  const [toast, setToast] = useState(null);

  const user = useAuthStore((state) => state.user);

  const { sendSubscribe, loading, localError } = useSubscription(user);

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

  const isSuccess = toast?.type === 'success';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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

  const handleSubscribe = async (data) => {
    try {
      await sendSubscribe(data);

      setFormData({
        userName: '',
        email: '',
        confirmEmail: '',
        tel: '',
        password: '',
        confirmPassword: '',

        howLong: '',
        daysOn: [],
        schedules: {},
        method: '',

        cep: '',
        address: '',
        number: '',
        complement: '',
        district: '',
        infoText: '',

        pay: '',
      });

      // Navega automaticamente para '/profile/subscription-profile', pelo SubscriptionRoute
    } catch (error) {
      if (error.status === 401) {
        setToast({
          message:
            'Não autorizado. Usuário já cadastrado. Poderia confirmar seus dados e reenviar a assinatura para podermos prosseguir?',
          type: 'error',
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setToast(null);

    // Verificação de 'required' para checkboxes e times
    if (formData.daysOn.length === 0) {
      setToast({
        message:
          'Precisamos saber quais os dias para preparar suas refeições, selecione no campo "Configurações da assinatura".',
        type: 'error',
      });
      return;
    }

    const allSchedulesFilled = formData.daysOn.every((day) => formData.schedules[day]);

    if (!allSchedulesFilled) {
      setToast({
        message:
          'Você precisa definir o horário para cada dia selecionado, no campo "Configurações da assinatura".',
        type: 'error',
      });
      return;
    }

    handleSubscribe(formData);
  };

  return (
    <form
      className="form subscription__form"
      name="subscription"
      onSubmit={handleSubmit}
      /*noValidate*/
    >
      <h2 className="form__title">Assine aqui</h2>

      <fieldset className="form__field">
        <legend className="form__legend">Dados cadastrais</legend>

        <div className="form__input-box">
          <label className="form__label form__label_bold" htmlFor="userName">
            Seu nome completo:
          </label>
          <Input
            className="form__input"
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

        <div className="form__input-box">
          <label className="form__label form__label_bold" htmlFor="email">
            E-mail:
          </label>
          <Input
            className="form__input"
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
          <div className="form__input-box">
            <label className="form__label form__label_bold" htmlFor="confirmEmail">
              Confirmação de e-mail:
            </label>
            <Input
              className="form__input"
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

        <div className="form__input-box">
          <label className="form__label form__label_bold" htmlFor="tel">
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
            placeholder="Digite seu telefone para contato, no formato: (XX) XXXXX-XXXX"
            value={formData.tel}
            onChange={handleChange}
            required
          />
        </div>

        {!user && (
          <div className="form__input-box">
            <label className="form__label form__label_bold" htmlFor="password">
              Senha:
            </label>
            <Input
              className="form__input"
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
          <div className="form__input-box">
            <label className="form__label form__label_bold" htmlFor="confirmPassword">
              Confirmação se senha:
            </label>
            <Input
              className="form__input"
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

      <fieldset className="form__field">
        <legend className="form__legend">Configurações da assinatura</legend>

        <div className="form__radios-box">
          <p className="form__radios-name">Por quanto tempo?</p>

          <div className="form__input-box form__input-box_inline">
            <label className="form__label" htmlFor="two">
              Dois meses
            </label>
            <Input
              className="form__input"
              type="radio"
              id="two"
              name="howLong"
              value="two"
              checked={formData.howLong === 'two'}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__input-box form__input-box_inline">
            <label className="form__label" htmlFor="four">
              Quatro meses
            </label>
            <Input
              className="form__input"
              type="radio"
              id="four"
              name="howLong"
              value="four"
              checked={formData.howLong === 'four'}
              onChange={handleChange}
            />
          </div>

          <div className="form__input-box form__input-box_inline">
            <label className="form__label" htmlFor="six">
              Seis meses
            </label>
            <Input
              className="form__input"
              type="radio"
              id="six"
              name="howLong"
              value="six"
              checked={formData.howLong === 'six'}
              onChange={handleChange}
            />
          </div>

          <div className="form__input-box form__input-box_inline">
            <label className="form__label" htmlFor="twelve">
              Um ano
            </label>
            <Input
              className="form__input"
              type="radio"
              id="twelve"
              name="howLong"
              value="twelve"
              checked={formData.howLong === 'twelve'}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form__checkboxes-box">
          <p className="form__checkboxes-name">Em quais dias da semana e horários?</p>

          <p className="form__checkboxes-name">Dias:</p>

          <div className="form__input-box form__input-box_inline">
            <label className="form__label" htmlFor="seg">
              Segunda
            </label>
            <Input
              className="form__input"
              type="checkbox"
              id="seg"
              name="daysOn"
              value="seg"
              checked={formData.daysOn.includes('seg')}
              onChange={handleChange}
            />
          </div>

          <div className="form__input-box form__input-box_inline">
            <label className="form__label" htmlFor="ter">
              Terça
            </label>
            <Input
              className="form__input"
              type="checkbox"
              id="ter"
              name="daysOn"
              value="ter"
              checked={formData.daysOn.includes('ter')}
              onChange={handleChange}
            />
          </div>

          <div className="form__input-box form__input-box_inline">
            <label className="form__label" htmlFor="qua">
              Quarta
            </label>
            <Input
              className="form__input"
              type="checkbox"
              id="qua"
              name="daysOn"
              value="qua"
              checked={formData.daysOn.includes('qua')}
              onChange={handleChange}
            />
          </div>

          <div className="form__input-box form__input-box_inline">
            <label className="form__label" htmlFor="qui">
              Quinta
            </label>
            <Input
              className="form__input"
              type="checkbox"
              id="qui"
              name="daysOn"
              value="qui"
              checked={formData.daysOn.includes('qui')}
              onChange={handleChange}
            />
          </div>

          <div className="form__input-box form__input-box_inline">
            <label className="form__label" htmlFor="sex">
              Sexta
            </label>
            <Input
              className="form__input"
              type="checkbox"
              id="sex"
              name="daysOn"
              value="sex"
              checked={formData.daysOn.includes('sex')}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form__times-box">
          <p className="form__times-name">Horários:</p>

          {formData.daysOn.length > 0 ? (
            <>
              {formData.daysOn.map((day) => {
                return (
                  <div key={day} className="form__input-box">
                    <label className="form__label" htmlFor={`schedule-${day}`}>
                      {day === 'seg' && 'Segunda'}
                      {day === 'ter' && 'Terça'}
                      {day === 'qua' && 'Quarta'}
                      {day === 'qui' && 'Quinta'}
                      {day === 'sex' && 'Sexta'}
                    </label>

                    <Input
                      className="form__input form__input_time"
                      type="time"
                      id={`schedule-${day}`}
                      name={day}
                      min="10:45"
                      max="19:45"
                      value={formData.schedules[day] || ''}
                      onChange={handleChange}
                    />
                  </div>
                );
              })}
              <small className="form__times-small">
                *Horário de funcionamento: 10h45 às 19h45.*
              </small>
            </>
          ) : (
            <p className="form__times-text">
              Selecione os dias para poder definir cada horário aqui.
            </p>
          )}
        </div>

        <div className="form__radios-box">
          <p className="form__radios-name">Qual a forma de entrega padrão?</p>

          <div className="form__input-box form__input-box_inline">
            <label className="form__label" htmlFor="delivery">
              Delivery
            </label>
            <Input
              className="form__input"
              type="radio"
              id="delivery"
              name="method"
              value="delivery"
              checked={formData.method === 'delivery'}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__input-box form__input-box_inline">
            <label className="form__label" htmlFor="drive-thru">
              Drive-thru
            </label>
            <Input
              className="form__input"
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
        <fieldset className="form__field">
          <legend className="form__legend">Endereço para entrega</legend>

          <div className="form__input-box">
            <label className="form__label form__label_bold" htmlFor="cep">
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
              placeholder="O CEP do endereço, caso a entrega seja por delivery"
              value={formData.cep}
              onChange={handleChange}
              required={formData.method === 'delivery'}
            />
          </div>

          <div className="form__input-box">
            <label className="form__label form__label_bold" htmlFor="address">
              Logradouro (rua, avenida, praça, etc):
            </label>
            <Input
              className="form__input"
              type="text"
              id="address"
              name="address"
              pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
              title="Seu endereço para delivery: não são permitidos '<' e '>'."
              placeholder="O endereço"
              value={formData.address}
              onChange={handleChange}
              required={formData.method === 'delivery'}
            />
          </div>

          <div className="form__input-box">
            <label className="form__label form__label_bold" htmlFor="number">
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
              placeholder="O nº do endereço"
              value={formData.number}
              onChange={handleChange}
              required={formData.method === 'delivery'}
            />
          </div>

          <div className="form__input-box">
            <label className="form__label form__label_bold" htmlFor="complement">
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
            <label className="form__label form__label_bold" htmlFor="district">
              Bairro:
            </label>
            <Input
              className="form__input"
              type="text"
              id="district"
              name="district"
              pattern="^[a-zA-ZÀ-ÿ0-9\s]*$" /* apenas números, letras, acentos, e espaços em branco */
              title="O bairro do seu endereço para delivery: apenas números e/ou letras."
              placeholder="O bairro"
              value={formData.district}
              onChange={handleChange}
              required={formData.method === 'delivery'}
            />
          </div>
        </fieldset>
      )}

      <fieldset className="form__field">
        <legend className="form__legend">Observação</legend>
        <div className="form__input-box">
          <label className="form__label form__label_bold" htmlFor="infoText">
            Informações adicionais:
          </label>
          <Textarea
            className="form__textarea"
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

      <fieldset className="form__field">
        <legend className="form__legend">Forma de pagamento:</legend>

        <div className="form__input-box form__input-box_inline">
          <label className="form__label" htmlFor="pix">
            PIX
          </label>
          <Input
            className="form__input"
            type="radio"
            id="pix"
            name="pay"
            value="pix"
            checked={formData.pay === 'pix'}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form__input-box form__input-box_inline">
          <label className="form__label" htmlFor="debito">
            Cartão de débito
          </label>
          <Input
            className="form__input"
            type="radio"
            id="debito"
            name="pay"
            value="debito"
            checked={formData.pay === 'debito'}
            onChange={handleChange}
          />
        </div>

        <div className="form__input-box form__input-box_inline">
          <label className="form__label" htmlFor="credito">
            Cartão de crédito
          </label>
          <Input
            className="form__input"
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
        <fieldset className="form__field form__field_payment">
          <legend className="form__legend">Dados para PIX:</legend>
          <dl className="form__pix-details">
            <dt className="form__pix-term">Chave PIX: </dt>
            <dd className="form__pix-description">portfolio@exemplo.com</dd>
          </dl>

          <p className="form__pix-qr-label">QR Code:</p>
          <img
            className="form__pix-qr-img"
            src={qrCodeImg}
            alt="Imagem demonstrativa de um QR Code com desenho centralizado de coração."
          />
        </fieldset>
      )}

      {formData.pay === 'debito' && (
        <fieldset className="form__field form__field_payment">
          <legend className="form__legend">Dados do cartão de débito:</legend>
          <div className="form__input-box">
            <label className="form__label">Nome: </label>
            <input className="form__input" disabled />
          </div>
          <div className="form__input-box">
            <label className="form__label">Nº do cartão: </label>
            <input className="form__input" disabled />
          </div>
          <div className="form__input-box">
            <label className="form__label">Bandeira: </label>
            <input className="form__input" disabled />
          </div>
          <div className="form__input-box">
            <label className="form__label">Validade: </label>
            <input className="form__input" disabled />
          </div>
          <div className="form__input-box">
            <label className="form__label">Código: </label>
            <input className="form__input" disabled />
          </div>
        </fieldset>
      )}

      {formData.pay === 'credito' && (
        <fieldset className="form__field form__field_payment">
          <legend className="form__legend">Dados do cartão de crédito:</legend>
          <div className="form__input-box">
            <label className="form__label">Nome: </label>
            <input className="form__input" disabled />
          </div>
          <div className="form__input-box">
            <label className="form__label">Nº do cartão: </label>
            <input className="form__input" disabled />
          </div>
          <div className="form__input-box">
            <label className="form__label">Bandeira: </label>
            <input className="form__input" disabled />
          </div>
          <div className="form__input-box">
            <label className="form__label">Validade: </label>
            <input className="form__input" disabled />
          </div>
          <div className="form__input-box">
            <label className="form__label">Código: </label>
            <input className="form__input" disabled />
          </div>
          <div className="form__input-box">
            <label className="form__label">Parcelas: </label>
            <input className="form__input" disabled />
          </div>
        </fieldset>
      )}

      <p className="form__note">
        ***Ambiente de demonstração. Nenhum dado de pagamento é processado ou armazenado.
      </p>

      {toast && <Toast className="form__toast" message={toast.message} />}

      {loading && <Loader className="form__loader">Enviando dados de assinatura...</Loader>}

      {localError && localError.status !== 401 && (
        <Toast className="form__error-toast" message={localError.message} />
      )}

      {isSuccess ? (
        <Button className="form__button" onClick={() => navigate('/menu')}>
          Montar minha primeira sopa, meu primeiro creme ou patê :)
        </Button>
      ) : (
        <Button className="form__button" type="submit">
          Assinar {formData.howLong && `por ${howLong}`} :)
        </Button>
      )}
    </form>
  );
}

export default SubscriptionForm;
