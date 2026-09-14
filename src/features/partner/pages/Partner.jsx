import './Partner.css';
import Button from '../../../shared/components/ui/button/Button.jsx';
import Input from '../../../shared/components/ui/input/Input.jsx';
import { useState } from 'react';
import useAuthStore from '../../../store/useAuthStore.js';
import { useShallow } from 'zustand/react/shallow';
import Toast from '../../../shared/components/ui/toast/Toast.jsx';

function Partner() {
  const { user, globalError } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      globalError: state.globalError,
    }))
  );

  const [formData, setFormData] = useState({
    userName: user?.userName || '',
    email: user?.email || '',
    tel: user?.tel || '',

    contactMethod: '',

    companyName: '',
    cnpj: '',
    cep: '',
    address: '',
    numberAddress: '',
    complementAddress: '',
    district: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handlePartner(formData);
  };

  return (
    <section className="partner content__parter">
      <h1 className="partner__title">
        Vamos evitar, juntos, o descarte de produtos do seu mercado?
      </h1>

      <p className="partner__text">
        Nos envie seu cadastro para entramos em contato e combinarmos nosso plano de ação :)
      </p>

      <form className="partner__form" name="partner" onSubmit={handleSubmit} /*noValidate*/>
        <fieldset className="partner__field">
          <legend className="partner__legend">Dados cadastrais (responsável)</legend>

          <div className="partner__input-box">
            <label className="partner__label" htmlFor="userName">
              Nome completo:
            </label>
            <Input
              className="partner__input"
              id="userName"
              type="text"
              name="userName"
              pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
              title="O nome completo do responsável para contato. Não são permitidos os caracteres '<' e '>', por questão de segurança."
              placeholder="O nome completo do responsável para contato."
              value={formData.userName}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          <div className="partner__input-box">
            <label className="partner__label" htmlFor="email">
              E-mail:
            </label>
            <Input
              className="partner__input"
              id="email"
              type="email"
              name="email"
              pattern="^[a-zA-Z0-9_.\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
              title="E-mail válido: contento apenas letras, números, sublinhados, pontos ou hífens."
              placeholder="Um e-mail válido para contato."
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="partner__input-box">
            <label className="partner__label" htmlFor="tel">
              Telefone:
            </label>
            <Input
              className="partner__input"
              id="tel"
              type="tel"
              name="tel"
              inputMode="numeric"
              minLength={14}
              maxLength={15}
              pattern="^\([1-9]{2}\)\s[0-9]?[0-9]{4}-[0-9]{4}$"
              title="Telefone fixo ou celular. Formato: (xx) xxxxx-xxxx."
              placeholder="Telefone válido para contato, no formato: (XX) XXXXX-XXXX"
              value={formData.tel}
              onChange={handleChange}
              required
            />
          </div>
        </fieldset>

        <fieldset className="partner__field">
          <legend className="partner__legend">Forma de contato</legend>

          <div className="partner__input-box partner__input-box_radio">
            <label className="partner__label" htmlFor="emailMethod">
              Prefiro e-mail
            </label>
            <Input
              className="partner__input partner__input_radio"
              id="emailMethod"
              type="radio"
              name="contactMethod"
              title="Qual forma de contato é melhor para você?"
              value="email"
              checked={formData.contactMethod === 'email'}
              onChange={handleChange}
            />
          </div>

          <div className="partner__input-box partner__input-box_radio">
            <label className="partner__label" htmlFor="telMethod">
              Prefiro telefone
            </label>
            <Input
              className="partner__input partner__input_radio"
              id="telMethod"
              type="radio"
              name="contactMethod"
              title="Qual forma de contato é melhor para você?"
              value="tel"
              checked={formData.contactMethod === 'tel'}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <fieldset className="partner__field">
          <legend className="partner__legend">Dados cadastrais (empresa)</legend>

          <div className="partner__input-box">
            <label className="partner__label" htmlFor="companyName">
              Razão socail:
            </label>
            <Input
              className="partner__input"
              id="companyName"
              type="text"
              name="companyName"
              pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
              title="A razão social da empresa. Não são permitidos os caracteres '<' e '>', por questão de segurança."
              placeholder="Qual a razão social da empresa?"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="partner__input-box">
            <label className="partner__label" htmlFor="cnpj">
              CNPJ:
            </label>
            <Input
              className="partner__input"
              id="cnpj"
              type="text"
              name="cnpj"
              minLength={14}
              maxLength={18}
              pattern="^([A-Z0-9]{12}[0-9]{2}|[A-Z0-9]{2}\.[A-Z0-9]{3}\.[A-Z0-9]{3}\/[A-Z0-9]{4}-[0-9]{2})$"
              title="CNPJ. Formatos aceitos: AA.AAA.AAA/AAAA-XX ou AAAAAAAAAAAAXX."
              placeholder="E o CNPJ? No formato: AA.AAA.AAA/AAAA-XX ou AAAAAAAAAAAAXX."
              value={formData.cnpj}
              onChange={handleChange}
              required
            />
          </div>

          <div className="partner__inputs-container">
            <div className="partner__input-box">
              <label className="partner__label" htmlFor="cep">
                CEP:
              </label>
              <Input
                className="partner__input"
                id="cep"
                type="text"
                name="cep"
                inputMode="numeric"
                minLength={8}
                maxLength={9}
                pattern="^[0-9]{5}-?[0-9]{3}$"
                title="CEP. Formatos aceitos: XXXXX-XXX ou XXXXXXXX."
                placeholder="O CEP do estabelecimento. No formato: XXXXX-XXX ou XXXXXXXX."
                value={formData.cep}
                onChange={handleChange}
                required
              />
            </div>

            <div className="partner__input-box">
              <label className="partner__label" htmlFor="address">
                Logradouro:
              </label>
              <Input
                className="partner__input"
                id="address"
                type="text"
                name="address"
                pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
                title="O endereço. Não são permitidos '<' e '>', por questões de segurança."
                placeholder="O endereço."
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="partner__input-box">
              <label className="partner__label" htmlFor="numberAddress">
                Nº:
              </label>
              <Input
                className="partner__input"
                id="numberAddress"
                type="text"
                name="numberAddress"
                inputMode="numeric"
                pattern="^[a-zA-Z0-9\s]*$" /* apenas números, letras e espaços em branco */
                title="O número do endereço do estabelecimento. Apenas números e/ou letras."
                placeholder="O número."
                value={formData.numberAddress}
                onChange={handleChange}
              />
            </div>

            <div className="partner__input-box">
              <label className="partner__label" htmlFor="complementAddress">
                Complemento:
              </label>
              <Input
                className="partner__input"
                id="complementAddress"
                type="text"
                name="complementAddress"
                pattern="^[a-zA-Z0-9\s.\-]*$" /* apenas números, letras, espaços em branco, pontos e traços */
                title="O complemento do endereço, se houver. Apenas números, letras, espaços em branco, pontos e/ou traços."
                placeholder="O complemento, se houver."
                value={formData.complementAddress}
                onChange={handleChange}
              />
            </div>

            <div className="partner__input-box">
              <label className="partner__label" htmlFor="district">
                Bairro:
              </label>
              <Input
                className="partner__input"
                id="district"
                type="text"
                name="district"
                pattern="^[a-zA-Z0-9\s]*$" /* apenas números, letras e espaços em branco */
                title="O bairro do estabelecimento. Apenas números e/ou letras."
                placeholder="E o bairro."
                value={formData.district}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

        {globalError && <Toast className="partner__toast" message={globalError.message} />}

        <Button className="partner__button" type="submit">
          ENVIAR
        </Button>
      </form>
    </section>
  );
}

export default Partner;
