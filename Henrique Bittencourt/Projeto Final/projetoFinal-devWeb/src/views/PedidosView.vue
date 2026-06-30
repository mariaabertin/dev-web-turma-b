<template>
  <div>
    <h1>Pedidos</h1>
    <p class="subtitulo-secao">Acompanhe e atualize o status dos pedidos em tempo real.</p>
    <ListaPedidosComponent />
  </div>
</template>

<script>
import ListaPedidosComponent from "@/components/ListaPedidosComponent.vue";

export default {
  name: "PedidosView",
  components: {
    ListaPedidosComponent,
  },
};
</script>

<style scoped>
.subtitulo-secao { color: var(--muted); font-size: 16px; margin: 0 0 28px; }
</style>
