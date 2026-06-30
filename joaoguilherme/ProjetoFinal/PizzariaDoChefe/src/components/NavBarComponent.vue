<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <img src="https://i.pinimg.com/736x/23/a2/d1/23a2d15c8df6a231cb98fc587e44fc31.jpg" id="logo" />
      </router-link>
      <router-link to="/cardapio">Cardápio</router-link> |
      <router-link to="/pedidos">Pedidos</router-link>
      <button id="btn-tema" @click="$emit('alternarTema')">
        {{ tema === 'tema-escuro' ? '☀️ Claro' : '🌙 Escuro' }}
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBarComponent",
  props: {
    tema: String,
  },
  emits: ["alternarTema"],
};
</script>

<style scoped>
#logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

#nav #logo-url {
  margin-right: auto;
  margin-left: 0;
}

#nav a {
  color: #f5e6d3;
  text-decoration: none;
  margin: 12px;
  transition: 0.5s;
}

#nav a:hover {
  color: white;
  font-size: 20px;
}

#nav {
  background-color: #8b1a1a;
  border-bottom: 3px solid #e8c547;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#btn-tema {
  margin-left: 20px;
  background: rgba(255,255,255,0.15);
  border: 1.5px solid rgba(255,255,255,0.3);
  color: #f5e6d3;
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-family: 'Inter', sans-serif;
}

#btn-tema:hover {
  background: rgba(255,255,255,0.28);
}
</style>
