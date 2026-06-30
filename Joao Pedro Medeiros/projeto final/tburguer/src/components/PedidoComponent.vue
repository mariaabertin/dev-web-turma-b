<template>
  <div>
    <AlertaComponent
      :tipo="alerta.tipo"
      :titulo="alerta.titulo"
      :mensagem="alerta.mensagem"
    />

    <form id="pedido-form" @submit="criarPedido($event)">
      <div>
        <p id="nome-arranjo-content">
          {{ arranjo && arranjo.nome ? arranjo.nome : "--" }}
        </p>
        <img
          id="foto-content"
          :src="arranjo && arranjo.foto ? arranjo.foto : ''"
          :alt="arranjo && arranjo.nome ? arranjo.nome : 'Arranjo floral'"
        />
      </div>

      <div class="inputs" id="form-pedido">
        <label>Nome do cliente *</label>
        <input
          v-model.trim="nomeCliente"
          type="text"
          placeholder="Digite o nome do cliente"
          id="nome-cliente"
        />
      </div>

      <div class="inputs">
        <label>Tamanho do arranjo *</label>
        <select v-model="tamanhoSelecionado" name="tamanho" id="tamanho">
          <option value="" selected>Selecione o tamanho</option>
          <option
            v-for="tamanho in listaTamanhos"
            :key="tamanho.id"
            :value="tamanho"
          >
            {{ tamanho.descricao }} - R$ {{ tamanho.valor }},00
          </option>
        </select>
      </div>

      <div class="inputs">
        <label id="opcionais-titulo">Selecione as opções florais *</label>
        <label id="opcionais-subtitulo">Flores principais</label>

        <div
          v-for="flor in listaFlores"
          :key="flor.id"
          class="checkbox-container"
        >
          <input
            type="checkbox"
            :name="flor.nome"
            :value="flor"
            v-model="listaFloresSelecionadas"
          />
          <span>{{ flor.nome }} (+ R$ {{ flor.valor }},00)</span>
        </div>

        <label>Embalagem *</label>
        <select v-model="embalagemSelecionada" name="embalagem">
          <option value="">Selecione a embalagem</option>
          <option
            v-for="embalagem in listaEmbalagens"
            :key="embalagem.id"
            :value="embalagem"
          >
            {{ embalagem.nome }} - R$ {{ embalagem.valor }},00
          </option>
        </select>

        <label>Entrega *</label>
        <select v-model="entregaSelecionada" name="entrega">
          <option value="">Selecione a entrega</option>
          <option
            v-for="entrega in listaEntregas"
            :key="entrega.id"
            :value="entrega"
          >
            {{ entrega.nome }} - {{ entrega.prazo }}
          </option>
        </select>

        <label>Data especial</label>
        <input v-model="dataEntrega" type="date" />

        <label>Mensagem no cartão</label>
        <textarea
          v-model.trim="mensagemCartao"
          maxlength="100"
          placeholder="Mensagem curta para acompanhar o arranjo"
        ></textarea>

        <div id="total-pedido">
          Total estimado: <strong>R$ {{ calcularTotal() }},00</strong>
        </div>

        <div class="inputs">
          <input
            type="submit"
            class="submit-btn"
            value="Confirmar Pedido"
            :disabled="salvandoPedido"
          />
        </div>
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
    arranjo: null,
  },
  data() {
    return {
      listaTamanhos: [],
      listaFlores: [],
      listaEmbalagens: [],
      listaEntregas: [],
      nomeCliente: "",
      tamanhoSelecionado: "",
      embalagemSelecionada: "",
      entregaSelecionada: "",
      listaFloresSelecionadas: [],
      dataEntrega: "",
      mensagemCartao: "",
      salvandoPedido: false,
      alerta: {
        tipo: "",
        titulo: "",
        mensagem: "",
      },
    };
  },
  methods: {
    definirAlerta(tipo, titulo, mensagem) {
      this.alerta = { tipo, titulo, mensagem };
    },
    async getTamanhos() {
      const response = await fetch(`${this.$apiUrl}/tamanhos`);
      const dados = await response.json();
      this.listaTamanhos = dados;
    },
    async getOpcionais() {
      const response = await fetch(`${this.$apiUrl}/opcionais`);
      const dados = await response.json();
      this.listaFlores = dados.flores;
      this.listaEmbalagens = dados.embalagens;
      this.listaEntregas = dados.entregas;
    },
    calcularTotal() {
      const totalArranjo =
        this.arranjo && this.arranjo.valor ? this.arranjo.valor : 0;
      const totalTamanho = this.tamanhoSelecionado.valor || 0;
      const totalFlores = this.listaFloresSelecionadas.reduce(
        (total, flor) => total + flor.valor,
        0
      );
      const totalEmbalagem = this.embalagemSelecionada.valor || 0;
      const totalEntrega = this.entregaSelecionada.valor || 0;

      return (
        totalArranjo +
        totalTamanho +
        totalFlores +
        totalEmbalagem +
        totalEntrega
      );
    },
    validarPedido() {
      if (!this.arranjo) {
        this.definirAlerta(
          "erro",
          "Arranjo não selecionado",
          "Volte ao menu e escolha um arranjo antes de confirmar o pedido."
        );
        return false;
      }

      if (!this.nomeCliente) {
        this.definirAlerta(
          "erro",
          "Campo obrigatório",
          "Informe o nome do cliente para continuar."
        );
        return false;
      }

      if (
        !this.tamanhoSelecionado ||
        this.listaFloresSelecionadas.length === 0 ||
        !this.embalagemSelecionada ||
        !this.entregaSelecionada
      ) {
        this.definirAlerta(
          "erro",
          "Pedido incompleto",
          "Selecione tamanho, flores, embalagem e entrega."
        );
        return false;
      }

      const hoje = new Date().toISOString().slice(0, 10);
      if (this.dataEntrega && this.dataEntrega < hoje) {
        this.definirAlerta(
          "aviso",
          "Data inválida",
          "A data especial não pode ser anterior ao dia atual."
        );
        return false;
      }

      return true;
    },
    limparFormulario() {
      this.nomeCliente = "";
      this.tamanhoSelecionado = "";
      this.embalagemSelecionada = "";
      this.entregaSelecionada = "";
      this.listaFloresSelecionadas = [];
      this.dataEntrega = "";
      this.mensagemCartao = "";
    },
    usarPersistenciaLocal() {
      return String(this.$apiUrl).includes("my-json-server.typicode.com");
    },
    salvarPedidoLocal(pedido) {
      if (!this.usarPersistenciaLocal()) {
        return;
      }

      const pedidosSalvos = JSON.parse(
        localStorage.getItem("tflor_pedidos") || "[]"
      );
      pedidosSalvos.push(pedido);
      localStorage.setItem("tflor_pedidos", JSON.stringify(pedidosSalvos));
    },
    async criarPedido(e) {
      e.preventDefault();

      if (!this.validarPedido()) {
        return;
      }

      this.salvandoPedido = true;

      const dadosPedido = {
        nome: this.nomeCliente,
        tamanho: this.tamanhoSelecionado,
        flores: Array.from(this.listaFloresSelecionadas),
        embalagem: this.embalagemSelecionada,
        entrega: this.entregaSelecionada,
        mensagem: this.mensagemCartao,
        dataEntrega: this.dataEntrega,
        arranjo: this.arranjo,
        total: this.calcularTotal(),
        statusId: 1,
      };

      const dadosJson = JSON.stringify(dadosPedido);

      try {
        const response = await fetch(`${this.$apiUrl}/pedidos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: dadosJson,
        });
        const pedidoApi = await response.json().catch(() => ({}));
        const pedidoSalvo = {
          ...dadosPedido,
          id: pedidoApi.id || Date.now(),
        };
        this.salvarPedidoLocal(pedidoSalvo);

        this.definirAlerta(
          "sucesso",
          "Pedido cadastrado",
          "A encomenda floral foi salva. Você será levado para a listagem."
        );
        this.limparFormulario();

        setTimeout(() => {
          this.$router.push({ path: "/pedidos", query: { atualizado: "1" } });
        }, 1200);
      } catch (error) {
        this.definirAlerta(
          "erro",
          "Falha ao cadastrar",
          "Confira se o JSON Server está ativo e tente novamente."
        );
      } finally {
        this.salvandoPedido = false;
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
#pedido-form {
  width: min(760px, 92%);
  margin: 0 auto 50px;
}

#foto-content {
  margin-bottom: 16px;
  border-radius: 16px;
  position: relative;
  z-index: -1;
  justify-content: center;
  width: 100%;
  height: 220px;
  object-fit: cover;
}

#nome-arranjo-content {
  font-size: 38px;
  font-weight: bold;
  text-align: start;
  margin-bottom: -92px;
  margin-left: 24px;
  color: white;
  padding: 16px;
  text-shadow: 0 2px 8px #24473c;
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
  margin-bottom: 12px;
  color: #24473c;
  padding: 5px 12px;
  flex-direction: start;
  display: flex;
  border-left: 4px solid #d9b253;
}

input,
select,
textarea {
  padding: 12px;
  width: 100%;
  border: solid #24473c 1px;
  border-radius: 8px;
  min-height: 45px;
  font-size: 14px;
}

textarea {
  resize: vertical;
  min-height: 90px;
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
  text-align: left;
  margin: 6px 0;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
  height: 20px;
}

#total-pedido {
  background: #e8f3ef;
  border: 1px solid #c8dfd3;
  border-radius: 8px;
  padding: 14px;
  margin: 18px 0;
  font-size: 20px;
  color: #24473c;
}

.submit-btn {
  background-color: #24473c;
  color: #d9b253;
  font-weight: bold;
  border: none;
  font-size: 18px;
  border-radius: 12px;
  padding: 16px;
  margin: 0 auto;
  cursor: pointer;
  width: 100%;
  height: auto;
  transition: 0.4s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #d9b253;
  color: #24473c;
}

.submit-btn:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}
</style>
