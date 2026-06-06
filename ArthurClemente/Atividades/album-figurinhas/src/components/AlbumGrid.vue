<template>
  <section class="album-section">
    <div class="album-title">
      <span class="album-count">{{ players.length }}</span>
      figurinhas de <strong>{{ country }}</strong>
    </div>

    <div class="album-grid">
      <PlayerCard
        v-for="player in players"
        :key="player.id"
        :player="player"
      />
    </div>
  </section>
</template>

<script setup>
import PlayerCard from './PlayerCard.vue'

defineProps({
  players: {
    type: Array,
    required: true
  },
  country: {
    type: String,
    default: ''
  }
})
</script>