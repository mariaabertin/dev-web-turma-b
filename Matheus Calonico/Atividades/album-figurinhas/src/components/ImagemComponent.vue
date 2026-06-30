<template>
  <div>
    <img v-show="isImgVisivel" :width="larguraImg" :src="urlImagem" />
    <br />
    <button @click="apareceEsconde(), alterarNomeBotao()">
      {{ nomeBotao }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ImagemComponent",
  data() {
    return {
      isImgVisivel: true,
      nomeBotao: "Esconder",
    };
  },
  methods: {
    apareceEsconde() {
      this.isImgVisivel = !this.isImgVisivel;
      this.$emit("visibilidadeImg", this.isImgVisivel);
    },
    alterarNomeBotao() {
      if (this.isImgVisivel == true) {
        this.nomeBotao = "Esconder";
      } else {
        this.nomeBotao = "Aparecer";
      }
    },
  },
  props: {
    urlImagem: String,
    larguraImg: Number,
  },
  emits: ["visibilidadeImg"],
};
</script>

<style scoped></style>
