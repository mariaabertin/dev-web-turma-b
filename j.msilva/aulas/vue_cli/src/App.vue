<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Meu primeiro App vue</h1>
        <home-component />
    <p class="subtitulo">Vamos aprender muito</p>
    <hr>
    <estilo-component />
    <hr>
    <usuario-component />
    <hr>
    </div>  
</template>

<script>

import EstiloComponent from './components/EstiloComponent.vue';
import HomeComponent from './components/HomeComponent.vue';
import UsuarioComponent from './components/UsuarioComponent.vue';

export default {
  name: 'App',
  components: {
    HomeComponent,
    UsuarioComponent, 
    EstiloComponent,
  },
  created() {
    console.log("created")
  },
  mounted() {
    console.log("mounted")
  },
  errorCaptured(){
    console.log("errorCapture")
  }
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