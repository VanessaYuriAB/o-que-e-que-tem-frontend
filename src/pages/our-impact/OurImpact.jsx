import './OurImpact.css';

function OurImpact() {
  const kpiList = [
    {
      id: 1,
      title: '85% de alimentos reaproveitados',
      text: 'Eficiência na redução do desperdício.',
    },
    {
      id: 2,
      title: '4.200 refeições produzidas',
      text: 'Escala do impacto gerado.',
    },
    {
      id: 3,
      title: 'R$ 96.500 em receita acumulada',
      text: 'Sustentabilidade financeira do negócio.',
    },
    {
      id: 4,
      title: '12 parceiros participantes',
      text: 'Crescimento da rede de mercados parceiros.',
    },
    {
      id: 5,
      title: '78% de renovação de assinaturas',
      text: 'Satisfação e fidelização dos clientes.',
    },
    {
      id: 6,
      title: '1.050 kg de desperdício evitado',
      text: 'Impacto ambiental positivo.',
    },
  ];

  return (
    <section className="impact content__impact">
      <h1 className="impact__title">Impactamos positivamente:</h1>

      <ul className="impact__list">
        <li className="impact__item">Barrigas,</li>
        <li className="impact__item">bolsos,</li>
        <li className="impact__item">mercados e</li>
        <li className="impact__item">o meio ambiente.</li>
      </ul>

      <p className="impact__text">
        Transformando alimentos que seriam descartados em refeições e oportunidades.
      </p>

      <p className="impact__text">
        <strong className="impact__strong">Problema:</strong> &quot;O desperdício de alimentos é um
        problema relevante, especialmente no setor de varejo e alimentação. Produtos próximos ao
        vencimento e excedentes alimentares ainda próprios para consumo acabam sendo descartados,
        gerando impacto ambiental e econômico.&quot;
      </p>

      <p className="impact__text">
        <strong className="impact__strong">Solução:</strong> &quot;A proposta central é reduzir o
        desperdício através da utilização de produtos próximos ao prazo de validade de mercados,
        garantindo preços mais acessíveis sem comprometer a segurança alimentar.&quot;
      </p>

      <p className="impact__text">
        <strong className="impact__strong">Como funciona:</strong> &quot;O diferencial do sistema
        está no modelo flexível de assinatura, em que o cliente define apenas a frequência e
        preferências, enquanto escolhe os produtos conforme consumo e disponibilidade do
        cardápio.&quot;
      </p>

      <h2 className="impact__subtitle">♻️ Ciclo</h2>

      <p className="impact__text">
        Mercados parceiros → Triagem → Produção → Sopas, cremes e patês → Consumidor
      </p>

      <h2 className="impact__subtitle">🌱 Impacto Ambiental</h2>

      <ul className="impact__list">
        <li className="impact__item">1.280 kg de alimentos recuperados</li>
        <li className="impact__item">1.050 kg de resíduos evitados</li>
        <li className="impact__item">12 mercados parceiros participantes</li>
        <li className="impact__item">4.200 refeições produzidas</li>
      </ul>

      <h2 className="impact__subtitle">🍲 Impacto Social</h2>

      <ul className="impact__list">
        <li className="impact__item">850 pessoas atendidas</li>
        <li className="impact__item">180 assinantes ativos</li>
        <li className="impact__item">2.350 pedidos entregues</li>
        <li className="impact__item"> 4,8/5 de avaliação média de clientes</li>
      </ul>

      <p className="impact__text">
        Refeições disponibilizadas → Economia gerada para consumidores → Acesso a alimentação
        nutritiva
      </p>

      <h2 className="impact__subtitle">📈 Indicadores de Impacto (KPIs)</h2>

      <ul className="impact__list impact__list_kpi">
        {kpiList.map((kpiItem) => {
          return (
            <li className="impact__item impact__item_kpi" key={kpiItem.id}>
              <article className="impact__card">
                <h3 className="impact__subtitle impact__subtitle_kpi">{kpiItem.title}</h3>
                <p className="impact__text impact__text_kpi">{kpiItem.text}</p>
              </article>
            </li>
          );
        })}
      </ul>

      <h2 className="impact__subtitle">💚 Histórias Reais</h2>

      <p className="impact__text">
        &quot;Comprei porque era sustentável e continuei porque era delicioso.&quot;
      </p>

      <blockquote className="impact__quote">
        Todo alimento tem uma história. Nós garantimos que ela não termine no descarte.
      </blockquote>

      <p className="impact__text">
        Inspirado por uma realidade comum: pessoas que precisam conciliar trabalho, filhos, casa,
        orçamento e alimentação saudável.
      </p>

      <p className="impact__text impact__text_em">
        <em className="impact__em">*Indicadores simulados para demonstração do projeto.</em>
      </p>
    </section>
  );
}

export default OurImpact;
