<template>
  <NavBarComponent />
  <router-view />
</template>

<script>
import NavBarComponent from "./components/NavBarComponent.vue";
export default {
  name: "App",
  components: {
    NavBarComponent,
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
  background-color: #1a1a2e;
  color: #e2e8f0;
  min-height: 100vh;
}
</style>
