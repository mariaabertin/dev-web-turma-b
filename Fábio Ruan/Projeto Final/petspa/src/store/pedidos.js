import { reactive } from "vue";
import { buscarPedidos, criarPedido, excluirPedido } from "@/services/api";

// Estado compartilhado simples usando a reatividade nativa do Vue 3.
// Não usamos Vuex/Pinia aqui de propósito: isso resolve a necessidade de
// "Atualização de Estado em Tempo Real" entre as telas de Agendar e Agendamentos
// sem introduzir nenhuma biblioteca além do que foi usado em sala.
export const estoquePedidos = reactive({
  itens: [],
  carregando: false,
  carregadoUmaVez: false,
});

export async function carregarPedidosIniciais() {
  if (estoquePedidos.carregadoUmaVez) return;
  estoquePedidos.carregando = true;
  try {
    const dados = await buscarPedidos();
    estoquePedidos.itens = dados;
  } catch (erro) {
    console.error("Não foi possível carregar os agendamentos da API:", erro);
  } finally {
    estoquePedidos.carregando = false;
    estoquePedidos.carregadoUmaVez = true;
  }
}

export async function adicionarPedido(pedido) {
  // Atualiza a tela imediatamente, garantindo a navegação em tempo real
  estoquePedidos.itens.unshift(pedido);
  // Tenta sincronizar com a API (best-effort; o my-json-server é um mock
  // gratuito e não garante persistência real entre requisições)
  try {
    await criarPedido(pedido);
  } catch (erro) {
    console.error("Não foi possível salvar o agendamento na API:", erro);
  }
}

export async function removerPedido(id) {
  const indice = estoquePedidos.itens.findIndex((pedido) => pedido.id === id);
  if (indice !== -1) {
    estoquePedidos.itens.splice(indice, 1);
  }
  try {
    await excluirPedido(id);
  } catch (erro) {
    console.error("Não foi possível remover o agendamento na API:", erro);
  }
}
