<template>
  <div id="pedido-container">
    <form id="pedido-form" @submit="criarPedido($event)">
      <div id="info-prato-selecionado">
        <p id="nome-prato-content">
          {{ prato && prato.nome ? prato.nome : "--" }}
        </p>
        <img
          id="foto-content"
          :src="prato && prato.foto ? prato.foto : ''"
        />
      </div>

      <AlertaComponent :mensagem="alertaMensagem" :tipo="alertaTipo" />

      <div class="inputs" id="form-pedido">
        <label>Nome do Cliente <span class="obrigatorio">*</span></label>
        <input
          v-model="nomeCliente"
          type="text"
          placeholder="Digite seu nome"
          id="nome-cliente"
        />
      </div>

      <div class="inputs">
        <label>Molho <span class="obrigatorio">*</span></label>
        <select v-model="molhoSelecionado">
          <option value="">Selecione</option>
          <option
            v-for="molho in listaMolhos"
            :key="molho.id"
            :value="molho"
          >
            {{ molho.descricao }}
          </option>
        </select>
      </div>

      <div class="inputs">
        <label>Acompanhamentos</label>
        <div
          v-for="acompanhamento in listaAcompanhamentos"
          :key="acompanhamento.id"
        >
          <input
            type="checkbox"
            :value="acompanhamento"
            v-model="listaAcompanhamentosSelecionados"
          />
          {{ acompanhamento.nome }} — R$ {{ acompanhamento.valor }},00
        </div>
      </div>

      <div class="inputs">
        <label>Bebidas</label>
        <div
          v-for="bebida in listaBebidas"
          :key="bebida.id"
        >
          <input
            type="checkbox"
            :value="bebida"
            v-model="listaBebidasSelecionadas"
          />
          {{ bebida.nome }} — R$ {{ bebida.valor }},00
        </div>
      </div>

      <div id="btn-container">
        <button type="submit">Fazer Pedido</button>
      </div>
    </form>
  </div>
</template>

<script>
import AlertaComponent from "./AlertaComponent.vue";

export default {
  name: "PedidoComponent",
  components: {
    AlertaComponent,
  },
  props: {
    prato: null,
  },
  data() {
    return {
      listaMolhos: [],
      listaAcompanhamentos: [],
      listaBebidas: [],
      nomeCliente: "",
      molhoSelecionado: "",
      listaAcompanhamentosSelecionados: [],
      listaBebidasSelecionadas: [],
      alertaMensagem: "",
      alertaTipo: "",
    };
  },
  methods: {
    async getMolhos() {
      const response = await fetch(`${this.$apiUrl}/tipos_molho`);
      const dados = await response.json();
      this.listaMolhos = dados;
    },
    async getOpcionais() {
      const response = await fetch(`${this.$apiUrl}/opcionais`);
      const dados = await response.json();
      this.listaAcompanhamentos = dados.acompanhamentos;
      this.listaBebidas = dados.bebidas;
    },
    exibirAlerta(mensagem, tipo) {
      this.alertaMensagem = mensagem;
      this.alertaTipo = tipo;
    },
    limparAlerta() {
      this.alertaMensagem = "";
      this.alertaTipo = "";
    },
    async criarPedido(e) {
      e.preventDefault();

      if (!this.nomeCliente) {
        this.exibirAlerta("Campo obrigatório: informe o Nome do Cliente.", "erro");
        return;
      }

      if (!this.molhoSelecionado) {
        this.exibirAlerta("Campo obrigatório: selecione o Molho desejado.", "erro");
        return;
      }

      this.exibirAlerta("Enviando seu pedido...", "info");

      const dadosPedido = {
        nome: this.nomeCliente,
        molho: this.molhoSelecionado,
        bebidas: Array.from(this.listaBebidasSelecionadas),
        acompanhamentos: Array.from(this.listaAcompanhamentosSelecionados),
        prato: this.prato,
        statusId: 5,
      };

      const dadosJson = JSON.stringify(dadosPedido);

      const req = await fetch(`${this.$apiUrl}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dadosJson,
      });

      if (req.status == 201) {
        this.exibirAlerta("Pedido realizado com sucesso! 🥐", "sucesso");
        setTimeout(() => {
          this.$router.push("/pedidos");
        }, 1500);
      } else {
        this.exibirAlerta("Erro ao realizar pedido. Tente novamente.", "erro");
      }
    },
  },
  mounted() {
    this.getMolhos();
    this.getOpcionais();
    this.exibirAlerta("Selecione o molho e os opcionais para continuar.", "info");
  },
};
</script>

<style scoped>
#pedido-container {
  padding: 30px;
  max-width: 600px;
  margin: 0 auto;
}

#info-prato-selecionado {
  text-align: center;
  margin-bottom: 20px;
}

#nome-prato-content {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  font-size: 28px;
  color: #2c2c2c;
  font-weight: bold;
}

#foto-content {
  width: 250px;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #d4a847;
}

.inputs {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.inputs label {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  font-weight: bold;
  color: #2c2c2c;
  font-size: 16px;
}

.inputs input[type="text"],
.inputs select {
  padding: 8px;
  border: 1px solid #d4a847;
  border-radius: 5px;
  font-size: 14px;
  width: 100%;
}

.obrigatorio {
  color: #e53e3e;
  font-style: normal;
}

#btn-container {
  text-align: center;
  margin-top: 20px;
}

button {
  background-color: #2c2c2c;
  color: #f5e6c8;
  border: none;
  padding: 10px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  font-size: 16px;
  transition: 0.3s;
}

button:hover {
  background-color: #d4a847;
  color: #2c2c2c;
}
</style>