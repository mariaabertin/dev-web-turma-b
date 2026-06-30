<template>
    <div>
        <img 
        v-show="IsImgVisivel"
        width="300"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBFt06j95McThrkGUis_go22yqAAh9hLImkg&s" alt=""
        />
        <button> @click="apareceEscinde(), alterarNomeBotao>{{ nomeBotao }}"</button>
    </div>
</template>

<script>
export default {
    name: "ImagemComponent",
    data() {
        return {
            IsImgVisivel: true,
            nomeBotao: "Esconder"
        }
    },
    methods: {
        aparenceEsconde() {
            this.isImgVisivel = !this.isImgVisivel;

            if (this.isImgVisivel) {
                this.nomeBotao = "Esconder";
            }  else {
                this.nomeBotao = "Aparecer"
            }
        },
    },
    props:{
        urlImagem: String,
    }
};
</script>

<style scoped></style>