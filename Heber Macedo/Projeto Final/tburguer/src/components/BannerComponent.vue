<template>
  <div id="main-banner">
    <h1>Hamburguer de churrasqueiro</h1>
  </div>
</template>
<script>
export default {
  name: "BannerComponent",
};
</script>
<style scoped>
#main-banner {
  background-image: url("/public/img/banner.jpeg");
  height: 300px;
  background-position: 0;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#main-banner h1 {
  font-size: 40px;
  color: antiquewhite;
  background: #333;
  padding: 25px;
  border-radius: 100px 0px 0px 100px;
}
</style>
