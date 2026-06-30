<template>
  <div id="main-banner">
    <h1>Banho & tosa com todo o carinho que seu pet merece 🐾</h1>
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
};
</script>

<style scoped>
#main-banner {
  background: linear-gradient(120deg, #0f8b8d 0%, #14b8a6 55%, #5eead4 100%);
  height: 300px;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: flex-start; 
  padding-left: 5%; 
  box-sizing: border-box;
}

#main-banner h1 {
  font-size: 32px;
  max-width: 620px;
  color: #ffffff;
  background: rgba(11, 61, 62, 0.55);
  padding: 25px 40px;
  border-radius: 20px; 
  text-align: left; 
  margin: 0;
}

@media (max-width: 768px) {
  #main-banner {
    justify-content: center;
    padding-left: 0;
  }
  #main-banner h1 {
    font-size: 24px;
    text-align: center;
    border-radius: 0;
    max-width: 90%;
  }
}
</style>