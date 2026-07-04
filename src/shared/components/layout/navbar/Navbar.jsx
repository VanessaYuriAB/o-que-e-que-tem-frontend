import { NavLink, useLocation } from 'react-router-dom';
import useAuthStore from '../../../../store/useAuthStore.js';
import { navbarLinksLoggedOff, navbarLinksLoggedOn } from '../../../constants/navigation.js';

import './Navbar.css';

function Navbar() {
  const location = useLocation();

  const user = useAuthStore((state) => state.user);

  const navbarLinks = user ? navbarLinksLoggedOn : navbarLinksLoggedOff;

  const customClassName = ({ isActive }) =>
    `navbar__link nav__link ${isActive ? 'navbar__link_active' : ''}`;

  return (
    <div className="navbar header__navbar">
      <nav className="navbar__links nav" aria-label="Ações do usuário">
        <ul className="navbar__list nav__list">
          {navbarLinks.map((link) => (
            <li key={link.to} className={link.liClass}>
              <NavLink
                className={customClassName}
                to={link.to}
                state={
                  link.to === '/login' || link.to === '/register' ? { from: location } : undefined
                }
                aria-label={link.label}
                title={link.title}
              >
                <img className={link.imgClass} src={link.imgSrc} alt="" />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
