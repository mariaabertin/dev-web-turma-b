<template>
  <div>
    <h1>Configuração do Pedido</h1>
    <PedidoComponent :pizza="pizzaSelecionada"/>
  </div>
</template>

<script>
import PedidoComponent from '@/components/PedidoComponent.vue';

export default {
  name: "ConfiguracaoPedidoView",
  components: {
    PedidoComponent,
  },
  data() {
    return {
      pizzaSelecionada: null,
    };
  },
  mounted() {
    const query = this.$route.query;
    if(query.pizza) {
      const decodePizza = JSON.parse(decodeURIComponent(query.pizza));
      this.pizzaSelecionada = decodePizza;
    }
  }
};
</script>

<style scoped></style>