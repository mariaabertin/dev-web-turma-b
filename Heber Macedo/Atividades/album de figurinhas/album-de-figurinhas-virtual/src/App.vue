<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import CountrySelect from './components/CountrySelect.vue'
import PlayerCard from './components/PlayerCard.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import ApiKeyWarning from './components/ApiKeyWarning.vue'

interface Country {
  name: string
  code: string | null
  flag: string | null
}

interface Player {
  id: number
  name: string
  age: number
  number: number | null
  position: string
  photo: string
}

interface Team {
  id: number
  name: string
  logo: string
}

const API_KEY = import.meta.env.VITE_API_FOOTBALL_KEY || ''
const BASE_URL = 'https://v3.football.api-sports.io'

const countries = ref<Country[]>([])
const selectedCountry = ref<string>('')
const players = ref<Player[]>([])
const currentTeam = ref<Team | null>(null)
const isLoadingCountries = ref(false)
const isLoadingPlayers = ref(false)
const error = ref<string>('')

const selectedCountryData = computed(() =>
  countries.value.find((country) => country.name === selectedCountry.value) || null
)

const carregarPaises = async () => {
  if (!API_KEY) return

  isLoadingCountries.value = true
  error.value = ''

  try {
    const response = await fetch(`${BASE_URL}/teams/countries`, {
      method: 'GET',
      headers: {
        'x-apisports-key': API_KEY
      }
    })

    const dados = await response.json()

    if (dados.errors && Object.keys(dados.errors).length > 0) {
      error.value = 'Erro na API: ' + JSON.stringify(dados.errors)
      return
    }

    countries.value = dados.response || []
  } catch (erro) {
    console.error('Falha ao obter lista de paises:', erro)
    error.value = 'Falha ao carregar pa\u00edses. Verifique sua conex\u00e3o.'
  } finally {
    isLoadingCountries.value = false
  }
}

const carregarFigurinhas = async (paisSelecionado: string) => {
  if (!API_KEY || !paisSelecionado) return

  isLoadingPlayers.value = true
  error.value = ''
  players.value = []
  currentTeam.value = null

  try {
    const responseTime = await fetch(`${BASE_URL}/teams?name=${encodeURIComponent(paisSelecionado)}`, {
      method: 'GET',
      headers: {
        'x-apisports-key': API_KEY
      }
    })

    const dadosTime = await responseTime.json()

    if (!dadosTime.response || dadosTime.response.length === 0) {
      error.value = `Nenhuma sele\u00e7\u00e3o encontrada para "${paisSelecionado}"`
      isLoadingPlayers.value = false
      return
    }

    const teamData = dadosTime.response[0].team
    const teamId = teamData.id
    currentTeam.value = {
      id: teamId,
      name: teamData.name,
      logo: teamData.logo
    }

    const responseElenco = await fetch(`${BASE_URL}/players/squads?team=${teamId}`, {
      method: 'GET',
      headers: {
        'x-apisports-key': API_KEY
      }
    })

    const dadosElenco = await responseElenco.json()

    if (!dadosElenco.response || dadosElenco.response.length === 0) {
      error.value = 'Nenhum jogador encontrado para esta sele\u00e7\u00e3o.'
      isLoadingPlayers.value = false
      return
    }

    players.value = dadosElenco.response[0].players || []
  } catch (erro) {
    console.error('Erro ao processar fluxo assincrono:', erro)
    error.value = 'Falha ao carregar figurinhas. Tente novamente.'
  } finally {
    isLoadingPlayers.value = false
  }
}

const handleCountryChange = (country: string) => {
  selectedCountry.value = country
  if (country) {
    carregarFigurinhas(country)
  } else {
    players.value = []
    currentTeam.value = null
  }
}

onMounted(() => {
  if (API_KEY) {
    carregarPaises()
  }
})
</script>

