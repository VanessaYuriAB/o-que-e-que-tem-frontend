import './OurImpact.css';

function OurImpact() {
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
        <li className="impact__item impact__item_kpi">
          <h3 className="impact__subtitle impact__subtitle_kpi">85% de alimentos reaproveitados</h3>
          <p className="impact__text impact__text_kpi">Eficiência na redução do desperdício.</p>
        </li>

        <li className="impact__item impact__item_kpi">
          <h3 className="impact__subtitle impact__subtitle_kpi">4.200 refeições produzidas</h3>
          <p className="impact__text impact__text_kpi">Escala do impacto gerado.</p>
        </li>

        <li className="impact__item impact__item_kpi">
          <h3 className="impact__subtitle impact__subtitle_kpi">R$ 96.500 em receita acumulada</h3>
          <p className="impact__text impact__text_kpi">Sustentabilidade financeira do negócio.</p>
        </li>

        <li className="impact__item impact__item_kpi">
          <h3 className="impact__subtitle impact__subtitle_kpi">12 parceiros participantes</h3>
          <p className="impact__text impact__text_kpi">
            Crescimento da rede de mercados parceiros.
          </p>
        </li>

        <li className="impact__item impact__item_kpi">
          <h3 className="impact__subtitle impact__subtitle_kpi">78% de renovação de assinaturas</h3>
          <p className="impact__text impact__text_kpi">Satisfação e fidelização dos clientes.</p>
        </li>

        <li className="impact__item impact__item_kpi">
          <h3 className="impact__subtitle impact__subtitle_kpi">1.050 kg de desperdício evitado</h3>
          <p className="impact__text impact__text_kpi">Impacto ambiental positivo.</p>
        </li>
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
