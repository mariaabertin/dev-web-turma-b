<template>
  <div>
    <h1>Monte o seu pedido</h1>
    <p class="subtitulo-secao">Ajuste a massa, o tamanho e os adicionais antes de confirmar.</p>
    <PedidoComponent :pizza="pizzaSelecionada" />
  </div>
</template>

<script>
import PedidoComponent from "@/components/PedidoComponent.vue";

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
    if (query.pizza) {
      this.pizzaSelecionada = JSON.parse(decodeURIComponent(query.pizza));
    }
  },
};
</script>

<style scoped>
.subtitulo-secao { color: var(--muted); font-size: 16px; margin: 0 0 28px; }
</style>