<template>
  <div class="app-container">
    <header class="header">
      <div class="header-content">
        <span class="championship-badge"><b>2026</b> Edi&ccedil;&atilde;o especial</span>
        <span class="header-label">Cole&ccedil;&atilde;o oficial das sele&ccedil;&otilde;es</span>
        <h1 class="title"><span>&Aacute;lbum de</span> Figurinhas</h1>
        <p class="subtitle">Escolha uma sele&ccedil;&atilde;o e complete a p&aacute;gina com os jogadores do elenco.</p>
        <div class="header-colors" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>
      </div>
    </header>

    <main class="main-content">
      <ApiKeyWarning v-if="!API_KEY" />

      <template v-else>
        <section class="select-section">
          <CountrySelect
            :countries="countries"
            :selected-country="selectedCountry"
            :is-loading="isLoadingCountries"
            @update:selected-country="handleCountryChange"
          />
        </section>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div v-if="isLoadingPlayers" class="loading-container">
          <LoadingSpinner />
          <p>Carregando figurinhas...</p>
        </div>

        <section v-if="currentTeam && players.length > 0" class="album-section">
          <div class="team-header">
            <div class="team-identity">
              <img
                v-if="selectedCountryData?.flag"
                :src="selectedCountryData.flag"
                :alt="selectedCountry"
                class="team-flag"
              />
            </div>
            <div class="team-text">
              <span class="team-kicker">Sele&ccedil;&atilde;o escolhida</span>
              <h2 class="team-name">{{ currentTeam.name }}</h2>
            </div>
            <span class="player-count">{{ players.length }} figurinhas</span>
          </div>

          <div class="players-grid">
            <PlayerCard
              v-for="player in players"
              :key="player.id"
              :player="player"
              :team-name="currentTeam.name"
              :team-logo="currentTeam.logo"
              :country-name="selectedCountry"
              :country-flag="selectedCountryData?.flag || ''"
            />
          </div>
        </section>

        <section v-if="!isLoadingPlayers && !currentTeam && selectedCountry" class="empty-state">
          <p>Selecione um pa&iacute;s para ver as figurinhas da sele&ccedil;&atilde;o.</p>
        </section>

        <section v-if="!selectedCountry && !isLoadingCountries && countries.length > 0" class="welcome-state">
          <div class="welcome-content">
            <div class="welcome-icon">&#9917;</div>
            <h2>Bem-vindo ao &Aacute;lbum de Figurinhas!</h2>
            <p>Selecione um pa&iacute;s acima para visualizar as figurinhas dos jogadores da sele&ccedil;&atilde;o nacional.</p>
          </div>
        </section>
      </template>
    </main>

  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 130%, transparent 0 145px, rgba(255, 255, 255, 0.14) 146px 150px, transparent 151px),
    linear-gradient(120deg, rgba(0, 140, 90, 0.98), rgba(7, 59, 42, 0.98) 55%, rgba(8, 102, 198, 0.96));
  color: white;
  padding: 3.4rem 1rem 3rem;
  text-align: center;
  border-bottom: 9px solid var(--color-accent);
  box-shadow: 0 15px 35px rgba(7, 59, 42, 0.18);
}

.header::before,
.header::after {
  content: '';
  position: absolute;
  width: 210px;
  height: 210px;
  border: 3px solid rgba(255, 255, 255, 0.13);
  border-radius: 50%;
}

.header::before {
  top: -110px;
  left: -55px;
}

.header::after {
  right: -70px;
  bottom: -130px;
}

