import PartnerForm from './components/PartnerForm.jsx';
import './Partner.css';

function Partner() {
  return (
    <section className="partner content__partner">
      <h1 className="partner__title">
        Vamos evitar, juntos, o descarte de produtos do seu mercado?
      </h1>

      <p className="partner__text">
        Nos envie seu cadastro para entramos em contato e combinarmos nosso plano de ação :)
      </p>

      <PartnerForm />
    </section>
  );
}

export default Partner;
