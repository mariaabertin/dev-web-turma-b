<template>
    <div id="main-banner">
        <h1>Bem-vindo ao T-Burguer!</h1>
    </div>
</template>

<script>
export default {
    name: "BannerComponent",
}
</script>
<style scoped>
#main-banner {
    background-image: url('/public/img/banner.jpeg');
    background-position: 0;
    background-size: cover;
    height: 500px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #f0f0f0;
    padding: 20px;
    text-align: center;
}
#main-banner h1 {
    color: white;
    font-size: 48px;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>