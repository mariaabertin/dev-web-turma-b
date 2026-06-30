<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Meu primeiro App Vue</h1>
    <p class="subtitulo">Vamos aprender muito!</p>
    <br>
    <estilo-component />
    <br>
    <home-component/>
    <hr>
    <usuario-component v-show="componentUsuarioVisivel"/>
  </div>
    <hr>
    <Imagemcomponent @visibilidade-img="escutarVisibilidadeImg"
    larguraImhg="500"
    urlImagem="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHOy8vuWcgOSylpmxu98YAeuQhbldudi1wCg&s" />
</template>

<script>
import HomeComponent from './components/HomeComponent.vue';
import UsuarioComponent from './components/UsuarioComponent.vue';
import EstiloComponent from './components/EstiloComponent.vue';
import Imagemcomponent from './components/Imagemcomponent.vue';
export default {
  name: 'App',
  components: {
    HomeComponent,
    UsuarioComponent,
    EstiloComponent,
    Imagemcomponent, 
},
data() {
  return {
    componentUsuarioVisivel: false,
  };
},
methods: {
  escutarVisibilidadeImg(isVisivel) {
    this.componentUsuarioVisivel = !isVisivel;
  },
},
  mounted() {
    console.log("mounted");
},
errorCaptured() {
    console.log("errorCaptured");
},
  created() {
    console.log("created");
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
