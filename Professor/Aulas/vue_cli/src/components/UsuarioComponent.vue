<template>
  <div>
    <p>Nome: {{ nome }}</p>
    <p>Email: {{ email }}</p>
    <hr />
    <h1 v-show="isInterCampeao">Internacional Campeão</h1>
    <img
      :width="largura"
      :height="altura"
      :src="urlImg"
      style="transition: 2s"
    />
  </div>
</template>

<script>
export default {
  name: "UsuarioComponent",
  data() {
    return {
      nome: "Fernando",
      email: "fernando@gmail.com",
      isInterCampeao: true,
      altura: 100,
      largura: 200,
      urlImg:
        "https://midia.gruposinos.com.br/_midias/jpg/2025/12/07/800x500/1_interrrrr-22626640.jpg",
    };
  },
  mounted() {
    setTimeout(() => {
      this.isInterCampeao = false;
      this.urlImg = "https://s01.video.glbimg.com/x216/5260812.jpg";
    }, 4 * 1000);
    setTimeout(() => {
      this.altura = 200;
      this.largura = 300;
    }, 5 * 1000);
    setTimeout(() => {
      this.altura = 400;
      this.largura = 600;
    }, 8 * 1000);
  },
};
</script>

<style></style>
