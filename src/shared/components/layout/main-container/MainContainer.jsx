import { Outlet } from 'react-router-dom';

import './MainContainer.css';

function MainContainer() {
  return (
    <main className="content page__content">
      <Outlet />
    </main>
  );
}

export default MainContainer;
