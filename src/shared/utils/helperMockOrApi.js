import { USE_MOCK } from '../../config/env.js';

async function decideMockOrApi(mockFn, apiFn) {
  return USE_MOCK ? mockFn() : apiFn();
}

export default decideMockOrApi;
