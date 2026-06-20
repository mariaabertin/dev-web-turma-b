<template>
  <div id="app-wrapper">
    <HomeView 
      v-if="telaAtual === 'home'" 
      @selecionar-deputado="mudarParaDetalhes" 
    />
    <DetailView 
      v-if="telaAtual === 'detalhes'" 
      :id="idDeputadoSelecionado" 
      @voltar="mudarParaHome" 
    />
  </div>
</template>

<script>
import HomeView from './views/HomeView.vue';
import DetailView from './views/DetailView.vue'; 

export default {
  name: 'App',
  components: {
    HomeView,
    DetailView, 
  },
  data() {
    return {
      telaAtual: 'home',
      idDeputadoSelecionado: null
    }
  },
  methods: {
    mudarParaDetalhes(id) {
      this.idDeputadoSelecionado = id
      this.telaAtual = 'detalhes'
    },
    mudarParaHome() {
      this.idDeputadoSelecionado = null
      this.telaAtual = 'home'
    }
  }
}
</script>

<style>
body {
  margin: 0;
  background-color: #f4f7f5;
  -webkit-font-smoothing: antialiased;
}
#app-wrapper {
  min-height: 100vh;
}
</style>