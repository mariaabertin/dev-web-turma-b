<template>
  <div>
    <BannerComponent />
    
    <h1 class="titulo-pagina">Nosso Cardápio Fit</h1>
    <div id="scroll-horizontal">
      <div id="card-content" v-for="marmita in listaMenuMarmitas" :key="marmita.id">
        <div class="card-linha">
          <div class="foto-marmita">
            <img 
              width="300"
              height="200"
              :src="marmita.foto"
              alt="Foto da marmita"
            >
          </div>
          <div id="card-coluna" class="card-coluna">
            <p id="nome-content">{{ marmita.nome }}</p>
            <p id="preco-content">R$ {{ marmita.valor }},00</p>
            <p id="descricao-content">{{ marmita.descricao }}</p>
            <button @click="selecionarMarmita(marmita)">Selecionar Marmita</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerComponent from '@/components/BannerComponent.vue';

export default {
  name: "MenuView",
  components: {
    BannerComponent
  },
  data() {
    return {
      listaMenuMarmitas: [],
      urlApi: "https://db-marmitasfitness.onrender.com" 
    };
  },
  methods: {
    async consultarMenu() {
      try {
        const response = await fetch(`${this.urlApi}/marmitas`); 
        const dados = await response.json();
        
        this.listaMenuMarmitas = dados;
        console.log("Dados carregados:", dados);
      } catch (error) {
        console.error("Erro ao consultar o menu:", error);
      }
    },
    selecionarMarmita(marmitaSelecionada) {
      const param = JSON.stringify(marmitaSelecionada);
      const marmitaJson = encodeURIComponent(param);
      
      this.$router.push({ path: "/config-pedido", query: { marmita: marmitaJson } });
    }
  },
  mounted() {
    this.consultarMenu();
  }
};
</script>

<style scoped>
.titulo-pagina {
  text-align: center;
  font-size: 32px;
  color: #1e272e;
  margin: 30px 0;
  font-weight: bold;
}

#card-content {
  display: inline-block;
  width: 280px;
  min-height: 500px;
  margin: 20px;
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  background-color: #fff;
  vertical-align: top;
}

#scroll-horizontal {
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px;
}

#nome-content {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  margin: 12px 0;
  color: #2c3e50;
  white-space: normal;
}

.foto-marmita {
  flex-shrink: 0;
}

.foto-marmita img {
  width: 100%;
  max-height: 180px;
  object-fit: cover;
}

#preco-content {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #27ae60;
  margin-bottom: 10px;
}

#descricao-content {
  font-size: 14px;
  text-align: left;
  color: #7f8c8d;
  margin: 10px 5px;
  white-space: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  height: 75px;
}

.card-linha {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-coluna {
  padding: 15px;
}

#card-coluna button {
  padding: 12px;
  width: 100%;
  border-radius: 8px;
  border: none;
  color: #ffffff;
  background-color: #2ecc71;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s ease;
  margin-top: 10px;
}

#card-coluna button:hover {
  background-color: #27ae60;
  box-shadow: 0 2px 8px rgba(46, 204, 113, 0.4);
}
</style>