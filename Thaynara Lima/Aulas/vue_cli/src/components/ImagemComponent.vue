<template>
    <div>
        <img 
        v-show="isImgVisivel"
        :width="larguraImg"
        :src="urlImagem">
        <button @click="apareceEsconde()">{{ nomeBotao }}</button>
    </div>
</template>

<script>
export default {
    name: "ImagemComponent",
    data () {
        return {
            isImgVisivel: true,
            nomeBotao: "Esconder",
        };
    },
    methods: {
        apareceEsconde() {
            this.isImgVisivel = !this.isImgVisivel;
            this.isImgVisivel ? this.nomeBotao = "Esconder" : this.nomeBotao = "Aparecer";
            this.$emit('visibilidadeImg', this.isImgVisivel);
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