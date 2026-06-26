<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <svg id="logo-svg" width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 17 L3 7 L11 13 L18 1 L25 13 L33 7 L33 17 Z" fill="#7c3aed"/>
          <circle cx="3"  cy="7" r="2.5" fill="#a78bfa"/>
          <circle cx="18" cy="1" r="2.5" fill="#a78bfa"/>
          <circle cx="33" cy="7" r="2.5" fill="#a78bfa"/>
          <text x="18" y="40" font-size="24" font-weight="bold" fill="#e2e8f0"
                text-anchor="middle" font-family="Arial, sans-serif">M</text>
        </svg>
        <span id="logo-texto">Mech<span id="logo-destaque">Keys</span></span>
      </router-link>

      <router-link to="/menu" class="nav-link">Menu</router-link>
      <span class="nav-separador">|</span>
      <router-link to="/pedidos" class="nav-link">Pedidos</router-link>
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
  background-color: #0f0f1a;
  border-bottom: 3px solid #7c3aed;
  padding: 12px 50px;
  display: flex;
  align-items: center;
}

#logo-url {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  margin-right: auto;
}

#logo-texto {
  font-size: 22px;
  font-weight: bold;
  color: #e2e8f0;
  letter-spacing: 1px;
}

#logo-destaque {
  color: #7c3aed;
}

.nav-link {
  color: #e2e8f0;
  text-decoration: none;
  margin: 0 12px;
  font-size: 15px;
  transition: color 0.3s, font-size 0.3s;
}

.nav-link:hover {
  color: #7c3aed;
  font-size: 17px;
}

.nav-separador {
  color: #3d3d7e;
}
</style>
