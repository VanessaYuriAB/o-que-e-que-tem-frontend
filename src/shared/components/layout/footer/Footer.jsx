import { Link, NavLink } from 'react-router-dom';

import './Footer.css';

function Footer() {
  return (
    <footer className="footer page__footer">
      <nav className="footer__links">
        <ul className="footer__list">
          <li className="footer__item">
            <NavLink className="footer__link" to="/our-impact">
              Nosso impacto
            </NavLink>
          </li>
          <li className="footer__item">
            <NavLink className="footer__link" to="/to-be-a-partner-market">
              Seja um mercado parceiro
            </NavLink>
          </li>
          <li className="footer__item">
            <NavLink className="footer__link" to="/talk-to-us">
              Fale conosco
            </NavLink>
          </li>
        </ul>
      </nav>
      <Link className="footer__up">Voltar ao topo</Link>
      <p className="footer__copyright">
        &copy; O que é que tem? Na sopa, creme ou patê. By Vanessa no PAC da TripleTen Brasil. 2026.
      </p>
    </footer>
  );
}

export default Footer;
