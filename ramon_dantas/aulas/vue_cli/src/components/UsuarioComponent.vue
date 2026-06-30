<template>
    <div>
        <p>Nome: {{ nome }}</p>
        <p>Email: {{ email }}</p>
        <hr>
        <h1 v-show="isInterCampeao">Internacional Campeão</h1>
        <img
        style=" transition: 2s;"
        :src="urlImg"
        :width="largura"
        alt="Logo Inter">
    </div>
</template>

<script>
    export default {
        name: "UsuarioComponent",
        data() {
            return {
                nome : "Ramon",
                email : "ramon@email.com",
                isInterCampeao : true,
                largura : 300,
                urlImg : "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/1936.png",
            };
        },
        mounted() {
            setTimeout(() => {
                this.isInterCampeao = false;
                this.urlImg = "https://www.rbsdirect.com.br/filestore/7/5/5/8/3/5_416194d5fa7bebe/538557_569ccd924a805c5.jpg?w=700";
            }, 4 * 1000);

            setTimeout(() => {
                this.largura = 600;
            }, 6 * 1000);
        },
    };
</script>

<style>

</style>