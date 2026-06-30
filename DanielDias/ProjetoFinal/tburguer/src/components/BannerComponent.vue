<template>
  <div id="main-banner">
    <div id="banner-conteudo">
      <p id="banner-subtitulo">Bem-vindo ao</p>
      <h1>Bistrô Français</h1>
      <p id="banner-frase">Cuisine française au cœur du Brasil</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
};
</script>

<style scoped>
#main-banner {
  background-color: #1e1e1e;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 40px,
    rgba(255, 255, 255, 0.015) 40px,
    rgba(255, 255, 255, 0.015) 80px
  );
  padding: 64px 48px;
  text-align: center;
}

#banner-conteudo {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

#banner-subtitulo {
  font-size: 13px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #d4a847;
  margin: 0;
}

h1 {
  font-size: 52px;
  font-style: italic;
  color: #f0e6cc;
  margin: 0;
  line-height: 1.1;
}

#banner-frase {
  font-size: 15px;
  font-style: italic;
  color: #8a7f6e;
  margin: 4px 0 0;
}
</style>