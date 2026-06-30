<template>
  <div>
    <form id="pedido-form" @submit.prevent="criarPedido">
      
      <div>
        <p id="nome-marmita-content">
          {{ marmita && marmita.nome ? marmita.nome : "--" }}
        </p>

        <img
          id="foto-content"
          :src="marmita && marmita.foto ? marmita.foto : ''"
          alt="Foto da Marmita"
        />
      </div>

      <div class="inputs" id="form-pedido">
        <label>Nome do Cliente</label>
        <input 
          v-model="nomeClientes" 
          type="text" 
          placeholder="Digite seu Nome" 
          id="nome-cliente"
          required
        />
      </div>

      <div class="inputs">
        <label>Tamanho da Marmita</label>

        <select v-model="tamanhoSelecionado" name="tamanho-marmita" id="tamanho-marmita" required>
          <option value="" disabled selected>Selecione o tamanho</option>
          <option 
            v-for="tamanho in listaTamanhos"
            :key="tamanho.id"
            :value="tamanho"
          >
            {{ tamanho.descricao }}
          </option>
        </select>
      </div>

      <div>
        <label id="opcionais-titulo">Selecionar os opcionais</label>
        <label id="opcionais-subtitulo">Selecionar os complementos</label>

        <div 
          v-for="complemento in listaComplementos"
          :key="complemento.id" 
          class="checkbox-container"
        >
          <input 
            type="checkbox" 
            :name="complemento.nome" 
            :value="complemento" 
            v-model="listaComplementosSelecionados"
          />
          <span>{{ complemento.nome }}</span>
        </div>

        <label>Adicione uma bebida</label>

        <div 
          v-for="bebida in listaBebidas"
          :key="bebida.id"
          class="checkbox-container"
        >
          <input 
            type="checkbox" 
            :name="bebida.nome" 
            :value="bebida" 
            v-model="listaBebidasSelecionadas"
          />
          <span>{{ bebida.nome }}</span>
        </div>
      </div>

      <div class="inputs">
        <input
          type="submit"
          class="submit-btn"
          value="Confirmar pedido"
        />
      </div>

    </form>
  </div>
</template>

<script>
export default {
  name: "PedidoComponent",

  props: {
    marmita: {
      type: Object,
      default: null
    },
  },

  data() {
    return {
      listaTamanhos: [],
      listaComplementos: [],
      listaBebidas: [],
      nomeClientes: "",
      tamanhoSelecionado: "",
      listaComplementosSelecionados: [],
      listaBebidasSelecionadas: [],
      urlApi: "https://db-marmitasfitness.onrender.com" 
    };
  },

  methods: {
    async getTamanhos() {
      try {
        const response = await fetch(`${this.urlApi}/tamanhos_marmita`);
        this.listaTamanhos = await response.json();
      } catch (error) {
        console.error("Erro ao buscar tamanhos:", error);
      }
    },
    async getOpcionais() {
      try {
        const resComplementos = await fetch(`${this.urlApi}/complementos`);
        this.listaComplementos = await resComplementos.json();

        const resBebidas = await fetch(`${this.urlApi}/bebidas`);
        this.listaBebidas = await resBebidas.json();
      } catch (error) {
        console.error("Erro ao buscar opcionais:", error);
      }
    },
    async criarPedido() {
      const dadosPedido = {
        nome: this.nomeClientes,
        tamanho: this.tamanhoSelecionado,
        bebidas: Array.from(this.listaBebidasSelecionadas),
        complemento: Array.from(this.listaComplementosSelecionados),
        marmita: this.marmita,
        statusId: 5, 
      };

      try {
        const dadosJson = JSON.stringify(dadosPedido);

        const response = await fetch(`${this.urlApi}/pedidos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: dadosJson,
        });

        if (response.ok) {
          this.nomeClientes = "";
          this.tamanhoSelecionado = "";
          this.listaComplementosSelecionados = [];
          this.listaBebidasSelecionadas = [];

          this.$router.push("/pedidos");
        }
      } catch (error) {
        console.error("Erro ao realizar pedido:", error);
        alert("Houve um erro ao enviar o seu pedido. Tente novamente.");
      }
    },
  },
  mounted() {
    this.getTamanhos();
    this.getOpcionais();
  },
};
</script>

<style scoped> 
#foto-content {
  margin-bottom: 16px;
  border-radius: 16px;
  position: relative;
  z-index: 1;
  justify-content: center;
  width: 100%;
  height: 220px;
  object-fit: cover;
}

#nome-marmita-content {
  font-size: 36px;
  font-weight: bold;
  text-align: start;
  margin-bottom: -75px;
  margin-left: 30px;
  color: #ffffff;
  padding: 16px;
  position: relative;
  z-index: 2;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.8);
}

#form-pedido {
  max-width: 750px;
  margin: 0 auto;
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  font-weight: bold;
  margin-bottom: 16px;
  color: #222;
  padding: 5px 12px;
  flex-direction: start;
  display: flex;
  border-left: 4px solid #2ecc71; 
}

input,
select {
  padding: 12px;
  width: 100%;
  max-width: 350px;
  border: solid #ddd 1px;
  border-radius: 8px;
  height: auto;
  font-size: 14px;
}

select {
  height: 45px;
}

#opcionais-titulo {
  width: 100%;
}

#opcionais-subtitulo {
  display: flex;
  align-items: flex-start;
  align-content: center;
  width: 100%;
  margin-bottom: 12px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-left: 12px;
}

.checkbox-container span {
  margin-left: 8px;
  font-weight: normal;
}

.checkbox-container input {
  width: 18px;
  height: 18px;
}

.submit-btn {
  background-color: #1e272e;
  color: #2ecc71;
  font-weight: bold;
  border: none;
  font-size: 18px;
  border-radius: 12px;
  padding: 16px;
  margin: 20px auto 0 auto;
  cursor: pointer;
  width: 100%;
  max-width: 350px;
  transition: 0.3s ease;
}

.submit-btn:hover {
  background-color: #2ecc71;
  color: #fff;
}
</style>