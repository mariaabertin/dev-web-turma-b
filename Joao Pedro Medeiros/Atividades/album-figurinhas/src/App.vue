<template>
  <main class="page">
    <section class="hero">
      <div>
        <p class="eyebrow">Seleções de futebol</p>
        <h1>Álbum de Figurinhas</h1>
        <p>
          Elencos oficiais em formato de coleção, com fotos, posições e dados dos atletas.
        </p>
      </div>

      <div class="album-counter" aria-live="polite">
        <strong>{{ jogadores.length }}</strong>
        <span>figurinhas</span>
      </div>
    </section>

    <section class="controls">
      <div class="select-area">
        <label for="pais">Seleção</label>

        <select
          id="pais"
          v-model="paisSelecionado"
          :disabled="carregandoPaises || !paises.length"
          @change="carregarFigurinhas"
        >
          <option value="" disabled>
            {{ textoOpcaoInicial }}
          </option>

          <option
            v-for="pais in paises"
            :key="pais.name"
            :value="pais.name"
          >
            {{ pais.name }}
          </option>
        </select>
      </div>

      <div class="selection-summary">
        <img
          v-if="paisAtual?.flag"
          :src="paisAtual.flag"
          :alt="`Bandeira de ${paisAtual.name}`"
          class="flag"
          referrerpolicy="no-referrer"
          @error="ocultarImagem"
        >

        <div>
          <span>País escolhido</span>
          <strong>{{ paisSelecionado || 'Aguardando seleção' }}</strong>
        </div>
      </div>
    </section>

    <section v-if="erro" class="message error">
      {{ erro }}
    </section>

    <section v-if="carregandoFigurinhas" class="message loading">
      Carregando figurinhas...
    </section>

    <section
      v-if="!carregandoFigurinhas && jogadores.length > 0"
      class="album"
    >
      <article
        v-for="jogador in jogadores"
        :key="jogador.id"
        class="card"
      >
        <div class="card-top">
          <span class="number">Nº {{ jogador.number || '--' }}</span>
          <span :class="['position', classePosicao(jogador.position)]">
            {{ jogador.position || 'Sem posição' }}
          </span>
        </div>

        <div class="photo-frame">
          <img
            :src="fotoJogador(jogador)"
            :alt="`Foto de ${jogador.name}`"
            class="player-image"
            loading="lazy"
            referrerpolicy="no-referrer"
            @error="usarImagemPadrao"
          >
        </div>

        <div class="card-info">
          <h2>{{ jogador.name }}</h2>

          <dl>
            <div>
              <dt>Idade</dt>
              <dd>{{ jogador.age || '-' }}</dd>
            </div>
            <div>
              <dt>ID</dt>
              <dd>{{ jogador.id }}</dd>
            </div>
          </dl>
        </div>
      </article>
    </section>

    <section
      v-if="!carregandoFigurinhas && paisSelecionado && jogadores.length === 0 && !erro"
      class="message"
    >
      Nenhuma figurinha encontrada para essa seleção.
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const API_BASE_URL = 'https://v3.football.api-sports.io';
const token = import.meta.env.VITE_API_FOOTBALL_KEY?.trim();

const paises = ref([]);
const jogadores = ref([]);
const paisSelecionado = ref('');

const carregandoPaises = ref(false);
const carregandoFigurinhas = ref(false);
const erro = ref('');

const textoOpcaoInicial = computed(() => {
  if (carregandoPaises.value) return 'Carregando países...';
  if (!paises.value.length) return 'Nenhum país carregado';

  return 'Escolha um país';
});

const paisAtual = computed(() =>
  paises.value.find((pais) => pais.name === paisSelecionado.value)
);

const criarConfiguracaoRequisicao = () => ({
  method: 'GET',
  headers: {
    'x-apisports-key': token,
  },
});

const extrairMensagensErroApi = (errors) => {
  if (!errors) return [];

  if (Array.isArray(errors)) {
    return errors.filter(Boolean).map(String);
  }

  if (typeof errors === 'string') {
    return errors ? [errors] : [];
  }

  if (typeof errors === 'object') {
    return Object.values(errors)
      .flatMap((value) => (Array.isArray(value) ? value : [value]))
      .filter(Boolean)
      .map(String);
  }

  return [];
};

