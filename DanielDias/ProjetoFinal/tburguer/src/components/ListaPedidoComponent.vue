<template>
  <div id="lista-pedidos-container">
    <h2 id="pedidos-titulo">Pedidos Realizados</h2>
    <div v-if="listaPedidosRealizados.length === 0" id="sem-pedidos">
      <p>Nenhum pedido realizado ainda.</p>
    </div>
    <div
      v-for="pedido in listaPedidosRealizados"
      :key="pedido.id"
      id="pedido-item"
    >
      <div id="info-pedido">
        <p><strong>Cliente:</strong> {{ pedido.nome }}</p>
        <p><strong>Prato:</strong> {{ pedido.prato.nome }}</p>
        <p><strong>Molho:</strong> {{ pedido.molho.descricao }}</p>

        <p><strong>Acompanhamentos:</strong></p>
        <ul>
          <li
            v-for="(acompanhamento, index) in pedido.acompanhamentos"
            :key="index"
          >
            {{ acompanhamento.nome }}
          </li>
        </ul>

        <p><strong>Bebidas:</strong></p>
        <ul>
          <li v-for="(bebida, index) in pedido.bebidas" :key="index">
            {{ bebida.nome }}
          </li>
        </ul>
      </div>

      <div id="acoes-pedido">
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

        <img
          @click="deletarPedido(pedido.id)"
          src="/img/icone_lixeira.png"
          width="35px"
          height="35px"
          id="icone-deletar"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListaPedidoComponent",
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
    };
  },
  methods: {
    async consultarPedidos() {
      const response = await fetch(`${this.$apiUrl}/pedidos`);
      this.listaPedidosRealizados = await response.json();
    },
    async getStatusPedido() {
      const response = await fetch(`${this.$apiUrl}/status_pedido`);
      const dados = await response.json();
      this.listaStatusPedido = dados;
    },
    async atualizarStatusPedido(event, idPedido) {
      const idPedidoAtualizado = event.target.value;
      const atualizacaoJson = JSON.stringify({ statusId: idPedidoAtualizado });
      await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: atualizacaoJson,
      });
    },
    async deletarPedido(idPedido) {
      await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
        method: "DELETE",
      });
      this.consultarPedidos();
    },
  },
  mounted() {
    this.consultarPedidos();
    this.getStatusPedido();
  },
};
</script>

<style scoped>
#lista-pedidos-container {
  padding: 40px 48px;
  background-color: #faf8f4;
  min-height: 60vh;
}

#pedidos-titulo {
  font-size: 13px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #8a7f6e;
  font-style: normal;
  margin-bottom: 28px;
  font-family: Georgia, serif;
}

#sem-pedidos p {
  font-style: italic;
  color: #aaa49a;
  font-size: 15px;
}

#pedido-item {
  background: #ffffff;
  border-radius: 10px;
  padding: 20px 24px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

#info-pedido p {
  margin: 3px 0;
  font-size: 14px;
  color: #2c2c2c;
}

#info-pedido p strong {
  color: #8a7f6e;
  font-weight: normal;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

#info-pedido ul {
  margin: 3px 0 10px 16px;
  font-size: 13px;
  color: #5a5450;
}

#acoes-pedido {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  min-width: 140px;
}

.status {
  padding: 7px 10px;
  border: 1px solid #ddd8cc;
  border-radius: 6px;
  font-size: 13px;
  font-family: Georgia, serif;
  background: #faf8f4;
  color: #2c2c2c;
  cursor: pointer;
  width: 100%;
}

#icone-deletar {
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;
}

#icone-deletar:hover {
  opacity: 1;
}
</style>