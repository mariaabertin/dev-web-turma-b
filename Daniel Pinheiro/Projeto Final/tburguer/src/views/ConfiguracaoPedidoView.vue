<template>
  <div>
    <h1>Configuração do Pedido</h1>
    <pedido-component :burguer="burguerSelecionado" />
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
      burguerSelecionado: null,
    };
  },
  mounted(){
    const query = this.$route.query;
    if( query.burguer ) {
      const decodedBurguer = JSON.parse(decodeURIComponent(query.burguer));
      this.burguerSelecionado = decodedBurguer;
    }
  },
};
</script>

<style scoped></style>
