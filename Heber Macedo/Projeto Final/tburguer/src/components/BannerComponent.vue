<template>
  <div id="main-banner">
    <h1>PizzaFresh - Pizza Artesanal</h1>
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
};
</script>

<style scoped>
#main-banner {
  background-image: url("https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=1200&q=80");
  background-position: center;
  background-size: cover;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#main-banner h1 {
  font-size: 48px;
  color: white;
  text-align: center;
  background: rgba(26, 26, 26, 0.85);
  padding: 30px 40px;
  border-radius: 0 100px 100px 0;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
