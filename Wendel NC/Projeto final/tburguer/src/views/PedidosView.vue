<template>
  <div>
    <h1>Pedidos Realizados 🍇</h1>
    <lista-pedido-component-vue />
  </div>
</template>

<script>
import ListaPedidoComponentVue from "@/components/ListaPedidoComponent.vue";

export default {
  name: "PedidosView",
  components: {
    ListaPedidoComponentVue,
  },
};
</script>

<style scoped></style>