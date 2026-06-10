<template>
  <div id="app" :class="temaAtual">

    <!-- Botão de tema -->
    <button class="btn-tema" @click="alternarTema" :aria-label="temaAtual === 'tema-escuro' ? 'Ativar modo claro' : 'Ativar modo escuro'">
      {{ temaAtual === 'tema-escuro' ? '☀️' : '🌙' }}
    </button>

    <header>
      <h1>⚽ Álbum de Figurinhas</h1>
      <p>Seleções Mundiais de Futebol — Copa do Mundo 2026</p>
      <div
        v-if="requisicoeRestantes !== null"
        class="quota"
        :class="{ 'quota-alerta': requisicoeRestantes < 20 }"
        aria-live="polite"
      >
        🔢 Requisições restantes hoje: <strong>{{ requisicoeRestantes }}</strong> / 100
        <span v-if="requisicoeRestantes < 20" class="quota-aviso">⚠️ Quota baixa!</span>
      </div>
    </header>

    <main>
      <!-- ERRO -->
      <div v-if="erro" class="erro" role="alert" aria-live="assertive">
        ⚠️ {{ erro }}
        <button class="btn-voltar-erro" @click="voltar">← Voltar</button>
      </div>

      <!-- TELA 1: Painel de grupos -->
      <template v-if="!selecaoAtiva && !erro">

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
          <img
            v-if="bandeiraSelecionada"
            :src="bandeiraSelecionada"
            :alt="'Bandeira de ' + paisSelecionado"
            class="bandeira-selecionada"
          />
        </section>

        <div v-if="carregandoPaises" class="loading-inicial">
          <div class="spinner" aria-hidden="true"></div>
          <p>Carregando seleções...</p>
        </div>

        <div v-else class="painel-grupos">
          <div
            v-for="grupo in gruposOrdenados"
            :key="grupo.letra"
            class="grupo-bloco"
          >
            <h2 class="grupo-letra">Grupo {{ grupo.letra }}</h2>
            <div class="grupo-selecoes">
              <button
                v-for="selecao in grupo.selecoes"
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
      </template>

      <!-- TELA 2: Elenco da seleção -->
      <template v-if="selecaoAtiva && !erro">
        <!-- Botão voltar -->
        <button class="btn-voltar" @click="voltar" aria-label="Voltar para painel de grupos">
          ← Voltar
        </button>

        <!-- Cabeçalho da seleção -->
        <div class="nome-time">
          <img
            v-if="bandeiraPorName(selecaoAtiva.name)"
            :src="bandeiraPorName(selecaoAtiva.name)"
            :alt="'Bandeira de ' + selecaoAtiva.nomePtBr"
            class="logo-time"
          />
          <h2>🏆 {{ selecaoAtiva.nomePtBr }}</h2>
          <span class="badge-grupo">Grupo {{ selecaoAtiva.grupo }}</span>
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
              <article
                class="card"
                v-for="jogador in grupo.jogadores"
                :key="jogador.id"
                :aria-label="jogador.name + ', ' + grupo.labelPt + ', camisa ' + (jogador.number || 'sem número')"
              >
                <div class="card-numero" aria-hidden="true">#{{ jogador.number || '—' }}</div>
                <div class="card-foto">
                  <img
                    :src="jogador.photo"
                    :alt="'Foto de ' + jogador.name"
                    loading="lazy"
                    @error="imagemFallback"
                  />
                </div>
                <div class="card-info">
                  <p class="card-nome">{{ jogador.name }}</p>
                  <span class="posicao" :class="corPosicao(jogador.position)">
                    {{ traduzirPosicao(jogador.position) }}
                  </span>
                  <p class="idade" v-if="jogador.age">{{ jogador.age }} anos</p>
                </div>
              </article>
            </section>
          </div>
        </TransitionGroup>
      </template>
    </main>
  </div>
</template>

<script>
import {
  SELECOES_COPA_2026,
  ORDEM_POSICOES,
  LABELS_POSICAO,
  CLASSES_POSICAO,
  selecosPorGrupo,
} from './constants/selecoes.js';

import {
  buscarPaises,
  buscarElenco,
  lerQuota,
  interpretarErroApi,
} from './services/footballService.js';

