<template>
  <div class="product-card">
    <img :src="prato.foto" :alt="prato.nome" class="product-card__image" />

    <div class="product-card__body">
      <h3>{{ prato.nome }}</h3>
      <p class="product-card__description">{{ prato.descricao }}</p>
      <div class="product-card__footer">
        <span class="product-card__price">R$ {{ prato.valor }},00</span>
        <button @click="$emit('selecionar', prato)">Selecionar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    prato: {
      type: Object,
      required: true,
    },
  },
  emits: ["selecionar"],
};
</script>

<style scoped>
.product-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 280px;
  max-width: 300px;
  margin: 8px;
}

.product-card__image {
  width: 100%;
  height: 190px;
  object-fit: cover;
  display: block;
}

.product-card__body {
  display: flex;
  flex-direction: column;
  padding: 16px;
  flex: 1;
}

.product-card h3 {
  margin: 0 0 8px;
  color: #333333;
  font-size: 1.1rem;
}

.product-card__description {
  color: #666666;
  font-size: 0.95rem;
  line-height: 1.4;
  margin: 0 0 16px;
  flex: 1;
}

.product-card__footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.product-card__price {
  color: #27ae60;
  font-weight: 700;
  font-size: 1.05rem;
}

.product-card button {
  background: #27ae60;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.product-card button:hover {
  background: #219653;
}
</style>
