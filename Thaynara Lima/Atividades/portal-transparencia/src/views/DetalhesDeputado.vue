<template>
  <div class="container-detalhes">
    <button @click="$emit('voltar')" class="btn-voltar">⬅ Voltar à lista</button>

    <div class="perfil-deputado">
      <img :src="deputado.urlFoto" :alt="deputado.nome" class="foto-perfil" />
      <div class="perfil-info">
        <h2>{{ deputado.nome }}</h2>
        <span class="badge-partido">{{ deputado.siglaPartido }} - {{ deputado.siglaUf }}</span>
        <p class="email">{{ deputado.email || 'deputado@camara.leg.br' }}</p>
      </div>
    </div>

    <hr class="divisor" />
    <h3 class="titulo-secao">Últimas Despesas Declaradas</h3>

    <div class="grid-gastos">
      <div v-for="(gasto, index) in gastos" :key="index" class="card-gasto">
        <div class="gasto-header">
          <span class="tipo-gasto">{{ gasto.tipoDespesa }}</span>
          <span class="data-gasto">{{ formatarData(gasto.dataDocumento) }}</span>
        </div>
        <div class="gasto-corpo">
          <p class="valor-gasto">R$ {{ gasto.valorDocumento.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
          <a :href="gasto.urlDocumento" target="_blank" class="btn-documento" v-if="gasto.urlDocumento">
            Ver Documento Original
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    deputado: Object
  },
  data() {
    return {
      gastos: []
    };
  },
  methods: {
    async carregarGastos() {
      try {
        const response = await axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${this.deputado.id}/despesas`, {
          params: {
            ordem: 'DESC',
            ordenarPor: 'ano',
            itens: 15
          }
        });
        this.gastos = response.data.dados;
      } catch (error) {
        console.error("Erro ao carregar gastos:", error);
      }
    },
    formatarData(dataString) {
      if (!dataString) return 'N/A';
      const [ano, mes, dia] = dataString.split('-');
      return `${dia}/${mes}/${ano}`;
    }
  },
  mounted() {
    this.carregarGastos();
  }
};
</script>

<style scoped>
.container-detalhes {
  padding: 20px;
}
.btn-voltar {
  background: none;
  border: 1px solid #ccc;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}
.perfil-deputado {
  display: flex;
  align-items: center;
  background: #fdfdfd;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  gap: 20px;
}
.foto-perfil {
  width: 80px;
  height: 110px;
  object-fit: cover;
  border-radius: 4px;
}
.perfil-info h2 {
  color: #004b39;
  margin: 0 0 10px 0;
}
.badge-partido {
  background-color: #e2f5f0;
  color: #007a5e;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}
.email {
  color: #666;
  font-size: 14px;
  margin-top: 10px;
}
.divisor {
  border: 0;
  border-top: 1px solid #eee;
  margin: 30px 0;
}
.titulo-secao {
  color: #333;
  margin-bottom: 20px;
}
.grid-gastos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.card-gasto {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: #fff;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.tipo-gasto {
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  color: #555;
  display: block;
}
.data-gasto {
  font-size: 11px;
  color: #999;
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
  float: right;
}
.gasto-header {
  margin-bottom: 15px;
}
.valor-gasto {
  color: #d32f2f;
  font-weight: bold;
  font-size: 18px;
  margin: 10px 0;
}
.btn-documento {
  display: block;
  text-align: center;
  background-color: #004b39;
  color: white;
  text-decoration: none;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  margin-top: 10px;
}
</style>