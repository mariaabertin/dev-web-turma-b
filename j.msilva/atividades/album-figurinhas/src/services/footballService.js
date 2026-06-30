// Serviço responsável por toda comunicação com a API-Football

const BASE_URL = process.env.VUE_APP_API_BASE_URL;
const API_KEY  = process.env.VUE_APP_API_KEY;

let abortController = null;

async function fetchApi(endpoint, cancelavel = false) {
  if (cancelavel) {
    if (abortController) abortController.abort();
    abortController = new AbortController();
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: { 'x-apisports-key': API_KEY },
    signal: cancelavel ? abortController.signal : undefined,
  });

  const dados = await response.json();
  return { dados, headers: response.headers };
}

/**
 * Requisição 1: Busca a lista de países disponíveis (para obter bandeiras).
 */
export async function buscarPaises() {
  return fetchApi('/teams/countries');
}

/**
 * Requisição 2 (única agora): Busca o elenco pelo ID do time.
 * Usa cache no sessionStorage para evitar requisições repetidas.
 * @param {number} teamId - ID numérico do time
 * @param {string} cacheKey - Chave de cache (nome do país)
 */
export async function buscarElenco(teamId, cacheKey) {
  const cached = sessionStorage.getItem(`elenco_${cacheKey}`);
  if (cached) {
    return { dados: JSON.parse(cached), headers: new Headers() };
  }

  const resultado = await fetchApi(`/players/squads?team=${teamId}`, true);

  if (!resultado.dados.errors || Object.keys(resultado.dados.errors).length === 0) {
    sessionStorage.setItem(`elenco_${cacheKey}`, JSON.stringify(resultado.dados));
  }

  return resultado;
}

export function lerQuota(headers) {
  const restantes = headers.get('x-ratelimit-requests-remaining');
  return restantes !== null ? parseInt(restantes, 10) : null;
}

export function interpretarErroApi(errors) {
  if (errors.requests)  return '⛔ Limite diário de requisições atingido. Tente novamente amanhã.';
  if (errors.rateLimit) return '⏱️ Muitas requisições por minuto. Aguarde alguns segundos e tente novamente.';
  if (errors.token)     return '🔑 Token de API inválido. Verifique sua chave.';
  return 'Erro da API: ' + JSON.stringify(errors);
}
