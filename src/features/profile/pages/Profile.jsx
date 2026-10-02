import { Outlet, NavLink } from 'react-router-dom';
import useAuthStore from '../../../store/useAuthStore.js';
import styles from './Profile.module.css';

function Profile() {
  const user = useAuthStore((state) => state.user);

  const customClassName = ({ isActive }) =>
    `${styles.profile__link} nav__link link-to-button ${isActive ? styles['profile__link_active'] : ''}`;

  return (
    <section className={`${styles.profile} ${styles.content__profile}`}>
      <div className={styles.profile__box}>
        <h1 className={styles.profile__title}>Olá, {user.userName}!</h1>
        <h2 className={styles.profile__subtitle}>
          Aqui estão seus dados de perfil e configurações da sua conta
        </h2>
        <p className={styles.profile__text}>
          Caso tenha nossa assinatura, você pode editar seu plano a qualquer momento
        </p>
        <p className={styles.profile__text}>Caso não tenha, faça :)</p>
        <p className={styles.profile__text}>É muito simples, prático e personalizável</p>
        <p className={styles.profile__text}>
          Você deixa definido em que dias quer receber ou buscar nossas refeições e vai escolhendo o
          que quer a cada consumo
        </p>
        <p className={styles.profile__text}>
          Além de adquirir um super prato nutrivito, você ajuda a evitar o desperdício, é demais! s2
        </p>
      </div>
      <nav className={styles.profile__nav} aria-label="Ações do perfil.">
        <ul className={`${styles.profile__list} nav__list`}>
          <li className={styles.profile__item}>
            <NavLink className={customClassName} to="user-profile">
              Dados Pessoais
            </NavLink>
          </li>
          <li className={styles.profile__item}>
            <NavLink className={customClassName} to="subscription-profile">
              Configuração de Assinatura
            </NavLink>
          </li>
          <li className={styles.profile__item}>
            <NavLink className={customClassName} to="orders-profile">
              Seus pedidos
            </NavLink>
          </li>
          <li className={styles.profile__item}>
            <NavLink className={customClassName} to="msgs-profile">
              Suas mensagens
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </section>
  );
}

export default Profile;
