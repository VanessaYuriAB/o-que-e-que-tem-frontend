import { Outlet, NavLink } from 'react-router-dom';
import useAuthStore from '../../../store/useAuthStore.js';
import './Profile.css';

function Profile() {
  const user = useAuthStore((state) => state.user);

  console.log('Usuário em Profile:', user);

  const customClassName = ({ isActive }) =>
    `profile__link nav__link link-to-button ${isActive ? 'profile__link_active' : ''}`;

  return (
    <section className="profile content__profile">
      <div className="profile__box">
        <h1 className="profile__title">Olá, {user.userName}!</h1>
        <h2 className="profile__subtitle">
          Aqui estão seus dados de perfil e configurações da sua conta
        </h2>
        <p className="profile__text">
          Caso tenha nossa assinatura, você pode editar seu plano a qualquer momento
        </p>
        <p className="profile__text">Caso não tenha, faça :)</p>
        <p className="profile__text">É muito simples, prático e personalizável</p>
        <p className="profile__text">
          Você deixa definido em que dias quer receber ou buscar nossas refeições e vai escolhendo o
          que quer a cada consumo
        </p>
        <p className="profile__text">
          Além de adquirir um super prato nutrivito, você ajuda a evitar o desperdício, é demais! s2
        </p>
      </div>
      <nav className="profile__nav">
        <ul className="profile__list nav__list">
          <li className="profile__item">
            <NavLink className={customClassName} to="user-profile">
              Dados Pessoais
            </NavLink>
          </li>
          <li className="profile__item">
            <NavLink className={customClassName} to="subscription-profile">
              Configuração de Assinatura
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </section>
  );
}

export default Profile;
