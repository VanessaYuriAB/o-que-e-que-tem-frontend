import PartnerForm from './components/PartnerForm.jsx';
import styles from './Partner.module.css';

function Partner() {
  return (
    <section className={`${styles.partner} ${styles.content__partner}`}>
      <h1 className={styles.partner__title}>
        Vamos evitar, juntos, o descarte de produtos do seu mercado?
      </h1>

      <p className={styles.partner__text}>
        Nos envie seu cadastro para entramos em contato e combinarmos nosso plano de ação :)
      </p>

      <PartnerForm />
    </section>
  );
}

export default Partner;
