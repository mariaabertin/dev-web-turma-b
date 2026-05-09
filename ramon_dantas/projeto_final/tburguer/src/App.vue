<template>
  <NavBarComponent />
  <BannerComponent />
  <router-view />
</template>

<script>
import BannerComponent from './components/BannerComponent.vue';
import NavBarComponent from './components/NavBarComponent.vue';

  export default {
    name : "App",

    components: {
      NavBarComponent,
      BannerComponent,
    },
  }
</script>

<style>

body {
  margin: 0;
}

#app {
  height: 100vh;
  background-color: #121212;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #F2E8CF;
}
</style>
