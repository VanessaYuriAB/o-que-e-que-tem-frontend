import imgCart from '../../assets/icons/shopping-cart.svg';
import imgRegister from '../../assets/icons/user-circle-add.svg';
import imgLogin from '../../assets/icons/login.svg';
import imgLogout from '../../assets/icons/logout.svg';

/* Sidebar */

const itemMobileOnlyClassName = 'sidebar__item sidebar__item_mobile-only nav__item';

const sidebarItemMobileAndDesktopClassName = 'sidebar__item nav__item';

export const sidebarLinks = [
  /* Sidebar > Mobile */
  { to: '/register', class: itemMobileOnlyClassName, label: 'Inscreva-se' },
  { to: '/login', class: itemMobileOnlyClassName, label: 'Login' },
  /* Sidebar > Mobile e Desktop */
  { to: '/', class: sidebarItemMobileAndDesktopClassName, label: 'Home' },
  { to: '/profile', class: sidebarItemMobileAndDesktopClassName, label: 'Perfil' },
  { to: '/how-it-works', class: sidebarItemMobileAndDesktopClassName, label: 'Como funciona' },
  { to: '/subscription', class: sidebarItemMobileAndDesktopClassName, label: 'Assinatura' },
  { to: '/menu', class: sidebarItemMobileAndDesktopClassName, label: 'Cardápio' },
  {
    to: '/about-good-food',
    class: sidebarItemMobileAndDesktopClassName,
    label: 'Sobre comida boa',
  },
  { to: '/about-us', class: sidebarItemMobileAndDesktopClassName, label: 'Sobre a gente' },
];

/* Navbar */

const navbarLinkRegister = {
  to: '/register',
  liClass: 'navbar__item nav__item',
  label: 'Ir para página de cadastro',
  title: 'Cadastro',
  imgClass: 'navbar__icon',
  imgSrc: imgRegister,
};

const navbarLinkLogin = {
  to: '/login',
  liClass: 'navbar__item nav__item',
  label: 'Ir para página de login',
  title: 'Login',
  imgClass: 'navbar__icon',
  imgSrc: imgLogin,
};

const navbarLinkLogout = {
  to: '/logout',
  liClass: 'navbar__item nav__item',
  label: 'Deslogar',
  title: 'Logout',
  imgClass: 'navbar__icon',
  imgSrc: imgLogout,
};

const navbarLinkCheckout = {
  to: '/checkout',
  liClass: 'navbar__item nav__item',
  label: 'Ir para carrinho de compras',
  title: 'Carrinho de compras',
  imgClass: 'navbar__icon',
  imgSrc: imgCart,
};

export const navbarLinksLoggedOn = [navbarLinkLogout, navbarLinkCheckout];

export const navbarLinksLoggedOff = [navbarLinkRegister, navbarLinkLogin, navbarLinkCheckout];

/* Menu */

const itemMenuClassName = 'menu__item';

export const menuLinks = [
  { to: 'todos', class: itemMenuClassName, label: 'Todos' },
  { to: 'carboidratos', class: itemMenuClassName, label: 'Carboidratos' },
  { to: 'verduras-legumes', class: itemMenuClassName, label: 'Verduras e legumes' },
  { to: 'leites-derivados', class: itemMenuClassName, label: 'Leites e derivados' },
  { to: 'carnes-ovos-peixes', class: itemMenuClassName, label: 'Carnes, ovos e peixes' },
  {
    to: 'leguminosas-oleaginosas',
    class: itemMenuClassName,
    label: 'Leguminosas e oleaginosas',
  },
  { to: 'oleos-gorduras', class: itemMenuClassName, label: 'Óleos e gorduras' },
  { to: 'acucares-doces', class: itemMenuClassName, label: 'Açúcares e Doces' },
];

/* Footer */

const itemFooterClassName = 'footer__item';

export const footerLinks = [
  { to: '/our-impact', class: itemFooterClassName, label: 'Nosso impacto' },
  { to: '/to-be-a-partner-market', class: itemFooterClassName, label: 'Seja um mercado parceiro' },
  { to: '/talk-to-us', class: itemFooterClassName, label: 'Fale conosco' },
];
