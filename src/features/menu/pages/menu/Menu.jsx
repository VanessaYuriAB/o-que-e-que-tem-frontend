import { NavLink, Outlet } from 'react-router-dom';

import foodPyramidImg from '../../../../assets/images/piramide-alimentar.png';

import './Menu.css';

function Menu() {
  const customClassName = ({ isActive }) =>
    `menu__link nav__link ${isActive ? 'menu__link_active' : ''}`;

  return (
    <section className="menu content__menu">
      <div className="menu__content">
        <h1 className="menu__title"> Será que tem?</h1>
        <h2 className="menu__subtitle">Descubra nossa seleção de ingredientes de hoje. </h2>
        <p className="menu__description">
          Aqui estão os ingredientes disponíveis. Você pode escolher o que prefere para juntar na
          sua sopa, creme ou patê.
        </p>
        <ul className="menu__list">
          <li className="menu__item">
            <NavLink className={customClassName} to="carboidratos">
              Carboidratos
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink className={customClassName} to="verduras-legumes">
              Verduras e legumes
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink className={customClassName} to="leites-derivados">
              Leites e derivados
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink className={customClassName} to="carnes-ovos-peixes">
              Carnes, ovos e peixes
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink className={customClassName} to="leguminosas-oleaginosas">
              Leguminosas e oleaginosas
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink className={customClassName} to="oleos-gorduras">
              Óleos e gorduras
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink className={customClassName} to="acucares-doces">
              Açúcares e Doces
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
      <aside className="menu__aside">
        <h3 className="menu__aside-title">Como cada produto é?</h3>
        <section className="menu__soup">
          <h4 className="menu__soup-title">Sopa</h4>
          <p className="menu__soup-description">
            O caldo é um pouco mais fino, nem tudo é batido, pelo menos um ingrediente é sólido.
          </p>
        </section>
        <section className="menu__cream">
          <h4 className="menu__cream-title">Creme</h4>
          <p className="menu__cream-description">
            Tudo é batido, todos os ingredientes são processados e resultam num creme mais espesso.
          </p>
        </section>
        <section className="menu__pate">
          <h4 className="menu__pate-title">Patê</h4>
          <p className="menu__pate-description">É gelado, denso e tudo é batido. </p>
        </section>
        <figure className="menu__figure">
          <img
            className="menu__figure-img"
            src={foodPyramidImg}
            alt="Pirâmide de alimentos com porção diária recomendada."
          />
          <figcaption className="menu__figcaption">
            <a
              className="menu__figcaption-link"
              href="https://www.todamateria.com.br/piramide-alimentar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label='Ir para site "Toda Matéria", na página do artigo da imagem.'
            >
              *https://www.todamateria.com.br/piramide-alimentar
            </a>
          </figcaption>
        </figure>
      </aside>
    </section>
  );
}

export default Menu;
