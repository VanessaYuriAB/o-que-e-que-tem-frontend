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

/* Menu */

export const menuLinks = [
  { to: 'todos', label: 'Todos' },
  { to: 'carboidratos', label: 'Carboidratos' },
  { to: 'verduras-legumes', label: 'Verduras e legumes' },
  { to: 'leites-derivados', label: 'Leites e derivados' },
  { to: 'carnes-ovos-peixes', label: 'Carnes, ovos e peixes' },
  { to: 'leguminosas-oleaginosas', label: 'Leguminosas e oleaginosas' },
  { to: 'oleos-gorduras', label: 'Óleos e gorduras' },
  { to: 'acucares-doces', label: 'Açúcares e Doces' },
];

/* Footer */

const itemFooterClassName = 'footer__item';

export const footerLinks = [
  { to: '/our-impact', class: itemFooterClassName, label: 'Nosso impacto' },
  { to: '/to-be-a-partner-market', class: itemFooterClassName, label: 'Seja um mercado parceiro' },
  { to: '/talk-to-us', class: itemFooterClassName, label: 'Fale conosco' },
];
