<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">

    <HomeComponent />
    <hr />

    <HomeComponent />
    <hr />

    <UsuarioComponent />
  </div>
</template>

<script>
import HomeComponent from './components/HomeComponent.vue';
import UsuarioComponent from './components/UsuarioComponent.vue';
import EstiloComponent from './components/EstiloComponent.vue';


export default {
  name: 'App',

  components: {
    HomeComponent,
    UsuarioComponent
  },

  created() {
    console.log("created");
  },

  mounted() {
    console.log("mounted");
  },

  errorCaptured() {
    console.log("errorCaptured");
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