<template>
  <div>
    <h1>Cardápio</h1>
    <div id="scroll-horizontal">
      <div
        id="card-content"
        v-for="acai in listaMenuAcais"
        :key="acai.id"
      >
        <div id="card-linha">
          <div class="foto-acai">
            <div class="foto-placeholder">🍇</div>
            <div class="card-coluna">
              <p id="nome-content">{{ acai.nome }}</p>
              <p id="preco-content">R$ {{ acai.valor }},00</p>
              <p id="descricao-content">{{ acai.descricao }}</p>
              <button @click="selecionarAcai(acai)">Selecionar</button>
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
      listaMenuAcais: [],
    };
  },
  methods: {
    async consultarMenu() {
      const response = await fetch(`${this.$apiUrl}/menu`);
      const dados = await response.json();
      this.listaMenuAcais = dados.acais;
      console.log(this.listaMenuAcais);
    },
    selecionarAcai(acaiSelecionado) {
      const param = JSON.stringify(acaiSelecionado);
      const acaiJson = encodeURIComponent(param);
      this.$router.push({
        path: "/config-pedido",
        query: { acai: acaiJson },
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
  background: white;
}

#scroll-horizontal {
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;
  width: 900px;
  margin: 0 auto;
  box-shadow: inset -10px 0px 15px -20px grey;
}

.foto-placeholder {
  width: 100%;
  height: 160px;
  background: linear-gradient(135deg, #4a148c, #7b1fa2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 72px;
}

#nome-content {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  margin: 12px 0;
  white-space: normal;
  color: #4a148c;
}

#preco-content {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #6a1b9a;
}

#descricao-content {
  font-size: 14px;
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
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  border: none;
  color: white;
  background-color: #6a1b9a;
  cursor: pointer;
  transition: 0.5s;
  font-size: 16px;
}

.card-coluna button:hover {
  color: #e1bee7;
  background-color: #4a148c;
}
</style>