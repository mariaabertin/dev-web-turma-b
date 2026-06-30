<template>
  <div class="pedidos-wrapper">
    <h1 class="titulo-pedidos">Gestão de Pedidos</h1>
    <p class="subtitulo">Acompanhe e gerencie os setups encomendados pelos clientes.</p>
    <ListaPedidosComponent />
  </div>
</template>
<script>
import ListaPedidosComponent from '@/components/ListaPedidosComponent.vue';

export default {
  name: "PedidosView",
  components: {
    ListaPedidosComponent,
  }
};
</script>

<style scoped>
.pedidos-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.titulo-pedidos {
  color: var(--color-text-main);
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

.subtitulo {
  color: var(--color-text-muted);
  margin-bottom: 3rem;
  text-align: center;
}
</style>
