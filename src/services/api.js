import { API_URL } from '../config/env.js';

const apiFetch = async (
  path,
  { method = 'GET', headers = {}, reqBody, credentials = 'include' } = {}
) => {
  const endpoint = `${API_URL}${path}`;

  const headerContenType = reqBody ? { 'Content-Type': 'application/json' } : {};

  const options = {
    method,
    headers: { ...headerContenType, ...headers },
    body: reqBody ? JSON.stringify(reqBody) : undefined,
    credentials, // essencial para cookie httpOnly
  };

  try {
    const response = await fetch(endpoint, options);

    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    let data;

    if (isJson) {
      try {
        data = await response.json();
      } catch {
        data = null;
      }
    }

    if (!response.ok) {
      throw data
        ? { type: 'api', status: response.status, data }
        : { message: 'Erro na requisição HTTP' }; // lança objeto de erro com objeto (tbm de erro) original da API ou msg fallback // cobre erros da API
    }

    return { data, status: response.status }; // para o caso de DELETE 204 com data null
  } catch (error) {
    if (error.type === 'api') {
      throw error;
    } else {
      // Erro de rede
      throw { type: 'network', message: 'Erro de conexão', error };
    }
  }
};

export default apiFetch;
