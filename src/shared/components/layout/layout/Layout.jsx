import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx';

import MainContainer from '../main-container/MainContainer.jsx';

import './Layout.css';

function Layout() {
  return (
    <div className="page">
      <Header />
      <MainContainer />
      <Footer />
    </div>
  );
}

export default Layout;
