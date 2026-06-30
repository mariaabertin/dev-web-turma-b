<template>
  <div>
    <h1>Cardápio</h1>
    <div id="scroll-horizontal">
      <div id="card-content" v-for="prato in listaPratos" :key="prato.id">
        <div id="card-linha">
          <div class="foto-prato">
            <img :src="prato.foto" :alt="prato.nome" />
            <div class="card-coluna">
              <p id="nome-content">{{ prato.nome }}</p>
              <p id="preco-content">R$ {{ prato.valor }},00</p>
              <p id="descricao-content">{{ prato.descricao }}</p>
              <button @click="selecionarPrato(prato)">Selecionar</button>
            </div>
          </div>
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
      listaPratos: [],
    };
  },
  methods: {
    async consultarMenu() {
      const response = await fetch(`${this.$apiUrl}/menu`);
      const dados = await response.json();
      this.listaPratos = dados.pratos;
    },
    selecionarPrato(pratoSelecionado) {
      const param = JSON.stringify(pratoSelecionado);
      const pratoJson = encodeURIComponent(param);
      this.$router.push({
        path: "/config-pedido",
        query: { prato: pratoJson },
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
  width: 320px;
  min-height: 560px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  position: relative;
  vertical-align: top;
  background: #fff;
}

#scroll-horizontal {
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: inset -10px 0px 15px -20px grey;
  padding-bottom: 12px;
}

#nome-content {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  margin: 12px 0;
  white-space: normal;
}

.foto-prato {
  flex-shrink: 0;
}

.foto-prato img {
  width: 100%;
  height: 230px;
  object-fit: cover;
  display: block;
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
  background-color: #27ae60;
  cursor: pointer;
  transition: 0.5s;
}

.card-coluna button:hover {
  color: rgb(202, 246, 202);
  background-color: #1e7a45;
}
</style>
