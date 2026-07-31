import { Link } from 'react-router-dom';

function SuccessOrder() {
  const hasOrder = true;
  const user = true;

  return (
    <section>
      {hasOrder ? (
        <>
          <h1>Pedido enviado com sucesso</h1>
          <div>
            <p>
              Logo você pode saborear uma super refeição nutritiva preparada com muito amor e
              carinho s2
            </p>
            <p>E ainda ajudou a reduzir um pouquinho o desperdício alimentar e o meio ambiente</p>
            <p>Agradecemos muito :)</p>
          </div>
          <div>
            <h2>Aqui estão as informações (da sua) (refeição):</h2>
            <p>Nº do pedido:</p>
            <p>Forma de entrega:</p>
            <p>Endereço: (caso delivery)</p>
            <p>Contato: (nome e telefone, se houver) (alterar, tbm, campo de infos adicionais)</p>
            <p>Forma de pagamento:</p>
            <p>Itens:</p>
            <p>Tipo de refeição:</p>
          </div>
        </>
      ) : (
        <>
          <h1>Ops, você não tem um pedido finalizado e enviado agora</h1>
          {user && (
            <>
              <p>Quer ver seu histórico de pedidos?</p>
              <Link>Pedidos anteriores</Link>
            </>
          )}

          <p>Quer fazer um novo pedido?</p>
          <Link>Ver cardápio</Link>

          <p>Quer finalizar um pedido em andamento?</p>
          <Link>Ir para carrinho</Link>

          <p>Precisa apenas fazer o pagamento?</p>
          <Link>Ir para checkout</Link>
        </>
      )}
    </section>
  );
}

export default SuccessOrder;
