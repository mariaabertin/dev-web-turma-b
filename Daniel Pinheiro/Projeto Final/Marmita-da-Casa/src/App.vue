<template>
  <div>
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
body {
  margin: 0;
  background: #fff8ef;
  color: #3d2b1f;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3d2b1f;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #3d2b1f;
}

nav a.router-link-exact-active {
  color: #d62828;
}
</style>
