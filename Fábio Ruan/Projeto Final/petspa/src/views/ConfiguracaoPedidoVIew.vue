<template>
  <div class="agendar-pagina">
    <h1>Agendar Serviço</h1>

    <AlertaComponent
      tipo="info"
      mensagem="O valor exibido é uma estimativa. O valor final pode variar conforme o porte e o estado do pelo do pet."
    />

    <AlertaComponent
      v-if="avisoDiaFechado"
      tipo="aviso"
      mensagem="Funcionamos de terça a sábado, das 9h às 18h. Você pode enviar mesmo assim, nossa equipe confirma o melhor horário disponível."
    />

    <AlertaComponent
      v-if="alertaErro"
      tipo="erro"
      :mensagem="alertaErro"
      @fechar="alertaErro = ''"
    />

    <AlertaComponent
      v-if="alertaSucesso"
      tipo="sucesso"
      mensagem="Agendamento confirmado! Redirecionando para a lista de agendamentos..."
    />

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
        <select v-model="form.produtoId" :disabled="carregandoProdutos">
          <option value="" disabled>
            {{ carregandoProdutos ? "Carregando..." : "Selecione" }}
          </option>
          <option v-for="produto in produtos" :key="produto.id" :value="String(produto.id)">
            {{ produto.nome }}
          </option>
        </select>
      </label>

      <label v-if="precisaTipoTosa">
        Tipo de Tosa *
        <select v-model="form.tipoTosa">
          <option value="" disabled>Selecione</option>
          <option value="higienica">Higiênica apenas</option>
          <option value="maquina">Máquina (pelo curto uniforme)</option>
          <option value="tesoura">Tesoura (estilizada)</option>
          <option value="indicacao">Não sei, quero indicação da equipe</option>
        </select>
      </label>

      <label>
        Telefone *
        <input v-model="form.telefone" type="tel" placeholder="(00) 00000-0000" />
      </label>

      <label>
        Data e Horário desejado *
        <input v-model="form.dataHora" type="datetime-local" />
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
import AlertaComponent from "@/components/AlertaComponent.vue";
import { buscarProdutos } from "@/services/api";
import { adicionarPedido } from "@/store/pedidos";

export default {
  name: "ConfiguracaoPedidoView",
  components: { AlertaComponent },
  data() {
    return {
      produtos: [],
      carregandoProdutos: true,
      form: {
        nomeCliente: "",
        nomePet: "",
        porte: "",
        produtoId: "",
        tipoTosa: "",
        telefone: "",
        dataHora: "",
        observacoes: "",
      },
      alertaErro: "",
      alertaSucesso: false,
      enviando: false,
    };
  },
  computed: {
    produtoSelecionado() {
      return (
        this.produtos.find((produto) => String(produto.id) === String(this.form.produtoId)) ||
        null
      );
    },
    precisaTipoTosa() {
      return (
        !!this.produtoSelecionado &&
        ["tosa", "banho+tosa"].includes(this.produtoSelecionado.categoria)
      );
    },
    fatorPorte() {
      const fatores = { P: 1.0, M: 1.25, G: 1.55, GG: 1.9 };
      return fatores[this.form.porte] || 1;
    },
    valorEstimado() {
      if (!this.produtoSelecionado) return 0;
      return this.produtoSelecionado.precoBase * this.fatorPorte;
    },
    avisoDiaFechado() {
      if (!this.form.dataHora) return false;
      const dia = new Date(this.form.dataHora).getDay(); // 0 = domingo, 1 = segunda
      return dia === 0 || dia === 1;
    },
  },
  async created() {
    try {
      this.produtos = await buscarProdutos();
    } catch (erro) {
      console.error(erro);
    } finally {
      this.carregandoProdutos = false;
    }

    const produtoQuery = this.$route.query.produtoId;
    if (produtoQuery) {
      this.form.produtoId = String(produtoQuery);
    }
  },
  methods: {
    validar() {
      const faltando = [];
      if (!this.form.nomeCliente.trim()) faltando.push("Nome do Cliente");
      if (!this.form.nomePet.trim()) faltando.push("Nome do Pet");
      if (!this.form.porte) faltando.push("Porte do Pet");
      if (!this.form.produtoId) faltando.push("Serviço");
      if (this.precisaTipoTosa && !this.form.tipoTosa) faltando.push("Tipo de Tosa");
      if (!this.form.telefone.trim()) faltando.push("Telefone");
      if (!this.form.dataHora) faltando.push("Data e Horário");
      return faltando;
    },
    async confirmarAgendamento() {
      const faltando = this.validar();
      if (faltando.length > 0) {
        this.alertaErro = `Preencha os campos obrigatórios: ${faltando.join(", ")}.`;
        this.alertaSucesso = false;
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
        tipoTosa: this.form.tipoTosa || null,
        telefone: this.form.telefone.trim(),
        dataHora: this.form.dataHora,
        observacoes: this.form.observacoes.trim(),
        valor: this.valorEstimado,
      };

      await adicionarPedido(novoPedido);

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
