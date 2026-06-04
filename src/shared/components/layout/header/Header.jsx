import Logo from '../../ui/logo/Logo.jsx';
import Navbar from '../navbar/Navbar.jsx';
import Sidebar from '../sidebar/Sidebar.jsx';

import './Header.css';

function Header() {
  return (
    <header className="header page__header">
      <div className="header__logo">
        <Logo />
      </div>

      <div className="header__navigation">
        <Sidebar />
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
