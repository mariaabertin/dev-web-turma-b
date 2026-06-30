<template>
  <div>
  <img alt="Vue logo" src="./assets/logo.png">
  <HomeComponente />
  <hr>
  <UsuarioComponent />
  <hr>
  <ImagemComponente />
</div>
</template>

<script>

import HomeComponente from './components/HomeComponente.vue';
import UsuarioComponent from './components/UsuarioComponent.vue';
import ImagemComponente from './components/ImagemComponente.vue';
export default {
  name: 'App',
  components: { 
    ImagemComponente,
    HomeComponente,
    UsuarioComponent,
  },
  mounted() {
    console.log('App montado');
  },
  errorCaptured() {
    console.error('Erro capturado:');
  },
  created() {
    console.log('App criado');
  },
  data() {
    return {
      
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>