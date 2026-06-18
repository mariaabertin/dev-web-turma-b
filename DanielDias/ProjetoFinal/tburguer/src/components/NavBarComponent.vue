<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <img src="/img/logo_tburguer.png" id="logo" />
      </router-link>
      <router-link to="/menu">Menu</router-link> |
      <router-link to="/pedidos">Ordini</router-link>
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
  color: white;
  text-decoration: none;
  margin: 20px;
  transition: 0.5s;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  font-size: 20px;
}

#nav a:hover {
  color:red;
  font-size: 22px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
}

#logo-url:hover {
  transform: rotate(360deg);
  transition: transform 0.5s;

}

#nav {
  background-color: green;
  border-bottom: 5px solid red;
  padding: 20px 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
