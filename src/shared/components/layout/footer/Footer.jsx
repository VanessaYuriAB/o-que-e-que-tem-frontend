import { NavLink } from 'react-router-dom';

import imgInstagram from '../../../../assets/icons/instagram.svg';
import imgFacebook from '../../../../assets/icons/facebook.svg';
import { footerLinks } from '../../../constants/navigation.js';

import Logo from '../../ui/logo/Logo.jsx';

import './Footer.css';

function Footer() {
  const customClassName = ({ isActive }) =>
    `footer__link nav__link ${isActive ? 'footer__link_active' : ''}`;

  return (
    <footer className="footer page__footer">
      <div className="footer__content-box">
        <div className="footer__navs-box">
          <nav className="footer__links" aria-label="Menu secundário">
            <ul className="footer__list nav__list">
              {footerLinks.map((link) => (
                <li key={link.to} className={link.class}>
                  <NavLink className={customClassName} to={link.to}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="footer__social" aria-label="Redes sociais">
            <ul className="footer__social-list nav__list">
              <li className="footer__social-item">
                <a
                  className="footer__social-link nav__link"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="footer__social-icon" src={imgInstagram} alt="Instagram" />
                </a>
              </li>
              <li className="footer__social-item">
                <a
                  className="footer__social-link nav__link"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="footer__social-icon" src={imgFacebook} alt="Facebook" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <address className="footer__infos-box">
          <p className="footer__phone">(11) 98765-4321</p>
          <p className="footer__email">sopacremepate@email.com</p>
          <p className="footer__address">Endereço do nosso drive-thru</p>
          <p className="footer__operation">Seg-Sex | 10am-8pm</p>
        </address>
      </div>
      <div className="footer__logo-link">
        <div className="footer__logo">
          <Logo />
        </div>
        <a className="footer__link-up" href="#top">
          VOLTAR AO TOPO DA PÁGINA
        </a>
      </div>

      <p className="footer__copyright">
        &copy; O que é que tem? Na sopa, creme ou patê. By Vanessa no PAC da TripleTen Brasil. 2026.
      </p>
    </footer>
  );
}

export default Footer;
