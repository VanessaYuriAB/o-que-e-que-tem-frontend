import { NavLink, useLocation } from 'react-router-dom';
import useAuthStore from '../../../../store/useAuthStore.js';
import { navbarLinksLoggedOff, navbarLinksLoggedOn } from '../../../constants/navigation.js';
import styles from './Navbar.module.css';

function Navbar() {
  const location = useLocation();

  const user = useAuthStore((state) => state.user);

  const navbarLinks = user ? navbarLinksLoggedOn : navbarLinksLoggedOff;

  const customClassName = ({ isActive }) =>
    `${styles.navbar__link} nav__link ${isActive ? styles.navbar__link_active : ''}`;

  return (
    <div className={`${styles.navbar} ${styles.header__navbar}`}>
      <nav className={`${styles.navbar__links} nav`} aria-label="Ações do usuário">
        <ul className={`${styles.navbar__list} nav__list`}>
          {navbarLinks.map((link) => (
            <li key={link.to} className={styles[link.liClass]}>
              <NavLink
                className={customClassName}
                to={link.to}
                state={
                  link.to === '/login' || link.to === '/register' ? { from: location } : undefined
                }
                aria-label={link.label}
                title={link.title}
              >
                <img className={styles[link.imgClass]} src={link.imgSrc} alt="" />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
