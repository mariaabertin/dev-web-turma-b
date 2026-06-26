<template>
  <div class="alinhamento-global">
    <div class="servicos-pagina">
      <h1>Nossos Serviços</h1>

      <div class="container-alerta">
        <AlertaComponent
          v-if="erroCarregamento"
          tipo="erro"
          mensagem="Não foi possível carregar os serviços da API. Verifique a URL configurada em src/services/api.js."
          @fechar="erroCarregamento = false"
        />
      </div>

      <p v-if="carregando">Carregando serviços...</p>

      <div v-else class="lista-servicos">
        <div v-for="produto in produtos" :key="produto.id" class="card-servico">
          <h2>{{ produto.nome }}</h2>
          <p class="descricao">{{ produto.descricao }}</p>
          <p class="preco">a partir de R$ {{ produto.precoBase.toFixed(2) }}</p>
          <button @click="agendar(produto)">Agendar este serviço</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlertaComponent from "@/components/AlertaComponent.vue";
import { buscarProdutos } from "@/services/api";

export default {
  name: "MenuView",
  components: { AlertaComponent },
  data() {
    return {
      produtos: [],
      carregando: true,
      erroCarregamento: false,
    };
  },
  async created() {
    try {
      this.produtos = await buscarProdutos();
    } catch (erro) {
      console.error(erro);
      this.erroCarregamento = true;
    } finally {
      this.carregando = false;
    }
  },
  methods: {
    agendar(produto) {
      this.$router.push({ path: "/config", query: { produtoId: produto.id } });
    },
  },
};
</script>

<style scoped>
.alinhamento-global {
  width: 100%;
  display: flex;
  justify-content: center; 
  text-align: left; 
}

.servicos-pagina {
  width: 100%;
  max-width: 1200px; 
  padding: 40px 20px;
  box-sizing: border-box;
}

.servicos-pagina h1 {
  margin: 0 0 20px 0;
  color: #0b3d3e;
  font-size: 28px;
  font-weight: bold;
}

.container-alerta {
  margin-bottom: 20px;
}

.lista-servicos {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start; 
  width: 100%;
}

.card-servico {
  background: #ffffff;
  border: 1px solid #d1f2ee;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: calc(33.333% - 14px); 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  transition: transform 0.2s;
}

.card-servico:hover {
  transform: translateY(-2px);
}

@media (max-width: 900px) {
  .card-servico {
    width: calc(50% - 10px);
  }
}

@media (max-width: 600px) {
  .card-servico {
    width: 100%;
  }
}

.card-servico h2 {
  margin: 0 0 10px 0;
  color: #0f8b8d;
  font-size: 18px;
}

.descricao {
  color: #555;
  font-size: 14px;
  line-height: 1.4;
  min-height: 45px;
  margin: 0 0 15px 0;
}

.preco {
  font-weight: bold;
  color: #0b3d3e;
  font-size: 16px;
  margin-top: auto;
  margin-bottom: 15px;
}

.card-servico button {
  background-color: #14b8a6;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  text-align: center;
  transition: background-color 0.2s;
}

.card-servico button:hover {
  background-color: #0f8b8d;
}
</style>