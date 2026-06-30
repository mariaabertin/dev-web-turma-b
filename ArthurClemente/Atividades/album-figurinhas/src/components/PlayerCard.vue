<template>
  <div class="player-card" :class="positionClass">
    <!-- Efeito de brilho que passa ao passar o mouse -->
    <div class="card-shine"></div>

    <!-- Topo do card: número e posição -->
    <div class="card-header">
      <span class="player-number">#{{ player.number || '?' }}</span>
      <span class="player-position-badge" :class="positionClass">
        {{ positionAbbrev }}
      </span>
    </div>

    <!-- Foto do jogador -->
    <div class="card-photo">
      <img
        :src="player.photo"
        :alt="player.name"
        @error="handleImageError"
        loading="lazy"
      />
    </div>

    <!-- Rodapé: nome e posição completa -->
    <div class="card-footer">
      <h3 class="player-name">{{ player.name }}</h3>
      <p class="player-position-full">{{ player.position }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  player: {
    type: Object,
    required: true
  }
})

// Gera uma classe CSS diferente dependendo da posição do jogador
const positionClass = computed(() => {
  const pos = props.player.position?.toLowerCase() ?? ''
  if (pos.includes('goalkeeper')) return 'pos-goalkeeper'
  if (pos.includes('defender'))   return 'pos-defender'
  if (pos.includes('midfielder')) return 'pos-midfielder'
  if (pos.includes('attacker') || pos.includes('forward')) return 'pos-attacker'
  return 'pos-unknown'
})

// Sigla da posição em português
const positionAbbrev = computed(() => {
  const pos = props.player.position?.toLowerCase() ?? ''
  if (pos.includes('goalkeeper')) return 'GOL'
  if (pos.includes('defender'))   return 'ZAG'
  if (pos.includes('midfielder')) return 'MEI'
  if (pos.includes('attacker') || pos.includes('forward')) return 'ATA'
  return '?'
})

// Foto genérica caso a imagem oficial não carregue
const handleImageError = (e) => {
  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(props.player.name)}&size=200&background=1a1a2e&color=ffffff`
}
</script>