export default {
  name: 'App',

  data() {
    return {
      // Mapa name → flag (preenchido pela API /teams/countries)
      bandeiras: {},
      selecaoAtiva: null,
      jogadores: [],
      carregandoPaises: false,
      carregandoFigurinhas: false,
      erro: '',
      requisicoeRestantes: null,
      temaAtual: 'tema-escuro',
      // Dropdown
      paisSelecionado: '',
      bandeiraSelecionada: '',
    };
  },

  mounted() {
    this.temaAtual = localStorage.getItem('tema') || 'tema-escuro';
    this.carregarBandeiras();
  },

  computed: {
    // Lista ordenada das 48 seleções para o dropdown
    selecoesCopa() {
      return [...SELECOES_COPA_2026].sort((a, b) =>
        a.nomePtBr.localeCompare(b.nomePtBr, 'pt-BR')
      );
    },

    // Grupos ordenados de A a L com suas seleções
    gruposOrdenados() {
      const grupos = selecosPorGrupo();
      return Object.keys(grupos).sort().map(letra => ({
        letra,
        selecoes: grupos[letra],
      }));
    },

    // Agrupa jogadores por posição (padrão Panini)
    jogadoresPorPosicao() {
      return ORDEM_POSICOES
        .map(pos => ({
          posicao:   pos,
          label:     LABELS_POSICAO[pos]?.label || pos,
          labelPt:   LABELS_POSICAO[pos]?.pt    || pos,
          jogadores: this.jogadores.filter(j => j.position === pos),
        }))
        .filter(g => g.jogadores.length > 0);
    },
  },

  methods: {
    alternarTema() {
      this.temaAtual = this.temaAtual === 'tema-escuro' ? 'tema-claro' : 'tema-escuro';
      localStorage.setItem('tema', this.temaAtual);
    },

    // Retorna a bandeira pelo name da API
    bandeiraPorName(name) {
      return this.bandeiras[name] || '';
    },

    // Carrega bandeiras via /teams/countries (1 requisição única)
    async carregarBandeiras() {
      this.carregandoPaises = true;
      try {
        const { dados, headers } = await buscarPaises();
        const quota = lerQuota(headers);
        if (quota !== null) this.requisicoeRestantes = quota;

        if (dados.errors && Object.keys(dados.errors).length > 0) {
          this.erro = interpretarErroApi(dados.errors);
          return;
        }

        // Bandeiras que a API não possui — URLs de fallback externas
        const bandeirasFallback = {
          'Cape-Verde': 'https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Cape_Verde.svg',
          'DR-Congo':   'https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg',
        };

        // Mapa de nomes alternativos na API /teams/countries → name usado no projeto
        const aliasMap = {
          'South-Korea':  'South Korea',
          'Congo-DR':     'DR-Congo',
          'South-Africa': 'South-Africa',
          'Saudi-Arabia': 'Saudi-Arabia',
          'New-Zealand':  'New-Zealand',
          'Ivory-Coast':  'Ivory-Coast',
        };

        // Aplica fallbacks primeiro
        Object.entries(bandeirasFallback).forEach(([key, url]) => {
          this.bandeiras[key] = url;
        });

        const nomesCopa = new Set(SELECOES_COPA_2026.map(s => s.name));
        (dados.response || []).forEach(p => {
          if (nomesCopa.has(p.name) && p.flag) {
            this.bandeiras[p.name] = p.flag;
          }
          const aliasKey = aliasMap[p.name];
          if (aliasKey && p.flag) {
            this.bandeiras[aliasKey] = p.flag;
          }
        });
      } catch (e) {
        console.error('[carregarBandeiras]', e);
      } finally {
        this.carregandoPaises = false;
      }
    },

    // Requisição 2 + 3 disparadas pelo dropdown (fluxo exigido pelo professor)
    async selecionarPorDropdown() {
      if (!this.paisSelecionado) return;

      const selecao = SELECOES_COPA_2026.find(s => s.name === this.paisSelecionado);
      this.bandeiraSelecionada = this.bandeiras[this.paisSelecionado] || '';
      this.selecaoAtiva = selecao;
      this.jogadores = [];
      this.erro = '';
      this.carregandoFigurinhas = true;

      try {
        // Requisição 2: busca o time pelo nome para obter o ID
        const responseTime = await fetch(
          `${process.env.VUE_APP_API_BASE_URL}/teams?name=${encodeURIComponent(this.paisSelecionado)}`,
          { method: 'GET', headers: { 'x-apisports-key': process.env.VUE_APP_API_KEY } }
        );
        const dadosTime = await responseTime.json();

        if (dadosTime.errors && Object.keys(dadosTime.errors).length > 0) {
          this.erro = interpretarErroApi(dadosTime.errors); return;
        }
        if (!dadosTime.response || dadosTime.response.length === 0) {
          this.erro = `Nenhuma seleção encontrada para "${selecao?.nomePtBr}".`; return;
        }

        const timeNacional = dadosTime.response.find(r => r.team.national) || dadosTime.response[0];
        const teamId = timeNacional.team.id;

        // Requisição 3: busca o elenco pelo ID
        const responseElenco = await fetch(
          `${process.env.VUE_APP_API_BASE_URL}/players/squads?team=${teamId}`,
          { method: 'GET', headers: { 'x-apisports-key': process.env.VUE_APP_API_KEY } }
        );
        const dadosElenco = await responseElenco.json();

        const quota = dadosElenco.errors ? null : parseInt(responseElenco.headers.get('x-ratelimit-requests-remaining'), 10);
        if (quota !== null && !isNaN(quota)) this.requisicoeRestantes = quota;

        if (dadosElenco.errors && Object.keys(dadosElenco.errors).length > 0) {
          this.erro = interpretarErroApi(dadosElenco.errors); return;
        }
        if (!dadosElenco.response || dadosElenco.response.length === 0) {
          this.erro = 'Nenhum jogador encontrado para esta seleção.'; return;
        }

        this.jogadores = dadosElenco.response[0].players || [];
      } catch (e) {
        if (e.name !== 'AbortError') {
          console.error('[selecionarPorDropdown]', e);
          this.erro = 'Erro ao buscar figurinhas. Tente novamente.';
        }
      } finally {
        this.carregandoFigurinhas = false;
      }
    },

    // Ao clicar na seleção no painel visual, vai para a tela de elenco
    async selecionarSelecao(selecao) {
      this.selecaoAtiva = selecao;
      this.jogadores = [];
      this.erro = '';
      this.carregandoFigurinhas = true;

      try {
        const { dados, headers } = await buscarElenco(selecao.id, selecao.name);
        const quota = lerQuota(headers);
        if (quota !== null) this.requisicoeRestantes = quota;

        if (dados.errors && Object.keys(dados.errors).length > 0) {
          this.erro = interpretarErroApi(dados.errors);
          return;
        }

        if (!dados.response || dados.response.length === 0) {
          this.erro = `Nenhum jogador encontrado para ${selecao.nomePtBr}.`;
          return;
        }

        this.jogadores = dados.response[0].players || [];
      } catch (e) {
        if (e.name !== 'AbortError') {
          console.error('[selecionarSelecao]', e);
          this.erro = 'Erro ao buscar figurinhas. Tente novamente.';
        }
      } finally {
        this.carregandoFigurinhas = false;
      }
    },

    // Volta para o painel de grupos
    voltar() {
      this.selecaoAtiva = null;
      this.jogadores = [];
      this.erro = '';
    },

    imagemFallback(event) {
      event.target.src = 'https://placehold.co/100x100?text=Sem+Foto';
    },

    corPosicao(posicao) {
      return CLASSES_POSICAO[posicao] || 'pos-default';
    },

    traduzirPosicao(posicao) {
      return LABELS_POSICAO[posicao]?.pt || posicao || 'N/A';
    },
  },
};
</script>

