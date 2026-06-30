<template>
  <div id="app">
    <header class="cabecalho">
      <h1>⚽ Copa do Mundo 2026</h1>
      <p>Álbum de Figurinhas</p>
      <small v-if="requisicoesRestantes !== null" class="quota-info">
        requisições restantes: {{ requisicoesRestantes }}/100
      </small>
    </header>

    <main class="pagina">
      <div v-if="erro" class="caixa-erro">
        <p>{{ erro }}</p>
        <button @click="voltar">← Voltar</button>
      </div>

      <!-- painel de grupos -->
      <template v-if="!selecaoAtiva && !erro">
        <div class="barra-filtro">
          <label for="select-pais">Buscar seleção:</label>
          <select id="select-pais" v-model="paisSelecionado" @change="selecionarPorDropdown">
            <option value="" disabled>-- escolha um país --</option>
            <option v-for="s in selecoesCopa" :key="s.name" :value="s.name">
              {{ s.nomePtBr }}
            </option>
          </select>
        </div>

        <p v-if="carregandoPaises" class="txt-carregando">Carregando seleções...</p>

        <div v-else class="grupos">
          <div v-for="g in gruposOrdenados" :key="g.letra" class="bloco-grupo">
            <h2 class="titulo-grupo">Grupo {{ g.letra }}</h2>
            <div class="grade-paises">
              <button
                v-for="s in g.selecoes"
                :key="s.name"
                class="card-pais"
                @click="selecionarSelecao(s)"
              >
                <img
                  v-if="bandeiraPorName(s.name)"
                  :src="bandeiraPorName(s.name)"
                  :alt="s.nomePtBr"
                  class="bandeira"
                  @error="$event.target.style.display='none'"
                />
                <div v-else class="bandeira-vazia">🏳️</div>
                <span>{{ s.nomePtBr }}</span>
              </button>
            </div>
          </div>
        </div>
      </template>

      <!-- elenco da seleção -->
      <template v-if="selecaoAtiva && !erro">
        <div class="topo-elenco">
          <button class="btn-voltar" @click="voltar">← Voltar</button>
          <img
            v-if="bandeiraPorName(selecaoAtiva.name)"
            :src="bandeiraPorName(selecaoAtiva.name)"
            :alt="selecaoAtiva.nomePtBr"
            class="bandeira-grande"
            @error="$event.target.style.display='none'"
          />
          <div class="info-selecao">
            <h2>{{ selecaoAtiva.nomePtBr }}</h2>
            <div class="tags">
              <span class="tag-grupo">Grupo {{ selecaoAtiva.grupo }}</span>
              <span v-if="jogadores.length" class="tag-total">{{ jogadores.length }} jogadores</span>
            </div>
          </div>
        </div>

        <div v-if="carregandoFigurinhas" class="carregando">
          <div class="spinner"></div>
          <p>Carregando elenco...</p>
        </div>

        <div v-else>
          <div v-for="g in jogadoresPorPosicao" :key="g.posicao" class="bloco-posicao">
            <h3 class="titulo-posicao">
              {{ g.label }}
              <span class="contador">{{ g.jogadores.length }}</span>
            </h3>
            <div class="grade-figurinhas">
              <div class="figurinha" v-for="j in g.jogadores" :key="j.id">
                <div class="figurinha-topo" :class="corPosicao(j.position)">
                  <span class="num-camisa">#{{ j.number || '—' }}</span>
                  <span class="label-posicao">{{ traduzirPosicao(j.position) }}</span>
                </div>
                <div class="figurinha-foto">
                  <img :src="j.photo" :alt="j.name" @error="imagemFallback" loading="lazy" />
                </div>
                <div class="figurinha-dados">
                  <p class="nome-jogador">{{ j.name }}</p>
                  <p v-if="j.age" class="idade-jogador">{{ j.age }} anos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      bandeiras: {},
      selecaoAtiva: null,
      jogadores: [],
      carregandoPaises: false,
      carregandoFigurinhas: false,
      erro: '',
      requisicoesRestantes: null,
      paisSelecionado: '',
    };
  },

  mounted() {
    this.carregarBandeiras();
  },

  computed: {
    selecoesCopa() {
      return [...SELECOES_COPA_2026].sort((a, b) =>
        a.nomePtBr.localeCompare(b.nomePtBr, 'pt-BR')
      );
    },

    gruposOrdenados() {
      const grupos = selecosPorGrupo();
      return Object.keys(grupos).sort().map(letra => ({
        letra,
        selecoes: grupos[letra],
      }));
    },

    jogadoresPorPosicao() {
      return ORDEM_POSICOES
        .map(pos => ({
          posicao: pos,
          label: LABELS_POSICAO[pos]?.label || pos,
          jogadores: this.jogadores.filter(j => j.position === pos),
        }))
        .filter(g => g.jogadores.length > 0);
    },
  },

  methods: {
    bandeiraPorName(name) {
      return this.bandeiras[name] || '';
    },

    async carregarBandeiras() {
      this.carregandoPaises = true;
      try {
        const { dados, headers } = await buscarPaises();
        const quota = lerQuota(headers);
        if (quota !== null) this.requisicoesRestantes = quota;

        if (dados.errors && Object.keys(dados.errors).length > 0) {
          this.erro = interpretarErroApi(dados.errors);
          return;
        }

        const aliasMap = {
          'South-Korea': 'South Korea',
          'Congo-DR': 'DR-Congo',
        };

        const flagUrl = (p) =>
          p.code ? `https://flagcdn.com/w80/${p.code.toLowerCase()}.png` : '';

        const nomesCopa = new Set(SELECOES_COPA_2026.map(s => s.name));
        (dados.response || []).forEach(p => {
          const url = flagUrl(p);
          if (!url) return;
          if (nomesCopa.has(p.name)) {
            this.bandeiras[p.name] = url;
          }
          const aliasKey = aliasMap[p.name];
          if (aliasKey) {
            this.bandeiras[aliasKey] = url;
          }
        });
      } catch (e) {
        console.error('[carregarBandeiras]', e);
      } finally {
        this.carregandoPaises = false;
      }
    },

    async selecionarPorDropdown() {
      if (!this.paisSelecionado) return;

      const selecao = SELECOES_COPA_2026.find(s => s.name === this.paisSelecionado);
      this.selecaoAtiva = selecao;
      this.jogadores = [];
      this.erro = '';
      this.carregandoFigurinhas = true;

      try {
        // Requisição 2: descobre o ID da seleção pelo nome
        const resTime = await fetch(
          `${process.env.VUE_APP_API_BASE_URL}/teams?name=${encodeURIComponent(this.paisSelecionado)}`,
          { method: 'GET', headers: { 'x-apisports-key': process.env.VUE_APP_API_KEY } }
        );
        const dadosTime = await resTime.json();

        if (dadosTime.errors && Object.keys(dadosTime.errors).length > 0) {
          this.erro = interpretarErroApi(dadosTime.errors);
          return;
        }
        if (!dadosTime.response || dadosTime.response.length === 0) {
          this.erro = `Nenhuma seleção encontrada para "${selecao?.nomePtBr}".`;
          return;
        }

        const timeNacional = dadosTime.response.find(r => r.team.national) || dadosTime.response[0];
        const teamId = timeNacional.team.id;

        // Requisição 3: busca o elenco com o ID descoberto
        const resElenco = await fetch(
          `${process.env.VUE_APP_API_BASE_URL}/players/squads?team=${teamId}`,
          { method: 'GET', headers: { 'x-apisports-key': process.env.VUE_APP_API_KEY } }
        );
        const dadosElenco = await resElenco.json();

        const quota = lerQuota(resElenco.headers);
        if (quota !== null) this.requisicoesRestantes = quota;

        if (dadosElenco.errors && Object.keys(dadosElenco.errors).length > 0) {
          this.erro = interpretarErroApi(dadosElenco.errors);
          return;
        }
        if (!dadosElenco.response || dadosElenco.response.length === 0) {
          this.erro = 'Nenhum jogador encontrado para esta seleção.';
          return;
        }

        this.jogadores = dadosElenco.response[0].players || [];
      } catch (e) {
        console.error('[selecionarPorDropdown]', e);
        this.erro = 'Erro ao buscar figurinhas. Tente novamente.';
      } finally {
        this.carregandoFigurinhas = false;
      }
    },

    async selecionarSelecao(selecao) {
      this.selecaoAtiva = selecao;
      this.jogadores = [];
      this.erro = '';
      this.carregandoFigurinhas = true;

      try {
        const { dados, headers } = await buscarElenco(selecao.id, selecao.name);
        const quota = lerQuota(headers);
        if (quota !== null) this.requisicoesRestantes = quota;

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
          this.erro = 'Erro ao buscar jogadores. Tente novamente.';
        }
      } finally {
        this.carregandoFigurinhas = false;
      }
    },

    voltar() {
      this.selecaoAtiva = null;
      this.jogadores = [];
      this.erro = '';
      this.paisSelecionado = '';
    },

    imagemFallback(event) {
      event.target.onerror = null;
      event.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='88'%3E%3Crect width='88' height='88' fill='%23e5e7eb'/%3E%3Ctext x='44' y='50' text-anchor='middle' font-size='11' fill='%236b7280' font-family='sans-serif'%3ES%2FF%3C/text%3E%3C/svg%3E";
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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.cabecalho {
  background: linear-gradient(135deg, #15803d, #065f46);
  color: white;
  padding: 28px 20px 22px;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 28px;
}

.cabecalho h1 {
  font-size: 2rem;
  font-weight: 800;
}

.cabecalho p {
  font-size: 0.95rem;
  opacity: 0.8;
  margin-top: 4px;
}

.quota-info {
  display: block;
  margin-top: 10px;
  font-size: 0.75rem;
  opacity: 0.65;
}

.pagina {
  padding: 0 4px;
}

.caixa-erro {
  background: #fee2e2;
  border: 1px solid #fca5a5;
  color: #b91c1c;
  padding: 14px 18px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.caixa-erro button {
  display: inline-block;
  margin-top: 10px;
  padding: 6px 14px;
  background: #b91c1c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
}

.barra-filtro {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.barra-filtro label {
  font-weight: 600;
  font-size: 0.95rem;
  color: #374151;
  white-space: nowrap;
}

.barra-filtro select {
  padding: 9px 14px;
  border-radius: 8px;
  border: 2px solid #d1d5db;
  font-size: 0.95rem;
  background: white;
  cursor: pointer;
  outline: none;
  flex: 1;
  max-width: 340px;
}

.barra-filtro select:focus {
  border-color: #15803d;
}

.txt-carregando {
  text-align: center;
  padding: 50px;
  color: #6b7280;
}

.grupos {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.bloco-grupo {
  background: white;
  border-radius: 10px;
  padding: 16px 18px;
  border: 1px solid #e5e7eb;
}

.titulo-grupo {
  font-size: 0.85rem;
  font-weight: 700;
  color: #15803d;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #dcfce7;
}

.grade-paises {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 10px;
}

.card-pais {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 8px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 600;
  color: #111827;
  transition: border-color 0.15s, background 0.15s;
  text-align: center;
  line-height: 1.3;
}

.card-pais:hover {
  border-color: #15803d;
  background: #f0fdf4;
}

.bandeira {
  width: 48px;
  height: 30px;
  object-fit: cover;
  border-radius: 3px;
  border: 1px solid #e5e7eb;
}

.bandeira-vazia {
  width: 48px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 3px;
  font-size: 1.1rem;
}

.topo-elenco {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 26px;
  flex-wrap: wrap;
}

.btn-voltar {
  padding: 8px 16px;
  background: #15803d;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.15s;
}

.btn-voltar:hover {
  background: #065f46;
}

.bandeira-grande {
  width: 54px;
  height: 36px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
}

.info-selecao h2 {
  font-size: 1.4rem;
  font-weight: 800;
  color: #111827;
}

.tags {
  display: flex;
  gap: 6px;
  margin-top: 4px;
  flex-wrap: wrap;
}

.tag-grupo {
  background: #15803d;
  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
}

.tag-total {
  background: #f3f4f6;
  color: #6b7280;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
}

.carregando {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #15803d;
  border-radius: 50%;
  animation: girar 0.8s linear infinite;
  margin: 0 auto 14px;
}

@keyframes girar {
  to { transform: rotate(360deg); }
}

.bloco-posicao {
  margin-bottom: 32px;
}

.titulo-posicao {
  font-size: 1rem;
  font-weight: 700;
  color: #4b5563;
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 8px;
}

.contador {
  font-size: 0.8rem;
  font-weight: 400;
  color: #9ca3af;
}

.grade-figurinhas {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(148px, 1fr));
  gap: 14px;
}

.figurinha {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  transition: transform 0.15s, box-shadow 0.15s;
}

.figurinha:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.figurinha-topo {
  padding: 6px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.figurinha-topo.pos-goleiro  { background: #dc2626; }
.figurinha-topo.pos-defensor { background: #2563eb; }
.figurinha-topo.pos-meio     { background: #15803d; }
.figurinha-topo.pos-atacante { background: #f97316; }
.figurinha-topo.pos-default  { background: #6b7280; }

.num-camisa {
  color: white;
  font-size: 0.72rem;
  font-weight: 700;
}

.label-posicao {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.figurinha-foto {
  background: #f9fafb;
  padding: 14px 12px 8px;
  text-align: center;
}

.figurinha-foto img {
  width: 88px;
  height: 88px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
}

.figurinha-dados {
  padding: 10px 10px 12px;
  text-align: center;
}

.nome-jogador {
  font-size: 0.82rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
  margin-bottom: 3px;
}

.idade-jogador {
  font-size: 0.7rem;
  color: #9ca3af;
  margin-top: 2px;
}

@media (max-width: 600px) {
  .cabecalho h1 { font-size: 1.5rem; }
  .grade-paises { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); }
  .grade-figurinhas { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; }
  .figurinha-foto img { width: 72px; height: 72px; }
  .barra-filtro { flex-direction: column; align-items: flex-start; }
  .barra-filtro select { max-width: 100%; width: 100%; }
}
</style>
