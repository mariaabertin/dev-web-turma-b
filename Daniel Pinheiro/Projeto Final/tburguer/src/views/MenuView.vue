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
            <img width="300" height="200" :src="burguer.foto" />
            <div class="card-coluna">
              <p id="nome-content">{{ burguer.nome }}</p>
              <p id="valor-content">R$ {{ burguer.valor }},00</p>
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
export default {
  name: "MenuView",
  data() {
    return {
      listaMenuHamburguers: [],
    };
  },
  methods: {
    async consultarMenu() {
      const response = await fetch("http://localhost:3000/menu");
      const dados = await response.json();
      this.listaMenuHamburguers = dados.burgues;
      console.log(this.listaMenuHamburguers);
    },
    selecionarBurguer(burguerSelecionado) {
      const parametroBurguer = JSON.stringify(burguerSelecionado);
      const encodedBurguer = encodeURIComponent(parametroBurguer);
      this.$router.push({ path: "/config-pedido", query: { burguer: encodedBurguer } });
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
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  align-items: center;
  margin: 20px;
}

#scroll-horizontal {
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;
  width: 900px;
  margin: 0 auto;
  box-shadow: inset -10px 0px 15px -20px rgba(0, 0, 0, 0.1), inset 10px 0px 15px -20px rgba(0, 0, 0, 0.1);
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

#valor-content {
  font-size: 35px;
  font-weight: bold;
  text-align: center;
  color: darkblue;
  width: 100%;
  margin: 12px;
}

#descricao-content {
  font-size: 16px;
  color: darkslateblue;
  text-align: left;
  width: 100%;
  white-space: pre-line;
  margin: 16px;
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
  height: 15px;
  padding: 15px;
}

.card-coluna button {
  padding: 10px;
  width: 100%;
  border: none;
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: darkblue;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.card-coluna button:hover {
  background-color: navy;
}

</style>
