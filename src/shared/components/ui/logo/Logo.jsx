import { Link } from 'react-router-dom';
import LogoImg from '../../../../assets/images/logo.png';
import styles from './Logo.module.css';

function Logo() {
  return (
    <div className={styles.logo}>
      <Link className={styles.logo__link} to="/" aria-label="Ir para a página inicial">
        <div className={styles['logo__text-box']}>
          <strong className={styles.logo__name}>O que é que tem?</strong>
          <small className={styles.logo__span}> Na sopa, creme ou patê.</small>
        </div>
        <img
          className={styles.logo__img}
          src={LogoImg}
          alt="Logo. Concha marrom, espirrando pingos coloridos: verde, laranja, vermelho e preto."
        ></img>
      </Link>
    </div>
  );
}

export default Logo;
