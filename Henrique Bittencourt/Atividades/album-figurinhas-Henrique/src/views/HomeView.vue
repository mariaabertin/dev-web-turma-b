<template>
  <div>
    <QuotaComponent :restantes="requisicoeRestantes" />

    <!-- ERRO -->
    <div v-if="erro" class="erro" role="alert" aria-live="assertive">
      ⚠️ {{ erro }}
    </div>

    <!-- Dropdown conforme requisito do professor -->
    <section class="selector" aria-label="Seleção de país">
      <label for="pais">Escolha uma seleção:</label>
      <select
        id="pais"
        v-model="paisSelecionado"
        @change="selecionarPorDropdown"
        :disabled="carregandoPaises"
        aria-label="Lista de seleções da Copa 2026"
      >
        <option value="" disabled>
          {{ carregandoPaises ? 'Carregando seleções...' : '-- Selecione um país --' }}
        </option>
        <option v-for="selecao in selecoesCopa" :key="selecao.name" :value="selecao.name">
          {{ selecao.nomePtBr }}
        </option>
      </select>
    </section>

    <div v-if="carregandoPaises" class="loading-inicial">
      <div class="spinner" aria-hidden="true"></div>
      <p>Carregando seleções...</p>
    </div>

    <div v-else class="painel-abas">
      <!-- Barra de abas: Grupo A a L -->
      <nav class="abas" role="tablist" aria-label="Grupos da Copa 2026">
        <button
          v-for="grupo in gruposOrdenados"
          :key="grupo.letra"
          class="aba"
          :class="{ 'aba-ativa': grupoAtivo === grupo.letra }"
          role="tab"
          :aria-selected="grupoAtivo === grupo.letra"
          @click="grupoAtivo = grupo.letra"
        >
          {{ grupo.letra }}
        </button>
      </nav>

      <!-- Conteúdo do grupo ativo -->
      <div v-if="grupoAtual" class="grupo-bloco" role="tabpanel">
        <h2 class="grupo-letra">Grupo {{ grupoAtual.letra }}</h2>
        <div class="grupo-selecoes">
          <button
            v-for="selecao in grupoAtual.selecoes"
            :key="selecao.name"
            class="selecao-btn"
            @click="selecionarSelecao(selecao)"
            :aria-label="'Ver elenco de ' + selecao.nomePtBr"
          >
            <img
              v-if="bandeiraPorName(selecao.name)"
              :src="bandeiraPorName(selecao.name)"
              :alt="'Bandeira de ' + selecao.nomePtBr"
              class="bandeira-card"
            />
            <div v-else class="bandeira-placeholder" aria-hidden="true">🏳️</div>
            <span class="selecao-nome">{{ selecao.nomePtBr }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuotaComponent from "@/components/QuotaComponent.vue";
import {
  SELECOES_COPA_2026,
  selecosPorGrupo,
} from "@/constants/selecoes.js";

const BASE_URL = process.env.VUE_APP_API_BASE_URL;
const API_KEY = process.env.VUE_APP_API_KEY;

export default {
  name: "HomeView",
  components: {
    QuotaComponent,
  },

  data() {
    return {
      // Mapa name → flag (preenchido pela API /teams/countries)
      bandeiras: {},
      carregandoPaises: false,
      erro: "",
      requisicoeRestantes: null,
      // Dropdown
      paisSelecionado: "",
      // Aba (grupo) ativa no painel
      grupoAtivo: "A",
    };
  },

  mounted() {
    this.carregarBandeiras();
  },

  computed: {
    // Lista ordenada das 48 seleções para o dropdown
    selecoesCopa() {
      return [...SELECOES_COPA_2026].sort((a, b) =>
        a.nomePtBr.localeCompare(b.nomePtBr, "pt-BR")
      );
    },

    // Grupos ordenados de A a L com suas seleções
    gruposOrdenados() {
      const grupos = selecosPorGrupo();
      return Object.keys(grupos).sort().map((letra) => ({
        letra,
        selecoes: grupos[letra],
      }));
    },

    // Grupo correspondente à aba selecionada
    grupoAtual() {
      return this.gruposOrdenados.find((g) => g.letra === this.grupoAtivo) || null;
    },
  },

  methods: {
    // Retorna a bandeira pelo name da API
    bandeiraPorName(name) {
      return this.bandeiras[name] || "";
    },

    interpretarErroApi(errors) {
      if (errors.requests)  return "⛔ Limite diário de requisições atingido. Tente novamente amanhã.";
      if (errors.rateLimit) return "⏱️ Muitas requisições por minuto. Aguarde alguns segundos e tente novamente.";
      if (errors.token)     return "🔑 Token de API inválido. Verifique sua chave.";
      return "Erro da API: " + JSON.stringify(errors);
    },

    // Requisição 1: carrega bandeiras via /teams/countries
    async carregarBandeiras() {
      this.carregandoPaises = true;
      try {
        const response = await fetch(`${BASE_URL}/teams/countries`, {
          method: "GET",
          headers: { "x-apisports-key": API_KEY },
        });
        const dados = await response.json();

        const quota = parseInt(response.headers.get("x-ratelimit-requests-remaining"), 10);
        if (!isNaN(quota)) this.requisicoeRestantes = quota;

        if (dados.errors && Object.keys(dados.errors).length > 0) {
          this.erro = this.interpretarErroApi(dados.errors);
          return;
        }

        // Bandeiras que a API não possui — URLs de fallback externas
        const bandeirasFallback = {
          "Cape-Verde": "https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Cape_Verde.svg",
          "DR-Congo":   "https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg",
        };

        // Mapa de nomes alternativos na API /teams/countries → name usado no projeto
        const aliasMap = {
          "South-Korea":  "South Korea",
          "Congo-DR":     "DR-Congo",
          "South-Africa": "South-Africa",
          "Saudi-Arabia": "Saudi-Arabia",
          "New-Zealand":  "New-Zealand",
          "Ivory-Coast":  "Ivory-Coast",
        };

        // Aplica fallbacks primeiro
        Object.entries(bandeirasFallback).forEach(([key, url]) => {
          this.bandeiras[key] = url;
        });

        const nomesCopa = new Set(SELECOES_COPA_2026.map((s) => s.name));
        (dados.response || []).forEach((p) => {
          if (nomesCopa.has(p.name) && p.flag) {
            this.bandeiras[p.name] = p.flag;
          }
          const aliasKey = aliasMap[p.name];
          if (aliasKey && p.flag) {
            this.bandeiras[aliasKey] = p.flag;
          }
        });
      } catch (e) {
        console.error("[carregarBandeiras]", e);
        this.erro = "Erro ao carregar seleções. Tente novamente.";
      } finally {
        this.carregandoPaises = false;
      }
    },

    // Navega para a view de elenco passando a seleção via query (padrão do professor)
    irParaElenco(selecao, origem) {
      const dadosSelecao = {
        ...selecao,
        bandeira: this.bandeiraPorName(selecao.name),
        origem,
      };
      const param = JSON.stringify(dadosSelecao);
      const selecaoJson = encodeURIComponent(param);
      this.$router.push({
        path: "/elenco",
        query: { selecao: selecaoJson },
      });
    },

    // Fluxo do dropdown (busca por nome, conforme requisito do professor)
    selecionarPorDropdown() {
      if (!this.paisSelecionado) return;
      const selecao = SELECOES_COPA_2026.find((s) => s.name === this.paisSelecionado);
      if (selecao) this.irParaElenco(selecao, "dropdown");
    },

    // Clique no painel visual (usa o ID já conhecido)
    selecionarSelecao(selecao) {
      this.irParaElenco(selecao, "painel");
    },
  },
};
</script>

<style scoped>
/* ============================================================
   DROPDOWN
   ============================================================ */
.selector {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.selector label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-muted);
  white-space: nowrap;
}
.selector select {
  flex: 1;
  min-width: 220px;
  padding: 12px 16px;
  border-radius: 4px;
  border: 2px solid var(--border);
  background: var(--bg-selecao);
  color: var(--text-primary);
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;
}
.selector select:hover,
.selector select:focus { border-color: var(--accent); }

