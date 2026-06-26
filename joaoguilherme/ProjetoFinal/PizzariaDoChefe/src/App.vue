<template>
  <div :class="temaAtual">
    <NavBarComponent :tema="temaAtual" @alternarTema="alternarTema" />
    <BannerComponent />
    <router-view />
  </div>
</template>

<script>
import NavBarComponent from "./components/NavBarComponent.vue";
import BannerComponent from "./components/BannerComponent.vue";
export default {
  name: "App",
  components: {
    NavBarComponent,
    BannerComponent,
  },
  data() {
    return {
      temaAtual: "tema-escuro",
    };
  },
  methods: {
    alternarTema() {
      this.temaAtual = this.temaAtual === "tema-escuro" ? "tema-claro" : "tema-escuro";
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Inter:wght@400;500;600&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.tema-escuro {
  background-color: #111827;
  color: #f0f0f0;
  min-height: 100vh;
}

.tema-claro {
  background-color: #f9f5f0;
  color: #1a1a1a;
  min-height: 100vh;
}

#app {
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #f5e6d3;
}

nav a.router-link-exact-active {
  color: #e8c547;
}
</style>
