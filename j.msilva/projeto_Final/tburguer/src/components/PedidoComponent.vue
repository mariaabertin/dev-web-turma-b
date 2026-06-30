<template>
  <div id="pedido-wrapper">

    <div id="produto-card" v-if="teclado">
      <img id="foto-content" :src="teclado.foto" :alt="teclado.nome" />
      <div id="produto-info">
        <p id="nome-teclado-content">{{ teclado.nome }}</p>
        <p id="valor-content">R$ {{ teclado.valor }},00</p>
        <p id="descricao-content">{{ teclado.descricao }}</p>
      </div>
    </div>

    <form id="pedido-form" @submit="criarPedido($event)">

      <div id="alerta-ancora">
        <AlertComponent :tipo="alerta.tipo" :mensagem="alerta.mensagem" />
      </div>

      <div id="form-pedido">

        <div class="inputs">
          <label>Nome do Cliente</label>
          <input
            v-model="nomeCliente"
            type="text"
            placeholder="Digite seu nome completo"
            id="nome-cliente"
          />
        </div>

        <div class="inputs">
          <label>Tipo de Switch</label>
          <select v-model="switchSelecionado" name="tipo-switch" id="tipo-switch">
            <option value="" selected>Selecione o tipo de switch</option>
            <option
              v-for="tipoSwitch in listaTiposSwitch"
              :key="tipoSwitch.id"
              :value="tipoSwitch"
            >
              {{ tipoSwitch.descricao }}
            </option>
          </select>
        </div>

        <div class="inputs">
          <label id="opcionais-titulo">Opcionais</label>

          <span class="opcao-grupo-label">Acessórios</span>
          <div
            v-for="acessorio in listaAcessorios"
            :key="acessorio.id"
            class="checkbox-container"
          >
            <input
              type="checkbox"
              :name="acessorio.nome"
              :value="acessorio"
              v-model="listaAcessoriosSelecionados"
            />
            <span>{{ acessorio.nome }}</span>
            <span class="opcao-valor">+ R$ {{ acessorio.valor }},00</span>
          </div>

          <span class="opcao-grupo-label">Cabos</span>
          <div
            v-for="cabo in listaCabos"
            :key="cabo.id"
            class="checkbox-container"
          >
            <input
              type="checkbox"
              :name="cabo.nome"
              :value="cabo"
              v-model="listaCabosSelecionados"
            />
            <span>{{ cabo.nome }}</span>
            <span class="opcao-valor">+ R$ {{ cabo.valor }},00</span>
          </div>
        </div>

        <input type="submit" class="submit-btn" value="Confirmar Pedido" />

      </div>
    </form>
  </div>
</template>

<script>
import AlertComponent from "@/components/AlertComponent.vue";

export default {
  name: "PedidoComponent",
  components: {
    AlertComponent,
  },
  props: {
    teclado: null,
  },
  data() {
    return {
      listaTiposSwitch: [],
      listaAcessorios: [],
      listaCabos: [],
      nomeCliente: "",
      switchSelecionado: "",
      listaAcessoriosSelecionados: [],
      listaCabosSelecionados: [],
      alerta: {
        tipo: "",
        mensagem: "",
      },
    };
  },
  methods: {
    async getTiposSwitch() {
      const response = await fetch(`${process.env.VUE_APP_API_URL}/tipos_switch`);
      const dados = await response.json();
      this.listaTiposSwitch = dados;
    },
    async getOpcionais() {
      const response = await fetch(`${process.env.VUE_APP_API_URL}/opcionais`);
      const dados = await response.json();
      this.listaAcessorios = dados.acessorios;
      this.listaCabos = dados.cabos;
    },
    exibirAlerta(tipo, mensagem) {
      this.alerta.tipo = tipo;
      this.alerta.mensagem = mensagem;
      this.$nextTick(() => {
        const el = document.getElementById("alerta-ancora");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    },
    async criarPedido(e) {
      e.preventDefault();

      if (!this.nomeCliente.trim()) {
        this.exibirAlerta("erro", "O nome do cliente é obrigatório.");
        return;
      }

      if (!this.switchSelecionado) {
        this.exibirAlerta("erro", "Selecione o tipo de switch do teclado.");
        return;
      }

      const dadosPedido = {
        nome: this.nomeCliente,
        tipoSwitch: this.switchSelecionado,
        cabos: Array.from(this.listaCabosSelecionados),
        acessorios: Array.from(this.listaAcessoriosSelecionados),
        teclado: this.teclado,
        statusId: 5,
      };

      const req = await fetch(`${process.env.VUE_APP_API_URL}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosPedido),
      });

      if (req.status === 201) {
        this.exibirAlerta("sucesso", "Pedido realizado com sucesso!");
        setTimeout(() => {
          this.$router.push("/pedidos");
        }, 1500);
      } else {
        this.exibirAlerta("erro", "Erro ao registrar o pedido. Tente novamente.");
      }
    },
  },
  mounted() {
    this.getTiposSwitch();
    this.getOpcionais();
  },
};
</script>

<style scoped>
#pedido-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px 40px;
}

/* Card do produto selecionado */
#produto-card {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  background-color: #16213e;
  border: 1px solid #7c3aed;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 32px;
}

#foto-content {
  width: 260px;
  min-width: 260px;
  height: 190px;
  object-fit: cover;
}

#produto-info {
  padding: 20px 20px 20px 0;
  flex: 1;
}

#nome-teclado-content {
  font-size: 22px;
  font-weight: bold;
  color: #e2e8f0;
  margin-bottom: 8px;
}

#valor-content {
  font-size: 20px;
  font-weight: bold;
  color: #7c3aed;
  margin-bottom: 12px;
}

#descricao-content {
  font-size: 13px;
  color: #a5b4fc;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Formulário */
#form-pedido {
  background-color: #16213e;
  border: 1px solid #2d2d5e;
  border-radius: 12px;
  padding: 28px;
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
}

label {
  font-weight: bold;
  margin-bottom: 12px;
  color: #e2e8f0;
  padding: 5px 12px;
  display: flex;
  border-left: 4px solid #7c3aed;
}

input[type="text"],
select {
  padding: 12px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #3d3d7e;
  border-radius: 8px;
  height: 46px;
  font-size: 14px;
  background-color: #0f0f1a;
  color: #e2e8f0;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
select:focus {
  outline: none;
  border-color: #7c3aed;
}

#opcionais-titulo {
  width: 100%;
}

.opcao-grupo-label {
  font-size: 13px;
  font-weight: bold;
  color: #7c3aed;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin: 12px 0 8px;
  display: block;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #1e1e3e;
}

.checkbox-container input[type="checkbox"] {
  width: 18px;
  min-width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #7c3aed;
}

.checkbox-container span {
  font-size: 14px;
  color: #e2e8f0;
}

.opcao-valor {
  margin-left: auto;
  font-size: 13px;
  color: #7c3aed;
  font-weight: bold;
  white-space: nowrap;
}

.submit-btn {
  background-color: #7c3aed;
  color: white;
  font-weight: bold;
  border: none;
  font-size: 16px;
  border-radius: 10px;
  padding: 14px;
  margin-top: 8px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #6d28d9;
}
</style>
