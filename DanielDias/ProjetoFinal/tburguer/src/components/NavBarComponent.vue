<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <span id="logo-texto">Bistrô Français</span>
      </router-link>
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
#nav {
  background-color: #1e1e1e;
  padding: 18px 48px;
  display: flex;
  align-items: center;
  border-bottom: 3px solid #d4a847;
}

#logo-url {
  margin-right: auto;
  text-decoration: none;
}

#logo-texto {
  font-size: 21px;
  font-style: italic;
  color: #f0e6cc;
  font-weight: bold;
  letter-spacing: 0.5px;
}

#nav a {
  color: #c9c0aa;
  text-decoration: none;
  margin-left: 28px;
  font-style: normal;
  font-size: 15px;
  letter-spacing: 0.4px;
  padding-bottom: 3px;
  transition: color 0.2s;
}

#nav a:hover {
  color: #f0e6cc;
}
</style>