import imgCart from '../../assets/icons/shopping-cart.svg';
import imgRegister from '../../assets/icons/user-circle-add.svg';
import imgLogin from '../../assets/icons/login.svg';
import imgLogout from '../../assets/icons/logout.svg';

/* Sidebar */

const sidebarLinkOn = { to: '/profile', label: 'PERFIL' };

const sidebarLinksFixed = [
  { to: '/order-tracker', label: 'LOCALIZAR PEDIDO' },
  { to: '/', label: 'HOME' },
  { to: '/menu', label: 'CARDÁPIO' },
  { to: '/subscription', label: 'ASSINATURA' },
  { to: '/recipes', label: 'RECEITAS' },
  { to: '/about-us', label: 'SOBRE A GENTE' },
];

export const sidebarLinksLoggedOn = [sidebarLinkOn, ...sidebarLinksFixed];

export const sidebarLinksLoggedOff = sidebarLinksFixed;

/* Navbar */

const navbarLinkRegister = {
  to: '/register',
  label: 'Ir para página de cadastro',
  title: 'Cadastro',
  imgSrc: imgRegister,
};

const navbarLinkLogin = {
  to: '/login',
  label: 'Ir para página de login',
  title: 'Login',
  imgSrc: imgLogin,
};

const navbarLinkLogout = {
  to: '/logout',
  label: 'Deslogar',
  title: 'Logout',
  imgSrc: imgLogout,
};

const navbarLinkCart = {
  to: '/cart',
  label: 'Ir para carrinho de compras',
  title: 'Carrinho de compras',
  imgSrc: imgCart,
};

export const navbarLinksLoggedOn = [navbarLinkLogout, navbarLinkCart];

export const navbarLinksLoggedOff = [navbarLinkRegister, navbarLinkLogin, navbarLinkCart];

/* Footer */

export const footerLinks = [
  { to: '/our-impact', label: 'Nosso impacto' },
  { to: '/to-be-a-partner-market', label: 'Seja um mercado parceiro' },
  { to: '/talk-to-us', label: 'Fale conosco' },
];
