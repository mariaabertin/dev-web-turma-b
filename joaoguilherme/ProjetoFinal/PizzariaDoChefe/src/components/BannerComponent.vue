<template>
  <div id="main-banner">
    <h1>Pizzaria do Chefe</h1>
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
  data() {
    return {
      bannerUrl: "https://i.pinimg.com/736x/4e/95/59/4e95595422f6b357a07d8cad6a86090a.jpg",
    };
  },
};
</script>
<style scoped>
#main-banner {
  background-image: url("https://i.pinimg.com/736x/4e/95/59/4e95595422f6b357a07d8cad6a86090a.jpg");
  background-position: center;
  background-size: cover;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#main-banner h1 {
  font-size: 40px;
  color: white;
  text-align: center;
  background: #8b1a1a;
  padding: 25px;
  border-radius: 100px 0px 0px 100px;
}
</style>
