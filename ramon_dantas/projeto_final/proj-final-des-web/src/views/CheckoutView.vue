<template>
  <div>
    <h1>Configuração do Pedido</h1>
    <pedido-component :produto="produtoSelecionado" />
  </div>
</template>

<script>
import PedidoComponent from "@/components/PedidoComponent.vue";

export default {
  name: "CheckooutView",
  components: {
    PedidoComponent,
  },
  data() {
    return {
      produtoSelecionado: null,
    };
  },

  mounted(){
    const query = this.$route.query;
    if( query.produto ) {
      const decodedProduto = JSON.parse(decodeURIComponent(query.produto));
      this.produtoSelecionado = decodedProduto;
    }
  },
};
</script>

<style scoped>
</style>
