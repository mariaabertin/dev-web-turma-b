<template>
  <div>
    <AlertaComponent
      :tipo="alerta.tipo"
      :mensagem="alerta.mensagem"
      :visivel="alerta.visivel"
      @fechar="fecharAlerta"
    />

    <div id="pedidos-tabela">
      <div>
        <div id="pedidos-tabela-cabecalho">
          <div id="ordem-id">#ID</div>
          <div>Cliente</div>
          <div>Marmita</div>
          <div>Tamanho</div>
          <div>Total</div>
          <div>Complementos</div>
          <div>Status</div>
          <div id="div-acoes">Ações</div>
        </div>
      </div>
    </div>

    <div
      class="pedidos-tabela-linha"
      v-for="pedido in listaPedidosRealizados"
      :key="pedido.id"
    >
      <div id="ordem-numero">{{ pedido.id }}</div>
      <div>{{ pedido.nome }}</div>
      <div>{{ pedido.prato.nome }}</div>
      <div>{{ pedido.tamanho.descricao }}</div>
      <div>R$ {{ calcularValorTotal(pedido) }},00</div>
      <div>
        <ul>
          <li
            v-for="(acompanhamento, index) in pedido.acompanhamentos"
            :key="index"
          >
            {{ acompanhamento.nome }}
          </li>
        </ul>
        <div class="divider"></div>
        <ul>
          <li v-for="(bebida, index) in pedido.bebidas" :key="index">
            {{ bebida.nome }}
          </li>
        </ul>
      </div>
      <div>
        <select
          @change="atualizarStatusPedido($event, pedido.id)"
          name="status"
          class="status"
        >
          <option value="">Selecione</option>
          <option
            v-for="status in listaStatusPedido"
            :key="status.id"
            :value="status.id"
            :selected="status.id == pedido.statusId"
          >
            {{ status.descricao }}
          </option>
        </select>
      </div>
      <div id="div-acoes">
        <img
          @click="deletarPedido(pedido.id)"
          src="/img/lixeira.svg"
          width="32px"
          height="32px"
          class="btn-excluir"
        />
      </div>
    </div>
  </div>
</template>
<script>
import AlertaComponent from "@/components/AlertaComponent.vue";

export default {
  name: "ListaPedidoComponent",
  components: {
    AlertaComponent,
  },
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
      alerta: { visivel: false, tipo: "info", mensagem: "" },
    };
  },
  methods: {
    mostrarAlerta(tipo, mensagem) {
      this.alerta = { visivel: true, tipo: tipo, mensagem: mensagem };
    },
    fecharAlerta() {
      this.alerta.visivel = false;
    },
    async consultarPedidos() {
      const response = await fetch(`${this.$apiUrl}/pedidos`);
      this.listaPedidosRealizados = await response.json();

      if (this.listaPedidosRealizados.length === 0) {
        this.mostrarAlerta(
          "info",
          "Ainda não há pedidos. Faça um novo pedido pelo cardápio!"
        );
      }
    },
    async consultarStatusPedido() {
      const response = await fetch(`${this.$apiUrl}/status_pedido`);
      this.listaStatusPedido = await response.json();
    },
    calcularValorTotal(pedido) {
      if (pedido?.valorTotal !== undefined && pedido?.valorTotal !== null) {
        return Number(pedido.valorTotal);
      }

      let total = Number(pedido?.prato?.valor || 0);
      total += (pedido?.acompanhamentos || []).reduce(
        (acumulador, item) => acumulador + Number(item.valor || 0),
        0
      );
      total += (pedido?.bebidas || []).reduce(
        (acumulador, item) => acumulador + Number(item.valor || 0),
        0
      );

      return total;
    },
    async atualizarStatusPedido(event, idPedido) {
      const novoStatus = event.target.value;

      if (novoStatus === "") {
        this.mostrarAlerta("aviso", "Selecione um status válido para o pedido.");
        return;
      }

      const atualizacaoJson = JSON.stringify({ statusId: novoStatus });
      await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: atualizacaoJson,
      });

      this.mostrarAlerta("sucesso", "Status do pedido atualizado!");
    },
    async deletarPedido(idPedido) {
      await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
        method: "DELETE",
      });

      await this.consultarPedidos();

      if (this.listaPedidosRealizados.length > 0) {
        this.mostrarAlerta("sucesso", "Pedido removido com sucesso!");
      }
    },
  },
  mounted() {
    this.consultarPedidos();
    this.consultarStatusPedido();
  },
};
</script>
<style scoped>
#pedidos-tabela {
  width: 100%;
  margin: 0 auto;
}

#pedidos-tabela-cabecalho,
#pedidos-tabela-linhas,
.pedidos-tabela-linha {
  display: flex;
  flex-wrap: wrap;
}

#pedidos-tabela-cabecalho {
  font-weight: bold;
  padding: 14px 12px;
  border-bottom: 2px solid #b22222;
  background: #fffaf5;
  margin-bottom: 8px;
}

#pedidos-tabela-cabecalho div,
.pedidos-tabela-linha div {
  width: 14%;
  box-sizing: border-box;
  padding: 0 6px;
}

.pedidos-tabela-linha {
  width: 100%;
  padding: 12px;
  border-bottom: 1px dotted #8e4b1f;
  align-items: flex-start;
}

#pedidos-tabela-cabecalho #ordem-id,
.pedidos-tabela-linha #ordem-numero,
.pedidos-tabela-linha #div-acoes,
#pedidos-tabela-cabecalho #div-acoes {
  width: 5%;
}

.btn-excluir {
  cursor: pointer;
  transition: 0.3s;
}

.btn-excluir:hover {
  transform: scale(1.2);
}

.status {
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #d0d0d0;
}
</style>
