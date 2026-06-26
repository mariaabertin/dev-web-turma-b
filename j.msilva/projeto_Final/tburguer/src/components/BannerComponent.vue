<template>
  <div id="main-banner" :style="{ backgroundImage: 'url(/img/banner_mechkeys.png)' }">
    <div id="banner-overlay">
      <div id="banner-conteudo">
        <h1>Bem-vindo à <span id="banner-destaque">MechKeys</span></h1>
        <p>Os melhores teclados mecânicos para o seu setup</p>
        <button @click="scrollToCatalogo" id="banner-btn">Ver Catálogo</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
  methods: {
    scrollToCatalogo() {
      const catalogo = document.getElementById("catalogo-section");
      if (catalogo) {
        catalogo.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
</script>

<style scoped>
#main-banner {
  background-size: cover;
  background-position: center 40%;
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #7c3aed;
  position: relative;
}

#banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(15, 15, 26, 0.55) 0%,
    rgba(15, 15, 26, 0.45) 40%,
    rgba(15, 15, 26, 0.75) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
}

#banner-conteudo {
  text-align: center;
  padding: 20px;
  position: relative;
  z-index: 1;
}

#banner-conteudo h1 {
  color: #e2e8f0;
  font-size: 52px;
  font-weight: bold;
  text-shadow: 0 0 24px rgba(124, 58, 237, 0.6);
  margin-bottom: 12px;
}

#banner-destaque {
  color: #7c3aed;
}

#banner-conteudo p {
  color: #c4b5fd;
  font-size: 18px;
  margin-bottom: 28px;
}

#banner-btn {
  display: inline-block;
  background-color: #7c3aed;
  color: white;
  border: none;
  padding: 13px 36px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

#banner-btn:hover {
  background-color: #6d28d9;
  transform: translateY(-2px);
}
</style>
