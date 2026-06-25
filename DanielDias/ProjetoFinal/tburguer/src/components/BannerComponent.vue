<template>
  <div id="main-banner">
    <h1>Bistrô Français</h1>
    <p id="subtitulo">Cuisine française au cœur du Brasil</p>
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
};
</script>

<style scoped>
#main-banner {
  background-color: #2c2c2c;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#main-banner h1 {
  font-size: 50px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  color: #d4a847;
  text-align: center;
  margin: 0;
  padding: 10px;
}

#subtitulo {
  font-size: 18px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  color: #f5e6c8;
  margin-top: 10px;
}
</style>