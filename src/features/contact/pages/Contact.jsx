import ContactForm from './components/ContactForm.jsx';
import './Contact.css';

function Contact() {
  return (
    <section className="contact content__contact">
      <h1 className="contact__title">Fale conosco</h1>

      <ContactForm />
    </section>
  );
}

export default Contact;
