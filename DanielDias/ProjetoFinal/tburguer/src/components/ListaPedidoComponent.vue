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
  padding: 30px;
}

#pedidos-titulo {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  color: #2c2c2c;
  font-size: 30px;
  margin-bottom: 20px;
}

#sem-pedidos p {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  color: #888;
  font-size: 16px;
}

#pedido-item {
  border: 2px solid #d4a847;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

#info-pedido p {
  margin: 4px 0;
  font-size: 15px;
  color: #2c2c2c;
}

#info-pedido ul {
  margin: 4px 0 8px 20px;
  font-size: 14px;
  color: #444;
}

#acoes-pedido {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.status {
  padding: 6px;
  border: 1px solid #d4a847;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

#icone-deletar {
  cursor: pointer;
  transition: 0.3s;
}

#icone-deletar:hover {
  opacity: 0.6;
}
</style>