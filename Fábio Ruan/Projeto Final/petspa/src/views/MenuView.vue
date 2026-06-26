<template>
  <div class="alinhamento-global">
    <div class="servicos-pagina">
      <h1>Nossos Serviços</h1>

      <div class="lista-servicos">
        <div v-for="produto in produtos" :key="produto.id" class="card-servico">
          <img
            :src="produto.imagem"
            :alt="produto.nome"
            class="servico-imagem"
          />
          <h2>{{ produto.nome }}</h2>
          <p class="descricao">{{ produto.descricao }}</p>
          <p class="preco">a partir de R$ {{ produto.preco.toFixed(2) }}</p>
          <button @click="agendar(produto)">Agendar este serviço</button>
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
      produtos: [
        {
          id: 1,
          nome: "Banho Simples",
          preco: 40,
          imagem: `${process.env.BASE_URL}img/banho.jpg`,
          descricao: "Banho rápido com shampoo neutro e secagem.",
        },
        {
          id: 2,
          nome: "Tosa Completa",
          preco: 60,
          imagem: `${process.env.BASE_URL}img/tosa.jpg`,
          descricao: "Tosa completa com acabamento e hidratação.",
        },
        {
          id: 3,
          nome: "Hidratação Control",
          preco: 35,
          imagem: `${process.env.BASE_URL}img/hidratacao.jpg`,
          descricao: "Tratamento hidratante para pelos secos e quebradiços.",
        },
        {
          id: 4,
          nome: "Spa de Ofurô",
          preco: 90,
          imagem: `${process.env.BASE_URL}img/spa.jpg`,
          descricao: "Experiência completa com aroma-terapia e relaxamento.",
        },
      ],
    };
  },
  methods: {
    agendar(produto) {
      this.$router.push({ path: "/config-pedido", query: { produtoId: produto.id } });
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

.servico-imagem {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 18px;
  background: #f0faf8;
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