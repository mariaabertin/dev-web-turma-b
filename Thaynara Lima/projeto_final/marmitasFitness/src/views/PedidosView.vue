<template>
  <div class="main-container">
    <h1>Gerenciar Pedidos de Marmitas:</h1>
    <ListaPedidoComponet />
  </div>
</template>

<script>
import ListaPedidoComponet from '@/components/ListaPedidoComponet.vue';

export default {
  name: 'PedidosView',
  components: {
    ListaPedidoComponet
  }
}
</script>

<style scoped>
.main-container {
  margin: 50px auto;
  max-width: 1200px;
  min-height: 250px;
  padding: 20px;
}
h1 {
  text-align: center;
  color: #1e272e;
  margin-bottom: 40px;
}
</style>