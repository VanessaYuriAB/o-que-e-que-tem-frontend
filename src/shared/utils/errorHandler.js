export default function errorHandler(error) {
  console.error('Falha no errorHandler:', error, error.cause ? error.cause : '');

  if (error.cause?.type === 'network') {
    return { message: 'Erro de conexão. Verifique a internet.', scope: 'global' };
  }

  if (error.cause?.type === 'api') {
    switch (error.cause.status) {
      case 400:
        return {
          message: 'Os dados enviados são inválidos ou estão incompletos.',
          scope: 'local',
          status: error.cause.status,
        };
      case 401:
        return {
          message:
            error.cause.message ??
            'Não foi possível autenticar sua solicitação. E-mail ou senha inválidos.',
          scope: 'local',
          status: error.cause.status,
          action: 'OPEN_LOGIN',
        };
      case 403:
        return {
          message: 'Você não tem permissão para acessar este recurso.',
          scope: 'local',
          status: error.cause.status,
        };
      case 404:
        return {
          message: error.cause.message ?? 'Nenhum resultado foi encontrado.',
          scope: 'local',
          status: error.cause.status,
        };
      case 409:
        return {
          message:
            error.cause.message ??
            'Não foi possível concluir a operação devido a um conflito de dados. O dado enviado já consta cadastrado.',
          scope: 'local',
          status: error.cause.status,
        };
      case 429:
        return {
          message:
            'Foram feitas muitas requisições em um curto período, aguarde um instante para poder prosseguir.',
          scope: 'local',
          status: error.cause.status,
        };
      case 500:
        return {
          message: 'Erro interno do servidor. Aguarde um instante e tente novamente.',
          scope: 'global',
          status: error.cause.status,
        };

      default:
        return {
          message:
            'Erro ao processar a solicitação. Problemas no navegador, nas informações enviadas ou houve falha no processamento do servidor.',
          scope: error.cause.status >= 500 ? 'global' : 'local',
          status: error.cause.status,
        };
    }
  }

  return {
    message: error.message.includes('removeItemToCart')
      ? 'Erro ao remover item, tente novamente.'
      : error.message.includes('addItemToCart')
        ? 'Erro ao adicionar item, tente novamente.'
        : error.message.includes('setCartData')
          ? 'Erro ao salvar pedido, tente novamente.'
          : 'Erro inesperado (desconhecido).',
    scope: 'global',
  };
}
