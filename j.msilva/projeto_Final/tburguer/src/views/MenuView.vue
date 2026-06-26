<template>
  <div>
    <BannerComponent />

    <div id="catalogo-section">
      <h1 id="catalogo-titulo">Nosso Catálogo</h1>

      <div id="catalogo-grid">
        <div
          class="card-content"
          v-for="teclado in listaMenuTeclados"
          :key="teclado.id"
        >
          <div class="card-imagem">
            <img :src="teclado.foto" :alt="teclado.nome" />
          </div>
          <div class="card-corpo">
            <p class="card-nome">{{ teclado.nome }}</p>
            <p class="card-valor">R$ {{ teclado.valor }},00</p>
            <p class="card-descricao">{{ teclado.descricao }}</p>
            <button @click="selecionarTeclado(teclado)">Selecionar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerComponent from "@/components/BannerComponent.vue";

export default {
  name: "MenuView",
  components: {
    BannerComponent,
  },
  data() {
    return {
      listaMenuTeclados: [],
    };
  },
  methods: {
    async consultarMenu() {
      const response = await fetch(`${process.env.VUE_APP_API_URL}/menu`);
      const dados = await response.json();
      this.listaMenuTeclados = dados.teclados;
    },
    selecionarTeclado(tecladoSelecionado) {
      const parametroTeclado = JSON.stringify(tecladoSelecionado);
      const encodedTeclado = encodeURIComponent(parametroTeclado);
      this.$router.push({
        path: "/config-pedido",
        query: { teclado: encodedTeclado },
      });
    },
  },
  mounted() {
    this.consultarMenu();
  },
};
</script>

<style scoped>
#catalogo-titulo {
  color: #e2e8f0;
  margin: 32px 0 16px;
  font-size: 28px;
  text-align: center;
}

#catalogo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px 48px;
}

.card-content {
  display: flex;
  flex-direction: column;
  background-color: #16213e;
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.3s, transform 0.3s;
}

.card-content:hover {
  box-shadow: 0 6px 24px rgba(124, 58, 237, 0.35);
  transform: translateY(-4px);
}

.card-imagem {
  width: 100%;
  height: 210px;
  background-color: #0f0f1a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-bottom: 1px solid rgba(124, 58, 237, 0.2);
}

.card-imagem img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.card-corpo {
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-nome {
  font-size: 17px;
  font-weight: bold;
  color: #e2e8f0;
  margin-bottom: 6px;
}

.card-valor {
  font-size: 22px;
  font-weight: bold;
  color: #7c3aed;
  margin-bottom: 12px;
}

.card-descricao {
  font-size: 13px;
  color: #a5b4fc;
  line-height: 1.65;
  flex: 1;
  margin-bottom: 18px;
}

.card-corpo button {
  width: 100%;
  padding: 11px 20px;
  background-color: #7c3aed;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.card-corpo button:hover {
  background-color: #6d28d9;
}
</style>
