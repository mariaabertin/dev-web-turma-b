<template>
  <div>
    <AlertaComponent
      :tipo="alerta.tipo"
      :mensagem="alerta.mensagem"
      :visivel="alerta.visivel"
      @fechar="fecharAlerta"
    />

    <form id="pedido-form" @submit="criarPedido($event)">
      <div>
        <p id="nome-prato-content">
          {{ prato && prato.nome ? prato.nome : "--" }}
        </p>
        <img id="foto-content" :src="prato && prato.foto ? prato.foto : ''" />
      </div>

      <div class="inputs" id="form-pedido">
        <label>Nome do cliente</label>
        <input
          v-model="nomeCliente"
          type="text"
          placeholder="Digite seu nome"
          id="nome-cliente"
        />
      </div>

      <div class="inputs">
        <label>Tamanho da marmita</label>
        <select v-model="tamanhoSelecionado" name="tamanho" id="tamanho">
          <option value="" selected>Selecione o tamanho</option>
          <option
            v-for="tamanho in listaTamanhos"
            :key="tamanho.id"
            :value="tamanho"
          >
            {{ tamanho.descricao }}
          </option>
        </select>
      </div>

      <div class="inputs">
        <p class="resumo-pedido">
          Valor total estimado: R$ {{ calcularValorTotal() }},00
        </p>
      </div>

      <div class="inputs">
        <label id="opcionais-titulo">Opcionais</label>
        <label id="opcionais-subtitulo">Adicione acompanhamentos</label>

        <div
          v-for="acompanhamento in listaAcompanhamentos"
          :key="acompanhamento.id"
          class="checkbox-container"
        >
          <label class="checkbox-item">
            <input
              type="checkbox"
              :name="acompanhamento.nome"
              :value="acompanhamento"
              v-model="listaAcompanhamentosSelecionados"
            />
            <span>{{ acompanhamento.nome }} (+ R$ {{ acompanhamento.valor }})</span>
          </label>
        </div>

        <label>Bebidas para acompanhar</label>

        <div
          v-for="bebida in listaBebidas"
          :key="bebida.id"
          class="checkbox-container"
        >
          <label class="checkbox-item">
            <input
              type="checkbox"
              :name="bebida.nome"
              :value="bebida"
              v-model="listaBebidasSelecionadas"
            />
            <span>{{ bebida.nome }} (+ R$ {{ bebida.valor }})</span>
          </label>
        </div>

        <div class="inputs">
          <input type="submit" class="submit-btn" value="Confirmar Pedido" />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import AlertaComponent from "@/components/AlertaComponent.vue";

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
      listaTamanhos: [],
      listaAcompanhamentos: [],
      listaBebidas: [],
      nomeCliente: "",
      tamanhoSelecionado: "",
      listaAcompanhamentosSelecionados: [],
      listaBebidasSelecionadas: [],
      alerta: { visivel: false, tipo: "info", mensagem: "" },
    };
  },
  methods: {
    mostrarAlerta(tipo, mensagem) {
      this.alerta = { visivel: true, tipo: tipo, mensagem: mensagem };
    },
    fecharAlerta() {
      this.alerta.visivel = false;
    },
    validarFormulario() {
      if (!this.prato || !this.prato.nome) {
        this.mostrarAlerta(
          "aviso",
          "Nenhuma marmita selecionada. Escolha um prato no cardápio antes de continuar."
        );
        return false;
      }
      if (this.nomeCliente.trim() === "") {
        this.mostrarAlerta("erro", "Informe o nome do cliente para continuar.");
        return false;
      }
      if (this.tamanhoSelecionado === "") {
        this.mostrarAlerta("erro", "Selecione o tamanho da marmita.");
        return false;
      }
      return true;
    },
    calcularValorTotal() {
      let total = Number(this.prato?.valor || 0);

      total += this.listaAcompanhamentosSelecionados.reduce(
        (acumulador, item) => acumulador + Number(item.valor || 0),
        0
      );

      total += this.listaBebidasSelecionadas.reduce(
        (acumulador, item) => acumulador + Number(item.valor || 0),
        0
      );

      return total;
    },
    async getTamanhos() {
      const response = await fetch(`${this.$apiUrl}/tamanhos`);
      const dados = await response.json();
      this.listaTamanhos = dados;
    },
    async getOpcionais() {
      const response = await fetch(`${this.$apiUrl}/opcionais`);
      const dados = await response.json();
      this.listaAcompanhamentos = dados.acompanhamentos;
      this.listaBebidas = dados.bebidas;
    },
    async criarPedido(e) {
      e.preventDefault();

      if (!this.validarFormulario()) {
        return;
      }

      const dadosPedido = {
        nome: this.nomeCliente.trim(),
        tamanho: this.tamanhoSelecionado,
        bebidas: Array.from(this.listaBebidasSelecionadas),
        acompanhamentos: Array.from(this.listaAcompanhamentosSelecionados),
        prato: this.prato,
        valorTotal: this.calcularValorTotal(),
        statusId: 1,
      };

      await fetch(`${this.$apiUrl}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosPedido),
      });

      this.mostrarAlerta(
        "sucesso",
        "Pedido realizado com sucesso! Redirecionando para os pedidos..."
      );
      setTimeout(() => {
        this.$router.push("/pedidos");
      }, 1300);
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
  z-index: -1;
  justify-content: center;
  width: 100%;
  max-width: 750px;
  height: 180px;
  object-fit: cover;
}

#nome-prato-content {
  font-size: 38px;
  font-weight: bold;
  text-align: start;
  margin-bottom: -80px;
  margin-left: 40px;
  color: white;
  padding: 16px;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
}

#form-pedido {
  max-width: 780px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 10px;
  color: #222;
  padding: 6px 12px;
  flex-direction: start;
  display: flex;
  border-left: 4px solid #e67e22;
  font-size: 15px;
}

input,
select {
  padding: 12px 14px;
  width: 100%;
  max-width: 420px;
  border: solid #222 1px;
  border-radius: 8px;
  height: 44px;
  font-size: 14px;
  box-sizing: border-box;
}

select {
  height: 48px;
}

#opcionais-titulo {
  width: 100%;
}

#opcionais-subtitulo {
  display: flex;
  align-items: flex-start;
  align-content: center;
  width: 100%;
  margin-bottom: 14px;
  font-size: 15px;
}

.resumo-pedido {
  margin: 0;
  padding: 12px 14px;
  border-radius: 10px;
  background: #fffaf5;
  border: 1px solid #e67e22;
  color: #c0392b;
  font-weight: bold;
}

.checkbox-container {
  margin-bottom: 10px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: bold;
  padding: 8px 10px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  background: #fffaf5;
  max-width: 520px;
}

.checkbox-item input {
  width: auto;
  height: 16px;
  margin: 0;
}

.submit-btn {
  background-color: #2b2b2b;
  color: #e67e22;
  font-weight: bold;
  border: none;
  font-size: 18px;
  border-radius: 12px;
  padding: 16px;
  margin: 0 auto;
  cursor: pointer;
  width: 100%;
  height: auto;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: #e67e22;
  color: #2b2b2b;
}
</style>
