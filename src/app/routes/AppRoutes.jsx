import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../../pages/home/Home.jsx';

import Layout from '../../shared/components/layout/Layout.jsx';

import Login from '../../features/auth/pages/login/Login.jsx';
import Register from '../../features/auth/pages/register/Register.jsx';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas, sem layout global */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas com layout global */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          {/* Rotas protegidas */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
