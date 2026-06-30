<template>
  <div class="agendamentos-pagina">
    <h1>Agendamentos</h1>

    <p v-if="pedidos.length === 0" class="vazio">
      Nenhum agendamento ainda.
      <router-link to="/menu">Agende o primeiro serviço do seu pet</router-link>.
    </p>

    <div v-else class="lista-agendamentos">
      <div v-for="pedido in pedidos" :key="pedido.id" class="card-agendamento">
        <div class="info">
          <strong>{{ pedido.nomePet }}</strong> ({{ pedido.porte }}) — {{ pedido.servicoNome }}
          <br />
          Cliente: {{ pedido.nomeCliente }} · Tel: {{ pedido.telefone }}
          <br />
          Quando: {{ formatarData(pedido.dataHora) }}
          <br />
          <span v-if="pedido.observacoes">Obs.: {{ pedido.observacoes }}</span>
        </div>
        <div class="valor-e-acao">
          <span class="valor">R$ {{ pedido.valor.toFixed(2) }}</span>
          <button class="botao-cancelar" @click="cancelar(pedido.id)">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PedidosView",
  data() {
    return {
      pedidos: [],
    };
  },
  created() {
    this.carregarPedidos();
  },
  methods: {
    carregarPedidos() {
      const dados = localStorage.getItem("pedidos");
      this.pedidos = dados ? JSON.parse(dados) : [];
    },
    cancelar(id) {
      this.pedidos = this.pedidos.filter((p) => p.id !== id);
      localStorage.setItem("pedidos", JSON.stringify(this.pedidos));
    },
    formatarData(valor) {
      if (!valor) return "";
      const data = new Date(valor);
      return data.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
.agendamentos-pagina {
  padding: 30px 50px;
}

.vazio {
  margin-top: 30px;
  font-size: 16px;
}

.lista-agendamentos {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 20px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.card-agendamento {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d1f2ee;
  border-radius: 12px;
  padding: 16px 20px;
  text-align: left;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.info {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}

.valor-e-acao {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.valor {
  font-weight: bold;
  color: #0b3d3e;
}

.botao-cancelar {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
}

.botao-cancelar:hover {
  background-color: #c62828;
}
</style>
