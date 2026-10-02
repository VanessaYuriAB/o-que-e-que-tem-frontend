import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx';
import MainContainer from '../main-container/MainContainer.jsx';
import styles from './Layout.module.css';

function Layout() {
  return (
    <div className={styles.page}>
      <Header />
      <MainContainer />
      <Footer />
    </div>
  );
}

export default Layout;
