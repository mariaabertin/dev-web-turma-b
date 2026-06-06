<template>
  <div id="app">
    <AppHeader />

    <main class="container">
      <!-- Dropdown de seleção de pais -->
      <CountrySelector
        :countries="countries"
        :loading="loadingCountries"
        @country-selected="onCountrySelected"
      />

      <!-- Exibe a bandeira e nome do país selecionado -->
      <div v-if="selectedCountry.name" class="country-info">
        <img
          v-if="selectedCountry.flag"
          :src="selectedCountry.flag"
          :alt="selectedCountry.name"
          class="country-flag"
        />
        <h2>{{ selectedCountry.name }}</h2>
      </div>

      <!-- Spinner de carregamento -->
      <div v-if="loadingPlayers" class="loading-state">
        <div class="spinner"></div>
        <p>Buscando figurinhas...</p>
      </div>

      <!-- Mensagem de erro -->
      <div v-if="error && !loadingPlayers" class="error-message">
        ⚠️ {{ error }}
      </div>

      <!-- Grid do álbum (só aparece quando tiver jogadores) -->
      <AlbumGrid
        v-if="players.length && !loadingPlayers"
        :players="players"
        :country="selectedCountry.name"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import CountrySelector from './components/CountrySelector.vue'
import AlbumGrid from './components/AlbumGrid.vue'

// ── Configuração ────────────────────────────────────────────────

// Mude para false quando quiser usar a API real
const USE_MOCK = true

import mockCountries from './data/mock-countries.json'
import mockPlayers   from './data/mock-players.json'

const BASE_URL = '/api-football'

// ── Estado reativo ──────────────────────────────────────────────
const countries = ref([])          
const players = ref([])            
const selectedCountry = ref({ name: '', flag: '' })
const loadingCountries = ref(false)
const loadingPlayers = ref(false)
const error = ref('')

// ── Passo 1: Carrega a lista de países ao montar o componente
const carregarPaises = async () => {
  loadingCountries.value = true
  error.value = ''

  if (USE_MOCK) {
    countries.value = mockCountries.sort((a, b) => a.name.localeCompare(b.name))
    console.log(`✅ ${countries.value.length} países carregados (mock)`)
    loadingCountries.value = false
    return
  }

  try {
    const response = await fetch(`${BASE_URL}/teams/countries`)
    const data = await response.json()

    // Ordena em ordem alfabética pelo nome
    countries.value = data.response.sort((a, b) =>
      a.name.localeCompare(b.name)
    )
    console.log(`✅ ${countries.value.length} países carregados`)
  } catch (err) {
    error.value = 'Erro ao carregar países. Verifique sua API Key no arquivo .env'
    console.error('Erro:', err)
  } finally {
    loadingCountries.value = false
  }
}

// ── Passos 2 e 3: Busca o ID do time e depois o elenco ─────────
const onCountrySelected = async (country) => {
  // Atualiza o país selecionado
  selectedCountry.value = { name: country.name, flag: country.flag }
  players.value = []
  error.value = ''
  loadingPlayers.value = true

  if (USE_MOCK) {
    players.value = mockPlayers
    console.log(`✅ ${players.value.length} jogadores carregados (mock)`)
    loadingPlayers.value = false
    return
  }

  try {
    // --- Requisição 1: Descobre o ID numérico do time ---
    const responseTeam = await fetch(
      `${BASE_URL}/teams?name=${encodeURIComponent(country.name)}`
    )
    const dataTeam = await responseTeam.json()

    if (!dataTeam.response || dataTeam.response.length === 0) {
      error.value = `Nenhum time nacional encontrado para "${country.name}".`
      return
    }

    const teamId = dataTeam.response[0].team.id
    console.log(`✅ ID do time "${country.name}": ${teamId}`)

    // --- Requisição 2: Busca o elenco com o ID descoberto ---
    const responseSquad = await fetch(
      `${BASE_URL}/players/squads?team=${teamId}`
    )
    const dataSquad = await responseSquad.json()

    if (!dataSquad.response || dataSquad.response.length === 0) {
      error.value = 'Nenhum jogador encontrado para este time.'
      return
    }

    players.value = dataSquad.response[0].players
    console.log(`✅ ${players.value.length} jogadores carregados!`)

  } catch (err) {
    error.value = 'Erro ao buscar jogadores. Tente novamente.'
    console.error('Erro:', err)
  } finally {
    loadingPlayers.value = false
  }
}

// ── Ciclo de vida: roda quando o componente é montado ──────────
onMounted(() => {
  carregarPaises()
})
</script>