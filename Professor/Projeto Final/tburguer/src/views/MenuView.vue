<template>
  <div>
    <h1>Menu</h1>
    <div id="scroll-horizontal">
      <div
        id="card-content"
        v-for="burguer in listaMenuHamburguers"
        :key="burguer.id"
      >
        <div id="card-linha">
          <div class="foto-hamburguer">
            <img :src="burguer.foto" />
            <div class="card-coluna">
              <p id="nome-content">{{ burguer.nome }}</p>
              <p id="preco-content">R$ {{ burguer.valor }},00</p>
              <p id="descricao-content">{{ burguer.descricao }}</p>
              <button @click="selecionarBurguer(burguer)">Selecionar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "MenuView",
  data() {
    return {
      listaMenuHamburguers: [],
    };
  },
  methods: {
    async consultarMenu() {
      const response = await fetch(`${BASE_URL}/menu`);
      const dados = await response.json();
      this.listaMenuHamburguers = dados.burgues;
      console.log(this.listaMenuHamburguers);
    },
    selecionarBurguer(burguerSelecionado) {
      const param = JSON.stringify(burguerSelecionado);
      const burguerJson = encodeURIComponent(param);
      this.$router.push({
        path: "/config-pedido",
        query: { burguer: burguerJson },
      });
    },
  },
  mounted() {
    this.consultarMenu();
  },
};
</script>
<style scoped>
#card-content {
  display: inline-block;
  width: 280px;
  min-height: 500px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px #444;
  position: relative;
}

#scroll-horizontal {
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;
  width: 900px;
  margin: 0 auto;
  box-shadow: inset -10px 0px 15px -20px grey;
}

#nome-content {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  margin: 12px;
}

.foto-hamburguer {
  flex-shrink: 0;
}

.foto-hamburguer img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
}

#preco-content {
  font-size: 35px;
  font-weight: bold;
  text-align: center;
  color: darkgreen;
}

#descricao-content {
  font-size: 16px;
  text-align: left;
  color: gray;
  margin: 16px;
  white-space: pre-line;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}

.card-linha {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.card-coluna {
  flex-grow: 1;
  padding: 15px;
  height: 100%;
}

.card-coluna button {
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  border: none;
  color: white;
  background-color: green;
  cursor: pointer;
  transition: 0.5s;
}

.card-coluna button:hover {
  color: rgb(202, 246, 202);
  background-color: rgb(0, 37, 22);
}
</style>
