<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <svg id="logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="47" fill="#0f8b8d" stroke="#ffffff" stroke-width="3" />
          <text x="50" y="42" font-size="26" text-anchor="middle">🐾</text>
          <text
            x="50"
            y="72"
            font-size="13"
            font-weight="bold"
            fill="#ffffff"
            text-anchor="middle"
            font-family="Arial, sans-serif"
          >
            PetSpa
          </text>
        </svg>
      </router-link>
      <router-link to="/">Home</router-link> |
      <router-link to="/menu">Serviços</router-link> |
      <router-link to="/pedidos">Agendamentos</router-link>
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

#logo:hover {
  width: 70px;
  height: 70px;
  transition: 0.2s;
}

#nav #logo-url {
  margin: auto;
  margin-left: 0;
}

#nav {
  background-color: #0b3d3e;
  border-bottom: #14b8a6 4px solid;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#nav a {
  color: #5eead4;
  text-decoration: none;
  margin-left: 20px;
  font-size: 18px;
}

#nav a:hover {
  color: white;
  font-size: 22px;
  transition: 0.2s;
}
</style>