const requisitarApi = async (caminho, mensagemFallback) => {
  if (!token) {
    throw new Error(
      'Chave da API não encontrada. Crie um arquivo .env na raiz do projeto com VITE_API_FOOTBALL_KEY=sua_chave.'
    );
  }

  const response = await fetch(
    `${API_BASE_URL}${caminho}`,
    criarConfiguracaoRequisicao()
  );

  let dados;

  try {
    dados = await response.json();
  } catch {
    throw new Error(`${mensagemFallback} A resposta da API não veio em JSON.`);
  }

  if (!response.ok) {
    throw new Error(`${mensagemFallback} Status HTTP: ${response.status}.`);
  }

  const errosApi = extrairMensagensErroApi(dados.errors);

  if (errosApi.length) {
    throw new Error(`API-Football: ${errosApi.join(' ')}`);
  }

  return dados;
};

const formatarErro = (error, mensagemFallback) => {
  if (error instanceof TypeError) {
    return 'Não foi possível conectar à API. Verifique sua internet e se o navegador permitiu a requisição.';
  }

  return error.message || mensagemFallback;
};

const fotoJogador = (jogador) => {
  if (jogador.photo) return jogador.photo;
  if (jogador.id) return `https://media.api-sports.io/football/players/${jogador.id}.png`;

  return '/player-placeholder.svg';
};

const usarImagemPadrao = (event) => {
  event.target.onerror = null;
  event.target.src = '/player-placeholder.svg';
};

const ocultarImagem = (event) => {
  event.target.hidden = true;
};

const classePosicao = (posicao) => {
  const posicaoNormalizada = posicao?.toLowerCase() || '';

  if (posicaoNormalizada.includes('goalkeeper')) return 'position-goalkeeper';
  if (posicaoNormalizada.includes('defender')) return 'position-defender';
  if (posicaoNormalizada.includes('midfielder')) return 'position-midfielder';
  if (posicaoNormalizada.includes('attacker')) return 'position-attacker';

  return 'position-default';
};

const carregarPaises = async () => {
  carregandoPaises.value = true;
  erro.value = '';

  try {
    const dados = await requisitarApi(
      '/teams/countries',
      'Erro ao buscar a lista de países.'
    );

    paises.value = (dados.response || [])
      .filter((pais) => pais?.name)
      .sort((paisA, paisB) => paisA.name.localeCompare(paisB.name));

    if (!paises.value.length) {
      throw new Error('A API não retornou países para preencher o dropdown.');
    }
  } catch (error) {
    paises.value = [];
    erro.value = formatarErro(error, 'Falha ao carregar países.');
  } finally {
    carregandoPaises.value = false;
  }
};

const buscarIdDaSelecao = async (nomePais) => {
  const paisFormatado = encodeURIComponent(nomePais);

  const dados = await requisitarApi(
    `/teams?name=${paisFormatado}`,
    'Erro ao buscar os dados da seleção.'
  );

  const timesEncontrados = dados.response || [];

  const selecaoNacional =
    timesEncontrados.find((item) => item.team?.national === true) ||
    timesEncontrados[0];

  if (!selecaoNacional?.team?.id) {
    throw new Error(`Não foi possível encontrar o ID da seleção: ${nomePais}.`);
  }

  return selecaoNacional.team.id;
};

const buscarJogadores = async (teamId) => {
  const dados = await requisitarApi(
    `/players/squads?team=${teamId}`,
    'Erro ao buscar o elenco da seleção.'
  );

  return dados.response?.[0]?.players || [];
};

const carregarFigurinhas = async () => {
  if (!paisSelecionado.value) return;

  carregandoFigurinhas.value = true;
  erro.value = '';
  jogadores.value = [];

  try {
    const teamId = await buscarIdDaSelecao(paisSelecionado.value);
    jogadores.value = await buscarJogadores(teamId);
  } catch (error) {
    erro.value = formatarErro(error, 'Erro ao carregar figurinhas.');
  } finally {
    carregandoFigurinhas.value = false;
  }
};

onMounted(() => {
  carregarPaises();
});
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 36px;
  background:
    linear-gradient(135deg, rgba(13, 94, 71, 0.96), rgba(17, 24, 39, 0.98)),
    repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.04) 0,
      rgba(255, 255, 255, 0.04) 1px,
      transparent 1px,
      transparent 72px
    );
  color: #f9fafb;
  font-family: Inter, Arial, Helvetica, sans-serif;
}

