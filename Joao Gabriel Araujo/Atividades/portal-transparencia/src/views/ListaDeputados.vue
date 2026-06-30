<template>
  <div class="lista">
    <header class="cabecalho">
      <h1>🏛️ Portal de Transparência</h1>
      <p>Consulte os deputados federais e seus gastos públicos</p>
    </header>

    <div class="busca">
      <input
        type="text"
        v-model="termoBusca"
        placeholder="Buscar deputado pelo nome..."
        @keyup.enter="buscarDeputados"
      />
      <button @click="buscarDeputados">Buscar</button>
    </div>

    <p v-if="carregando" class="info">Carregando deputados...</p>

    <p v-if="!carregando && deputados.length === 0" class="info">
      Nenhum deputado encontrado.
    </p>

    <div class="grid">
      <div
        class="card"
        v-for="dep in deputados"
        :key="dep.id"
        @click="verDetalhes(dep.id)"
      >
        <img :src="dep.urlFoto" :alt="dep.nome" class="foto" />
        <div class="dados">
          <h3>{{ dep.nome }}</h3>
          <span class="partido">{{ dep.siglaPartido }} - {{ dep.siglaUf }}</span>
          <p class="email">{{ dep.email || 'E-mail não informado' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListaDeputados",
  data() {
    return {
      deputados: [],
      termoBusca: "",
      carregando: false,
    };
  },
  mounted() {
    this.buscarDeputados();
  },
  methods: {
    buscarDeputados() {
      this.carregando = true;
      let url =
        "https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome&itens=30";

      if (this.termoBusca) {
        url += "&nome=" + this.termoBusca;
      }

      fetch(url)
        .then((r) => r.json())
        .then((resposta) => {
          this.deputados = resposta.dados;
          this.carregando = false;
        });
    },
    verDetalhes(id) {
      this.$router.push({ name: "detalhes", params: { id: id } });
    },
  },
};
</script>

<style scoped>
.lista {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}

.cabecalho {
  text-align: center;
  margin-bottom: 30px;
}

.cabecalho h1 {
  color: #1b3a5b;
  font-size: 32px;
}

.cabecalho p {
  color: #666;
}

.busca {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 30px;
}

.busca input {
  width: 100%;
  max-width: 400px;
  padding: 12px 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}

.busca button {
  background: #1b3a5b;
  color: #fff;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.busca button:hover {
  background: #2c5680;
}

.info {
  text-align: center;
  color: #777;
  font-size: 18px;
  margin-top: 40px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 18px;
  display: flex;
  gap: 16px;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.15s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(27, 58, 91, 0.15);
}

.foto {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #1b3a5b;
}

.dados h3 {
  color: #1b3a5b;
  font-size: 17px;
  margin-bottom: 4px;
}

.partido {
  display: inline-block;
  background: #1b3a5b;
  color: #fff;
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 6px;
}

.email {
  color: #777;
  font-size: 13px;
  word-break: break-all;
}
</style>