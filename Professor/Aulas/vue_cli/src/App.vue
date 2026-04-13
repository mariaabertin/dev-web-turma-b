<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Meu Primeiro App Vue</h1>
    <p class="subtitulo">Vamos aprender muito!</p>
    <br />
    <estilo-component />
    <br />
    <home-component />
    <hr />
    <usuario-component v-show="componentUsuarioVisivel" />
    <br />
    <imagem-component
      @visibilidade-img="escutarVisibilidadeImg"
      larguraImg="500"
      urlImagem="https://i0.statig.com.br/bancodeimagens/9d/jk/aj/9djkajlyxduup2fnr6qq4114l.jpg"
    />
  </div>
</template>

<script>
import HomeComponent from "./components/HomeComponent.vue";
import UsuarioComponent from "./components/UsuarioComponent.vue";
import EstiloComponent from "./components/EstiloComponent.vue";
import ImagemComponent from "./components/ImagemComponent.vue";

export default {
  name: "App",
  components: {
    HomeComponent,
    UsuarioComponent,
    EstiloComponent,
    ImagemComponent,
  },
  data() {
    return {
      componentUsuarioVisivel: true,
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
