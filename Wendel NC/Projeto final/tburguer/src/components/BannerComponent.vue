<template>
  <div id="main-banner">
    <h1>O Melhor Açaí da Cidade! 🍇</h1>
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
};
</script>

<style scoped>
#main-banner {
  background-color: #4a148c;
  background-image: linear-gradient(135deg, #4a148c 0%, #7b1fa2 50%, #ce93d8 100%);
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
  background: #4a148c;
  padding: 25px;
  border-radius: 100px 0px 0px 100px;
}
</style>