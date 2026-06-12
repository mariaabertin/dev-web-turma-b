<template>
  <div>
    <QuotaComponent :restantes="requisicoeRestantes" />

    <!-- ERRO -->
    <div v-if="erro" class="erro" role="alert" aria-live="assertive">
      ⚠️ {{ erro }}
      <button class="btn-voltar-erro" @click="voltar">← Voltar</button>
    </div>

    <template v-if="selecao && !erro">
      <!-- Botão voltar -->
      <button class="btn-voltar" @click="voltar" aria-label="Voltar para painel de grupos">
        ← Voltar
      </button>

      <!-- Cabeçalho da seleção -->
      <div class="nome-time">
        <img
          v-if="selecao.bandeira"
          :src="selecao.bandeira"
          :alt="'Bandeira de ' + selecao.nomePtBr"
          class="logo-time"
        />
        <h2>🏆 {{ selecao.nomePtBr }}</h2>
        <span class="badge-grupo">Grupo {{ selecao.grupo }}</span>
        <span class="badge" v-if="jogadores.length">{{ jogadores.length }} jogadores</span>
      </div>

      <!-- Skeleton loading -->
      <div v-if="carregandoFigurinhas" class="skeleton-grid" role="status" aria-label="Carregando jogadores">
        <div class="skeleton-card" v-for="n in 11" :key="n">
          <div class="sk sk-foto"></div>
          <div class="sk sk-nome"></div>
          <div class="sk sk-posicao"></div>
        </div>
      </div>

      <!-- Grupos de posição -->
      <TransitionGroup name="fade" tag="div" v-if="!carregandoFigurinhas">
        <div
          v-for="grupo in jogadoresPorPosicao"
          :key="grupo.posicao"
          class="grupo-posicao"
        >
          <h3 class="grupo-titulo">
            {{ grupo.label }}
            <span class="grupo-count">({{ grupo.jogadores.length }})</span>
          </h3>
          <section class="album" :aria-label="grupo.label">
            <FigurinhaComponent
              v-for="jogador in grupo.jogadores"
              :key="jogador.id"
              :jogador="jogador"
              :posicaoPt="grupo.labelPt"
              :classePosicao="classePosicao(jogador.position)"
            />
          </section>
        </div>
      </TransitionGroup>
    </template>
  </div>
</template>

<script>
import QuotaComponent from "@/components/QuotaComponent.vue";
import FigurinhaComponent from "@/components/FigurinhaComponent.vue";
import {
  ORDEM_POSICOES,
  LABELS_POSICAO,
  CLASSES_POSICAO,
} from "@/constants/selecoes.js";

const BASE_URL = process.env.VUE_APP_API_BASE_URL;
const API_KEY = process.env.VUE_APP_API_KEY;

