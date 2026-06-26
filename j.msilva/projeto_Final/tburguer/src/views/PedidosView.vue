<template>
  <div>
    <h1 id="pedidos-titulo">Pedidos Realizados</h1>
    <ListaPedidoComponent />
  </div>
</template>

<script>
import ListaPedidoComponent from "@/components/ListaPedidoComponent.vue";

export default {
  name: "PedidosView",
  components: {
    ListaPedidoComponent,
  },
};
</script>

<style scoped>
#pedidos-titulo {
  color: #e2e8f0;
  margin: 24px 0 16px;
  font-size: 28px;
}
</style>
