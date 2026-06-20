<template>
    <div id="main-banner" :style="{ backgroundImage: 'url(' + bannerUrl + ')' }">
        <h1>La Tradizione Italiana</h1>
    </div>
</template>

<script>
export default {
    name: "BannerComponent",
    data() {
        return {
            bannerUrl: "/img/banner_pizza.jpg"
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
    box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.2); 
}

#main-banner h1 {
    font-family: 'Playfair Display', 'Georgia', serif;
    font-size: 42px;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    background-color: rgba(92, 29, 36, 0.95); 
    padding: 30px 50px;
    border-radius: 100px 0px 0px 100px;
    border-left: 5px solid #b8860b; 
    box-shadow: -5px 5px 15px rgba(0, 0, 0, 0.3);
    letter-spacing: 1px;
}
</style>