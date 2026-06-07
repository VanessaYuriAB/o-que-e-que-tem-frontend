import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Layout from '../../shared/components/layout/layout/Layout.jsx';
import Loader from '../../shared/components/ui/loader/Loader.jsx';
import NotFound from '../../pages/not-found/NotFound.jsx';

const Home = lazy(() => import('../../pages/home/Home.jsx'));
const Login = lazy(() => import('../../features/auth/pages/login/Login.jsx'));
const Register = lazy(() => import('../../features/auth/pages/register/Register.jsx'));
const Menu = lazy(() => import('../../features/menu/pages/menu/Menu.jsx'));
const Carboidratos = lazy(
  () => import('../../features/menu/pages/menu/components/carboidratos/Carboidratos.jsx')
);
const VerdurasLegumes = lazy(
  () => import('../../features/menu/pages/menu/components/verduras-legumes/VerdurasLegumes.jsx')
);
const LeitesDerivados = lazy(
  () => import('../../features/menu/pages/menu/components/leites-derivados/LeitesDerivados.jsx')
);
const CarnesOvosPeixes = lazy(
  () => import('../../features/menu/pages/menu/components/carnes-ovos-peixes/CarnesOvosPeixes.jsx')
);
const LeguminosasOleaginosas = lazy(
  () =>
    import('../../features/menu/pages/menu/components/leguminosas-oleaginosas/LeguminosasOleaginosas.jsx')
);
const OleosGorduras = lazy(
  () => import('../../features/menu/pages/menu/components/oleos-gorduras/OleosGorduras.jsx')
);
const AcucaresDoces = lazy(
  () => import('../../features/menu/pages/menu/components/acucares-doces/AcucaresDoces.jsx')
);
const Contact = lazy(() => import('../../features/contact/pages/Contact.jsx'));
const Subscription = lazy(() => import('../../features/subscription/pages/Subscription.jsx'));

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

            <Route path="menu" element={<Menu />}>
              <Route path="carboidratos" element={<Carboidratos />} />
              <Route path="verduras-legumes" element={<VerdurasLegumes />} />
              <Route path="leites-derivados" element={<LeitesDerivados />} />
              <Route path="carnes-ovos-peixes" element={<CarnesOvosPeixes />} />
              <Route path="leguminosas-oleaginosas" element={<LeguminosasOleaginosas />} />
              <Route path="oleos-gorduras" element={<OleosGorduras />} />
              <Route path="acucares-doces" element={<AcucaresDoces />} />
            </Route>

            <Route path="talk-to-us" element={<Contact />} />

            <Route path="subscription" element={<Subscription />} />

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
