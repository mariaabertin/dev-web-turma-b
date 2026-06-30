<template>
    <div>
        <img 
        class="img"
        :width="largura"
        :class="{ 'imgInvisivel' : isImgInvisivel}"
        :src="urlImagem" 
        alt="Lamborghini Gallardo">
        <button style="display: block; margin: auto;" @click="apareceEsconde">{{ nomeBotão }}</button>
    </div>
</template>

<script>

export default {
    name: 'ImagemComponent',
    data() {
        return {
            isImgInvisivel: false,
            nomeBotão: "Esconder",
            largura: 600,
            Img: "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/masterpieces/gallardo-lp-550-2-2/Gallardo%20LP%20550-2-HEADER.jpg"
        };
    },
    methods: {
        apareceEsconde() {
            this.isImgInvisivel = !this.isImgInvisivel;
            this.isImgInvisivel ? this.nomeBotão = "Esconder" : this.nomeBotão = "Aparecer";
            this.$emit('visibilidadeImagem', this.isImgInvisivel)
        },
    },
    props: {
        urlImagem: String,
    },
    emits: ["visibilidadeImg"],
    
};
</script>

<style>
.img {
    transition: 1s;
}

.imgInvisivel {
    opacity: 0;
    visibility: hidden;
}
</style>