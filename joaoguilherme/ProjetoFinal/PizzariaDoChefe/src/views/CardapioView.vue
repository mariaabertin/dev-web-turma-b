<template>
  <div id="cardapio-wrapper">
    <div id="cardapio-header">
      <h1>Nosso Cardápio</h1>
      <p>Escolha sua pizza favorita</p>
    </div>
    <div id="cardapio-grid">
      <div
        class="pizza-card"
        v-for="pizza in listaCardapioPizzas"
        :key="pizza.id"
      >
        <div class="pizza-card-img">
          <img :src="pizza.foto" :alt="pizza.nome" />
        </div>
        <div class="pizza-card-body">
          <h2 class="pizza-nome">{{ pizza.nome }}</h2>
          <p class="pizza-descricao">{{ pizza.descricao }}</p>
          <div class="pizza-card-footer">
            <span class="pizza-preco">A partir de R$ 35,00</span>
            <button @click="selecionarPizza(pizza)">Pedir agora</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardapioView",
  data() {
    return {
      listaCardapioPizzas: [],
    };
  },
  methods: {
    async consultarCardapio() {
      const response = await fetch(`${this.$apiUrl}/menu`);
      const dados = await response.json();
      this.listaCardapioPizzas = dados.pizzas;
    },
    selecionarPizza(pizzaSelecionada) {
      const param = JSON.stringify(pizzaSelecionada);
      const pizzaJson = encodeURIComponent(param);
      this.$router.push({
        path: "/config-pedido",
        query: { pizza: pizzaJson },
      });
    },
  },
  mounted() {
    this.consultarCardapio();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Inter:wght@400;500;600&display=swap');

#cardapio-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
  font-family: 'Inter', sans-serif;
}

#cardapio-header {
  text-align: center;
  margin-bottom: 48px;
}

#cardapio-header h1 {
  font-family: 'Playfair Display', serif;
  font-size: 42px;
  color: inherit;
  margin-bottom: 8px;
}

#cardapio-header p {
  color: inherit;
  opacity: 0.6;
  font-size: 16px;
}

#cardapio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
}

.pizza-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  transition: transform 0.2s, box-shadow 0.2s;
}

.pizza-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

.pizza-card-img img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.pizza-card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pizza-nome {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  color: #1a1a1a;
  margin: 0;
}

.pizza-descricao {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pizza-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}

.pizza-preco {
  font-size: 14px;
  font-weight: 600;
  color: #8b1a1a;
  font-family: 'Inter', sans-serif;
}

.pizza-card-footer button {
  background: #8b1a1a;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-family: 'Inter', sans-serif;
}

.pizza-card-footer button:hover {
  background: #5a0f0f;
}
</style>