<template>
  <div class="lista-wrap">
    <AlertaComponent
      v-if="alerta.visivel"
      :tipo="alerta.tipo"
      :titulo="alerta.titulo"
      :mensagem="alerta.mensagem"
      @fechar="alerta.visivel = false"
    />

    <!-- Lista vazia -->
    <div v-if="!carregando && listaPedidosRealizados.length === 0" class="vazio">
      <AlertaComponent
        tipo="info"
        titulo="Nenhum pedido por aqui ainda"
        mensagem="Quando você confirmar um pedido, ele aparece nesta tela em tempo real."
        :fechavel="false"
      />
      <router-link to="/menu" class="btn-secundario">Montar uma pizza</router-link>
    </div>

    <!-- Cartões de pedido -->
    <div class="pedidos">
      <article
        v-for="pedido in listaPedidosRealizados"
        :key="pedido.id"
        class="pedido"
        :style="{ borderLeftColor: corStatus(pedido.statusId) }"
      >
        <header class="pedido-topo">
          <div class="pedido-id-cliente">
            <span class="pedido-id">#{{ pedido.id }}</span>
            <span class="pedido-cliente">{{ pedido.nome }}</span>
          </div>
          <button
            class="btn-remover"
            @click="deletarPedido(pedido.id)"
            :aria-label="`Remover pedido ${pedido.id}`"
            title="Remover pedido"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path d="M5 7h14M10 7V5h4v2M6 7l1 12h10l1-12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </header>

        <h3 class="pedido-pizza">
          {{ pedido.burguer ? pedido.burguer.nome : "Pizza" }}
          <span v-if="pedido.tamanho" class="tag">{{ pedido.tamanho.descricao }}</span>
          <span v-if="pedido.meioAMeio && pedido.segundoSabor" class="tag tag-meio">
            meio a meio com {{ pedido.segundoSabor.nome }}
          </span>
        </h3>

        <p class="pedido-massa" v-if="pedido.ponto">{{ pedido.ponto.descricao }}</p>

        <p class="pedido-adicionais" v-if="adicionais(pedido)">
          <span class="rotulo">Adicionais:</span> {{ adicionais(pedido) }}
        </p>

        <footer class="pedido-rodape">
          <span class="pedido-valor" v-if="pedido.valor">{{ formatPreco(pedido.valor) }}</span>
          <label class="status-campo">
            <span class="status-rotulo">Status</span>
            <select
              class="status-select"
              @change="atualizarStatusPedido($event, pedido.id)"
            >
              <option
                v-for="status in listaStatusPedido"
                :key="status.id"
                :value="status.id"
                :selected="status.id == pedido.statusId"
              >
                {{ status.descricao }}
              </option>
            </select>
          </label>
        </footer>
      </article>
    </div>
  </div>
</template>

<script>
import { API_URL } from "@/config";
import AlertaComponent from "@/components/AlertaComponent.vue";

