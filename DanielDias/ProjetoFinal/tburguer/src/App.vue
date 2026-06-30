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
* {
  box-sizing: border-box;
}

body {
  background-color: #faf8f4;
  margin: 0;
}

#app {
  font-family: Georgia, 'Times New Roman', Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c2c2c;
}

nav a.router-link-exact-active {
  color: #d4a847;
  border-bottom: 2px solid #d4a847;
  padding-bottom: 2px;
}
</style>