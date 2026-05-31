import { Outlet } from 'react-router-dom';

import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx';

import './Layout.css';

function Layout() {
  return (
    <div className="page">
      <Header />

      <main className="content page__content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
