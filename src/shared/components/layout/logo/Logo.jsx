import { Link } from 'react-router-dom';
import LogoImg from '../../../../assets/images/logo.png';

import './Logo.css';

function Logo() {
  return (
    <div className="logo header__logo">
      <Link className="logo__link" to="/" aria-label="Ir para a página inicial">
        <div className="logo__text-box">
          <span className="logo__name">O que é que tem?</span>
          <span className="logo__span"> Na sopa, creme ou patê.</span>
        </div>
        <img
          className="logo__img"
          src={LogoImg}
          alt="Logo. Concha marrom, espirrando pingos coloridos: verde, laranja, vermelho e preto."
        ></img>
      </Link>
    </div>
  );
}

export default Logo;