<style scoped>
/* ============================================================
   VARIÁVEIS DE TEMA
   ============================================================ */
.tema-escuro {
  --bg-header:    linear-gradient(135deg, #1a3a5c, #0d2137);
  --bg-card:      linear-gradient(160deg, #1a3a5c, #0d2137);
  --bg-card-foto: #0d2137;
  --bg-grupo:     #0f1f35;
  --bg-selecao:   #1a3a5c;
  --bg-input:     #1a3a5c;
  --border:       #2a5a8c;
  --text-primary: #ffffff;
  --text-muted:   #8ab4d4;
  --text-idade:   #9cc0d8;
  --accent:       #f5c518;
  --erro-bg:      #3d1a1a;
  --erro-border:  #c0392b;
  --erro-text:    #e74c3c;
}

.tema-claro {
  --bg-header:    linear-gradient(135deg, #1a3a5c, #2a5a8c);
  --bg-card:      #ffffff;
  --bg-card-foto: #e8f0f8;
  --bg-grupo:     #e0eaf4;
  --bg-selecao:   #ffffff;
  --bg-input:     #ffffff;
  --border:       #b0c8e0;
  --text-primary: #1a2a3a;
  --text-muted:   #4a6a8a;
  --text-idade:   #3a5a7a;
  --accent:       #d4a000;
  --erro-bg:      #fff0f0;
  --erro-border:  #e74c3c;
  --erro-text:    #c0392b;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

/* ============================================================
   BOTÃO TEMA
   ============================================================ */
.btn-tema {
  position: fixed;
  top: 16px;
  right: 16px;
  background: var(--border);
  border: none;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 100;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-tema:hover { transform: scale(1.1); background: var(--accent); }

/* ============================================================
   HEADER
   ============================================================ */
header {
  text-align: center;
  padding: 40px 20px 30px;
  background: var(--bg-header);
  border-radius: 16px;
  margin-bottom: 30px;
  border: 1px solid var(--border);
}
header h1 { font-size: 2.5rem; font-weight: 800; color: var(--accent); }
header p  { color: var(--text-muted); font-size: 1rem; margin-top: 6px; }


.quota { margin-top: 12px; font-size: 0.8rem; color: var(--text-muted); }
.quota strong { color: var(--accent); }
.quota-alerta, .quota-alerta strong { color: #e74c3c !important; font-weight: 600; }
.quota-aviso { display: inline-block; margin-left: 6px; animation: piscar 1.2s infinite; }
@keyframes piscar { 0%,100%{opacity:1} 50%{opacity:0.4} }

/* ============================================================
   PAINEL DE GRUPOS
   ============================================================ */
/* Dropdown */
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
  border-radius: 10px;
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
.bandeira-selecionada {
  height: 32px;
  border-radius: 4px;
  border: 1px solid var(--border);
}

.painel-grupos {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.grupo-bloco {
  background: var(--bg-grupo);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 20px;
}

.grupo-letra {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.grupo-selecoes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

/* Botão de seleção (bandeira + nome) */
.selecao-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: var(--bg-selecao);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px 10px;
  cursor: pointer;
  transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
  color: var(--text-primary);
}
.selecao-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(245, 197, 24, 0.2);
  border-color: var(--accent);
}

.bandeira-card {
  width: 56px;
  height: 36px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid var(--border);
}

.bandeira-placeholder {
  width: 56px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}

.selecao-nome {
  font-size: 0.78rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.3;
  color: var(--text-primary);
}

/* ============================================================
   BOTÃO VOLTAR
   ============================================================ */
.btn-voltar, .btn-voltar-erro {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--border);
  color: var(--text-primary);
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background 0.2s;
}
.btn-voltar:hover, .btn-voltar-erro:hover { background: var(--accent); color: #0a1628; }
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
.logo-time { width: 48px; height: 32px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border); }
.nome-time h2 { font-size: 1.5rem; color: var(--accent); }
.badge { background: var(--border); color: var(--text-muted); padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; }
.badge-grupo { background: var(--accent); color: #0a1628; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 700; }

/* ============================================================
   GRUPOS DE POSIÇÃO
   ============================================================ */
.grupo-posicao { margin-bottom: 36px; }
.grupo-titulo {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 8px;
}
.grupo-count { font-size: 0.85rem; color: var(--accent); font-weight: 600; }

/* ============================================================
   ALBUM GRID + CARD
   ============================================================ */
.album {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
}

.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 30px rgba(245,197,24,0.2);
  border-color: var(--accent);
}

.card-numero {
  position: absolute;
  top: 8px; left: 8px;
  background: rgba(0,0,0,0.5);
  color: var(--accent);
  font-size: 0.7rem; font-weight: 700;
  padding: 2px 6px; border-radius: 6px;
}

.card-foto { background: var(--bg-card-foto); padding: 20px 16px 8px; }
.card-foto img { width: 100px; height: 100px; object-fit: cover; border-radius: 50%; border: 3px solid var(--border); }

.card-info { padding: 12px; }
.card-nome { font-size: 0.85rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; line-height: 1.3; }

.posicao { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.pos-goleiro  { background: #c0392b; color: #fff; }
.pos-defensor { background: #2980b9; color: #fff; }
.pos-meio     { background: #27ae60; color: #fff; }
.pos-atacante { background: #f39c12; color: #fff; }
.pos-default  { background: #555;    color: #ccc; }

.idade { font-size: 0.75rem; color: var(--text-idade); margin-top: 6px; }

/* ============================================================
   SKELETON LOADING
   ============================================================ */
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
  margin-bottom: 36px;
}
.skeleton-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 20px 16px 16px;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
}
.sk {
  background: linear-gradient(90deg, var(--border) 25%, var(--bg-card-foto) 50%, var(--border) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 6px;
}
.sk-foto   { width: 100px; height: 100px; border-radius: 50%; }
.sk-nome   { width: 80%; height: 14px; }
.sk-posicao{ width: 60%; height: 12px; border-radius: 20px; }
@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

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
   ERRO
   ============================================================ */
.erro {
  background: var(--erro-bg);
  border: 1px solid var(--erro-border);
  color: var(--erro-text);
  padding: 14px 18px;
  border-radius: 10px;
  margin-bottom: 20px;
}

/* ============================================================
   ANIMAÇÃO DE ENTRADA
   ============================================================ */
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.fade-enter-from { opacity: 0; transform: translateY(16px); }
.fade-leave-to   { opacity: 0; transform: translateY(-8px); }

/* ============================================================
   RESPONSIVIDADE MOBILE
   ============================================================ */
@media (max-width: 600px) {
  header h1 { font-size: 1.6rem; }
  .grupo-selecoes { grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); }
  .album, .skeleton-grid { grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; }
  .card-foto img, .sk-foto { width: 80px; height: 80px; }
  .btn-tema { top: 10px; right: 10px; width: 36px; height: 36px; font-size: 1rem; }
}
</style>
