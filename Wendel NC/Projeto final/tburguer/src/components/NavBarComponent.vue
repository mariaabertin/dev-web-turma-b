<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <img src="/img/logo_tburguer.png" id="logo" />
      </router-link>
      <router-link to="/menu">Cardápio</router-link> |
      <router-link to="/pedidos">Pedidos</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBarComponent",
};
</script>

<style scoped>
#logo {
  width: 60px;
  height: 60px;
}

#nav #logo-url {
  margin-right: auto;
  margin-left: 0;
}

#nav a {
  color: #ffe082;
  text-decoration: none;
  margin: 12px;
  transition: 0.5s;
}

#nav a:hover {
  color: white;
  font-size: 20px;
}

#logo-url:hover {
  transform: rotate(360deg);
  transition: transform 0.5s;
}

#nav {
  background-color: #4a148c;
  border-bottom: 3px solid #ce93d8;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>