/* ============================================================
   ABAS DE GRUPOS (A–L)
   ============================================================ */
.painel-abas {
  display: flex;
  flex-direction: column;
}

.abas {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: -1px;
  z-index: 1;
}

.aba {
  background: var(--bg-grupo);
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-bottom: none;
  border-radius: 6px 6px 0 0;
  padding: 10px 18px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
}
.aba:hover { color: var(--text-primary); background: var(--bg-selecao); }
.aba-ativa {
  background: var(--accent);
  color: var(--contraste);
  border-color: var(--accent);
}

.grupo-bloco {
  background: var(--bg-grupo);
  border: 1px solid var(--border);
  border-radius: 0 6px 6px 6px;
  padding: 22px;
}

.grupo-letra {
  font-size: 1.1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent-forte);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--accent);
  display: inline-block;
}

.grupo-selecoes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

/* Botão de seleção (bandeira + nome) — layout horizontal */
.selecao-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  background: var(--bg-selecao);
  border: 1px solid var(--border);
  border-left: 4px solid var(--border);
  border-radius: 4px;
  padding: 12px;
  cursor: pointer;
  transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
  color: var(--text-primary);
  text-align: left;
}
.selecao-btn:hover {
  transform: translateX(4px);
  box-shadow: 0 6px 18px rgba(230, 57, 70, 0.25);
  border-left-color: var(--accent);
}

.bandeira-card {
  width: 44px;
  height: 30px;
  object-fit: cover;
  border-radius: 3px;
  border: 1px solid var(--border);
  flex-shrink: 0;
}

.bandeira-placeholder {
  width: 44px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
}

.selecao-nome {
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-primary);
}

/* ============================================================
   LOADING INICIAL
   ============================================================ */
.loading-inicial { text-align: center; padding: 60px 20px; color: var(--text-muted); }
.spinner {
  width: 48px; height: 48px;
  border: 4px solid var(--border);
  border-top-color: var(--accent);
  animation: spin 0.8s linear infinite;
  border-radius: 50%; margin: 0 auto 16px;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ============================================================
   RESPONSIVIDADE MOBILE
   ============================================================ */
@media (max-width: 600px) {
  .aba { padding: 8px 12px; font-size: 0.85rem; }
  .grupo-selecoes { grid-template-columns: 1fr 1fr; }
}
</style>
