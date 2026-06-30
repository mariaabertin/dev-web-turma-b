<template>
  <header id="main-banner">
    <div class="banner-conteudo">
      <p class="eyebrow">Forno a lenha · massa artesanal</p>
      <h1>A sua pizza, do seu jeito.</h1>
      <p class="subtitulo">
        Escolha o sabor, a massa e o tamanho. Pode até pedir meio a meio —
        a gente monta e leva quentinha até você.
      </p>
      <router-link to="/menu" class="cta">Ver cardápio</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "BannerComponent",
};
</script>

<style scoped>
#main-banner {
  position: relative;
  min-height: 420px;
  display: flex;
  align-items: center;
  background-image:
    linear-gradient(105deg, rgba(43, 26, 20, 0.92) 0%, rgba(43, 26, 20, 0.62) 45%, rgba(43, 26, 20, 0.15) 100%),
    url("https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80");
  background-position: center;
  background-size: cover;
  background-color: var(--wood);
  padding: 48px 28px;
}

.banner-conteudo {
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 12px;
  font-weight: 600;
  color: #f4c545;
  margin: 0 0 14px;
}

#main-banner h1 {
  color: #fff;
  font-size: clamp(34px, 6vw, 64px);
  line-height: 1.02;
  margin: 0 0 16px;
  max-width: 12ch;
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.35);
}

.subtitulo {
  color: #f3e7da;
  font-size: clamp(15px, 2vw, 19px);
  line-height: 1.5;
  max-width: 46ch;
  margin: 0 0 28px;
}

.cta {
  display: inline-block;
  background: var(--brand);
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  font-size: 16px;
  padding: 14px 30px;
  border-radius: 999px;
  box-shadow: 0 10px 24px rgba(200, 32, 31, 0.4);
  transition: transform 0.2s, background 0.2s;
}
.cta:hover { background: var(--brand-dark); transform: translateY(-2px); }

@media (max-width: 560px) {
  #main-banner { min-height: 340px; }
}
</style>
