<template>
    <div>
        <p>Nome: {{ nome }}</p>
        <p>Email: {{ email }}</p>
        <p>telefone: {{ telefone }}</p>
        <hr>
        <h1 v-show="isInterCampeao">JEQUITI</h1>
        <img width="500" height="300" :src="urlimg" />
        <h1 v-show="isaviao"> QUEM QUER AVIÃÃÃÃOOOOOZINHOO</h1>
        
        

    </div>

</template>

<script>
export default{
    name: "UsuarioComponent",
    data(){
        return{
            nome : "Thaynara",
            email : "thay@gmail.com",
            telefone : "61 9 1234-5678",
            isInterCampeao: false,
            urlimg : "https://f.i.uol.com.br/fotografia/2014/02/10/361236-400x600-1.jpeg",
            isaviao : false,
            
        };
    },
    mounted(){
        setTimeout(() => {
            this.isInterCampeao = true;
            setTimeout(() => {
                this.isInterCampeao = false;
            }, 500);
        }, 1500);

    setTimeout(() => {
            this.isaviao = true;
            this.urlimg  = "https://viversempressa.com/wp-content/uploads/2015/12/dinheiro-aviaozinho.jpg";
            setTimeout(() => {
            this.isaviao = false;
            this.urlimg  = "https://f.i.uol.com.br/fotografia/2014/02/10/361236-400x600-1.jpeg";
            }, 1500);
        }, 2500);
    },
};

</script>

<style>

</style>