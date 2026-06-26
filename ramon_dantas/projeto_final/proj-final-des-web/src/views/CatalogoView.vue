<template>
  <div class="catalogo-wrapper">
    <h1 class="titulo-catalogo">Catálogo de Produtos</h1>
    <p class="subtitulo">Escolha o seu setup ideal e personalize do seu jeito.</p>
    <div class="catalogo-grid">
      <div class="produto-card" v-for="produto in listaProdutos" :key="produto.id">
        <img class="produto-img" width="300" height="200" :src="produto.foto" />
        <div class="produto-info">
          <p class="produto-nome">{{ produto.nome }}</p>
          <p class="produto-preco">R$ {{ produto.valor }},00</p>
          <p class="produto-desc">{{ produto.descricao }}</p>
          <button class="btn-selecionar" @click="selecionarProduto(produto)">Selecionar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuView",
  data() {
    return {
      listaProdutos: [],
    };
  },

  methods: {

    async consultarCatalogo() {
      const response = await fetch(`${process.env.VUE_APP_API_URL}/catalogo`);
      const dados = await response.json();
      this.listaProdutos = [...dados.desktops, ...dados.notebooks];
      console.log(this.listaProdutos);
    },

    selecionarProduto(produtoSelecionado) {
      const parametroProduto = JSON.stringify(produtoSelecionado);
      const encodedProduto = encodeURIComponent(parametroProduto);
      this.$router.push({ path: "/checkout", query: { produto: encodedProduto } });
    },
  },

  mounted() {
    this.consultarCatalogo();
  },
};
</script>

<style scoped>
.catalogo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.titulo-catalogo {
  color: var(--color-text-main);
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

.subtitulo {
  color: var(--color-text-muted);
  margin-bottom: 3rem;
  text-align: center;
}

/* Sistema de Grid Responsivo */
.catalogo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
}

.produto-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px var(--color-shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.produto-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px var(--color-shadow);
}

.produto-img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-bottom: 1px solid var(--color-border);
}

.produto-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.produto-nome {
  font-size: 1.3rem;
  color: var(--color-text-main);
  margin-bottom: 0.5rem;
}

.produto-preco {
  font-size: 1.6rem;
  font-weight: bold;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.produto-desc {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.btn-selecionar {
  width: 100%;
  padding: 0.8rem;
  background-color: var(--color-primary);
  color: var(--color-text-on-dark);
  font-weight: bold;
  font-size: 1.1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: inherit;
}

.btn-selecionar:hover {
  background-color: var(--color-primary-hover);
}
</style>
