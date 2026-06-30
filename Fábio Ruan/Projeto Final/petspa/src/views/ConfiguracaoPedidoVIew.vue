<template>
  <div class="agendar-pagina">
    <h1>Agendar Serviço</h1>

    <AlertComponent tipo="info" mensagem="Atendemos de segunda a sábado, das 8h às 18h. Escolha um horário dentro desse período." />

    <AlertComponent tipo="erro" :mensagem="alertaErro" />
    <AlertComponent tipo="aviso" :mensagem="alertaAviso" />
    <AlertComponent tipo="sucesso" :mensagem="alertaSucesso ? 'Agendamento confirmado! Redirecionando para seus agendamentos...' : ''" />

    <form class="formulario" @submit.prevent="confirmarAgendamento">
      <label>
        Nome do Cliente *
        <input v-model="form.nomeCliente" type="text" placeholder="Seu nome" />
      </label>

      <label>
        Nome do Pet *
        <input v-model="form.nomePet" type="text" placeholder="Nome do seu pet" />
      </label>

      <label>
        Porte do Pet *
        <select v-model="form.porte">
          <option value="" disabled>Selecione</option>
          <option value="P">Pequeno (até 10kg)</option>
          <option value="M">Médio (10kg a 25kg)</option>
          <option value="G">Grande (25kg a 40kg)</option>
          <option value="GG">Gigante (acima de 40kg)</option>
        </select>
      </label>

      <label>
        Serviço *
        <select v-model="form.produtoId">
          <option value="" disabled>Selecione</option>
          <option v-for="produto in produtos" :key="produto.id" :value="String(produto.id)">
            {{ produto.nome }}
          </option>
        </select>
      </label>

      <label>
        Telefone *
        <input v-model="form.telefone" type="tel" placeholder="(00) 00000-0000" />
      </label>

      <label>
        Data e Horário desejado *
        <input v-model="form.dataHora" type="datetime-local" @change="verificarData" />
      </label>

      <label>
        Observações
        <textarea
          v-model="form.observacoes"
          placeholder="Ex.: pet agressivo, alergias, etc."
        ></textarea>
      </label>

      <p v-if="produtoSelecionado" class="valor-estimado">
        Valor estimado: <strong>R$ {{ valorEstimado.toFixed(2) }}</strong>
      </p>

      <button type="submit" :disabled="enviando">
        {{ enviando ? "Enviando..." : "Confirmar Agendamento" }}
      </button>
    </form>
  </div>
</template>

<script>
import AlertComponent from "@/components/AlertComponent.vue";

export default {
  name: "ConfiguracaoPedidoView",
  components: { AlertComponent },
  data() {
    return {
      produtos: [
        { id: 1, nome: "Banho Simples", preco: 40 },
        { id: 2, nome: "Tosa Completa", preco: 60 },
        { id: 3, nome: "Hidratação Control", preco: 35 },
        { id: 4, nome: "Spa de Ofurô", preco: 90 },
      ],
      form: {
        nomeCliente: "",
        nomePet: "",
        porte: "",
        produtoId: "",
        telefone: "",
        dataHora: "",
        observacoes: "",
      },
      alertaErro: "",
      alertaAviso: "",
      alertaSucesso: false,
      enviando: false,
    };
  },
  computed: {
    produtoSelecionado() {
      return this.produtos.find((p) => String(p.id) === String(this.form.produtoId)) || null;
    },
    fatorPorte() {
      const fatores = { P: 1.0, M: 1.25, G: 1.55, GG: 1.9 };
      return fatores[this.form.porte] || 1;
    },
    valorEstimado() {
      if (!this.produtoSelecionado) return 0;
      return this.produtoSelecionado.preco * this.fatorPorte;
    },
  },
  created() {
    const produtoQuery = this.$route.query.produtoId;
    if (produtoQuery) {
      this.form.produtoId = String(produtoQuery);
    }
  },
  methods: {
    verificarData() {
      if (!this.form.dataHora) return;
      const selecionada = new Date(this.form.dataHora);
      const agora = new Date();
      if (selecionada < agora) {
        this.alertaAviso = "A data selecionada está no passado. Por favor, escolha um horário futuro.";
      } else {
        this.alertaAviso = "";
      }
    },
    validar() {
      const faltando = [];
      if (!this.form.nomeCliente.trim()) faltando.push("Nome do Cliente");
      if (!this.form.nomePet.trim()) faltando.push("Nome do Pet");
      if (!this.form.porte) faltando.push("Porte do Pet");
      if (!this.form.produtoId) faltando.push("Serviço");
      if (!this.form.telefone.trim()) faltando.push("Telefone");
      if (!this.form.dataHora) faltando.push("Data e Horário");
      return faltando;
    },
    confirmarAgendamento() {
      const faltando = this.validar();
      if (faltando.length > 0) {
        this.alertaErro = `Preencha os campos obrigatórios: ${faltando.join(", ")}.`;
        this.alertaSucesso = false;
        return;
      }

      const selecionada = new Date(this.form.dataHora);
      if (selecionada < new Date()) {
        this.alertaErro = "Não é possível agendar em uma data passada.";
        return;
      }

      this.alertaErro = "";
      this.enviando = true;

      const novoPedido = {
        id: Date.now(),
        nomeCliente: this.form.nomeCliente.trim(),
        nomePet: this.form.nomePet.trim(),
        porte: this.form.porte,
        produtoId: this.form.produtoId,
        servicoNome: this.produtoSelecionado.nome,
        telefone: this.form.telefone.trim(),
        dataHora: this.form.dataHora,
        observacoes: this.form.observacoes.trim(),
        valor: this.valorEstimado,
      };

      const pedidosExistentes = JSON.parse(localStorage.getItem("pedidos") || "[]");
      pedidosExistentes.push(novoPedido);
      localStorage.setItem("pedidos", JSON.stringify(pedidosExistentes));

      this.enviando = false;
      this.alertaSucesso = true;

      setTimeout(() => {
        this.$router.push("/pedidos");
      }, 1500);
    },
  },
};
</script>

<style scoped>
.agendar-pagina {
  padding: 30px 50px;
}

.formulario {
  max-width: 600px;
  margin: 20px auto 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-align: left;
}

.formulario label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  font-weight: bold;
  color: #0b3d3e;
}

.formulario input,
.formulario select,
.formulario textarea {
  padding: 10px;
  border: 1px solid #b9e4df;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
}

.formulario textarea {
  resize: vertical;
  min-height: 60px;
}

.valor-estimado {
  font-size: 16px;
  color: #0b3d3e;
}

.formulario button[type="submit"] {
  background-color: #14b8a6;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.formulario button[type="submit"]:hover {
  background-color: #0f8b8d;
}

.formulario button[type="submit"]:disabled {
  background-color: #9fd9d2;
  cursor: not-allowed;
}
</style>
