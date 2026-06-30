<template>
  <div class="config-wrap">
    <!-- Nenhuma pizza escolhida -->
    <div v-if="!pizza" class="sem-pizza">
      <AlertaComponent
        tipo="aviso"
        titulo="Nenhuma pizza selecionada"
        mensagem="Volte ao cardápio e escolha um sabor para montar o seu pedido."
        :fechavel="false"
      />
      <router-link to="/menu" class="btn-secundario">Ir para o cardápio</router-link>
    </div>

    <form v-else id="pedido-form" @submit="criarPedido($event)" novalidate>
      <!-- Cabeçalho com a pizza escolhida -->
      <div class="pizza-escolhida" :style="{ backgroundImage: `url('${pizza.foto}')` }">
        <div class="pizza-escolhida-overlay">
          <span class="pizza-escolhida-rotulo">Sua pizza</span>
          <h2 class="pizza-escolhida-nome">{{ pizza.nome }}</h2>
        </div>
      </div>

      <!-- Alerta de validação / status -->
      <AlertaComponent
        v-if="alerta.visivel"
        :tipo="alerta.tipo"
        :titulo="alerta.titulo"
        :mensagem="alerta.mensagem"
        @fechar="alerta.visivel = false"
      />

      <!-- Nome do cliente -->
      <div class="campo">
        <label for="nome-cliente">Nome <span class="obrig">*</span></label>
        <input
          id="nome-cliente"
          v-model="nomeCliente"
          type="text"
          placeholder="Para quem é o pedido?"
          :class="{ 'campo-erro': erros.nome }"
        />
      </div>

      <!-- Massa / borda -->
      <div class="campo">
        <label for="massa">Massa e borda <span class="obrig">*</span></label>
        <select id="massa" v-model="massaSelecionada" :class="{ 'campo-erro': erros.massa }">
          <option value="">Escolha a massa</option>
          <option v-for="massa in listaMassas" :key="massa.id" :value="massa">
            {{ massa.descricao }}
          </option>
        </select>
      </div>

      <!-- Tamanho -->
      <div class="campo">
        <label for="tamanho">Tamanho <span class="obrig">*</span></label>
        <select id="tamanho" v-model="tamanhoSelecionado" :class="{ 'campo-erro': erros.tamanho }">
          <option value="">Escolha o tamanho</option>
          <option v-for="t in listaTamanhos" :key="t.id" :value="t">
            {{ t.descricao }} ({{ t.fatias }} fatias)
          </option>
        </select>
      </div>

      <!-- Meio a meio -->
      <div class="campo">
        <label class="check-linha">
          <input type="checkbox" v-model="meioAMeio" @change="aoTrocarMeioAMeio" />
          <span>Quero <strong>meio a meio</strong> (dois sabores na mesma pizza)</span>
        </label>

        <transition name="fade">
          <div v-if="meioAMeio" class="segundo-sabor">
            <label for="segundo-sabor">Segundo sabor <span class="obrig">*</span></label>
            <select id="segundo-sabor" v-model="segundoSabor" :class="{ 'campo-erro': erros.segundoSabor }">
              <option value="">Escolha o outro sabor</option>
              <option
                v-for="sabor in saboresDisponiveis"
                :key="sabor.id"
                :value="sabor"
              >
                {{ sabor.nome }}
              </option>
            </select>
            <p class="dica">No meio a meio, vale o valor do sabor mais caro entre os dois.</p>
          </div>
        </transition>
      </div>

      <!-- Adicionais -->
      <div class="campo">
        <label>Adicionais</label>
        <p class="dica">Turbine a sua pizza (opcional).</p>
        <div class="opcionais-grid">
          <label v-for="c in listaComplementos" :key="c.id" class="opcional">
            <input type="checkbox" :value="c" v-model="listaComplementosSelecionados" />
            <span class="opcional-nome">{{ c.nome }}</span>
            <span class="opcional-preco">+ {{ formatPreco(c.valor) }}</span>
          </label>
        </div>
      </div>

      <!-- Bebidas -->
      <div class="campo">
        <label>Bebidas</label>
        <p class="dica">Para acompanhar (opcional).</p>
        <div class="opcionais-grid">
          <label v-for="b in listaBebidas" :key="b.id" class="opcional">
            <input type="checkbox" :value="b" v-model="listaBebidasSelecionadas" />
            <span class="opcional-nome">{{ b.nome }}</span>
            <span class="opcional-preco">+ {{ formatPreco(b.valor) }}</span>
          </label>
        </div>
      </div>

      <!-- Total + enviar -->
      <div class="rodape-form">
        <div class="total">
          <span>Total do pedido</span>
          <strong>{{ formatPreco(valorTotal) }}</strong>
        </div>
        <button type="submit" class="btn-confirmar" :disabled="enviando">
          {{ enviando ? "Enviando..." : "Confirmar pedido" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { API_URL } from "@/config";
import AlertaComponent from "@/components/AlertaComponent.vue";

export default {
  name: "PedidoComponent",
  components: { AlertaComponent },
  props: {
    pizza: { type: Object, default: null },
  },
  data() {
    return {
      listaMassas: [],
      listaComplementos: [],
      listaBebidas: [],
      listaSabores: [],
      listaTamanhos: [
        { id: 1, descricao: "Broto", fatias: 4, fator: 0.75 },
        { id: 2, descricao: "Média", fatias: 6, fator: 1 },
        { id: 3, descricao: "Grande", fatias: 8, fator: 1.3 },
        { id: 4, descricao: "Família", fatias: 12, fator: 1.7 },
      ],
      nomeCliente: "",
      massaSelecionada: "",
      tamanhoSelecionado: "",
      meioAMeio: false,
      segundoSabor: "",
      listaComplementosSelecionados: [],
      listaBebidasSelecionadas: [],
      erros: {},
      enviando: false,
      alerta: { visivel: false, tipo: "info", titulo: "", mensagem: "" },
    };
  },
  computed: {
    fatorTamanho() {
      return this.tamanhoSelecionado ? this.tamanhoSelecionado.fator : 1;
    },
    precoBase() {
      if (!this.pizza) return 0;
      if (this.meioAMeio && this.segundoSabor) {
        return Math.max(this.pizza.valor, this.segundoSabor.valor);
      }
      return this.pizza.valor;
    },
    valorTotal() {
      const adicionais = [
        ...this.listaComplementosSelecionados,
        ...this.listaBebidasSelecionadas,
      ].reduce((soma, item) => soma + (item.valor || 0), 0);
      return this.precoBase * this.fatorTamanho + adicionais;
    },
    // não deixa escolher o mesmo sabor dos dois lados
    saboresDisponiveis() {
      if (!this.pizza) return this.listaSabores;
      return this.listaSabores.filter((s) => s.id !== this.pizza.id);
    },
  },
  methods: {
    async getMassas() {
      try {
        const res = await fetch(`${API_URL}/tipos_pontos`);
        this.listaMassas = await res.json();
      } catch (e) {
        this.mostrarAlerta("erro", "Não foi possível carregar as massas.", "Erro de conexão");
      }
    },
    async getOpcionais() {
      try {
        const res = await fetch(`${API_URL}/opcionais`);
        const dados = await res.json();
        this.listaComplementos = dados.complemento || [];
        this.listaBebidas = dados.bebidas || [];
      } catch (e) {
        this.mostrarAlerta("erro", "Não foi possível carregar os adicionais.", "Erro de conexão");
      }
    },
    async getSabores() {
      try {
        const res = await fetch(`${API_URL}/menu`);
        const dados = await res.json();
        this.listaSabores = dados.pizzas || dados.burgues || [];
      } catch (e) {
        // o meio a meio fica indisponível, mas o pedido normal continua
        this.listaSabores = [];
      }
    },
    aoTrocarMeioAMeio() {
      if (!this.meioAMeio) {
        this.segundoSabor = "";
        this.erros.segundoSabor = false;
      }
    },
    formatPreco(valor) {
      const n = Number(valor || 0);
      return "R$ " + n.toFixed(2).replace(".", ",");
    },
    mostrarAlerta(tipo, mensagem, titulo = "") {
      this.alerta = { visivel: true, tipo, titulo, mensagem };
    },
    validar() {
      const faltando = [];
      this.erros = {};

      if (!this.nomeCliente.trim()) {
        this.erros.nome = true;
        faltando.push("Informe o nome do cliente.");
      }
      if (!this.massaSelecionada) {
        this.erros.massa = true;
        faltando.push("Escolha a massa e a borda.");
      }
      if (!this.tamanhoSelecionado) {
        this.erros.tamanho = true;
        faltando.push("Escolha o tamanho da pizza.");
      }
      if (this.meioAMeio && !this.segundoSabor) {
        this.erros.segundoSabor = true;
        faltando.push("Escolha o segundo sabor do meio a meio.");
      }
      return faltando;
    },
    async criarPedido(e) {
      e.preventDefault();

      const faltando = this.validar();
      if (faltando.length > 0) {
        this.mostrarAlerta("erro", faltando, "Confira o pedido antes de confirmar");
        this.scrollTopo();
        return;
      }

      const dadosPedido = {
        nome: this.nomeCliente.trim(),
        ponto: this.massaSelecionada,
        tamanho: this.tamanhoSelecionado,
        meioAMeio: this.meioAMeio,
        segundoSabor: this.meioAMeio ? this.segundoSabor : null,
        bebidas: Array.from(this.listaBebidasSelecionadas),
        complemento: Array.from(this.listaComplementosSelecionados),
        burguer: this.pizza,
        valor: this.valorTotal,
        statusId: 1,
      };

      this.enviando = true;
      try {
        const res = await fetch(`${API_URL}/pedidos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosPedido),
        });
        if (!res.ok) throw new Error("Falha ao enviar");

        this.mostrarAlerta(
          "sucesso",
          "Pedido confirmado! Estamos te levando para o acompanhamento...",
          "Tudo certo"
        );
        this.scrollTopo();
        // Redirecionamento inteligente para a tela de pedidos
        setTimeout(() => {
          this.$router.push("/pedidos");
        }, 1200);
      } catch (err) {
        this.mostrarAlerta(
          "erro",
          "Não conseguimos enviar o seu pedido. Verifique a conexão e tente novamente.",
          "Erro ao confirmar"
        );
        this.enviando = false;
      }
    },
    scrollTopo() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  mounted() {
    this.getMassas();
    this.getOpcionais();
    this.getSabores();
  },
};
</script>

<style scoped>
.config-wrap { max-width: 640px; margin: 0 auto; }

.sem-pizza { text-align: center; }

#pedido-form {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 0 0 26px;
  overflow: hidden;
}

/* Cabeçalho da pizza */
.pizza-escolhida {
  height: 190px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
}
.pizza-escolhida-overlay {
  width: 100%;
  padding: 18px 24px;
  background: linear-gradient(0deg, rgba(43, 26, 20, 0.82) 0%, rgba(43, 26, 20, 0) 100%);
}
.pizza-escolhida-rotulo {
  color: #f4c545;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 11px;
  font-weight: 600;
}
.pizza-escolhida-nome {
  color: #fff;
  margin: 2px 0 0;
  font-size: 30px;
}

.campo {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 18px 24px 0;
}

.campo > label {
  font-weight: 600;
  font-size: 15px;
  color: var(--ink);
  padding-left: 12px;
  border-left: 4px solid var(--brand);
  margin-bottom: 10px;
}

.obrig { color: var(--brand); }

.dica { color: var(--muted); font-size: 13px; margin: -4px 0 10px; }

input[type="text"],
select {
  width: 100%;
  padding: 13px 14px;
  border: 1.5px solid var(--line);
  border-radius: 10px;
  font-size: 15px;
  background: #fff;
  color: var(--ink);
  transition: border-color 0.2s;
}
input[type="text"]:focus,
select:focus { border-color: var(--brand); }

.campo-erro { border-color: var(--erro-bd) !important; background: var(--erro-bg); }

.check-linha {
  display: flex !important;
  align-items: center;
  gap: 10px;
  border-left: none !important;
  padding-left: 0 !important;
  font-weight: 500 !important;
  cursor: pointer;
}
.check-linha input { width: 18px; height: 18px; accent-color: var(--brand); }

.segundo-sabor {
  margin-top: 12px;
  padding: 14px;
  background: var(--cream);
  border: 1px dashed var(--line);
  border-radius: 10px;
}
.segundo-sabor label {
  display: block;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
}

.opcionais-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}
.opcional {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 13px;
  border: 1.5px solid var(--line);
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
.opcional:hover { border-color: var(--brand); }
.opcional input { width: 17px; height: 17px; accent-color: var(--brand); }
.opcional-nome { flex: 1; font-size: 14px; font-weight: 500; }
.opcional-preco { font-size: 13px; color: var(--basil); font-weight: 600; }

.rodape-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin: 24px 24px 0;
  padding-top: 20px;
  border-top: 1px solid var(--line);
}
.total { display: flex; flex-direction: column; text-align: left; }
.total span { font-size: 13px; color: var(--muted); }
.total strong { font-family: var(--display); font-size: 28px; color: var(--brand); }

.btn-confirmar {
  background: var(--brand);
  color: #fff;
  border: none;
  font-weight: 700;
  font-size: 16px;
  padding: 15px 30px;
  border-radius: 999px;
  cursor: pointer;
  flex: 1;
  min-width: 200px;
  transition: background 0.2s, transform 0.2s;
}
.btn-confirmar:hover:not(:disabled) { background: var(--brand-dark); transform: translateY(-2px); }
.btn-confirmar:disabled { opacity: 0.6; cursor: progress; }

.btn-secundario {
  display: inline-block;
  margin-top: 12px;
  background: var(--brand);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  padding: 12px 26px;
  border-radius: 999px;
}
.btn-secundario:hover { background: var(--brand-dark); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s, transform 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }

@media (max-width: 560px) {
  .rodape-form { flex-direction: column; align-items: stretch; }
  .btn-confirmar { width: 100%; }
}
</style>
