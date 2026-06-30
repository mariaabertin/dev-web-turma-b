<template>
    <div>
        <p>Nome: {{ nome }}</p>
        <p>Email: {{ email }}</p>
        <hr>
        <h1 v-show="isInterCampeao">Internacional Campeão</h1>
        <img :width="largura" :height="altura" :src="urlImg" style="transition: 2s">
        <h1 v-show="isMensagem"> Jabuti Gordo</h1>
    </div>
</template>

<script>
    export default{
        name: "UsuarioComponent",
        data() {
            return {
                nome: "Gabriel",
                email: "gabriel@email.com",
                isInterCampeao: true,
                altura: 300,
                largura: 500,
                urlImg: "https://img.freepik.com/fotos-premium/impressionante-retrato-de-cavalo-em-meio-a-paisagens-naturais-de-tirar-o-folego_853677-548.jpg?w=1480",
                isMensagem: false
            };
        },
        mounted(){
            setTimeout(() =>{
                this.isInterCampeao = false;
                this.urlImg = "https://www.mundoecologia.com.br/wp-content/gallery/jabuti/Jabuti-5.jpg"
                this.isMensagem = true;
            }, 4 * 1000);
            setTimeout(() => {
                this.altura = 500;
                this.largura = 800;
            }, 5 * 1000);
        }
    };
</script>

<style>

</style>