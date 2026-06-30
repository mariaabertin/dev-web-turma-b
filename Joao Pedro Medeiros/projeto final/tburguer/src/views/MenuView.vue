<template>
  <div>
    <h1>Menu de Arranjos</h1>
    <div id="scroll-horizontal">
      <div
        id="card-content"
        v-for="arranjo in listaMenuArranjos"
        :key="arranjo.id"
      >
        <div id="card-linha">
          <div class="foto-arranjo">
            <img :src="arranjo.foto" :alt="arranjo.nome" />
            <div class="card-coluna">
              <p id="nome-content">{{ arranjo.nome }}</p>
              <p id="preco-content">R$ {{ arranjo.valor }},00</p>
              <p id="descricao-content">{{ arranjo.descricao }}</p>
              <button @click="selecionarArranjo(arranjo)">Selecionar</button>
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
      listaMenuArranjos: [],
    };
  },
  methods: {
    async consultarMenu() {
      const response = await fetch(`${this.$apiUrl}/menu`);
      const dados = await response.json();
      this.listaMenuArranjos = dados.arranjos;
    },
    selecionarArranjo(arranjoSelecionado) {
      const param = JSON.stringify(arranjoSelecionado);
      const arranjoJson = encodeURIComponent(param);
      this.$router.push({
        path: "/config-pedido",
        query: { arranjo: arranjoJson },
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
  min-height: 520px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px #b9c6be;
  position: relative;
  background: white;
}

#scroll-horizontal {
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;
  width: min(980px, 94%);
  margin: 0 auto 50px;
  box-shadow: inset -10px 0px 15px -20px grey;
}

#nome-content {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  margin: 12px 0;
  color: #24473c;
  white-space: normal;
}

.foto-arranjo {
  flex-shrink: 0;
}

.foto-arranjo img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

#preco-content {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  color: #067647;
}

#descricao-content {
  font-size: 16px;
  text-align: left;
  color: gray;
  margin: 16px;
  white-space: normal;
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
  padding: 12px;
  width: 100%;
  border-radius: 10px;
  border: none;
  color: white;
  background-color: #24473c;
  cursor: pointer;
  transition: 0.4s;
  font-weight: bold;
}

.card-coluna button:hover {
  color: #24473c;
  background-color: #d9b253;
}
</style>
