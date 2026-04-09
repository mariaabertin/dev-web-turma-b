<template>
    <div>
        <img 
        v-show="isImgVisible"
        :width="larguraImg"
        :src="urlImg"/>
        <button @click="apareceEsconde(), alterarNomeBotao()">{{ nomeBotao }}</button>
    </div>
</template>

<script>
    export default {
        name: "ImagemComponent",
        data() {
            return {
                isImgVisible: true,
                nomeBotao: "Watch",
            };
        },
        methods: {
            apareceEsconde() {
                this.isImgVisible = !this.isImgVisible;
                this.$emit('visibilidadeImg', this.isImgVisible);
            },
            alterarNomeBotao() {
                if (this.isImgVisible == true){
                    this.nomeBotao = "Watch"
                } else {
                    this.nomeBotao = "Again"
                }
            }
        },
        props: {
            urlImg : String,
            larguraImg : Number,
        },
        emits: ["visibilidadeImg"],
    };
</script>

<style scoped></style>

