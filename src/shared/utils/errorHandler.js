export default function errorHandler(error) {
  console.error('Falha no errorHandler:', error.cause ? error.cause : error);

  if (error.cause?.type === 'network') {
    return { message: 'Erro de conexão. Verifique a internet.' };
  }

  if (error.cause?.type === 'api') {
    switch (error.cause.status) {
      case 400:
        return {
          message: 'Problema no envio dos dados, a solicitação está incorreta.',
        };
      case 401:
        return {
          message: 'Não autorizado. Os dados enviados são inválidos ou você não está logado.',
          action: 'OPEN_LOGIN',
        };
      case 403:
        return {
          message: 'Acesso não autorizado para este recurso.',
        };
      case 404:
        return {
          message: 'Dado não encontrado, não existe ou foi removido.',
        };
      case 409:
        return {
          message: 'Usuário já cadastrado.',
        };
      case 429:
        return {
          message:
            'Foram feitas muitas requisições em um curto período, aguarde um instante para poder prosseguir.',
        };
      case 500:
        return {
          message: 'Erro interno do servidor. Aguarde um instante e tente novamente.',
        };

      default:
        return {
          message:
            'Erro ao buscar dados. Problemas no navegador, nas informações enviadas ou houve falha no processamento do servidor.',
        };
    }
  }

  return { message: 'Erro inesperado (desconhecido).' };
}
