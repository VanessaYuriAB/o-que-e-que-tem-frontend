import SubscriptionForm from './components/SubscriptionForm.jsx';
import styles from './Subscription.module.css';

function Subscription() {
  return (
    <section className={`${styles.subscription} ${styles.content__subscription}`}>
      <h1 className={styles.subscription__title}>Seja um assinante</h1>
      <div className={styles.subscription__content}>
        <ul className={styles.subscription__list}>
          <li className={styles.subscription__item}>
            Você escolhe com qual frequência quer receber ou retirar nossas refeições.
          </li>
          <li className={styles.subscription__item}>
            Deixa definido os dias e horários, e escolhe uma forma padrão de entrega, que pode ser
            por delivery ou drive-thru.
          </li>
          <li className={styles.subscription__item}>
            O restante você vai escolhendo conforme consumo: você decide quais ingredientes quer
            juntar para fazer sua sopa, creme ou patê - de acordo com o que estiver diponível no
            momento (nosso cardápio não é fixo, mas temos uma grande variedade de ingredientes).
          </li>
        </ul>
        <p className={styles.subscription__text}>
          Você pode assinar por 2 meses, por 4, por 6 e até por um ano todo. E pode pausar a sua
          assinatura por até 2 meses, num período de um ano.
        </p>
      </div>

      <SubscriptionForm />
    </section>
  );
}

export default Subscription;
