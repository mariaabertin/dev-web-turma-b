<template>
  <div class="container">
    <header class="main-header">
      <h2>Acompanhamento de Despesas Parlamentares (Dados Abertos)</h2>
    </header>
    
    <div class="busca-container">
      <input 
        v-model="nomeBusca" 
        @input="buscarDeputados" 
        type="text" 
        placeholder="Pesquisar deputado pelo nome..." 
        class="input-busca"
      />
    </div>

    <div class="grid-deputados">
      <div 
        v-for="deputado in deputados" 
        :key="deputado.id" 
        class="card-deputado"
        @click="$emit('selecionar', deputado)"
      >
        <img :src="deputado.urlFoto" :alt="deputado.nome" class="foto-deputado" />
        <h3 class="nome-deputado">{{ deputado.nome }}</h3>
        <span class="badge-partido">{{ deputado.siglaPartido }} - {{ deputado.siglaUf }}</span>
        <p class="email-deputado">{{ deputado.email || 'deputado@camara.leg.br' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nomeBusca: '',
      deputados: []
    };
  },
  methods: {
    async buscarDeputados() {
      try {
        const response = await axios.get('https://dadosabertos.camara.leg.br/api/v2/deputados', {
          params: {
            nome: this.nomeBusca,
            ordem: 'ASC',
            ordenarPor: 'nome'
          }
        });
        this.deputados = response.data.dados;
      } catch (error) {
        console.error("Erro ao buscar deputados:", error);
      }
    }
  },
  mounted() {
    this.buscarDeputados();
  }
};
</script>

<style scoped>
.main-header {
  background-color: #004b39;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 14px;
  margin-bottom: 20px;
}
.busca-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
.input-busca {
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.grid-deputados {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 0 20px;
}
.card-deputado {
  background: #fdfdfd;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.card-deputado:hover {
  transform: translateY(-5px);
}
.foto-deputado {
  width: 100px;
  height: 130px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 15px;
}
.nome-deputado {
  color: #004b39;
  font-size: 16px;
  margin: 10px 0;
}
.badge-partido {
  background-color: #e2f5f0;
  color: #007a5e;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}
.email-deputado {
  color: #666;
  font-size: 12px;
  margin-top: 15px;
  word-break: break-all;
}
</style>