<template>
  <div class="main-container">
    <h1>Configure seu Pedido:</h1>
    <PedidoComponent :marmita="marmitaSelecionada" />
  </div>
</template>

<script>
import PedidoComponent from '@/components/PedidoComponent.vue';

export default {
  name: 'ConfiguracaoPedidoView',
  components: {
    PedidoComponent
  },
  data() {
    return {
      marmitaSelecionada: null
    };
  },
  created() {
    if (this.$route.query.marmita) {
      try {
        const param = decodeURIComponent(this.$route.query.marmita);
        this.marmitaSelecionada = JSON.parse(param);
      } catch (e) {
        console.error("Erro ao processar os dados da marmita:", e);
      }
    }
  }
}
</script>

<style scoped>
.main-container {
  margin: 50px auto;
  max-width: 1200px;
  min-height: 300px;
  padding: 20px;
}
h1 {
  text-align: center;
  color: #1e272e;
  margin-bottom: 40px;
}
</style>