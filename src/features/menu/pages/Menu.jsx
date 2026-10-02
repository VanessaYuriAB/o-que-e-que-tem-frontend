import { NavLink, Outlet } from 'react-router-dom';
import { menuLinks } from '../../../shared/constants/navigation';
import foodPyramidImg from '../../../assets/images/piramide-alimentar.png';
import useMenu from '../hooks/useMenu.js';
import styles from './Menu.module.css';

function Menu() {
  const menuState = useMenu();

  const customClassName = ({ isActive }) =>
    `${styles.menu__link} nav__link ${isActive ? styles['menu__link_active'] : ''}`;

  return (
    <section className={`${styles.menu} ${styles.content__menu}`}>
      <h1 className={styles.menu__title}> Será que tem feijão?</h1>
      <section className={styles.menu__content}>
        <h2 className={styles.menu__subtitle}>Descubra nossa seleção de ingredientes de hoje. </h2>
        <p className={styles.menu__description}>
          Aqui estão os ingredientes disponíveis, separados por categoria. Você pode escolher o que
          prefere para juntar na sua sopa, creme ou patê.
        </p>
        <p className={styles.menu__description}>
          Depois de selecionar, clique no botão para navegar ao Carrinho de sopas, cremes ou patês.
        </p>
        <nav className={styles.menu__links} aria-label="Categorias dos ingredientes disponíveis.">
          <ul className={`${styles.menu__list} nav__list`}>
            {menuLinks.map((link) => (
              <li key={link.to} className={styles.menu__item}>
                <NavLink className={customClassName} to={link.to}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Outlet context={menuState} />
      </section>

      <aside className={styles.menu__aside}>
        <h3 className={styles['menu__aside-title']}>Como é cada produto?</h3>
        <div className={styles['menu__aside-content']}>
          <section className={styles.menu__soup}>
            <h4 className={styles['menu__soup-title']}>Sopa</h4>
            <p className={styles['menu__soup-description']}>
              O caldo é um pouco mais fino, nem tudo é batido, pelo menos um ingrediente é sólido.
            </p>
          </section>
          <section className={styles.menu__cream}>
            <h4 className={styles['menu__cream-title']}>Creme</h4>
            <p className={styles['menu__cream-description']}>
              Tudo é batido, todos os ingredientes são processados e resultam num creme mais
              espesso.
            </p>
          </section>
          <section className={styles.menu__pate}>
            <h4 className={styles['menu__pate-title']}>Patê</h4>
            <p className={styles['menu__pate-description']}>É gelado, denso e tudo é batido. </p>
          </section>

          <figure className={styles.menu__figure}>
            <img
              className={styles['menu__figure-img']}
              src={foodPyramidImg}
              alt="Pirâmide de alimentos com porção diária recomendada."
            />
            <figcaption className={styles.menu__figcaption}>
              <a
                className={styles['menu__figcaption-link']}
                href="https://www.todamateria.com.br/piramide-alimentar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label='Ir para site "Toda Matéria", na página do artigo da imagem.'
              >
                *https://www.todamateria.com.br/piramide-alimentar
              </a>
            </figcaption>
          </figure>
        </div>
      </aside>
    </section>
  );
}

export default Menu;
