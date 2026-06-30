<template>
    <div>
        <p>Nome: {{ nome }}</p>
        <p>email: {{ email }}</p>
        <hr>
        <h1 v-show="isInterCampeao">Flamengo Campeão</h1>
        <img
        :width="largura" :height="altura" :src="urlImg" style="transition: 2s;" />
    </div>
</template>


<script>
export default {
    name: "UsuarioComponent",
    data() {
        return {
            nome: "Heber",
            email: "Heber@gmail.com",
            isInterCampeao: true,
            altura: 200,
            largura: 300,
            urlImg:
             "https://tntsports.com.br/__export/1694370173778/sites/esporteinterativo/img/2023/09/10/gazeta-press-foto-1924304.jpg",
        };
    },
    mounted() {
        setTimeout(() => {
            this.isInterCampeao = false;
            this.urlImg = "https://ogimg.infoglobo.com.br/in/24097293-3e9-4c5/FT1086A/85841104_Soccer-FootballCopa-LibertadoresFinalFlamengo-fans-watching-the-finalRio-de-Jan.jpg";
        }, 4 * 1000);
        setTimeout(() => {
          this.largura = 300;
          this.largura = 500;
        }, 5 * 1000);
        setTimeout(() => {
          this.largura = 600;
          this.largura = 800;
        }, 8 * 1000);
    },
};
</script>


<style>


</style>
