export function fakeApi(data, status = 200, delay = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: JSON.parse(JSON.stringify(data)), status });
    }, delay);
  });
}

/* apiFetch retorna: return { data, status: response.status }; // para o caso de DELETE 204 com data null */

export function fakeApiError(message = 'Erro de api', status = 500, data = null, delay = 500) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject({ type: 'api', status, data, message });
    }, delay);
  });
}

/* apiFetch retorna: { type: 'api', status: response.status, data } ou { type: 'api', status: response.status, message: 'Erro na requisição HTTP' } ou { type: 'network', status: null, message: 'Erro de conexão' }, mas erro de conexão não é utilizado no fake */
