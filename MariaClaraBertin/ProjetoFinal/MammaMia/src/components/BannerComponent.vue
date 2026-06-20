<template>
    <div id="main-banner" :style="{ backgroundImage: 'url(' + bannerUrl + ')' }">
        <h1>A Verdadeira Pizza Italiana</h1>
    </div>
</template>

<script>
export default {
    name: "BannerComponent",
    data() {
        return {
            bannerUrl: "/img/banner_pizza.jpeg"
        }
    }
};
</script>

<style scoped> 
#main-banner {
    background-position: center;
    background-size: cover;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

#main-banner h1 {
    font-size: 40px;
    color: white;
    text-align: center;
    background: #333;
    padding: 25px;
    border-radius: 100px 0px 0px 100px;
}
</style>