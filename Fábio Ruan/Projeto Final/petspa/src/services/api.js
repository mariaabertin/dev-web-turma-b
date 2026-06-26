export const BASE_URL = "https://jsonkeeper.com/b/1MTFX";

async function tratarResposta(resposta) {
  if (!resposta.ok) {
    throw new Error(`Erro na API: ${resposta.status}`);
  }
  return resposta.json();
}

export async function buscarProdutos() {
  const dados = await tratarResposta(await fetch(BASE_URL));
  return dados.produtos || [];
}

export async function buscarPedidos() {
  const dados = await tratarResposta(await fetch(BASE_URL));
  return dados.pedidos || [];
}

export async function criarPedido(pedido) {
  const resposta = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido),
  });
  return tratarResposta(resposta);
}

export async function excluirPedido(id) {
  // Simulação de DELETE para os testes do projeto
  const resposta = await fetch(BASE_URL, {
    method: "DELETE",
  });
  return tratarResposta(resposta);
}