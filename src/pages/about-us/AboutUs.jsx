import { Link } from 'react-router-dom';
import photo from '../../assets/images/photo.jpg';
import './AboutUs.css';

function AboutUs() {
  return (
    <section className="about content__about">
      <h1 className="about__title">Nossa História</h1>

      <div className="about__history-box">
        <div className="about__iframe-box">
          <iframe
            className="about__iframe"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/x5Dm5FcvIOw?si=ed6AqOuJQeno5dXA"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin" /*segurança*/
            loading="lazy" /*performance*/
          ></iframe>
        </div>

        <div className="about__text-half-history">
          <p className="about__text">
            &quot;Que que tem na sopa do neném? Que que tem na sopa do neném? Será que tem rabanete?
            Será que tem sorvete? Será que tem berinjela? Será que tem panela? É um, é dois, é
            três!&quot;
          </p>
          <p className="about__text">
            Nascemos de um lindo encontro entre experiências pessoais, sustentabilidade e
            tecnologia.
          </p>
          <p className="about__text">
            &quot;O que é que tem? Na sopa, creme ou patê&quot; é uma conexão de longas incríveis
            experiências pessoais, que foi pensada em inacreditáveis 5 minutos.
          </p>
          <p className="about__text">
            A ideia base surgiu muito antes do desenvolvimento da plataforma...
          </p>
        </div>

        <div className="about__text-int-history">
          <p className="about__text">
            A última das experiências foi durante a rotina intensa da minha maternidade, conciliando
            trabalho, cuidados com a casa e a criação solo de um filho pequeno. Tornou-se comum
            buscar formas práticas de aproveitar melhor os alimentos disponíveis em casa.
            Ingredientes que poderiam ser esquecidos na geladeira, ou descartados, acabavam sendo
            todos congelados e eram transformados em sopas, cremes ou patês nutritivos, naqueles
            dias mais corridos.
          </p>
          <p className="about__text">
            Nesse mesmo período, passei a observar com mais atenção os produtos disponíveis nas
            gôndolas de itens próximos ao vencimento. Inicialmente, essa escolha surgiu como uma
            forma de economizar durante uma fase em que cada recurso precisava ser bem administrado.
            Mas, também, da consciência de que muitos daqueles produtos estavam em perfeitas
            condições de consumo e seriam descartados apenas por estarem próximos da data de
            validade.
          </p>
          <p className="about__text">
            Essa visão foi fortalecida por outras experiências anteriores, pessoais e acadêmicas,
            relacionadas à sustentabilidade. O contato com a Engenharia Ambiental, o interesse pela
            redução de desperdícios e pelo uso consciente dos recursos. Ao mesmo tempo, a
            convivência com um pai vegano e praticante de Raja Yoga. Anos de experiência organizando
            refeições familiares também contribuíram para compreender, na prática, os desafios do
            planejamento alimentar e do aproveitamento integral dos ingredientes.
          </p>
          <p className="about__text">
            O que me trouxe reflexões sobre consumo responsável, alimentação equilibrada e respeito
            ao meio ambiente.
          </p>
          <p className="about__text">
            O que começou como uma solução doméstica para economizar tempo e reduzir desperdícios,
            revelou uma reflexão maior sobre o desperdício gerado ao longo da cadeia alimentar,
            reforçando meu interesse por modelos de consumo mais conscientes e sustentáveis: quantas
            possibilidades existem dentro de alimentos que normalmente seriam descartados?
          </p>
          <p className="about__text">
            Foi, então, após a formação em Desenvolvimento Web, que surgiu a oportunidade de unir
            todas essas experiências em um único projeto.
          </p>
          <p className="about__text">
            Assim nasceu uma foodtech conceitual baseada nos princípios da economia circular
            alimentar, utilizando a tecnologia como ferramenta para gerar impacto positivo para
            pessoas e para o planeta.
          </p>
        </div>
      </div>

      <h2 className="about__subtitle">Nossa Missão</h2>

      <p className="about__text">
        Nossa proposta consiste em recuperar alimentos próximos à data de vencimento, mas ainda
        seguros para consumo, provenientes de mercados parceiros. Antes de serem disponibilizados
        aos consumidores, esses produtos passam por uma etapa especializada de triagem e controle de
        qualidade, que verifica condições de conservação, integridade e segurança alimentar. Esse
        processo permite reduzir desperdícios causados por critérios puramente comerciais ou falhas
        de gestão, garantindo o aproveitamento responsável dos alimentos.
      </p>

      <p className="about__text">
        A partir desses ingredientes são produzidas refeições práticas, acessíveis e personalizadas,
        como sopas, cremes e patês, oferecendo uma alternativa sustentável para quem busca
        conveniência sem abrir mão da qualidade.
      </p>

      <h2 className="about__subtitle">Nossos Valores</h2>

      <ul className="about__values-list">
        <li className="about__value-item">Sustentabilidade</li>
        <li className="about__value-item">Consumo consciente</li>
        <li className="about__value-item">Segurança alimentar</li>
        <li className="about__value-item">Inovação tecnológica</li>
        <li className="about__value-item">Acessibilidade alimentar</li>
      </ul>

      <p className="about__text about__text_value">
        🌱 Menos desperdício alimentar | ♻️ Economia circular | 💡 Tecnologia sustentável | 💚
        Consumo responsável
      </p>

      <h2 className="about__subtitle">Nosso Diferencial</h2>

      <p className="about__text">
        Um dos principais diferenciais da plataforma está em seu modelo de assinatura inteligente.
        Como a disponibilidade dos ingredientes varia constantemente, optamos por não utilizar um
        sistema tradicional baseado em produtos fixos. Em vez disso, a assinatura define apenas a
        frequência de consumo, enquanto o cliente escolhe as opções disponíveis para cada entrega.
        Dessa forma, o modelo se adapta à oferta real dos alimentos recuperados, reduzindo
        desperdícios e proporcionando uma experiência mais flexível e personalizada.
      </p>

      <p className="about__text">
        Além da plataforma digital, o conceito prevê uma operação integrada com cozinha própria,
        sistema de entregas e atendimento drive-thru, conectando eficiência logística, experiência
        do usuário e responsabilidade ambiental.
      </p>

      <h3 className="about__subtitle">
        Transformar desperdício em oportunidade, tecnologia em impacto. Essa é uma boa essência.
      </h3>

      <p className="about__text">
        Mais do que vender refeições, buscamos demonstrar como a tecnologia pode contribuir para
        transformar desafios ambientais em oportunidades de inovação. O resultado é um ecossistema
        sustentável que conecta economia circular, segurança alimentar e experiência digital em uma
        solução escalável, capaz de gerar valor para consumidores, parceiros e para o meio ambiente.
      </p>

      <h2 className="about__subtitle">Junte-se a essa transformação</h2>

      <p className="about__text">
        Transformar desperdício em oportunidade começa com pequenas escolhas diárias.
      </p>

      <p className="about__text">
        Estamos construindo uma nova forma de consumir alimentos, reduzindo desperdícios e gerando
        impacto positivo para pessoas e para o planeta.
      </p>

      <Link className="about__link link-to-button" to="/subscription">
        Faça e desfrute de sua assinatura :)
      </Link>

      <div className="about__infos">
        <img className="about__photo" src={photo} alt="Foto: Vanessa e Belquior" />
        <div className="about__text-infos">
          <p className="about__text">Vanessa Yuri A. Brito</p>
          <p className="about__text">Fundadora</p>
          <p className="about__text">Desenvolvedora Web e idealizadora do projeto</p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
