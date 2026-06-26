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
  padding: 40px 48px;
  max-width: 640px;
  background-color: #faf8f4;
  min-height: 60vh;
}

#info-prato-selecionado {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e8e2d8;
}

#foto-content {
  width: 110px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

#nome-prato-content {
  font-style: italic;
  font-size: 22px;
  color: #1e1e1e;
  font-weight: bold;
  margin: 0;
}

.inputs {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.inputs label {
  font-style: normal;
  font-size: 13px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #8a7f6e;
  font-family: Georgia, serif;
}

.inputs input[type="text"],
.inputs select {
  padding: 10px 12px;
  border: 1px solid #ddd8cc;
  border-radius: 6px;
  font-size: 15px;
  font-family: Georgia, serif;
  background-color: #ffffff;
  color: #1e1e1e;
  width: 100%;
  transition: border-color 0.2s;
}

.inputs input[type="text"]:focus,
.inputs select:focus {
  outline: none;
  border-color: #d4a847;
}

.inputs input[type="checkbox"] {
  margin-right: 8px;
  accent-color: #d4a847;
}

.obrigatorio {
  color: #c0392b;
  font-style: normal;
}

#btn-container {
  margin-top: 28px;
}

.btn-pedido {
  background-color: #1e1e1e;
  color: #f0e6cc;
  border: none;
  padding: 12px 36px;
  border-radius: 6px;
  cursor: pointer;
  font-style: italic;
  font-size: 16px;
  font-family: Georgia, serif;
  transition: background-color 0.2s;
}

.btn-pedido:hover {
  background-color: #d4a847;
  color: #1e1e1e;
}
</style>