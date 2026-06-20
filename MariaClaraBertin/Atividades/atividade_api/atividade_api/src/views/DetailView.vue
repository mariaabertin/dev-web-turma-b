<template>
  <div class="container">
    <button class="btn-back" @click="$emit('voltar')">Voltar para a lista</button>

    <div v-if="deputado" class="profile-header">
      <img :src="deputado.ultimoStatus.urlFoto" :alt="deputado.nomeCivil" class="profile-avatar" />
      <div class="profile-info">
        <h2>{{ deputado.ultimoStatus.nome }}</h2>
        <div>
          <span class="badge-large">{{ deputado.ultimoStatus.siglaPartido }} - {{ deputado.ultimoStatus.siglaUf }}</span>
        </div>
        <p class="profile-email">✉ {{ deputado.ultimoStatus.email || 'Não informado' }}</p>
      </div>
    </div>

    <div class="expenses-section">
      <h3 class="section-title">Últimas Despesas Declaradas</h3>
      
      <div v-if="loadingGastos" class="loading">Buscando registros de despesas...</div>
      
      <div v-else-if="despesas.length === 0" class="no-data">Nenhum gasto recente declarado.</div>
      
      <div v-else class="grid-despesas">
        <div v-for="(gasto, index) in despesas" :key="index" class="card-gasto">
          
          <div class="card-gasto-header">
            <span class="gasto-data">{{ formatDate(gasto.dataDocumento) }}</span>
          </div>

          <p class="gasto-tipo">{{ gasto.tipoDespesa.toUpperCase() }}</p>
          
          <p class="gasto-valor">{{ formatCurrency(gasto.valorLiquido) }}</p>
          
          <a 
            v-if="gasto.urlDocumento" 
            :href="gasto.urlDocumento" 
            target="_blank" 
            class="btn-doc-block"
          >
            Ver Documento Original
          </a>
          <div v-else class="btn-doc-disabled">Documento Indisponível</div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailsView',
  props: ['id'],
  emits: ['voltar'],
  data() {
    return {
      deputado: null,
      despesas: [],
      loadingGastos: false
    }
  },
  mounted() {
    this.fetchDadosDeputado()
    this.fetchDespesas()
  },
  methods: {
    async fetchDadosDeputado() {
      try {
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${this.id}`)
        const data = await response.json()
        this.deputado = data.dados
      } catch (error) {
        console.error('Erro ao buscar perfil', error)
      }
    },
    async fetchDespesas() {
      this.loadingGastos = true
      try {
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${this.id}/despesas?ordem=DESC&ordenarPor=ano&itens=15`)
        const data = await response.json()
        this.despesas = data.dados
      } catch (error) {
        console.error('Erro ao buscar despesas', error)
      } finally {
        this.loadingGastos = false
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return 'N/A'
      const [ano, mes, dia] = dateStr.split('-')
      return `${dia}/${mes}/${ano}`
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
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

.btn-back { 
  background-color: #004d3d; 
  color: white; 
  border: none; 
  padding: 10px 20px; 
  border-radius: 6px; 
  cursor: pointer; 
  margin-bottom: 25px; 
  font-weight: bold; 
}

.profile-header {
  display: flex;
  gap: 25px;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  align-items: center;
  margin-bottom: 40px;
  border: 1px solid #e2e8f0;
}

.profile-avatar {
  width: 100px;
  height: 135px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #e2e8f0;
}

.profile-info h2 {
  margin: 0 0 8px 0;
  color: #004d3d;
  font-size: 26px;
}

.badge-large {
  display: inline-block;
  background: #def2ec;
  color: #004d3d;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 12px;
}

.profile-email {
  margin: 0;
  color: #4a5568;
  font-size: 14px;
}

.section-title {
  color: #2d3748;
  font-size: 22px;
  margin-bottom: 25px;
  border-bottom: 2px solid #004d3d;
  display: inline-block;
  padding-bottom: 5px;
}

.grid-despesas {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
}

.card-gasto {
  background: white;
  border-radius: 8px;
  border-left: 4px solid #004d3d; 
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  border-top: 1px solid #edf2f7;
  border-right: 1px solid #edf2f7;
  border-bottom: 1px solid #edf2f7;
}

.card-gasto-header {
  display: flex;
  justify-content: flex-end;
  padding: 15px 15px 0 15px;
}

.gasto-data {
  background: #e2e8f0;
  color: #4a5568;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.gasto-tipo {
  font-size: 14px;
  font-weight: 700;
  color: #2d3748;
  margin: 10px 15px;
  line-height: 1.4;
  flex-grow: 1;
}

.gasto-valor {
  font-size: 22px;
  font-weight: bold;
  color: #e53e3e; 
  margin: 10px 15px 20px 15px;
}

.btn-doc-block {
  background-color: #004d3d;
  color: white;
  text-align: center;
  text-decoration: none;
  padding: 12px;
  font-weight: bold;
  font-size: 14px;
  display: block;
  transition: background 0.2s;
}

.btn-doc-block:hover {
  background-color: #003328;
}

.btn-doc-disabled {
  background-color: #cbd5e1;
  color: #718096;
  text-align: center;
  padding: 12px;
  font-size: 14px;
}

.loading, .no-data { 
  text-align: center; 
  padding: 40px; 
  color: #718096; }
</style>