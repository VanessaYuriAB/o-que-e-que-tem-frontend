import Logo from '../../ui/logo/Logo.jsx';
import Navbar from '../navbar/Navbar.jsx';
import Sidebar from '../sidebar/Sidebar.jsx';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={`${styles.header} ${styles.page__header}`}>
      <div className={styles.header__logo}>
        <Logo />
      </div>

      <div className={styles.header__navigation}>
        <Sidebar />
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
