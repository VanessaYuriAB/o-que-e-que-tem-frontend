import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Layout from '../../shared/components/layout/layout/Layout.jsx';
import Loader from '../../shared/components/ui/loader/Loader.jsx';
import NotFound from '../../pages/not-found/NotFound.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

const Home = lazy(() => import('../../pages/home/Home.jsx'));
const Login = lazy(() => import('../../features/auth/pages/login/Login.jsx'));
const Register = lazy(() => import('../../features/auth/pages/register/Register.jsx'));

const Menu = lazy(() => import('../../features/menu/pages/Menu.jsx'));
const MenuType = lazy(() => import('../../features/menu/pages/components/MenuType.jsx'));

const Contact = lazy(() => import('../../features/contact/pages/Contact.jsx'));
const Subscription = lazy(() => import('../../features/subscription/pages/Subscription.jsx'));

const Profile = lazy(() => import('../../features/profile/pages/Profile.jsx'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* ROTAS SEM LAYOUT GLOBAL, PÚBLICAS */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ROTAS COM LAYOUT GLOBAL */}
          {/* PÚBLICAS */}

          <Route element={<Layout />}>
            {/* index: rota padrão dentro do layout, renderiza quando acessar '/' */}
            <Route index element={<Home />} />

            {/* Cardápio */}
            <Route path="menu" element={<Menu />}>
              <Route path="todos" element={<MenuType category="todos" />} />
              <Route path="carboidratos" element={<MenuType category="carboidratos" />} />
              <Route path="verduras-legumes" element={<MenuType category="verduras-legumes" />} />
              <Route path="leites-derivados" element={<MenuType category="leites-derivados" />} />
              <Route
                path="carnes-ovos-peixes"
                element={<MenuType category="carnes-ovos-peixes" />}
              />
              <Route
                path="leguminosas-oleaginosas"
                element={<MenuType category="leguminosas-oleaginosas" />}
              />
              <Route path="oleos-gorduras" element={<MenuType category="oleos-gorduras" />} />
              <Route path="acucares-doces" element={<MenuType category="acucares-doces" />} />
            </Route>

            {/* Fale conosco */}
            <Route path="talk-to-us" element={<Contact />} />

            {/* Assinatura */}
            <Route path="subscription" element={<Subscription />} />

            {/* PROTEGIDAS */}

            {/* Perfil */}
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* 404 - NOT FOUND */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
