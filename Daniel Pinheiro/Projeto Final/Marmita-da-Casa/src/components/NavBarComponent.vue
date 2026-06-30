<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <img src="/img/logo.svg" id="logo" />
        <span id="logo-texto">Marmita da Casa</span>
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
  width: 48px;
  height: 48px;
}

#logo-texto {
  font-size: 20px;
  font-weight: bold;
  color: #f4d03f;
  margin-left: 10px;
}

#nav #logo-url {
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-left: 0;
  text-decoration: none;
}

#nav a {
  color: #e67e22;
  text-decoration: none;
  margin: 12px;
  font-size: 18px;
  transition: 0.5s;
}

#nav a:hover {
  color: white;
  font-size: 20px;
}

#logo-url:hover #logo {
  transform: rotate(360deg);
  transition: transform 0.5s;
}

#nav {
  background-color: #2b2b2b;
  border-bottom: 4px solid #e67e22;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
