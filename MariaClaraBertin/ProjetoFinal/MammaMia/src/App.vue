<template>
  <div>
    <nav-bar-component />
    <!-- O banner só vai aparecer na Home ou no Menu, limpando as outras telas -->
    <banner-component v-if="$route.path === '/' || $route.path === '/menu'" />
    <router-view />
  </div>
</template>

<script>
import NavBarComponent from './components/NavBarComponent.vue';
import BannerComponent from './components/BannerComponent.vue';

export default {
    name: "App",
    components: {
      NavBarComponent,
      BannerComponent
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
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

/* Atualizado de verde para combinar com o darkgoldenrod da sua Mamma Mia */
nav a.router-link-exact-active {
  color: darkgoldenrod;
}
</style>