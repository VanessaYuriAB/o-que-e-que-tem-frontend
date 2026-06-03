import Logo from '../logo/Logo.jsx';
import Navbar from '../navbar/Navbar.jsx';
import Sidebar from '../sidebar/Sidebar.jsx';

import './Header.css';

function Header() {
  return (
    <header className="header page__header">
      <Logo />
      <div className="header__navigation">
        <Sidebar />
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
