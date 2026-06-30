<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <home-component />
    <hr />
    <HomeComponent />
    <hr>
    <UsuarioComponent v-show="componentUsuarioVisivel"/>
    <br>
    <EstiloComponents/>
    <br/>
    <ImagemComponent
    @visibilidade-img="escutarVisibilidadeImg"
    larguraImg="500"
    urlImagem="https://causaoperaria.org.br/wp-content/uploads/2022/09/32AF2063-72AC-4706-9750-47356C3736C7-942x720.jpeg"/>
    
  </div>
</template>

<script>
import HomeComponent from "./components/HomeComponent.vue";
import UsuarioComponent from "./components/UsuarioComponent.vue";
import EstiloComponents from "./components/EstiloComponents.vue";
import ImagemComponent from "./components/ImagemComponent.vue";


export default {
name: "App",

  components: {
    HomeComponent,
    UsuarioComponent,
    EstiloComponents,
    ImagemComponent,
  
  },
  data() {
    return {
      componentUsuarioVisivel: true,
    }
  },

  methods: {
    escutarVisibilidadeImg(isVisivel) {
      this.componentUsuarioVisivel = !isVisivel
    },
  },

  created() {
    console.log("created");
  },
  mounted(){
    console.log("mounted");
  },
  errorCaptured(){
    console.log("errorCaptured");
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
