import { NavLink } from 'react-router-dom';
import useAuthStore from '../../../../store/useAuthStore.js';
import { sidebarLinksLoggedOn, sidebarLinksLoggedOff } from '../../../constants/navigation.js';
import styles from './Sidebar.module.css';

function Sidebar() {
  const user = useAuthStore((state) => state.user);

  // Link de subscription só aparece se não estiver logado e não for assinante
  const sidebarLinks = (user ? sidebarLinksLoggedOn : sidebarLinksLoggedOff).filter(
    (link) => !(user?.subscription && link.to === '/subscription')
  );

  const customClassName = ({ isActive }) =>
    `${styles.sidebar__link} nav__link ${isActive ? styles.sidebar__link_active : ''}`;

  return (
    <div className={`${styles.sidebar} ${styles.header__sidebar}`}>
      <details className={styles.sidebar__details}>
        <summary className={styles.sidebar__summary} title="Menu">
          {/* Apenas para acessibilidade */}
          <span className={styles['sidebar__summary-hidden']}>Menu</span>
        </summary>
        <nav className={`${styles.sidebar__links} nav`} aria-label="Menu principal">
          <ul className={`${styles.sidebar__list} nav__list nav__list_sidebar`}>
            {sidebarLinks.map((link) => (
              <li key={link.to} className={styles[link.class]}>
                <NavLink className={customClassName} to={link.to}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </details>
    </div>
  );
}

export default Sidebar;
