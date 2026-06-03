import { NavLink } from 'react-router-dom';

import { navbarLinks } from '../../../constants/navigation.js';

import './Navbar.css';

function Navbar() {
  const customClassName = ({ isActive }) =>
    `navbar__link nav__link ${isActive ? 'navbar__link_active' : ''}`;

  return (
    <div className="navbar header__navbar">
      <nav className="navbar__links nav" aria-label="Ações do usuário">
        <ul className="navbar__list nav__list">
          {navbarLinks.map((link) => (
            <li key={link.to} className={link.liClass}>
              <NavLink className={customClassName} to={link.to} aria-label={link.label}>
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
