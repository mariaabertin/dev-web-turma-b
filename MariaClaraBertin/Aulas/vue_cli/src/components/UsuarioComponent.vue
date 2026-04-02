<template>
    <div>
        <p>Nome: {{ nome }}</p>
        <p>Email: {{ email }}</p>
        <hr>
        <h1 v-show="isEnjoiable">Aproveite a experiência!</h1>
        <h1 v-show="isNotEnjoiable">Vish</h1>
        <img :width="largura" :height="altura" :src="urlImg" />
    </div>
</template>

<script>
    export default {
        name: "UsuarioComponent",
        data() {
            return {
                nome: "Maria",
                email: "maria@email.com",
                isEnjoiable: true,
                isNotEnjoiable: false,
                altura: 200,
                largura: 300,
                urlImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYxNnA0WD25msFRX8UoiNOPCbtMEzk35BeMQ&s",
            };
        },
        mounted() {
            setTimeout(() => {
                this.isEnjoiable = false;
                this.isNotEnjoiable = true;
                this.urlImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSbwUnfLPouVOgbhHlQfXFhDV2SQnMTSq77A&s"
            }, 4*1000);

            setTimeout(() => {
                for(let i = 300; i < 600; i++) {
                    setTimeout(() => {
                        this.largura = i;
                    }, 0);
                    for(let j = 200; j < 400; j++){
                        setTimeout(() => {
                            this.altura = j;
                        }, 0);
                    }
                }
            }, 3*1000);
        },
    };
</script>

<style>

</style>