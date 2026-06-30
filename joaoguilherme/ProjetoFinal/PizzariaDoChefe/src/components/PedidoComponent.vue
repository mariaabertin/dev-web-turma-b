<template>
  <div id="pedido-wrapper">
    <mensagem-component-vue
      :mensagem="textoMensagem"
      :tipo="tipoMensagem"
      :isVisible="exibirMensagem"
    />
    <div id="pedido-hero" :style="{ backgroundImage: pizza ? 'url(' + pizza.foto + ')' : '' }">
      <div id="pedido-hero-overlay">
        <h1>{{ pizza && pizza.nome ? pizza.nome : '--' }}</h1>
        <p>{{ pizza && pizza.descricao ? pizza.descricao : '' }}</p>
      </div>
    </div>

    <form id="pedido-form" @submit="criarPedido($event)">
      <div class="form-secao">
        <h2 class="secao-titulo">Dados do cliente</h2>
        <div class="campo">
          <label>Nome</label>
          <input
            v-model="nomeCliente"
            type="text"
            placeholder="Digite seu nome"
            id="nome-cliente"
          />
        </div>
      </div>

      <div class="form-secao">
        <h2 class="secao-titulo">Tamanho</h2>
        <div class="opcoes-grid">
          <div
            v-for="tamanho in listaTamanhos"
            :key="tamanho.id"
            class="opcao-card"
            :class="{ ativo: tamanhoSelecionado && tamanhoSelecionado.id === tamanho.id }"
            @click="tamanhoSelecionado = tamanho"
          >
            <div class="opcao-info">
              <span class="opcao-label">{{ tamanho.descricao }}</span>
              <span class="opcao-valor-tamanho">R$ {{ valoresTamanho[tamanho.id] }},00</span>
            </div>
          </div>
        </div>
      </div>

      <div class="form-secao">
        <h2 class="secao-titulo">Meio a meio</h2>
        <div class="campo">
          <label>Deseja dividir em dois sabores?</label>
          <select v-model="meioAMeioAtivo" id="meio-a-meio">
            <option :value="false">Não, quero inteira</option>
            <option :value="true">Sim, quero meio a meio</option>
          </select>
        </div>
        <div class="campo" v-if="meioAMeioAtivo">
          <label>Escolha o segundo sabor</label>
          <select v-model="segundaPizzaSelecionada" id="segunda-pizza">
            <option value="">Selecione o segundo sabor</option>
            <option
              v-for="opcao in listaCardapioPizzas"
              :key="opcao.id"
              :value="opcao"
            >
              {{ opcao.nome }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-secao">
        <h2 class="secao-titulo">Borda</h2>
        <div class="opcoes-lista">
          <label
            v-for="borda in listaBordas"
            :key="borda.id"
            class="opcao-check"
          >
            <input
              type="radio"
              name="borda"
              :value="borda"
              v-model="bordaSelecionada"
            />
            <span>{{ borda.nome }}</span>
            <span class="opcao-valor" v-if="borda.valor > 0">+ R$ {{ borda.valor }},00</span>
            <span class="opcao-gratis" v-else>Incluso</span>
          </label>
        </div>
      </div>

      <div class="form-secao">
        <h2 class="secao-titulo">Bebidas</h2>
        <div class="opcoes-lista">
          <label
            v-for="bebida in listaBebidas"
            :key="bebida.id"
            class="opcao-check"
          >
            <input
              type="radio"
              name="bebida"
              :value="bebida"
              v-model="bebidaSelecionada"
            />
            <span>{{ bebida.nome }}</span>
            <span class="opcao-valor" v-if="bebida.valor > 0">+ R$ {{ bebida.valor }},00</span>
            <span class="opcao-gratis" v-else>—</span>
          </label>
        </div>
      </div>

      <div class="form-secao">
        <h2 class="secao-titulo">Pagamento na entrega</h2>
        <div class="opcoes-grid">
          <div
            v-for="forma in formasPagamento"
            :key="forma.id"
            class="opcao-card"
            :class="{ ativo: pagamentoSelecionado && pagamentoSelecionado.id === forma.id }"
            @click="pagamentoSelecionado = forma"
          >
            <span class="opcao-icone">{{ forma.icone }}</span>
            <span class="opcao-label">{{ forma.nome }}</span>
          </div>
        </div>
        <div class="campo" v-if="pagamentoSelecionado && pagamentoSelecionado.id === 4" id="campo-troco">
          <label>Troco para quanto?</label>
          <input
            v-model="valorTroco"
            type="number"
            placeholder="Ex: 100"
            id="troco"
          />
        </div>
      </div>

      <div class="form-secao" id="resumo-total">
        <h2 class="secao-titulo">Resumo do pedido</h2>
        <div class="resumo-linha" v-if="tamanhoSelecionado">
          <span>Pizza ({{ tamanhoSelecionado.descricao }})</span>
          <span>R$ {{ valorPizzaAtual }},00</span>
        </div>
        <div class="resumo-linha" v-if="meioAMeioAtivo && segundaPizzaSelecionada">
          <span>Segundo sabor: {{ segundaPizzaSelecionada.nome }}</span>
          <span>incluso</span>
        </div>
        <div class="resumo-linha" v-if="bordaSelecionada && bordaSelecionada.valor > 0">
          <span>{{ bordaSelecionada.nome }}</span>
          <span>+ R$ {{ bordaSelecionada.valor }},00</span>
        </div>
        <div class="resumo-linha" v-if="bebidaSelecionada && bebidaSelecionada.valor > 0">
          <span>{{ bebidaSelecionada.nome }}</span>
          <span>+ R$ {{ bebidaSelecionada.valor }},00</span>
        </div>
        <div class="resumo-total-linha">
          <span>Total</span>
          <span>R$ {{ valorTotal }},00</span>
        </div>
      </div>

      <div class="form-secao">
        <input type="submit" class="btn-confirmar" value="Confirmar Pedido" />
      </div>
    </form>
  </div>
</template>

<script>
import MensagemComponentVue from "@/components/MensagemComponent.vue";

export default {
  name: "PedidoComponent",
  components: {
    MensagemComponentVue,
  },
  props: {
    pizza: null,
  },
  data() {
    return {
      listaTamanhos: [],
      listaBordas: [],
      listaBebidas: [],
      listaCardapioPizzas: [],
      nomeCliente: "",
      tamanhoSelecionado: null,
      meioAMeioAtivo: false,
      segundaPizzaSelecionada: "",
      bordaSelecionada: null,
      bebidaSelecionada: null,
      pagamentoSelecionado: null,
      valorTroco: "",
      formasPagamento: [
        { id: 1, nome: "Débito", icone: "💳" },
        { id: 2, nome: "Pix", icone: "📲" },
        { id: 3, nome: "Crédito", icone: "💳" },
        { id: 4, nome: "Dinheiro", icone: "💵" },
      ],
      valoresTamanho: { 1: 35, 2: 42, 3: 48, 4: 56 },
      exibirMensagem: false,
      textoMensagem: "",
      tipoMensagem: "",
    };
  },
  computed: {
    valorPizzaAtual() {
      if (!this.tamanhoSelecionado) return 0;
      return this.valoresTamanho[this.tamanhoSelecionado.id] || 0;
    },
    valorTotal() {
      let total = this.valorPizzaAtual;
      if (this.bordaSelecionada) total += this.bordaSelecionada.valor;
      if (this.bebidaSelecionada) total += this.bebidaSelecionada.valor;
      return total;
    },
  },
  methods: {
    async getTamanhos() {
      const response = await fetch(`${this.$apiUrl}/tamanhos`);
      const dados = await response.json();
      this.listaTamanhos = dados;
    },
    async getOpcionais() {
      const response = await fetch(`${this.$apiUrl}/opcionais`);
      const dados = await response.json();
      this.listaBordas = dados.bordas;
      this.listaBebidas = dados.bebidas;
    },
    async getCardapio() {
      const response = await fetch(`${this.$apiUrl}/menu`);
      const dados = await response.json();
      this.listaCardapioPizzas = dados.pizzas;
    },
    mostrarMensagem(texto, tipo) {
      this.textoMensagem = texto;
      this.tipoMensagem = tipo;
      this.exibirMensagem = true;
    },
    async criarPedido(e) {
      e.preventDefault();

      if (!this.nomeCliente) {
        this.mostrarMensagem("Campo obrigatório: informe o seu nome.", "erro");
        return;
      }

      if (!this.tamanhoSelecionado) {
        this.mostrarMensagem("Campo obrigatório: selecione o tamanho da pizza.", "erro");
        return;
      }

      if (this.meioAMeioAtivo && !this.segundaPizzaSelecionada) {
        this.mostrarMensagem("Campo obrigatório: selecione o segundo sabor para o meio a meio.", "erro");
        return;
      }

      if (!this.bordaSelecionada) {
        this.mostrarMensagem("Campo obrigatório: selecione uma opção de borda.", "erro");
        return;
      }

      if (!this.bebidaSelecionada) {
        this.mostrarMensagem("Campo obrigatório: selecione uma opção de bebida.", "erro");
        return;
      }

      if (!this.pagamentoSelecionado) {
        this.mostrarMensagem("Campo obrigatório: selecione a forma de pagamento.", "erro");
        return;
      }

      const dadosPedido = {
        nome: this.nomeCliente,
        tamanho: this.tamanhoSelecionado,
        valorTamanho: this.valorPizzaAtual,
        pizza: this.pizza,
        meioAMeio: this.meioAMeioAtivo,
        segundaPizza: this.meioAMeioAtivo ? this.segundaPizzaSelecionada : null,
        borda: this.bordaSelecionada,
        bebida: this.bebidaSelecionada,
        pagamento: this.pagamentoSelecionado.nome,
        troco: this.pagamentoSelecionado.id === 4 ? this.valorTroco : null,
        total: this.valorTotal,
        statusId: 5,
      };

      const dadosJson = JSON.stringify(dadosPedido);

      await fetch(`${this.$apiUrl}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dadosJson,
      });

      this.mostrarMensagem("Pedido realizado com sucesso!", "sucesso");

      setTimeout(() => {
        this.$router.push({ path: "/pedidos" });
      }, 1500);
    },
  },
  mounted() {
    this.getTamanhos();
    this.getOpcionais();
    this.getCardapio();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Inter:wght@400;500;600&display=swap');

#pedido-wrapper {
  font-family: 'Inter', sans-serif;
  max-width: 720px;
  margin: 0 auto;
  padding-bottom: 60px;
}

#pedido-hero {
  width: 100%;
  height: 260px;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 0 0 24px 24px;
  overflow: hidden;
}

#pedido-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px 32px;
}

#pedido-hero-overlay h1 {
  font-family: 'Playfair Display', serif;
  font-size: 34px;
  color: #fff;
  margin: 0 0 6px;
}

#pedido-hero-overlay p {
  font-size: 14px;
  color: rgba(255,255,255,0.8);
  margin: 0;
  line-height: 1.5;
}

#pedido-form {
  padding: 0 24px;
}

.form-secao {
  margin-top: 36px;
}

.secao-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  color: inherit;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #8b1a1a;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.campo label {
  font-size: 13px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.campo input,
.campo select {
  padding: 12px 16px;
  border: 1.5px solid #374151;
  border-radius: 10px;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s;
  background: inherit;
  color: inherit;
}

.campo input:focus,
.campo select:focus {
  outline: none;
  border-color: #8b1a1a;
}

.opcoes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.opcao-card {
  border: 2px solid #374151;
  border-radius: 12px;
  padding: 14px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: border-color 0.2s, background 0.2s;
}

.opcao-card:hover {
  border-color: #8b1a1a;
}

.opcao-card.ativo {
  border-color: #8b1a1a;
  background: rgba(139,26,26,0.15);
}

.opcao-icone {
  font-size: 20px;
}

.opcao-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.opcao-label {
  font-size: 14px;
  font-weight: 500;
}

.opcao-valor-tamanho {
  font-size: 13px;
  color: #e8c547;
  font-weight: 600;
}

.opcoes-lista {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.opcao-check {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  cursor: pointer;
}

.opcao-check input[type="radio"] {
  width: 18px;
  height: 18px;
  accent-color: #8b1a1a;
  cursor: pointer;
}

.opcao-valor {
  margin-left: auto;
  font-size: 13px;
  font-weight: 600;
  color: #e8c547;
}

.opcao-gratis {
  margin-left: auto;
  font-size: 13px;
  color: #6b7280;
}

#resumo-total {
  background: rgba(139,26,26,0.1);
  border: 1.5px solid #8b1a1a;
  border-radius: 16px;
  padding: 20px 24px;
}

#resumo-total .secao-titulo {
  border-bottom-color: #8b1a1a;
}

.resumo-linha {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 6px 0;
  border-bottom: 1px solid rgba(139,26,26,0.2);
  color: inherit;
}

.resumo-total-linha {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 700;
  padding-top: 12px;
  margin-top: 4px;
  color: #e8c547;
  font-family: 'Playfair Display', serif;
}

#campo-troco {
  margin-top: 16px;
}

.btn-confirmar {
  width: 100%;
  padding: 16px;
  background: #8b1a1a;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;
}

.btn-confirmar:hover {
  background: #5a0f0f;
}
</style>