.header-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.championship-badge {
  position: absolute;
  top: -1.4rem;
  left: 0;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.42rem 0.7rem 0.42rem 0.45rem;
  color: white;
  background: rgba(3, 34, 24, 0.44);
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.championship-badge b {
  padding: 0.22rem 0.5rem;
  color: var(--color-primary);
  background: var(--color-accent);
  border-radius: 999px;
}

.header-label {
  display: inline-block;
  margin-bottom: 0.75rem;
  padding: 0.3rem 0.8rem;
  color: #fff4a3;
  border: 1px solid rgba(255, 214, 0, 0.45);
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.title {
  margin-bottom: 0.5rem;
  color: var(--color-accent);
  font-family: var(--font-display);
  font-size: clamp(3.4rem, 9vw, 6.4rem);
  font-weight: 900;
  letter-spacing: 0.035em;
  line-height: 0.88;
  text-transform: uppercase;
  text-shadow: 4px 5px 0 rgba(3, 34, 24, 0.75);
  transform: skew(-3deg);
}

.title span {
  display: block;
  margin-bottom: 0.35rem;
  color: white;
  font-family: var(--font-body);
  font-size: 0.24em;
  font-style: italic;
  letter-spacing: 0.42em;
  line-height: 1;
  text-shadow: none;
}

.subtitle {
  max-width: 620px;
  margin: 0.9rem auto 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.6;
}

.header-colors {
  display: flex;
  justify-content: center;
  gap: 0.35rem;
  margin-top: 1.35rem;
}

.header-colors span {
  width: 35px;
  height: 5px;
  border-radius: 999px;
}

.header-colors span:nth-child(1) { background: var(--color-accent); }
.header-colors span:nth-child(2) { background: white; }
.header-colors span:nth-child(3) { background: var(--color-sky); }
.header-colors span:nth-child(4) { background: var(--color-red); }

.main-content {
  flex: 1;
  max-width: 1220px;
  margin: 0 auto;
  padding: 2rem 1rem;
  width: 100%;
}

.select-section {
  position: relative;
  z-index: 2;
  margin: -3.7rem auto 2.4rem;
}

.error-message {
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  color: #b91c1c;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: var(--color-text-light);
}

.loading-container p {
  margin-top: 1rem;
  font-size: 1.1rem;
}

.album-section {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.team-header {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.25rem;
  background: linear-gradient(110deg, rgba(255, 255, 255, 0.98), rgba(240, 255, 245, 0.95));
  border: 2px solid white;
  border-left: 8px solid var(--color-secondary);
  border-radius: 18px;
  box-shadow: 0 14px 34px rgba(19, 43, 30, 0.12);
}

.team-header::after {
  content: '';
  position: absolute;
  right: -35px;
  bottom: -65px;
  width: 145px;
  height: 145px;
  border: 22px solid rgba(255, 214, 0, 0.2);
  border-radius: 50%;
}

.team-identity {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.team-flag {
  width: 78px;
  height: 52px;
  object-fit: cover;
  border-radius: 8px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0.2rem;
  box-shadow: 0 8px 18px rgba(19, 43, 30, 0.12);
}

.team-text {
  flex: 1;
}

.team-kicker {
  color: var(--color-text-light);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.team-name {
  font-family: var(--font-display);
  font-size: 2.15rem;
  font-weight: 900;
  letter-spacing: 0.035em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.player-count {
  position: relative;
  z-index: 1;
  background: var(--color-accent);
  color: var(--color-primary);
  padding: 0.55rem 1rem;
  border-radius: 999px;
  border: 2px solid white;
  box-shadow: 0 5px 0 rgba(7, 59, 42, 0.16);
  font-weight: 900;
  font-size: 0.9rem;
  white-space: nowrap;
}

.players-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1.35rem;
}

.empty-state,
.welcome-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-text-light);
}

.welcome-content {
  max-width: 430px;
  margin: 0 auto;
}

.welcome-icon {
  font-size: 4.5rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 8px 0 rgba(0, 140, 90, 0.14));
}

.welcome-content h2 {
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 2.15rem;
  letter-spacing: 0.025em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .header {
    padding: 3.2rem 1rem 2.8rem;
  }

  .title {
    font-size: clamp(3rem, 17vw, 4.5rem);
  }

  .subtitle {
    font-size: 0.98rem;
  }

  .team-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .championship-badge {
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  .team-name {
    font-size: 1.5rem;
  }

  .player-count {
    align-self: stretch;
    text-align: center;
  }

  .players-grid {
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    gap: 1rem;
  }
}
</style>
