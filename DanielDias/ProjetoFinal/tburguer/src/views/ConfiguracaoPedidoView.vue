<template>
  <div>
    <PedidoComponent :prato="pratoSelecionado" />
  </div>
</template>

<script>
import PedidoComponent from "../components/PedidoComponent.vue";

export default {
  name: "ConfiguracaoPedidoView",
  components: {
    PedidoComponent,
  },
  data() {
    return {
      pratoSelecionado: null,
    };
  },
  mounted() {
    const query = this.$route.query;
    if (query.prato) {
      const decodePrato = JSON.parse(decodeURIComponent(query.prato));
      this.pratoSelecionado = decodePrato;
    }
  },
};
</script>

<style scoped></style>