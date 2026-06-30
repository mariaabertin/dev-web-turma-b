<template>
  <div class="detalhes">
    <button class="voltar" @click="$router.push('/')">← Voltar à lista</button>

    <p v-if="carregando" class="info">Carregando dados...</p>

    <div v-if="deputado" class="header-deputado">
      <img :src="deputado.urlFoto" :alt="deputado.nome" class="foto-grande" />
      <div class="info-deputado">
        <h1>{{ deputado.nome }}</h1>
        <span class="partido">
          {{ deputado.siglaPartido }} - {{ deputado.siglaUf }}
        </span>
        <p class="email">📧 {{ deputado.email || 'E-mail não informado' }}</p>
      </div>
    </div>

    <h2 class="titulo-gastos">💰 Despesas Declaradas</h2>

    <p v-if="!carregando && despesas.length === 0" class="info">
      Nenhuma despesa encontrada para este deputado.
    </p>

    <div class="tabela-gastos">
      <div class="gasto" v-for="(gasto, index) in despesas" :key="index">
        <div class="gasto-info">
          <span class="data">{{ formatarData(gasto.dataDocumento) }}</span>
          <h4>{{ gasto.tipoDespesa }}</h4>
          <span class="valor">{{ formatarValor(gasto.valorLiquido) }}</span>
        </div>
        <a
          v-if="gasto.urlDocumento"
          :href="gasto.urlDocumento"
          target="_blank"
          class="btn-documento"
        >
          Ver Documento
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetalhesDeputado",
  data() {
    return {
      deputado: null,
      despesas: [],
      carregando: false,
    };
  },
  mounted() {
    this.carregarDeputado();
    this.carregarDespesas();
  },
  methods: {
    carregarDeputado() {
      const id = this.$route.params.id;
      fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`)
        .then((r) => r.json())
        .then((resposta) => {
          const d = resposta.dados;
          this.deputado = {
            nome: d.ultimoStatus.nome,
            siglaPartido: d.ultimoStatus.siglaPartido,
            siglaUf: d.ultimoStatus.siglaUf,
            urlFoto: d.ultimoStatus.urlFoto,
            email: d.ultimoStatus.gabinete
              ? d.ultimoStatus.gabinete.email
              : d.ultimoStatus.email,
          };
        });
    },
    carregarDespesas() {
      this.carregando = true;
      const id = this.$route.params.id;
      fetch(
        `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/despesas?ordem=DESC&ordenarPor=ano&itens=15`
      )
        .then((r) => r.json())
        .then((resposta) => {
          this.despesas = resposta.dados;
          this.carregando = false;
        });
    },
    formatarData(data) {
      if (!data) return "Data não informada";
      const apenasData = data.split("T")[0];
      const partes = apenasData.split("-");
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    },
    formatarValor(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
};
</script>

<style scoped>
.detalhes {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.voltar {
  background: none;
  border: 2px solid #1b3a5b;
  color: #1b3a5b;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  margin-bottom: 24px;
}

.voltar:hover {
  background: #1b3a5b;
  color: #fff;
}

.header-deputado {
  display: flex;
  gap: 24px;
  align-items: center;
  background: #1b3a5b;
  color: #fff;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 30px;
}

.foto-grande {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
}

.info-deputado h1 {
  font-size: 26px;
  margin-bottom: 8px;
}

.partido {
  display: inline-block;
  background: #fff;
  color: #1b3a5b;
  font-size: 13px;
  font-weight: bold;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 10px;
}

.info-deputado .email {
  font-size: 14px;
  opacity: 0.9;
}

.titulo-gastos {
  color: #1b3a5b;
  margin-bottom: 16px;
}

.tabela-gastos {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.gasto {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-left: 5px solid #2e8b57;
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.data {
  font-size: 13px;
  color: #888;
}

.gasto-info h4 {
  color: #333;
  margin: 4px 0;
  font-size: 15px;
}

.valor {
  font-size: 17px;
  font-weight: bold;
  color: #2e8b57;
}

.btn-documento {
  background: #2e8b57;
  color: #fff;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  white-space: nowrap;
}

.btn-documento:hover {
  background: #246b43;
}

.info {
  text-align: center;
  color: #777;
  font-size: 17px;
  margin: 30px 0;
}
</style>
