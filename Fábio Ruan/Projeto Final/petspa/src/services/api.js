export const BASE_URL = "http://localhost:3000";

async function tratarResposta(resposta) {
  if (!resposta.ok) {
    throw new Error(`Erro na API: ${resposta.status}`);
  }
  return resposta.json();
}

export async function buscarProdutos() {
  const resposta = await fetch(`${BASE_URL}/produtos`);
  return tratarResposta(resposta);
}

export async function buscarPedidos() {
  const resposta = await fetch(`${BASE_URL}/pedidos`);
  return tratarResposta(resposta);
}

export async function criarPedido(pedido) {
  const resposta = await fetch(`${BASE_URL}/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido),
  });
  return tratarResposta(resposta);
}

export async function excluirPedido(id) {
  const resposta = await fetch(`${BASE_URL}/pedidos/${id}`, {
    method: "DELETE",
  });
  return tratarResposta(resposta);
}