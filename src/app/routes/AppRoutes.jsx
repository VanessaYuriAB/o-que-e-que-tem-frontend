import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Layout from '../../shared/components/layout/layout/Layout.jsx';
import Loader from '../../shared/components/ui/loader/Loader.jsx';
import NotFound from '../../pages/not-found/NotFound.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import PublicRoute from './PublicRoute.jsx';

const Home = lazy(() => import('../../pages/home/Home.jsx'));
const Login = lazy(() => import('../../features/auth/pages/login/Login.jsx'));
const Register = lazy(() => import('../../features/auth/pages/register/Register.jsx'));

const Menu = lazy(() => import('../../features/menu/pages/Menu.jsx'));
const MenuType = lazy(() => import('../../features/menu/pages/components/MenuType.jsx'));

const Contact = lazy(() => import('../../features/contact/pages/Contact.jsx'));
const Subscription = lazy(() => import('../../features/subscription/pages/Subscription.jsx'));

const Profile = lazy(() => import('../../features/profile/pages/Profile.jsx'));
const Logout = lazy(() => import('../../features/auth/pages/logout/Logout.jsx'));

const UserProfile = lazy(
  () => import('../../features/profile/pages/components/user-profile/UserProfile.jsx')
);
const SubscriptionProfile = lazy(
  () =>
    import('../../features/profile/pages/components/subscription-profile/SubscriptionProfile.jsx')
);

const Cart = lazy(() => import('../../features/cart/pages/Cart.jsx'));

function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* ROTAS SEM LAYOUT GLOBAL, PÚBLICAS */}

        {/* Login */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Cadastro */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* ROTAS COM LAYOUT GLOBAL */}

        <Route element={<Layout />}>
          {/* PÚBLICAS */}

          {/* index: rota padrão dentro do layout, renderiza quando acessar '/' */}
          <Route index element={<Home />} />

          {/* Cardápio */}
          <Route path="menu" element={<Menu />}>
            {/* index: rota padrão dentro do menu, renderiza quando acessar '/menu' */}
            <Route index element={<MenuType category="todos" />} />

            <Route path="todos" element={<MenuType category="todos" />} />
            <Route path="carboidratos" element={<MenuType category="carboidratos" />} />
            <Route path="verduras-legumes" element={<MenuType category="verduras-legumes" />} />
            <Route path="leites-derivados" element={<MenuType category="leites-derivados" />} />
            <Route path="carnes-ovos-peixes" element={<MenuType category="carnes-ovos-peixes" />} />
            <Route
              path="leguminosas-oleaginosas"
              element={<MenuType category="leguminosas-oleaginosas" />}
            />
            <Route path="oleos-gorduras" element={<MenuType category="oleos-gorduras" />} />
            <Route path="acucares-doces" element={<MenuType category="acucares-doces" />} />
          </Route>

          {/* Carrinho */}
          <Route path="cart" element={<Cart />} />

          {/* Fale conosco */}
          <Route path="talk-to-us" element={<Contact />} />

          {/* Assinatura */}
          <Route path="subscription" element={<Subscription />} />

          {/* Logout */}
          <Route path="logout" element={<Logout />} />

          {/* PROTEGIDAS */}

          {/* Perfil */}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            {/* index: rota padrão dentro do perfil, renderiza quando acessar '/profile' */}
            <Route
              index
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="user-profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="subscription-profile"
              element={
                <ProtectedRoute>
                  <SubscriptionProfile />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* 404 - NOT FOUND (ROTA DE FALLBACK, PÚBLICA) */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
