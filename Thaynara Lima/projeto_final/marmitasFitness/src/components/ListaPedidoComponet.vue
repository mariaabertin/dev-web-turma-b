<template>
  <div>
    <div id="pedidos-tabela">
      <div>
        <div id="pedidos-tabela-cabecalho">
          <div id="ordem-id">#ID</div>
          <div>Nome</div>
          <div>Marmita</div>
          <div>Tamanho</div>
          <div>Opcionais (Bebidas/Complet.)</div>
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
      <div>{{ pedido.marmita ? pedido.marmita.nome : 'Não informada' }}</div>
      <div>{{ pedido.tamanho ? pedido.tamanho.descricao : 'Não informado' }}</div>
      <div>
        <ul>
          <li v-for="(complemento, index) in pedido.complemento" :key="index">
            {{ complemento.nome }}
          </li>
        </ul>
        <div class="divider" v-if="pedido.complemento?.length && pedido.bebidas?.length"></div>
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
  src="/marmitasFitness/img/icone_lixeira.png" 
  width="35px" 
  height="35px"
  @click="deletarPedido($event, pedido.id)"
  style="cursor: pointer;"
  alt="Excluir pedido"
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
      // CORRIGIDO: Alterado para o servidor local
      urlApi: "https://db-marmitasfitness.onrender.com"
    };
  },
  methods: {
    async consultarPedidos() {
      const response = await fetch(`${this.urlApi}/pedidos`);
      this.listaPedidosRealizados = await response.json();
    },
    async consultarStatusPedido() {
      const response = await fetch(`${this.urlApi}/status_pedido`);
      this.listaStatusPedido = await response.json();
    },
    async atualizarStatusPedido(event, idPedido) {
      const idPedidoAtualizado = event.target.value;
      if (!idPedidoAtualizado) return;

      const atualizacaoJson = JSON.stringify({ statusId: idPedidoAtualizado });
      
      try {
        await fetch(`${this.urlApi}/pedidos/${idPedido}`, {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: atualizacaoJson,
        });
        
        alert(`Status do pedido #${idPedido} atualizado com sucesso!`);
      } catch (error) {
        console.error("Erro ao atualizar o status:", error);
      }
    },
    async deletarPedido(event, idPedido) {
      if (confirm(`Tem certeza que deseja remover o pedido #${idPedido}?`)) {
        try {
          await fetch(`${this.urlApi}/pedidos/${idPedido}`, {
            method: "DELETE",
          });
          
          alert(`Pedido #${idPedido} removido com sucesso!`);
          await this.consultarPedidos();
        } catch (error) {
          console.error("Erro ao deletar pedido:", error);
        }
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
.pedidos-tabela-linha {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

#pedidos-tabela-cabecalho {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #2ecc71; 
  background-color: #f8f9fa;
}

#pedidos-tabela-cabecalho div,
.pedidos-tabela-linha div {
  width: 18%;
  padding: 5px;
}

.pedidos-tabela-linha {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.pedidos-tabela-linha:hover {
  background-color: #f1f2f6; 
}

#pedidos-tabela-cabecalho #ordem-id,
.pedidos-tabela-linha #ordem-numero,
.pedidos-tabela-linha #div-acoes,
#pedidos-tabela-cabecalho #div-acoes {
  width: 5%;
}

.status {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
}

.divider {
  border-top: 1px dashed #ccc;
  margin: 5px 0;
}

ul {
  padding-left: 15px;
  margin: 0;
}

li {
  font-size: 14px;
}
</style>