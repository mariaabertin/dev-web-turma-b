<template>
  <nav id="nav">
    <router-link to="/" id="logo-url" aria-label="Bella Pizza — início">
      <img src="/img/logo-bella.svg" id="logo" alt="" />
      <span class="marca">Bella<span class="marca-2"> Pizza</span></span>
    </router-link>
    <div class="links">
      <router-link to="/menu">Cardápio</router-link>
      <router-link to="/pedidos">Pedidos</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBarComponent",
};
</script>

<style scoped>
#nav {
  background: var(--wood);
  border-bottom: 4px solid var(--brand);
  padding: 14px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 20;
}

#logo-url {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

#logo {
  width: 46px;
  height: 46px;
  transition: transform 0.6s ease;
}

#logo-url:hover #logo { transform: rotate(360deg); }

.marca {
  font-family: var(--display);
  font-weight: 700;
  font-size: 24px;
  color: #fff;
  letter-spacing: -0.01em;
}
.marca-2 { color: #f4c545; }

.links { display: flex; gap: 8px; }

#nav .links a {
  color: #f3e7da;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  padding: 8px 16px;
  border-radius: 999px;
  transition: background 0.25s, color 0.25s;
}

#nav .links a:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }

#nav .links a.router-link-exact-active {
  background: var(--brand);
  color: #fff;
}

@media (max-width: 560px) {
  #nav { padding: 12px 16px; }
  .marca-2 { display: none; }
  #nav .links a { padding: 8px 12px; }
}
</style>
