<template>
  <div id="pedidos-wrapper">
    <mensagem-component-vue
      :mensagem="textoMensagem"
      :tipo="tipoMensagem"
      :isVisible="exibirMensagem"
    />
    <div id="pedidos-header">
      <h1>Pedidos</h1>
      <p>Acompanhe e gerencie os pedidos realizados</p>
    </div>

    <div id="pedidos-lista">
      <div id="pedidos-vazio" v-if="listaPedidosRealizados.length === 0">
        <p>Nenhum pedido registrado ainda.</p>
      </div>

      <div
        class="pedido-card"
        v-for="pedido in listaPedidosRealizados"
        :key="pedido.id"
      >
        <div class="pedido-card-topo">
          <div class="pedido-info-principal">
            <span class="pedido-id">#{{ pedido.id }}</span>
            <span class="pedido-nome">{{ pedido.nome }}</span>
          </div>
          <button class="btn-lixeira" @click="deletarPedido(pedido.id)">🗑</button>
        </div>

        <div class="pedido-card-corpo">
          <div class="pedido-detalhe">
            <span class="detalhe-label">Pizza</span>
            <span class="detalhe-valor">
              {{ pedido.pizza.nome }}
              <span v-if="pedido.meioAMeio && pedido.segundaPizza"> / {{ pedido.segundaPizza.nome }}</span>
            </span>
          </div>
          <div class="pedido-detalhe">
            <span class="detalhe-label">Tamanho</span>
            <span class="detalhe-valor">{{ pedido.tamanho.descricao }}</span>
          </div>
          <div class="pedido-detalhe" v-if="pedido.borda">
            <span class="detalhe-label">Borda</span>
            <span class="detalhe-valor">{{ pedido.borda.nome }}</span>
          </div>
          <div class="pedido-detalhe" v-if="pedido.bebida">
            <span class="detalhe-label">Bebida</span>
            <span class="detalhe-valor">{{ pedido.bebida.nome }}</span>
          </div>
          <div class="pedido-detalhe" v-if="pedido.pagamento">
            <span class="detalhe-label">Pagamento</span>
            <span class="detalhe-valor">{{ pedido.pagamento }}</span>
          </div>
          <div class="pedido-detalhe" v-if="pedido.troco">
            <span class="detalhe-label">Troco</span>
            <span class="detalhe-valor">R$ {{ pedido.troco }},00</span>
          </div>
          <div class="pedido-total">
            <span>Total</span>
            <span>R$ {{ pedido.total }},00</span>
          </div>
        </div>

        <div class="pedido-card-rodape">
          <select
            @change="atualizarStatusPedido($event, pedido.id)"
            name="status"
            class="status-select"
          >
            <option value="">Atualizar status</option>
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
      </div>
    </div>
  </div>
</template>

<script>
import MensagemComponentVue from "@/components/MensagemComponent.vue";

export default {
  name: "ListaPedidoComponent",
  components: {
    MensagemComponentVue,
  },
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
      exibirMensagem: false,
      textoMensagem: "",
      tipoMensagem: "",
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
      this.listaPedidosRealizados = this.listaPedidosRealizados.filter(
        (pedido) => pedido.id !== idPedido
      );
      this.textoMensagem = "Pedido removido com sucesso.";
      this.tipoMensagem = "sucesso";
      this.exibirMensagem = true;
    },
  },
  mounted() {
    this.consultarPedidos();
    this.consultarStatusPedido();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Inter:wght@400;500;600&display=swap');

#pedidos-wrapper {
  font-family: 'Inter', sans-serif;
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 24px;
}

#pedidos-header {
  margin-bottom: 36px;
  text-align: center;
}

#pedidos-header h1 {
  font-family: 'Playfair Display', serif;
  font-size: 38px;
  color: inherit;
  margin-bottom: 6px;
}

#pedidos-header p {
  color: #9ca3af;
  font-size: 15px;
}

#pedidos-vazio {
  text-align: center;
  color: #6b7280;
  font-size: 15px;
  padding: 60px 0;
}

#pedidos-lista {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;
}

.pedido-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.pedido-card-topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #8b1a1a;
}

.pedido-info-principal {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pedido-id {
  font-size: 12px;
  font-weight: 700;
  color: rgba(255,255,255,0.6);
  letter-spacing: 1px;
}

.pedido-nome {
  font-size: 17px;
  font-weight: 600;
  color: #fff;
}

.btn-lixeira {
  background: rgba(255,255,255,0.15);
  border: none;
  border-radius: 8px;
  width: 34px;
  height: 34px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-lixeira:hover {
  background: rgba(255,255,255,0.28);
}

.pedido-card-corpo {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.pedido-detalhe {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.detalhe-label {
  color: #888;
  font-weight: 500;
  min-width: 70px;
}

.detalhe-valor {
  color: #1a1a1a;
  font-weight: 500;
  text-align: right;
}

.pedido-total {
  display: flex;
  justify-content: space-between;
  font-size: 17px;
  font-weight: 700;
  padding: 12px 0 4px;
  color: #8b1a1a;
  font-family: 'Playfair Display', serif;
}

.pedido-card-rodape {
  padding: 14px 20px;
  background: #f9f5f0;
  border-top: 1px solid #eee;
}

.status-select {
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  color: #333;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.2s;
}

.status-select:focus {
  outline: none;
  border-color: #8b1a1a;
}
</style>
