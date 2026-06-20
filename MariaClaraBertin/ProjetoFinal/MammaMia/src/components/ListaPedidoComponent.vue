<template>
  <div>
    <mensagem-component v-if="msg" :msg="msg" :tipo="alertType" />

    <div id="pedidos-tabela">
      <div>
        <div id="pedidos-tabela-cabecalho">
          <div id="ordem-id">#ID</div>
          <div>Nome</div>
          <div>Pizza</div>
          <div>Tamanho</div>
          <div>Opcionais</div>
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
      <div>{{ pedido.pizza && pedido.pizza.nome ? pedido.pizza.nome : '--' }}</div>
      <div>{{ pedido.tamanho && pedido.tamanho.descricao ? pedido.tamanho.descricao : '--' }}</div>
      <div>
        <ul>
          <li v-for="(complemento, index) in pedido.complemento" :key="index">
            {{ complemento.nome }}
          </li>
        </ul>
        <div class="divider"></div>
        <ul>
          <li v-for="(refri, index) in pedido.bebidas" :key="index">
            {{ refri.nome }}
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
          src="/img/icone_lixeira.png" 
          width="35px" 
          height="35px"
          @click="deletarPedido($event, pedido.id)"
          style="cursor: pointer;"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MensagemComponent from '@/components/MensagemComponent.vue';

export default {
  name: "ListaPedidoComponent",
  components: {
    MensagemComponent
  },
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
      msg: null,
      alertType: "aviso" 
    };
  },
  methods: {
    async consultarPedidos() {
      const response = await fetch("https://api-mammamia.onrender.com/pedidos");
      this.listaPedidosRealizados = await response.json();
    },
    async consultarStatusPedido() {
      const response = await fetch("https://api-mammamia.onrender.com/status_pedido");
      this.listaStatusPedido = await response.json();
    },
    async atualizarStatusPedido(event, idPedido) {
      const idPedidoAtualizado = event.target.value;
      const atualizacaoJson = JSON.stringify({ statusId: Number(idPedidoAtualizado) });
      
      await fetch(`https://api-mammamia.onrender.com/pedidos/${idPedido}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: atualizacaoJson,
      });
    },
    async deletarPedido(event, idPedido) {
      const req = await fetch(`https://api-mammamia.onrender.com/pedidos/${idPedido}`, {
        method: "DELETE",
      });

      if (req.ok) {
        this.listaPedidosRealizados = this.listaPedidosRealizados.filter(
          (pedido) => pedido.id !== idPedido
        );

        this.msg = `Aviso: O pedido #${idPedido} foi removido com sucesso.`;
        this.alertType = "aviso";

        setTimeout(() => {
          this.msg = null;
        }, 3000);
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
  align-items: center; 
}

#pedidos-tabela-cabecalho #ordem-id,
.pedidos-tabela-linha #ordem-numero,
.pedidos-tabela-linha #div-acoes,
#pedidos-tabela-cabecalho #div-acoes {
  width: 5%;
}

ul {
  padding-left: 20px;
  margin: 4px 0;
}

.divider {
  border-top: 1px solid #ddd;
  margin: 4px 0;
  width: 80%;
}
</style>