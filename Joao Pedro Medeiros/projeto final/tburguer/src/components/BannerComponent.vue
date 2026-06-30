<template>
  <div id="main-banner" :style="bannerStyle">
    <h1>T-Flor Encomendas Florais</h1>
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
  computed: {
    bannerStyle() {
      return {
        backgroundImage: `linear-gradient(90deg, rgba(36, 71, 60, 0.72), rgba(36, 71, 60, 0.12)), url('${process.env.BASE_URL}img/banner.jpeg')`,
      };
    },
  },
};
</script>

<style scoped>
#main-banner {
  background-position: center;
  background-size: cover;
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#main-banner h1 {
  font-size: 40px;
  color: white;
  text-align: center;
  background: #24473c;
  padding: 25px;
  border-radius: 100px 0 0 100px;
  max-width: 620px;
}

@media (max-width: 650px) {
  #main-banner {
    height: 320px;
  }

  #main-banner h1 {
    font-size: 28px;
    padding: 18px;
  }
}
</style>
