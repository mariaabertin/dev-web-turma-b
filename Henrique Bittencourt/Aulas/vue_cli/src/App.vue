<template>
  <div>
<img alt="Vue logo" src="./assets/logo.png">
<h1>Meu primeiro APP vue</h1>
<p class="subtitulo">Vamos aprender muito</p>
<br />
<estilo-component />
<br />
<home-component />
<hr />
<usuario-component/>




  </div>
</template>

<script>

import UsuarioComponent from './components/UsuarioComponent.vue';
import HomeComponent from './components/HomeComponent.vue';
import EstiloComponent from './components/EstiloComponent.vue';

export default {
  name: 'App',
  components: {
    HomeComponent,
    UsuarioComponent,
    EstiloComponent,
  },

created(){
  console.log("creadet");
},
mounted(){
  console.log("mounted")
},
errorCaptured(){
  console.log("errorCaptured")
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