export default {
  name: "ListaPedidosComponent",
  components: { AlertaComponent },
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
      carregando: true,
      alerta: { visivel: false, tipo: "info", titulo: "", mensagem: "" },
    };
  },
  methods: {
    async consultarPedidos() {
      try {
        const res = await fetch(`${API_URL}/pedidos`);
        this.listaPedidosRealizados = await res.json();
      } catch (e) {
        this.mostrarAlerta("erro", "Não foi possível carregar os pedidos.", "Erro de conexão");
      } finally {
        this.carregando = false;
      }
    },
    async consultarStatusPedido() {
      try {
        const res = await fetch(`${API_URL}/status_pedido`);
        this.listaStatusPedido = await res.json();
      } catch (e) {
        this.listaStatusPedido = [];
      }
    },
    async atualizarStatusPedido(event, idPedido) {
      const novoStatus = event.target.value;
      try {
        const res = await fetch(`${API_URL}/pedidos/${idPedido}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ statusId: novoStatus }),
        });
        if (!res.ok) throw new Error();
        // Atualização em tempo real do estado local
        const pedido = this.listaPedidosRealizados.find((p) => p.id === idPedido);
        if (pedido) pedido.statusId = novoStatus;
        this.mostrarAlerta("sucesso", `Status do pedido #${idPedido} atualizado.`, "Status alterado");
      } catch (e) {
        this.mostrarAlerta("erro", "Não foi possível atualizar o status.", "Erro");
      }
    },
    async deletarPedido(idPedido) {
      if (!confirm(`Remover o pedido #${idPedido}?`)) return;
      try {
        const res = await fetch(`${API_URL}/pedidos/${idPedido}`, { method: "DELETE" });
        if (!res.ok) throw new Error();
        // Feedback de remoção: re-renderiza a lista na hora
        this.listaPedidosRealizados = this.listaPedidosRealizados.filter(
          (p) => p.id !== idPedido
        );
        this.mostrarAlerta("info", `Pedido #${idPedido} removido da lista.`, "Pedido excluído");
      } catch (e) {
        this.mostrarAlerta("erro", "Não foi possível remover o pedido.", "Erro");
      }
    },
    adicionais(pedido) {
      const nomes = [
        ...(pedido.complemento || []),
        ...(pedido.bebidas || []),
      ].map((i) => i.nome);
      return nomes.join(", ");
    },
    formatPreco(valor) {
      return "R$ " + Number(valor || 0).toFixed(2).replace(".", ",");
    },
    corStatus(statusId) {
      const cores = {
        1: "#90a4ae", // em espera
        2: "#fb8c00", // em produção
        3: "#1e88e5", // a caminho
        4: "#43a047", // entregue
        5: "#90a4ae", // pendente
        6: "#43a047", // realizado
      };
      return cores[statusId] || "#90a4ae";
    },
    mostrarAlerta(tipo, mensagem, titulo = "") {
      this.alerta = { visivel: true, tipo, titulo, mensagem };
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  mounted() {
    this.consultarPedidos();
    this.consultarStatusPedido();
  },
};
</script>

<style scoped>
.lista-wrap { max-width: 760px; margin: 0 auto; }

.vazio { text-align: center; }

.pedidos { display: flex; flex-direction: column; gap: 14px; }

.pedido {
  background: var(--card);
  border: 1px solid var(--line);
  border-left: 5px solid #90a4ae;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 18px 20px;
  text-align: left;
}

.pedido-topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pedido-id-cliente { display: flex; align-items: baseline; gap: 10px; }
.pedido-id {
  font-family: var(--display);
  font-weight: 700;
  color: var(--brand);
  font-size: 18px;
}
.pedido-cliente { font-weight: 600; font-size: 17px; }

.btn-remover {
  background: none;
  border: none;
  color: var(--muted);
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;
}
.btn-remover:hover { color: var(--erro-bd); background: var(--erro-bg); }

.pedido-pizza {
  margin: 8px 0 4px;
  font-size: 21px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.tag {
  font-family: var(--body);
  font-size: 12px;
  font-weight: 600;
  background: var(--cream);
  color: var(--ink);
  border: 1px solid var(--line);
  padding: 3px 10px;
  border-radius: 999px;
}
.tag-meio { background: #fff4e5; border-color: #ffc107; color: #b26a00; }

.pedido-massa { color: var(--muted); font-size: 14px; margin: 0 0 6px; }
.pedido-adicionais { font-size: 14px; margin: 6px 0 0; color: var(--ink); }
.rotulo { color: var(--muted); font-weight: 600; }

.pedido-rodape {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px dashed var(--line);
}
.pedido-valor {
  font-family: var(--display);
  font-weight: 700;
  font-size: 20px;
  color: var(--basil);
}
.status-campo { display: flex; align-items: center; gap: 8px; }
.status-rotulo { font-size: 13px; color: var(--muted); font-weight: 600; }
.status-select {
  padding: 9px 12px;
  border: 1.5px solid var(--line);
  border-radius: 10px;
  font-size: 14px;
  background: #fff;
  cursor: pointer;
}
.status-select:focus { border-color: var(--brand); }

.btn-secundario {
  display: inline-block;
  margin-top: 12px;
  background: var(--brand);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  padding: 12px 26px;
  border-radius: 999px;
}
.btn-secundario:hover { background: var(--brand-dark); }
</style>
