<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <img :src="`${publicPath}img/logo_tflor.svg`" id="logo" alt="Logo T-Flor" />
      </router-link>
      <router-link to="/menu">Menu</router-link> |
      <router-link to="/pedidos">Pedidos</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBarComponent",
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>

<style scoped>
#logo {
  width: 74px;
  height: 74px;
}

#nav #logo-url {
  margin-right: auto;
  margin-left: 0;
}

#nav a {
  color: #d9b253;
  text-decoration: none;
  margin: 12px;
  transition: 0.4s;
  font-weight: bold;
}

#nav a:hover,
#nav a.router-link-exact-active {
  color: white;
}

#logo-url:hover {
  transform: rotate(8deg);
}

#nav {
  background-color: #24473c;
  border-bottom: 3px solid #d9b253;
  padding: 10px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

@media (max-width: 650px) {
  #nav {
    padding: 10px 18px;
    flex-wrap: wrap;
  }
}
</style>
