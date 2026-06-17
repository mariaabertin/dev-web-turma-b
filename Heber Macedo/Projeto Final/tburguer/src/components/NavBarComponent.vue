<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <img src="/img/logo_tburguer.png" id="logo" />
      </router-link>
      <span id="brand-name">PizzaFresh</span>
      <router-link to="/menu">Menu</router-link> |
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

#brand-name {
  color: #ff6b35;
  font-size: 24px;
  font-weight: bold;
  margin-left: 12px;
  margin-right: auto;
}

#nav #logo-url {
  margin-right: 12px;
  margin-left: 0;
}

#nav a {
  color: #ffd700;
  text-decoration: none;
  margin: 12px;
  transition: 0.5s;
}

#nav a:hover {
  color: #ff6b35;
  font-size: 16px;
}

#logo-url:hover {
  transform: rotate(360deg);
  transition: transform 0.5s;
}

#nav {
  background-color: #1a1a1a;
  border-bottom: 3px solid #ff6b35;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
