<template>
  <div id="main-banner">
    <h1>Mamamia Pizzaria 🤌🏼</h1>
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
  background-position: 0;
  background-size: cover;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#main-banner h1 {
  font-size: 50px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  color: white;
  text-align: center;
  background:green;
  padding: 25px;
  border-radius: 100px 0px 0px 100px;
}
</style>
