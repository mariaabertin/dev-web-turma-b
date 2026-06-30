<template>
  <div id="menu-container">
    <h2 id="menu-titulo">🍽️ Notre Menu</h2>

    <AlertaComponent :mensagem="alertaMensagem" :tipo="alertaTipo" />

    <div v-if="carregando" id="carregando">
      <p id="texto-carregando">Carregando o menu, aguarde...</p>
    </div>

    <div v-else id="lista-menu">
      <div
        v-for="prato in listaMenuPratos"
        :key="prato.id"
        id="menu-item"
      >
        <img :src="prato.foto" :alt="prato.nome" id="foto-prato" />
        <div id="info-prato">
          <h3>{{ prato.nome }}</h3>
          <p id="preco-prato">R$ {{ prato.valor }},00</p>
        </div>
        <button @click="selecionarPrato(prato)">Selecionar</button>
      </div>
    </div>
  </div>
</template>

<script>
import AlertaComponent from "@/components/AlertaComponent.vue";

export default {
  name: "MenuView",
  components: {
    AlertaComponent,
  },
  data() {
    return {
      listaMenuPratos: [],
      carregando: true,
      alertaMensagem: "Carregando o menu, aguarde...",
      alertaTipo: "info",
    };
  },
  methods: {
    async getMenu() {
      try {
        this.carregando = true;
        const response = await fetch(`${this.$apiUrl}/menu`);
        const dados = await response.json();
        this.listaMenuPratos = dados.pratos;
        this.alertaMensagem = "";
        this.alertaTipo = "";
      } catch (error) {
        this.alertaMensagem =
          "Não foi possível carregar o menu. A API pode estar iniciando, aguarde e recarregue a página.";
        this.alertaTipo = "erro";
      } finally {
        this.carregando = false;
      }
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
  padding: 40px 48px;
  background-color: #faf8f4;
  min-height: 60vh;
}

#menu-titulo {
  font-size: 13px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #8a7f6e;
  font-style: normal;
  margin-bottom: 28px;
  font-family: Georgia, serif;
}

#texto-carregando {
  font-style: italic;
  color: #8a7f6e;
  font-size: 15px;
}

#lista-menu {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

#menu-item {
  background: #ffffff;
  border-radius: 10px;
  width: 220px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 5px 10px rgb(65,65,65);
  transition: box-shadow 0.5s;
}

#menu-item:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

#foto-prato {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

#info-prato {
  padding: 12px 14px 4px;
}

#info-prato h3 {
  font-style: italic;
  color: #1e1e1e;
  font-size: 15px;
  margin: 0 0 4px;
}

#preco-prato {
  color: #4a7c59;
  font-weight: bold;
  font-size: 15px;
  margin: 0;
}

#badge-novidade {
  display: inline-block;
  font-size: 10px;
  font-style: normal;
  background-color: #fef3dc;
  color: #a07820;
  border-radius: 20px;
  padding: 2px 10px;
  margin-top: 6px;
  letter-spacing: 0.5px;
}

button {
  margin: 12px 14px 14px;
  background-color: #1e1e1e;
  color: #f0e6cc;
  border: none;
  padding: 9px 0;
  border-radius: 6px;
  cursor: pointer;
  font-style: italic;
  font-size: 14px;
  font-family: Georgia, serif;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #d4a847;
  color: #1e1e1e;
}
</style>