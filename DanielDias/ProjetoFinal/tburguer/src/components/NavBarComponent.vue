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
#logo-texto {
  font-size: 22px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  color: #f5e6c8;
  font-weight: bold;
}

#nav #logo-url {
  margin-right: auto;
  margin-left: 0;
}

#nav a {
  color: #f5e6c8;
  text-decoration: none;
  margin: 20px;
  transition: 0.5s;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  font-size: 18px;
}

#nav a:hover {
  color: #d4a847;
  font-size: 20px;
}

#logo-url:hover {
  opacity: 0.8;
  transition: opacity 0.3s;
}

#nav {
  background-color: #2c2c2c;
  border-bottom: 4px solid #d4a847;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>