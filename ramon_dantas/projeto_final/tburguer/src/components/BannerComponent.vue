<template>
    <div id="banner">
        <h1>
            Hamburguer de Churrasqueiro
        </h1>
        <button class="botao">
            Pedir Agora
        </button>
    </div>
</template>

<script>
export default {
    name: 'BannerComponent',
}
</script>

<style scoped>
#banner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    background-image: url('../../public/img/banner.jpeg');
    background-size: cover;
    background-position: center;
    height: 220px;
    margin: 20px 0 20px 0;
}

h1 {
    font-size: 1.5em;
    padding: 0.9em;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 50vh;
}

.botao {
    padding: 0.7em 1em;
    font-weight: bold;
    border: none;
    border-radius: 50vh;
    background-color: #D95D39;
    color: #F2E8CF;
    transition: 0.5s;
}

.botao:hover {
    background: #ad4a2e;
}
</style>
