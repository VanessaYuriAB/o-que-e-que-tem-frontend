import Button from '../../../../../shared/components/ui/button/Button.jsx';
import useAuthStore from '../../../../../store/useAuthStore.js';

import './UserProfile.css';

function UserProfile() {
  const user = useAuthStore((state) => state.user);

  return (
    <section className="data-user profile__data-user">
      <label className="data-user__label">Nome completo:</label>
      <input
        className="data-user__input"
        type="text"
        id="userName"
        name="userName"
        pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
        title="Seu nome: não são permitidos '<' e '>'."
        defaultValue={user.userName}
        disabled
      />
      <label className="data-user__label">E-mail:</label>
      <input
        className="data-user__input"
        type="email"
        id="email"
        name="email"
        pattern="^[a-zA-Z0-9_.\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
        title="E-mail válido: contento apenas letras, números, sublinhados, pontos ou hífens."
        defaultValue={user.email}
        disabled
      />
      <label className="data-user__label">Telefone: </label>
      <input
        className="data-user__input"
        type="tel"
        id="tel"
        name="tel"
        minLength={14}
        maxLength={15}
        pattern="^\([1-9]{2}\)\s[0-9]?[0-9]{4}-[0-9]{4}$"
        title="Fixo ou celular. Formato: (xx) xxxxx-xxxx."
        defaultValue={user.tel}
        disabled
      />
      <label className="data-user__label">Endereço: </label>
      <input
        className="data-user__input"
        type="text"
        id="address"
        name="address"
        pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
        title="Seu endereço para delivery: não são permitidos '<' e '>'."
        defaultValue={user.address ?? ''}
        disabled
      />
      <label className="data-user__label">nº: </label>
      <input
        className="data-user__input"
        type="text"
        id="number"
        name="number"
        pattern="^[a-zA-Z0-9\s]*$" /* apenas números, letras e espaços em branco */
        title="O número do seu endereço para delivery: apenas números e/ou letras."
        defaultValue={user.number ?? ''}
        disabled
      />
      <label className="data-user__label">Complemento: </label>
      <input
        className="data-user__input"
        type="text"
        id="complement"
        name="complement"
        pattern="^[a-zA-Z0-9\s]*$" /* apenas números, letras e espaços em branco */
        title="O complemento do seu endereço para delivery: apenas números e/ou letras."
        defaultValue={user.complement ?? ''}
        disabled
      />
      <label className="data-user__label">Bairro: </label>
      <input
        className="data-user__input"
        type="text"
        id="district"
        name="district"
        pattern="^[a-zA-Z0-9\s]*$" /* apenas números, letras e espaços em branco */
        title="O bairro do seu endereço para delivery: apenas números e/ou letras."
        defaultValue={user.district ?? ''}
        disabled
      />
      <label className="data-user__label">CEP: </label>
      <input
        className="data-user__input"
        type="text"
        id="cep"
        name="cep"
        pattern="^[0-9]{5}\-[0-9]{3}$" /* apenas números e traço */
        title="O CEP do seu endereço para delivery: apenas números e traço."
        defaultValue={user.cep ?? ''}
        disabled
      />

      <label className="data-user__label">Informação(ões) Adicional(ais): </label>
      <textarea
        className="data-user__textarea"
        id="info-text"
        name="info-text"
        pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
        title="Fixo ou celular. Formato: (xx) xxxxx-xxxx."
        placeholder="Pode nos enviar informações que considere relevante, por exemplo um ponto de referência ou um contato oficial para entrega."
        defaultValue={user.infoText ?? ''}
        disabled
      />

      <Button
        className="data-user__button"
        type="button"
        onClick={() => {
          // Remover atributo disabled dos campos (inputs e textarea)
          // Alternar botão para 'Enviar'
        }}
      >
        Editar
      </Button>

      {/*<Button
        className="data-user__button"
        type="submit"
        onClick={() => {
          // Envia valores dos campos para a rota de atualização de perfil (do backend)
          // Reativa 'disabled' em tds os campos
          // Alterna para botão 'Editar'
        }}
      >
        Enviar
      </Button>*/}
    </section>
  );
}

export default UserProfile;
