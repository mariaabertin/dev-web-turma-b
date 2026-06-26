const dadosLocais = {
  "produtos": [
    { "id": 1, "nome": "Banho Simples", "preco": 40, "imagem": "banho.jpg" },
    { "id": 2, "nome": "Tosa Completa", "preco": 60, "imagem": "tosa.jpg" },
    { "id": 3, "nome": "Hidratação Control", "preco": 35, "imagem": "hidratacao.jpg" },
    { "id": 4, "nome": "Spa de Ofurô", "preco": 90, "imagem": "spa.jpg" }
  ],
  "pedidos": []
};

export const BASE_URL = "LOCAL_MOCK";

export async function buscarProdutos() {
  return Promise.resolve(dadosLocais.produtos);
}

export async function buscarPedidos() {
  return Promise.resolve(dadosLocais.pedidos);
}

export async function criarPedido(pedido) {
  const novoPedido = { id: Date.now(), ...pedido };
  dadosLocais.pedidos.push(novoPedido);
  return Promise.resolve(novoPedido);
}

export async function excluirPedido(id) {
  dadosLocais.pedidos = dadosLocais.pedidos.filter(p => p.id !== id);
  return Promise.resolve({ sucesso: true });
}