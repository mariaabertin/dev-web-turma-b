<template>
  <div>
    <h1>Cardápio</h1>
    <p class="subtitulo-secao">Escolha o seu sabor e monte a pizza do seu jeito.</p>

    <div v-if="carregando" class="estado">Carregando o cardápio...</div>

    <div v-else class="cardapio-grid">
      <article
        class="cartao"
        v-for="pizza in listaPizzas"
        :key="pizza.id"
      >
        <div class="cartao-foto">
          <img :src="pizza.foto" :alt="pizza.nome" loading="lazy" />
          <span v-if="pizza.eh_novidade" class="selo">Novidade</span>
        </div>
        <div class="cartao-corpo">
          <h2 class="cartao-nome">{{ pizza.nome }}</h2>
          <p class="cartao-preco">{{ formatPreco(pizza.valor) }}</p>
          <p class="cartao-descricao">{{ pizza.descricao }}</p>
          <button class="cartao-btn" @click="selecionarPizza(pizza)">
            Montar pedido
          </button>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { API_URL } from "@/config";

export default {
  name: "MenuView",
  data() {
    return {
      listaPizzas: [],
      carregando: true,
    };
  },
  methods: {
    async consultarMenu() {
      try {
        const res = await fetch(`${API_URL}/menu`);
        const dados = await res.json();
        this.listaPizzas = dados.pizzas || dados.burgues || [];
      } catch (e) {
        this.listaPizzas = [];
      } finally {
        this.carregando = false;
      }
    },
    selecionarPizza(pizzaSelecionada) {
      const parametro = encodeURIComponent(JSON.stringify(pizzaSelecionada));
      this.$router.push({ path: "/config-pedido", query: { pizza: parametro } });
    },
    formatPreco(valor) {
      return "R$ " + Number(valor || 0).toFixed(2).replace(".", ",");
    },
  },
  mounted() {
    this.consultarMenu();
  },
};
</script>

<style scoped>
.subtitulo-secao { color: var(--muted); font-size: 16px; margin: 0 0 28px; }
.estado { color: var(--muted); padding: 40px 0; }

.cardapio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 22px;
}

.cartao {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}
.cartao:hover { transform: translateY(-4px); box-shadow: 0 14px 30px rgba(43, 26, 20, 0.14); }

.cartao-foto { position: relative; height: 180px; }
.cartao-foto img { width: 100%; height: 100%; object-fit: cover; display: block; }
.selo {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--basil);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 999px;
}

.cartao-corpo { padding: 18px 18px 20px; display: flex; flex-direction: column; flex: 1; text-align: left; }
.cartao-nome { font-size: 23px; margin: 0; }
.cartao-preco {
  font-family: var(--display);
  font-weight: 700;
  font-size: 24px;
  color: var(--brand);
  margin: 6px 0 10px;
}
.cartao-descricao { color: var(--muted); font-size: 14.5px; line-height: 1.45; margin: 0 0 18px; flex: 1; }

.cartao-btn {
  background: var(--wood);
  color: #fff;
  border: none;
  font-weight: 700;
  font-size: 15px;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;
}
.cartao-btn:hover { background: var(--brand); }
</style>
