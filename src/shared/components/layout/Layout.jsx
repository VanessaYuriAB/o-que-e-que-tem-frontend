import { Outlet } from 'react-router-dom';

import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';

function Layout() {
  return (
    <div className="page">
      <header className="header page__header">
        <Navbar />
        <Sidebar />
      </header>

      <main className="content page__content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
