import Navbar from '../navbar/Navbar.jsx';
import Sidebar from '../sidebar/Sidebar.jsx';

function Header() {
  return (
    <header className="header page__header">
      <Navbar />
      <Sidebar />
    </header>
  );
}

export default Header;
