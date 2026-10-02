import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <section className={`${styles['not-found']} ${styles['content__not-found']}`}>
      <h1 className={styles['not-found__title']}>404</h1>
      <p className={styles['not-found__content']}>Página não encontrada</p>
      <Link className={`${styles['not-found__link']} link-to-button`} to="/">
        Voltar para Home
      </Link>
    </section>
  );
}

export default NotFound;
