<template>
  <div>
    <h1 id="config-titulo">Configuração do Pedido</h1>
    <AlertComponent
      v-if="avisoSemTeclado"
      tipo="aviso"
      mensagem="Nenhum teclado selecionado. Redirecionando para o Menu..."
    />
    <pedido-component v-else :teclado="tecladoSelecionado" />
  </div>
</template>

<script>
import PedidoComponent from "@/components/PedidoComponent.vue";
import AlertComponent from "@/components/AlertComponent.vue";

export default {
  name: "ConfiguracaoPedidoView",
  components: {
    PedidoComponent,
    AlertComponent,
  },
  data() {
    return {
      tecladoSelecionado: null,
      avisoSemTeclado: false,
    };
  },
  mounted() {
    const query = this.$route.query;
    if (query.teclado) {
      const decodedTeclado = JSON.parse(decodeURIComponent(query.teclado));
      this.tecladoSelecionado = decodedTeclado;
    } else {
      this.avisoSemTeclado = true;
      setTimeout(() => {
        this.$router.push("/menu");
      }, 2500);
    }
  },
};
</script>

<style scoped>
#config-titulo {
  color: #e2e8f0;
  margin: 24px 0;
  font-size: 28px;
}
</style>
