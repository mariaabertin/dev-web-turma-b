<template>
  <section class="product-list">
    <div class="product-list__header">
      <h2>Escolha sua marmita</h2>
      <p>Cardápio especial preparado diariamente.</p>
    </div>

    <div class="product-list__carousel">
      <ProductCard
        v-for="prato in listaPratos"
        :key="prato.id"
        :prato="prato"
        @selecionar="selecionarPrato"
      />
    </div>
  </section>
</template>

<script>
import ProductCard from "./ProductCard.vue";

export default {
  name: "ProductList",
  components: {
    ProductCard,
  },
  data() {
    return {
      listaPratos: [],
    };
  },
  methods: {
    async consultarMenu() {
      const response = await fetch(`${this.$apiUrl}/menu`);
      const dados = await response.json();
      this.listaPratos = dados.pratos;
    },
    selecionarPrato(pratoSelecionado) {
      const param = JSON.stringify(pratoSelecionado);
      const pratoJson = encodeURIComponent(param);
      this.$router.push({
        path: "/config-pedido",
        query: { prato: pratoJson },
      });
    },
  },
  mounted() {
    this.consultarMenu();
  },
};
</script>

<style scoped>
.product-list {
  padding: 32px 24px 48px;
  background: #fff9f2;
}

.product-list__header {
  max-width: 1100px;
  margin: 0 auto 20px;
}

.product-list__header h2 {
  color: #333333;
  margin-bottom: 6px;
}

.product-list__header p {
  color: #666666;
  margin: 0;
}

.product-list__carousel {
  display: flex;
  overflow-x: auto;
  padding: 8px 0 16px;
  max-width: 1100px;
  margin: 0 auto;
  scroll-snap-type: x proximity;
}

.product-list__carousel::-webkit-scrollbar {
  height: 6px;
}

.product-list__carousel::-webkit-scrollbar-track {
  background: transparent;
}

.product-list__carousel::-webkit-scrollbar-thumb {
  background: #e67e22;
  border-radius: 999px;
}
</style>
