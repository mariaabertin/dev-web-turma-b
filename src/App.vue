<script setup>
import { ref, onMounted } from 'vue'

const token = '74e4779490240798a10d01bd3860e45b'

const paises = ref([])
const paisSelecionado = ref('')
const jogadores = ref([])
const carregando = ref(false)
const erro = ref('')

const carregarPaises = async () => {
  try {
    const response = await fetch('https://v3.football.api-sports.io/teams/countries', {
      headers: { 'x-apisports-key': token }
    })
    const dados = await response.json()
    paises.value = dados.response
  } catch (e) {
    erro.value = 'Erro ao carregar países.'
  }
}

const carregarFigurinhas = async () => {
  if (!paisSelecionado.value) return
  carregando.value = true
  jogadores.value = []
  erro.value = ''

  try {
    const resTime = await fetch(`https://v3.football.api-sports.io/teams?name=${paisSelecionado.value}`, {
      headers: { 'x-apisports-key': token }
    })
    const dadosTime = await resTime.json()
    const teamId = dadosTime.response[0].team.id

    const resElenco = await fetch(`https://v3.football.api-sports.io/players/squads?team=${teamId}`, {
      headers: { 'x-apisports-key': token }
    })
    const dadosElenco = await resElenco.json()
    jogadores.value = dadosElenco.response[0].players
  } catch (e) {
    erro.value = 'Erro ao carregar jogadores. Verifique o país selecionado.'
  } finally {
    carregando.value = false
  }
}

onMounted(carregarPaises)
</script>

<template>
  <div class="container">
    <h1> Álbum de Figurinhas</h1>

    <select v-model="paisSelecionado" @change="carregarFigurinhas">
      <option value="">Selecione um país</option>
      <option v-for="pais in paises" :key="pais.name" :value="pais.name">
        {{ pais.name }}
      </option>
    </select>

    <p v-if="carregando">Carregando jogadores...</p>
    <p v-if="erro" class="erro">{{ erro }}</p>

    <div class="album" v-if="jogadores.length > 0">
      <div class="card" v-for="jogador in jogadores" :key="jogador.id">
        <img :src="jogador.photo" :alt="jogador.name" />
        <h3>{{ jogador.name }}</h3>
        <p>{{ jogador.position }}</p>
      </div>
    </div>
  </div>
</template>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: #0f0f1a;
  color: #fff;
  font-family: sans-serif;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

h1 { margin-bottom: 1.5rem; font-size: 2rem; }

select {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  margin-bottom: 2rem;
  cursor: pointer;
}

.album {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.2rem;
}

.card {
  background: #1e1e2e;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #333;
}

.card img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
}

.card h3 { font-size: 0.85rem; text-align: center; }
.card p { font-size: 0.75rem; color: #aaa; }

.erro { color: #ff6b6b; margin-top: 1rem; }
</style>