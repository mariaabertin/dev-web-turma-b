<template>
  <div>
    <NavBarComponent />
    <BannerComponent />
    <AlertComponent ref="globalAlert" />
    <router-view />
  </div>
</template>

<script>
import NavBarComponent from "./components/NavBarComponent.vue";
import BannerComponent from "./components/BannerComponent.vue";
import AlertComponent from "./components/AlertComponent.vue";

export default {
  name: "App",
  components: {
    NavBarComponent,
    BannerComponent,
    AlertComponent,
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

nav a.router-link-exact-active {
  color: #ff6b35;
}

h1 {
  color: #1a1a1a;
  margin: 30px 0 20px 0;
}
</style>
