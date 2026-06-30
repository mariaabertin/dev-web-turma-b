<template>
  <div id="main-banner">
    <div class="banner-destaque">
      <h1>Comida caseira feita com carinho</h1>
      <p>Marmitas saborosas, quentinhas e prontas para você.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
};
</script>

<style scoped>
#main-banner {
  background: linear-gradient(135deg, #d35400 0%, #e67e22 55%, #27ae60 150%);
  background-size: cover;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.banner-destaque {
  background: rgba(255, 255, 255, 0.95);
  color: #2b2b2b;
  padding: 24px 32px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 620px;
}

#main-banner h1 {
  font-size: 32px;
  color: #c0392b;
  margin: 0 0 8px;
}

#main-banner p {
  margin: 0;
  color: #666666;
  font-size: 16px;
}
</style>