export default {
  name: "ElencoView",
  components: {
    QuotaComponent,
    FigurinhaComponent,
  },

  data() {
    return {
      selecao: null,
      jogadores: [],
      carregandoFigurinhas: false,
      erro: "",
      requisicoeRestantes: null,
    };
  },

  mounted() {
    // Recebe a seleção via query da rota (padrão do professor)
    const selecaoJson = this.$route.query.selecao;
    if (!selecaoJson) {
      this.voltar();
      return;
    }
    try {
      this.selecao = JSON.parse(decodeURIComponent(selecaoJson));
    } catch (e) {
      console.error("[ElencoView] query inválida", e);
      this.voltar();
      return;
    }
    this.buscarElenco();
  },

  computed: {
    // Agrupa jogadores por posição (padrão Panini)
    jogadoresPorPosicao() {
      return ORDEM_POSICOES
        .map((pos) => ({
          posicao:   pos,
          label:     LABELS_POSICAO[pos]?.label || pos,
          labelPt:   LABELS_POSICAO[pos]?.pt    || pos,
          jogadores: this.jogadores.filter((j) => j.position === pos),
        }))
        .filter((g) => g.jogadores.length > 0);
    },
  },

  methods: {
    classePosicao(posicao) {
      return CLASSES_POSICAO[posicao] || "pos-default";
    },

    interpretarErroApi(errors) {
      if (errors.requests)  return "⛔ Limite diário de requisições atingido. Tente novamente amanhã.";
      if (errors.rateLimit) return "⏱️ Muitas requisições por minuto. Aguarde alguns segundos e tente novamente.";
      if (errors.token)     return "🔑 Token de API inválido. Verifique sua chave.";
      return "Erro da API: " + JSON.stringify(errors);
    },

    lerQuota(response) {
      const quota = parseInt(response.headers.get("x-ratelimit-requests-remaining"), 10);
      if (!isNaN(quota)) this.requisicoeRestantes = quota;
    },

    // Busca o elenco. Se veio do dropdown, primeiro busca o time pelo nome
    // (requisito do professor); se veio do painel, usa o ID já conhecido.
    async buscarElenco() {
      this.carregandoFigurinhas = true;
      this.erro = "";

      // Cache no sessionStorage para economizar quota
      const cached = sessionStorage.getItem(`elenco_${this.selecao.name}`);
      if (cached) {
        this.jogadores = JSON.parse(cached);
        this.carregandoFigurinhas = false;
        return;
      }

      try {
        let teamId = this.selecao.id;

        // Requisição 2: busca o time pelo nome para obter o ID (fluxo do dropdown)
        if (this.selecao.origem === "dropdown") {
          const responseTime = await fetch(
            `${BASE_URL}/teams?name=${encodeURIComponent(this.selecao.name)}`,
            { method: "GET", headers: { "x-apisports-key": API_KEY } }
          );
          const dadosTime = await responseTime.json();
          this.lerQuota(responseTime);

          if (dadosTime.errors && Object.keys(dadosTime.errors).length > 0) {
            this.erro = this.interpretarErroApi(dadosTime.errors); return;
          }
          if (!dadosTime.response || dadosTime.response.length === 0) {
            this.erro = `Nenhuma seleção encontrada para "${this.selecao.nomePtBr}".`; return;
          }

          const timeNacional = dadosTime.response.find((r) => r.team.national) || dadosTime.response[0];
          teamId = timeNacional.team.id;
        }

        // Requisição 3: busca o elenco pelo ID
        const responseElenco = await fetch(
          `${BASE_URL}/players/squads?team=${teamId}`,
          { method: "GET", headers: { "x-apisports-key": API_KEY } }
        );
        const dadosElenco = await responseElenco.json();
        this.lerQuota(responseElenco);

        if (dadosElenco.errors && Object.keys(dadosElenco.errors).length > 0) {
          this.erro = this.interpretarErroApi(dadosElenco.errors); return;
        }
        if (!dadosElenco.response || dadosElenco.response.length === 0) {
          this.erro = `Nenhum jogador encontrado para ${this.selecao.nomePtBr}.`; return;
        }

        this.jogadores = dadosElenco.response[0].players || [];
        sessionStorage.setItem(`elenco_${this.selecao.name}`, JSON.stringify(this.jogadores));
      } catch (e) {
        console.error("[buscarElenco]", e);
        this.erro = "Erro ao buscar figurinhas. Tente novamente.";
      } finally {
        this.carregandoFigurinhas = false;
      }
    },

    // Volta para o painel de grupos
    voltar() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* ============================================================
   BOTÃO VOLTAR — estilo outline
   ============================================================ */
.btn-voltar, .btn-voltar-erro {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  color: var(--accent-forte);
  border: 2px solid var(--accent);
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background 0.2s, color 0.2s;
}
.btn-voltar:hover, .btn-voltar-erro:hover { background: var(--accent); color: var(--contraste); }
.btn-voltar-erro { margin-top: 12px; display: block; }

/* ============================================================
   NOME DO TIME
   ============================================================ */
.nome-time {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.logo-time { width: 48px; height: 32px; object-fit: cover; border-radius: 3px; border: 1px solid var(--border); }
.nome-time h2 { font-size: 1.5rem; color: var(--accent-forte); text-transform: uppercase; letter-spacing: 0.5px; }
.badge { background: var(--border); color: var(--text-muted); padding: 4px 12px; border-radius: 4px; font-size: 0.85rem; }
.badge-grupo { background: var(--accent); color: var(--contraste); padding: 4px 12px; border-radius: 4px; font-size: 0.85rem; font-weight: 700; }

/* ============================================================
   GRUPOS DE POSIÇÃO
   ============================================================ */
.grupo-posicao { margin-bottom: 36px; }
.grupo-titulo {
  font-size: 1.05rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  margin-bottom: 14px;
  padding-left: 10px;
  border-left: 4px solid var(--accent);
  display: flex;
  align-items: center;
  gap: 8px;
}
.grupo-count { font-size: 0.85rem; color: var(--accent-forte); font-weight: 600; }

/* ============================================================
   ALBUM GRID
   ============================================================ */
.album {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 18px;
}

/* ============================================================
   SKELETON LOADING
   ============================================================ */
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 18px;
  margin-bottom: 36px;
}
.skeleton-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-top: 4px solid var(--accent);
  border-radius: 6px;
  padding: 20px 16px 16px;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
}
.sk {
  background: linear-gradient(90deg, var(--border) 25%, var(--bg-card-foto) 50%, var(--border) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 4px;
}
.sk-foto   { width: 100px; height: 100px; border-radius: 8px; }
.sk-nome   { width: 80%; height: 14px; }
.sk-posicao{ width: 60%; height: 12px; }
@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

/* ============================================================
   RESPONSIVIDADE MOBILE
   ============================================================ */
@media (max-width: 600px) {
  .album, .skeleton-grid { grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; }
  .sk-foto { width: 80px; height: 80px; }
}
</style>
