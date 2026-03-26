<template>
  <div>
  <img alt="Vue logo" src="./assets/logo.png">
  <HomeComponente />
  <hr>
 <HomeComponente />
</div>
</template>

<script>

import HomeComponente from './components/HomeComponente.vue';

export default {
  name: 'App',
  components: { 
    HomeComponente,
  },
  data() {
    return {
      
    }
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
