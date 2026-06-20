<template>
  <div class="container">
    <header class="main-header">
      <h1>Portal de Transparência</h1>
      <p>Dados Abertos da Câmara dos Deputados</p>
    </header>

    <div class="search-container">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Digite o nome do deputado" 
        @keyup.enter="fetchDeputados"
      />
      <button @click="fetchDeputados">Buscar</button>
    </div>

    <div v-if="loading" class="loading">Buscando parlamentares...</div>

    <div v-else class="grid-deputados">
      <div 
        v-for="deputado in deputados" 
        :key="deputado.id" 
        class="card-deputado"
        @click="irParaDetalhes(deputado.id)"
      >
        <div class="avatar-container">
          <img :src="deputado.urlFoto" :alt="deputado.nome" class="avatar" />
        </div>
        <h3>{{ deputado.nome }}</h3>
        <div>
          <span class="badge">{{ deputado.siglaPartido }} - {{ deputado.siglaUf }}</span>
        </div>
        <p class="email">{{ deputado.email || 'Não informado' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  emits: ['selecionar-deputado'],
  data() {
    return {
      searchQuery: '',
      deputados: [],
      loading: false
    }
  },
  mounted() {
    this.fetchDeputados()
  },
  methods: {
    async fetchDeputados() {
      this.loading = true
      try {
        let url = 'https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome'
        if (this.searchQuery) {
          url += `&nome=${this.searchQuery}`
        }
        const response = await fetch(url)
        const data = await response.json()
        this.deputados = data.dados
      } catch (error) {
        console.error('Erro ao buscar deputados', error)
      } finally {
        this.loading = false
      }
    },
    irParaDetalhes(id) {
      this.$emit('selecionar-deputado', id)
    }
  }
}
</script>

<style scoped>
.container { 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 20px; 
  font-family: sans-serif; }

.main-header { 
  text-align: center; 
  margin-bottom: 40px; 
  color: #004d3d; }

.search-container { 
  display: flex; 
  gap: 10px; 
  max-width: 600px; 
  margin: 0 auto 40px auto; }

.search-container input { 
  flex: 1; 
  padding: 12px; 
  border: 1px solid #cbd5e1; 
  border-radius: 8px; 
  font-size: 16px; }

.search-container button { 
  background-color: #004d3d; 
  color: white; border: none; 
  padding: 12px 24px; 
  border-radius: 8px; 
  cursor: pointer; 
  font-weight: bold; }

.search-container button:hover { 
  background-color: #003328; }
  
.loading { 
  text-align: center; 
  font-size: 18px; 
  color: #004d3d; }

.grid-deputados {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.card-deputado {
  background: white;
  border-radius: 16px;
  padding: 25px 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #e2e8f0;
}

.card-deputado:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.avatar-container {
  display: inline-block;
  margin-bottom: 15px;
}

.avatar {
  width: 95px;
  height: 125px;
  border-radius: 12px;
  object-fit: cover;
  border: 1px solid #e2e8f0;
}

.card-deputado h3 {
  color: #004d3d;
  margin: 10px 0;
  font-size: 18px;
  font-weight: 700;
}

.badge {
  display: inline-block;
  background: #def2ec;
  color: #004d3d;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 13px;
  margin-bottom: 15px;
}

.email {
  font-size: 13px;
  color: #718096;
  word-break: break-all;
  margin: 0;
}
</style>