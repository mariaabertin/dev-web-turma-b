<template>
    <div class="banner">
        <img src="../assets/Banner.png" alt="">
    </div>
</template>

<script>
export default {
    name: "BannerComponent",
}
</script>

<style scoped>
.banner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 1rem;
    box-sizing: border-box;
}

.banner img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: var(--color-shadow);
}
</style>