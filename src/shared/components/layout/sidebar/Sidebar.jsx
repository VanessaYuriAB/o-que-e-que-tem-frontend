import { NavLink } from 'react-router-dom';
import useAuthStore from '../../../../store/useAuthStore.js';
import { sidebarLinksLoggedOn, sidebarLinksLoggedOff } from '../../../constants/navigation.js';

import './Sidebar.css';

function Sidebar() {
  const user = useAuthStore((state) => state.user);

  const sidebarLinks = user ? sidebarLinksLoggedOn : sidebarLinksLoggedOff;

  const customClassName = ({ isActive }) =>
    `sidebar__link nav__link ${isActive ? 'sidebar__link_active' : ''}`;

  return (
    <div className="sidebar header__sidebar">
      <details className="sidebar__details">
        <summary className="sidebar__summary" title="Menu">
          {/* Apenas para acessibilidade */}
          <span className="sidebar__summary-hidden">Menu</span>
        </summary>
        <nav className="sidebar__links nav" aria-label="Menu principal">
          <ul className="sidebar__list nav__list">
            {sidebarLinks.map((link) => (
              <li key={link.to} className={link.class}>
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
