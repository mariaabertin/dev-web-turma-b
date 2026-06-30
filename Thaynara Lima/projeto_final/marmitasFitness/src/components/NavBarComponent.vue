<template>
  <div id="nav">
    <router-link to="/" id="logo-url">
  <img :src="`${process.env.BASE_URL}img/logo.png`" alt="Marmitas Fitness Logo">
</router-link>
    <router-link to="/menu">Cardápio</router-link> |
    <router-link to="/pedidos">Pedidos</router-link>
  </div>
</template>

<script>
export default {
  name: "NavBarComponent"
}
</script>

<style scoped>
#nav {
  background-color: #1e272e;
  border-bottom: 4px solid #2ecc71;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#nav #logo-url {
  margin-right: auto;
}
#logo {
  width: 40px;
  height: 40px;
}
#nav a {
  color: #fff;
  text-decoration: none;
  margin: 12px;
  transition: .5s;
  font-weight: bold;
}
#nav a:hover {
  color: #2ecc71;
}
</style>