<template>
  <section class="banner">
    <div class="banner__content">
      <p class="banner__tag">Marmitas caseiras e saborosas</p>
      <h1>Pratos quentinhos, feitos com carinho e muita tradição.</h1>
      <p class="banner__description">
        Escolha sua marmita favorita e monte seu pedido com acompanhamento e bebida.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Banner",
};
</script>

<style scoped>
.banner {
  background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
  padding: 48px 24px;
  display: flex;
  justify-content: center;
}

.banner__content {
  max-width: 760px;
  width: 100%;
  background: #c0392b;
  color: #ffffff;
  padding: 28px 32px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.banner__tag {
  margin: 0 0 10px;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.banner__content h1 {
  margin: 0 0 12px;
  font-size: 2rem;
  color: #ffffff;
}

.banner__description {
  margin: 0;
  color: #fff5f0;
  font-size: 1rem;
  line-height: 1.5;
}
</style>
