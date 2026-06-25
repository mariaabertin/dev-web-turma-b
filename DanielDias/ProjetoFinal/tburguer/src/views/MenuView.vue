<template>
  <div id="menu-container">
    <h2 id="menu-titulo">Notre Menu</h2>
    <div id="lista-menu">
      <div
        v-for="prato in listaMenuPratos"
        :key="prato.id"
        id="menu-item"
      >
        <img :src="prato.foto" :alt="prato.nome" id="foto-prato" />
        <div id="info-prato">
          <h3>{{ prato.nome }}</h3>
          <p id="preco-prato">R$ {{ prato.valor }},00</p>
          <span v-if="prato.eh_novidade" id="badge-novidade">✨ Novidade</span>
        </div>
        <button @click="selecionarPrato(prato)">Selecionar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuView",
  data() {
    return {
      listaMenuPratos: [],
    };
  },
  methods: {
    async getMenu() {
      const response = await fetch(`${this.$apiUrl}/menu`);
      const dados = await response.json();
      this.listaMenuPratos = dados.pratos;
    },
    selecionarPrato(prato) {
      const pratoJson = encodeURIComponent(JSON.stringify(prato));
      this.$router.push({
        path: "/config-pedido",
        query: { prato: pratoJson },
      });
    },
  },
  mounted() {
    this.getMenu();
  },
};
</script>

<style scoped>
#menu-container {
  padding: 30px;
}

#menu-titulo {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  color: #2c2c2c;
  font-size: 35px;
  margin-bottom: 20px;
}

#lista-menu {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

#menu-item {
  border: 2px solid #d4a847;
  border-radius: 8px;
  padding: 15px;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

#foto-prato {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

#info-prato {
  text-align: center;
}

#info-prato h3 {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  color: #2c2c2c;
  font-size: 16px;
  margin: 5px 0;
}

#preco-prato {
  color: darkgreen;
  font-weight: bold;
  font-size: 16px;
}

#badge-novidade {
  font-size: 12px;
  color: #d4a847;
  font-weight: bold;
}

button {
  background-color: #2c2c2c;
  color: #f5e6c8;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  font-size: 14px;
  transition: 0.3s;
}

button:hover {
  background-color: #d4a847;
  color: #2c2c2c;
}
</style>