.hero {
  width: min(1180px, 100%);
  margin: 0 auto 24px;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #facc15;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

.hero h1 {
  margin: 0 0 10px;
  font-size: clamp(2.1rem, 6vw, 4.7rem);
  line-height: 0.95;
}

.hero p {
  max-width: 620px;
  margin: 0;
  color: #d1d5db;
  font-size: 1.06rem;
}

.album-counter {
  min-width: 144px;
  padding: 18px;
  border: 1px solid rgba(250, 204, 21, 0.48);
  border-radius: 8px;
  background: rgba(17, 24, 39, 0.74);
  text-align: center;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
}

.album-counter strong {
  display: block;
  color: #facc15;
  font-size: 2.2rem;
  line-height: 1;
}

.album-counter span {
  display: block;
  margin-top: 4px;
  color: #e5e7eb;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
}

.controls {
  width: min(1180px, 100%);
  margin: 0 auto 30px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  display: grid;
  grid-template-columns: minmax(240px, 1fr) auto;
  align-items: end;
  gap: 18px;
  backdrop-filter: blur(14px);
}

.select-area {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.select-area label {
  color: #f9fafb;
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
}

.select-area select {
  width: 100%;
  min-height: 48px;
  padding: 0 42px 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 8px;
  color: #111827;
  font-size: 1rem;
  font-weight: 700;
  background: #ffffff;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);
}

.select-area select:disabled {
  color: #6b7280;
  cursor: not-allowed;
}

.selection-summary {
  min-width: 236px;
  min-height: 68px;
  padding: 10px 12px;
  border-radius: 8px;
  background: #f9fafb;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 12px;
}

.selection-summary span {
  display: block;
  color: #6b7280;
  font-size: 0.74rem;
  font-weight: 800;
  text-transform: uppercase;
}

.selection-summary strong {
  display: block;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.05rem;
}

.flag {
  width: 52px;
  height: 38px;
  border-radius: 4px;
  object-fit: cover;
  box-shadow: 0 0 0 1px rgba(17, 24, 39, 0.14);
}

.message {
  width: min(760px, 100%);
  margin: 24px auto;
  padding: 16px 18px;
  border-radius: 8px;
  background: #ffffff;
  text-align: center;
  color: #374151;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.16);
}

.loading {
  border-left: 6px solid #facc15;
}

.error {
  border-left: 6px solid #ef4444;
  background: #fff1f2;
  color: #991b1b;
}

.album {
  width: min(1180px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 22px;
}

.card {
  position: relative;
  overflow: hidden;
  min-height: 380px;
  border: 1px solid rgba(17, 24, 39, 0.16);
  border-radius: 8px;
  background:
    linear-gradient(#fffdf5, #fff9db 52%, #f9fafb),
    #ffffff;
  color: #111827;
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.24);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 2px solid rgba(250, 204, 21, 0.72);
  border-radius: 6px;
  pointer-events: none;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 44px rgba(0, 0, 0, 0.32);
}

.card-top {
  position: relative;
  z-index: 1;
  padding: 14px 14px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.number {
  min-width: 42px;
  padding: 6px 8px;
  border-radius: 6px;
  background: #111827;
  color: #facc15;
  font-size: 0.8rem;
  font-weight: 900;
  text-align: center;
}

.position {
  min-width: 0;
  padding: 6px 9px;
  border-radius: 6px;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  white-space: nowrap;
}

.position-goalkeeper {
  background: #2563eb;
}

.position-defender {
  background: #059669;
}

.position-midfielder {
  background: #7c3aed;
}

.position-attacker {
  background: #dc2626;
}

.position-default {
  background: #4b5563;
}

.photo-frame {
  position: relative;
  z-index: 1;
  margin: 0 14px;
  overflow: hidden;
  border: 1px solid rgba(17, 24, 39, 0.18);
  border-radius: 6px;
  background:
    linear-gradient(180deg, #e0f2fe, #f8fafc 72%),
    #e5e7eb;
}

.player-image {
  display: block;
  width: 100%;
  height: 230px;
  object-fit: contain;
  object-position: center bottom;
}

.card-info {
  position: relative;
  z-index: 1;
  padding: 14px;
}

.card-info h2 {
  min-height: 44px;
  margin: 0 0 12px;
  color: #111827;
  font-size: 1.12rem;
  line-height: 1.15;
  text-align: center;
}

.card-info dl {
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.card-info dl div {
  padding: 8px;
  border-radius: 6px;
  background: #eef2ff;
  text-align: center;
}

.card-info dt {
  color: #6b7280;
  font-size: 0.68rem;
  font-weight: 900;
  text-transform: uppercase;
}

.card-info dd {
  margin: 2px 0 0;
  color: #111827;
  font-weight: 900;
}

@media (max-width: 760px) {
  .page {
    padding: 24px 16px;
  }

  .hero {
    display: block;
  }

  .album-counter {
    margin-top: 18px;
  }

  .controls {
    grid-template-columns: 1fr;
  }

  .selection-summary {
    min-width: 0;
  }

  .selection-summary strong {
    max-width: none;
  }

  .album {
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 16px;
  }

  .card {
    min-height: 346px;
  }

  .player-image {
    height: 190px;
  }
}
</style>
