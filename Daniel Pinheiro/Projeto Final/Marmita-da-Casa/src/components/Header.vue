<template>
  <header class="header">
    <router-link to="/" class="header__brand">
      <img src="/img/logo.svg" alt="Logo Marmita da Casa" class="header__logo" />
      <span>Marmita da Casa</span>
    </router-link>

    <nav class="header__nav">
      <router-link to="/menu">Cardápio</router-link>
      <router-link to="/pedidos">Pedidos</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header {
  background: #2c2c2c;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
}

.header__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.1rem;
}

.header__logo {
  width: 46px;
  height: 46px;
}

.header__nav {
  display: flex;
  gap: 18px;
}

.header__nav a {
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.header__nav a:hover {
  color: #e67e22;
}
</style>
