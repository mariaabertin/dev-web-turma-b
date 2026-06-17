<template>
  <div>
    <alert-component-vue ref="alertComponent" />
    <div id="pedidos-tabela">
      <div>
        <div id="pedidos-tabela-cabecalho">
          <div id="ordem-id">#ID</div>
          <div>Nome</div>
          <div>Pizza</div>
          <div>Tamanho</div>
          <div>Adicionais</div>
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
      <div>{{ pedido.burguer.nome }}</div>
      <div>{{ pedido.ponto.descricao }}</div>
      <div>
        <ul>
          <li v-for="(complemento, index) in pedido.complemento" :key="index">
            {{ complemento.nome }}
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
          src="/img/icone_lixeira.png"
          width="35px"
          height="35px"
        />
      </div>
    </div>
  </div>
</template>
<script>
import AlertComponentVue from "./AlertComponent.vue";

export default {
  name: "ListaPedidoComponent",
  components: {
    AlertComponentVue,
  },
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
    async consultarStatusPedido() {
      const response = await fetch(`${this.$apiUrl}/status_pedido`);
      this.listaStatusPedido = await response.json();
    },
    async atualizarStatusPedido(event, idPedido) {
      const idPedidoAtualizado = event.target.value;
      const atualizacaoJson = JSON.stringify({ statusId: idPedidoAtualizado });
      try {
        await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: atualizacaoJson,
        });
        this.$refs.alertComponent.mostrarAlerta(
          "sucesso",
          "Status do pedido atualizado com sucesso!"
        );
      } catch (error) {
        console.error(error);
        this.$refs.alertComponent.mostrarAlerta(
          "erro",
          "Erro ao atualizar status do pedido"
        );
      }
    },
    async deletarPedido(idPedido) {
      try {
        const response = await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          // Remove o pedido da lista imediatamente
          this.listaPedidosRealizados = this.listaPedidosRealizados.filter(
            (pedido) => pedido.id !== idPedido
          );
          
          this.$refs.alertComponent.mostrarAlerta(
            "sucesso",
            "Pedido removido com sucesso!"
          );
        }
      } catch (error) {
        console.error(error);
        this.$refs.alertComponent.mostrarAlerta(
          "erro",
          "Erro ao remover pedido"
        );
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
  padding: 12px;
  border-bottom: 2px solid #222;
}

#pedidos-tabela-cabecalho div,
.pedidos-tabela-linha div {
  width: 18%;
}

.pedidos-tabela-linha {
  width: 100%;
  padding: 12px;
  border-bottom: 1px dotted #222;
}

#pedidos-tabela-cabecalho #ordem-id,
.pedidos-tabela-linha #ordem-numero,
.pedidos-tabela-linha #div-acoes,
#pedidos-tabela-cabecalho #div-acoes {
  width: 5%;
}
</style>
