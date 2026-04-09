<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <HomeComponent />
    <hr>
    <UsuarioComponent v-show="componenteUsuarioVisivel"/>
    <hr>
    <EstiloComponent />
    <br>
    <ImagemComponent
     @visibilidade-img="escutarVisibilidadeImg"
     largura-img="300" url-img="https://i.imgflip.com/5c9g8g.jpg" />
  </div>
</template>

<script>

import EstiloComponent from './components/EstiloComponent.vue';
import HomeComponent from './components/HomeComponent.vue';
import UsuarioComponent from './components/UsuarioComponent.vue';
import ImagemComponent from './components/ImagemComponent.vue';

export default {
  name: 'App',
  components: {
    HomeComponent,
    UsuarioComponent,
    EstiloComponent,
    ImagemComponent,
  },
  data() {
    return {
      componenteUsuarioVisivel: true,
    }
  },
  methods: {
    escutarVisibilidadeImg(isImgVisible) {
      this.componenteUsuarioVisivel = !isImgVisible
    }
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
  },
  errorCaptured() {
    console.log("errorCaptured");
  },
}

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
