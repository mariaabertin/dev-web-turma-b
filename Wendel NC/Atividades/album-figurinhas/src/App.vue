<script setup>
import { ref, onMounted } from "vue"

const token = "ed9427f23b17ebde6dd990a690f5a384"

const paises = ref([])
const paisSelecionado = ref("")
const jogadores = ref([])
const carregando = ref(false)
const erro = ref("")

const carregarPaises = async () => {
  try {
    const response = await fetch(
      "https://v3.football.api-sports.io/teams/countries",
      { headers: { "x-apisports-key": token } }
    )
    const dados = await response.json()
    paises.value = dados.response
  } catch (e) {
    erro.value = "Erro ao carregar países."
    console.error(e)
  }
}

const carregarJogadores = async () => {
  if (!paisSelecionado.value) return

  carregando.value = true
  erro.value = ""
  jogadores.value = []

  try {
    const resTime = await fetch(
      `https://v3.football.api-sports.io/teams?name=${paisSelecionado.value}`,
      { headers: { "x-apisports-key": token } }
    )
    const dadosTime = await resTime.json()

    if (!dadosTime.response.length) {
      erro.value = "Seleção não encontrada."
      return
    }

    const teamId = dadosTime.response[0].team.id

    const resJogadores = await fetch(
      `https://v3.football.api-sports.io/players/squads?team=${teamId}`,
      { headers: { "x-apisports-key": token } }
    )
    const dadosJogadores = await resJogadores.json()
    jogadores.value = dadosJogadores.response[0].players

  } catch (e) {
    erro.value = "Erro ao carregar jogadores."
    console.error(e)
  } finally {
    carregando.value = false
  }
}

onMounted(() => {
  carregarPaises()
})
</script>

<template>
  <div class="container">
    <h1>⚽ Álbum de Figurinhas</h1>

    <select v-model="paisSelecionado" @change="carregarJogadores">
      <option value="" disabled>Selecione uma seleção...</option>
      <option
        v-for="pais in paises"
        :key="pais.name"
        :value="pais.name"
      >
        {{ pais.name }}
      </option>
    </select>

    <p v-if="erro" class="erro">{{ erro }}</p>

    <p v-if="carregando" class="loading">Carregando figurinhas...</p>

    <div v-if="!carregando && jogadores.length" class="cards">
      <div
        class="card"
        v-for="jogador in jogadores"
        :key="jogador.id"
      >
        <img :src="jogador.photo" :alt="jogador.name" />
        <h3>{{ jogador.name }}</h3>
        <span class="posicao">{{ jogador.position }}</span>
      </div>
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background: #f0f4f8;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 30px 20px;
}

h1 {
  text-align: center;
  margin-bottom: 24px;
  font-size: 2rem;
  color: #1a1a2e;
}

select {
  display: block;
  margin: 0 auto 30px;
  padding: 10px 16px;
  width: 280px;
  border-radius: 8px;
  border: 2px solid #ccc;
  font-size: 1rem;
  cursor: pointer;
}

.loading {
  text-align: center;
  font-size: 1.1rem;
  color: #555;
  margin-top: 20px;
}

.erro {
  text-align: center;
  color: #c0392b;
  margin-top: 20px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-4px);
}

.card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}

.card h3 {
  font-size: 0.9rem;
  margin-bottom: 6px;
  color: #1a1a2e;
}

.posicao {
  font-size: 0.78rem;
  background: #e8f4fd;
  color: #2980b9;
  padding: 2px 8px;
  border-radius: 20px;
}
</style>