<template>
  <div>
    <h1>Configuração do Pedido</h1>
    <pedido-component-vue :arranjo="arranjoSelecionado" />
  </div>
</template>
<script>
import PedidoComponentVue from "@/components/PedidoComponent.vue";

export default {
  name: "ConfiguracaoPedidoView",
  components: {
    PedidoComponentVue,
  },
  data() {
    return {
      arranjoSelecionado: null,
    };
  },
  mounted() {
    const query = this.$route.query;
    if (query.arranjo) {
      const decodeArranjo = JSON.parse(decodeURIComponent(query.arranjo));
      this.arranjoSelecionado = decodeArranjo;
    }
  },
};
</script>
<style scoped></style>
