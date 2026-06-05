import { Link } from 'react-router-dom';

import './Home.css';

function Home() {
  return (
    <section className="home content__home">
      <div className="home__content">
        <h1 className="home__title">🍲 Cozinha Sustentável</h1>
        <h2 className="home__subtitle">(Delivery & Drive-thru)</h2>
        <p className="home__description">
          Você vê o que está disponível, escolhe os ingredientes, decide entre sopa/creme ou patê,
          se quer congelado ou in-natura e se prefere entrega em domicílio ou retirada no nosso
          drive-thru.
        </p>
        <section className="home__values">
          <h2 className="home__values-title">Proposta de valor </h2>
          <p className="home__values-description">
            A proposta central é reduzir o desperdício através da utilização de produtos próximos ao
            prazo de validade (de mercados parceiros), produzindo sopas/cremes e patês
            personalizados, acessíveis e sustentáveis sem comprometer a segurança alimentar.
          </p>
          <ul className="home__values-list">
            <li className="home__values-item">
              <h3 className="home__values-item-title">🥦 Sustentável:</h3>
              <p className="home__values-item-description">
                Redução do desperdício alimentar e Incentivo ao consumo consciente
              </p>
            </li>
            <li className="home__values-item">
              <h3 className="home__values-item-title">🫘 Flexibilidade:</h3>
              <p className="home__values-item-description">
                No consumo (sem cardápio fixo) e Na entrega (em domicílio ou drive-thru)
              </p>
            </li>
            <li className="home__values-item">
              <h3 className="home__values-item-title">🥕 Sempre fresco:</h3>
              <p className="home__values-item-description home__values-item-description_last">
                Produzido diariamente conforme pedidos
              </p>
            </li>
          </ul>
        </section>
        <section className="home__subscription">
          <h2 className="home__subscription-title">Você também pode ser um assinante!</h2>
          <p className="home__subscription-description">
            A nossa assinatura é inteligente, ela não fixa produtos. No contrato, você deixa
            definido os dias em que você deseja nossas refeições e a forma de entrega padrão. Os
            pedidos você vai montando conforme consumo.
          </p>
          <Link className="home__subscription-link link" to="/subscription">
            Assinatura
          </Link>
        </section>
        <section className="home__order">
          <h2 className="home__order-title">Pronto para fazer seu pedido?</h2>
          <p className="home__order-description">
            Você pode comprar unitário ou fazer uma assinatura. Rápido, fresco e sempre sustentável.
          </p>
          <Link className="home__order-link link" to="/menu">
            Cardápio
          </Link>
        </section>
      </div>
      <aside className="home__aside">
        <article className="home__weather">
          <h3 className="home__weather-title">Como está o clima hoje?</h3>
          <div className="home__weather-content">
            <p>Construindo informações...</p>
          </div>
        </article>
        <article className="home__recipes">
          <h3 className="home__recipes-title">Receitas</h3>
          <section className="home__recipe-soup">
            <h4 className="home__recipe-soup-title">Sopa</h4>
            <h5 className="home__recipe-soup-subtitle">Canja</h5>
            <p>Construindo informações...</p>
          </section>
          <section className="home__recipe-pate">
            <h4 className="home__recipe-pate-title">Patê</h4>
            <h5 className="home__recipe-pate-subtitle">De grão de bico</h5>
            <p>Construindo informações...</p>
          </section>
        </article>
      </aside>
    </section>
  );
}

export default Home;
