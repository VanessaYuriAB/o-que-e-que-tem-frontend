import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Layout from '../../shared/components/layout/Layout.jsx';
import Spinner from '../../shared/components/ui/Spinner.jsx';
import NotFound from '../../pages/not-found/NotFound.jsx';

const Home = lazy(() => import('../../pages/home/Home.jsx'));

const Login = lazy(() => import('../../features/auth/pages/login/Login.jsx'));
const Register = lazy(() => import('../../features/auth/pages/register/Register.jsx'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          {/* Rotas públicas, sem layout global */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas com layout global */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />

            {/* Rotas protegidas */}
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
