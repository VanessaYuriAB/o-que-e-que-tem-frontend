import ContactForm from './components/ContactForm.jsx';
import styles from './Contact.module.css';

function Contact() {
  return (
    <section className={`${styles.contact} ${styles.content__contact}`}>
      <h1 className={styles.contact__title}>Fale conosco</h1>

      <ContactForm />
    </section>
  );
}

export default Contact;
