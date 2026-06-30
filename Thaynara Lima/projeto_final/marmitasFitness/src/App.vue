<template>
  <div>
    <NavBarComponent />
    <router-view/>
  </div>
</template>

<script>
import NavBarComponent from './components/NavBarComponent.vue'

export default {
  name: "App",
  components: {
    NavBarComponent
  }
}
</script>

<style>
* {
  font-family: Helvetica, sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background-color: #f8f9fa;
}
</style>