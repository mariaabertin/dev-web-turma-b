<template>
  <div id="app">
    <NavBarComponent />
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
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fff8f0;
  min-height: 100vh;
}

nav {
  padding: 16px 30px;
}

nav a {
  font-weight: bold;
  color: #fff;
}

nav a.router-link-exact-active {
  color: #ffe082;
}
</style>