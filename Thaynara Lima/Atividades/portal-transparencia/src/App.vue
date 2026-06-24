<template>
  <div id="app">
    <ListaDeputados 
      v-if="!deputadoSelecionado" 
      @selecionar="exibirDetalhes" 
    />

    <DetalhesDeputado 
      v-else 
      :deputado="deputadoSelecionado" 
      @voltar="deputadoSelecionado = null" 
    />
  </div>
</template>

<script>
import ListaDeputados from './views/ListaDeputados.vue';
import DetalhesDeputado from './views/DetalhesDeputado.vue';

export default {
  components: {
    ListaDeputados,
    DetalhesDeputado
  },
  data() {
    return {
      deputadoSelecionado: null
    };
  },
  methods: {
    exibirDetalhes(deputado) {
      this.deputadoSelecionado = deputado;
    }
  }
};
</script>

<style>
/* Estilos Globais para limpar as margens do navegador */
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f7f6;
  color: #333;
}
</style>