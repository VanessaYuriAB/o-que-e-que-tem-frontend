export default function errorHandler(error) {
  console.error('Falha no errorHandler:', error.cause ? error.cause : error);

  if (error.cause?.type === 'network') {
    return { message: 'Erro de conexão. Verifique a internet.', scope: 'global' };
  }

  if (error.cause?.type === 'api') {
    switch (error.cause.status) {
      case 400:
        return {
          message: 'Problema no envio dos dados, a solicitação está incorreta.',
          scope: 'local',
          status: error.cause.status,
        };
      case 401:
        return {
          message: 'Não autorizado, os dados enviados são inválidos.',
          scope: 'local',
          status: error.cause.status,
          action: 'OPEN_LOGIN',
        };
      case 403:
        return {
          message: 'Acesso não autorizado para este recurso.',
          scope: 'local',
          status: error.cause.status,
        };
      case 404:
        return {
          message: 'Dado não encontrado, não existe ou foi removido.',
          scope: 'local',
          status: error.cause.status,
        };
      case 409:
        return {
          message: 'Usuário já cadastrado.',
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
    message: 'Erro inesperado (desconhecido).',
    scope: 'global',
  };
}
