<template>
  <div>
    <nav class="navbar">
      <div class="navbar-content">
        <div class="logo">
          <router-link to="/">
            <img src="../assets/icon-logo.svg" alt="logo pichado" style="width: 40px;">
          </router-link>
          <span>Pichado</span>
        </div>
        <div class="links">
          <router-link to="/catalogo">Catálogo</router-link>
          <router-link to="/pedidos">Pedidos</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBarComponent",
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

  background-color: var(--color-navbar);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  color: var(--color-text-on-dark);

  border-bottom: 1px solid rgb(255, 255, 255, 0.08);
  padding: 1em 0em;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0em 2em;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-weight: bold;
  font-size: 1.5em;
}

.links {
  display: flex;
  gap: 0.7em;
}

.navbar a {
  font-weight: bold;
  color: var(--color-text-on-dark);
  text-decoration: none;
}

.navbar a.router-link-exact-active {
  color: var(--color-primary);
}
</style>
