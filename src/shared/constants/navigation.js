import imgCart from '../../assets/icons/shopping-cart.svg';
import imgRegister from '../../assets/icons/user-circle-add.svg';
import imgLogin from '../../assets/icons/login.svg';

/* Sidebar */

export const itemMobileOnlyClassName = 'sidebar__item sidebar__item_mobile-only nav__item';

export const sidebarItemMobileAndDesktopClassName = 'sidebar__item nav__item';

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

export const itemDesktopOnlyClassName = 'navbar__item navbar__item_desktop-only nav__item';

export const navbarItemMobileAndDesktopClassName = 'navbar__item nav__item';

export const navbarLinks = [
  /* Navbar > Desktop */
  {
    to: '/register',
    liClass: itemDesktopOnlyClassName,
    imgClass: 'navbar__icon',
    imgSrc: imgRegister,
    imgAlt: 'Ícone para incrição de usuário. Um bonequinho com o símbolo de adição.',
  },
  {
    to: '/login',
    liClass: itemDesktopOnlyClassName,
    imgClass: 'navbar__icon',
    imgSrc: imgLogin,
    imgAlt: 'Ícone para login de usuário. Uma seta indicando entrada.',
  },
  /* Navbar > Mobile e Desktop */
  {
    to: '/checkout',
    liClass: navbarItemMobileAndDesktopClassName,
    imgClass: 'navbar__icon',
    imgSrc: imgCart,
    imgAlt: 'Ícone do carrinho de compras.',
  },
];
