import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Layout from '../../shared/components/layout/layout/Layout.jsx';
import Loader from '../../shared/components/ui/loader/Loader.jsx';
import NotFound from '../../pages/not-found/NotFound.jsx';

const Home = lazy(() => import('../../pages/home/Home.jsx'));
const Login = lazy(() => import('../../features/auth/pages/login/Login.jsx'));
const Register = lazy(() => import('../../features/auth/pages/register/Register.jsx'));
const Menu = lazy(() => import('../../features/menu/pages/Menu.jsx'));
const Contact = lazy(() => import('../../features/contact/pages/Contact.jsx'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Rotas públicas, sem layout global */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas com layout global */}
          <Route element={<Layout />}>
            {/* index: rota padrão dentro do layout, renderiza quando acessar '/' */}
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="talk-to-us" element={<Contact />} />

            {/* Rotas protegidas */}

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
