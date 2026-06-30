<script setup lang="ts">
interface Player {
  id: number
  name: string
  age: number
  number: number | null
  position: string
  photo: string
}

interface Props {
  player: Player
  teamName: string
  teamLogo: string
  countryName: string
  countryFlag: string
}

defineProps<Props>()

const getPositionLabel = (position: string): string => {
  const positions: Record<string, string> = {
    Goalkeeper: 'Goleiro',
    Defender: 'Defensor',
    Midfielder: 'Meio-campo',
    Attacker: 'Atacante'
  }
  return positions[position] || position
}

const getPositionClass = (position: string): string => {
  const classes: Record<string, string> = {
    Goalkeeper: 'position-goalkeeper',
    Defender: 'position-defender',
    Midfielder: 'position-midfielder',
    Attacker: 'position-attacker'
  }
  return classes[position] || ''
}
</script>

<template>
  <article class="player-card">
    <div class="sticker-frame">
      <div class="sticker-top">
        <span class="sticker-code">Fig. {{ player.id }}</span>
        <span class="sticker-series">Sele&ccedil;&otilde;es</span>
        <img
          v-if="countryFlag"
          :src="countryFlag"
          :alt="countryName"
          class="country-flag"
          loading="lazy"
        />
      </div>

      <div class="photo-area">
        <div class="flag-strip" aria-hidden="true"></div>
        <div class="team-watermark">
          <img :src="teamLogo" :alt="teamName" loading="lazy" />
        </div>
        <img
          :src="player.photo"
          :alt="player.name"
          class="player-photo"
          loading="lazy"
        />
        <span v-if="player.number" class="player-number">
          {{ player.number }}
        </span>
      </div>

      <div class="card-content">
        <span class="team-name">{{ teamName }}</span>
        <h3 class="player-name">{{ player.name }}</h3>

        <div class="position-row">
          <span :class="['position-badge', getPositionClass(player.position)]">
            {{ getPositionLabel(player.position) }}
          </span>
        </div>

        <div class="player-details">
          <div class="detail-item">
            <span class="detail-label">Idade</span>
            <strong>{{ player.age || '-' }}</strong>
          </div>
          <div class="detail-item">
            <span class="detail-label">Camisa</span>
            <strong>{{ player.number || '-' }}</strong>
          </div>
          <div class="detail-item">
            <span class="detail-label">Sele&ccedil;&atilde;o</span>
            <strong>{{ countryName }}</strong>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.player-card {
  position: relative;
  border-radius: 16px;
  filter: drop-shadow(0 12px 18px rgba(19, 43, 30, 0.16));
  transition: transform 0.2s ease, filter 0.2s ease;
}

.player-card:hover {
  transform: translateY(-7px);
  filter: drop-shadow(0 20px 26px rgba(19, 43, 30, 0.24));
}

.sticker-frame {
  position: relative;
  min-height: 100%;
  overflow: hidden;
  padding: 0.55rem;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(250, 246, 225, 0.97)),
    repeating-linear-gradient(45deg, rgba(26, 71, 42, 0.055) 0 7px, transparent 7px 15px);
  border: 3px solid #ffd600;
  border-radius: 16px;
}

.sticker-frame::before {
  content: '';
  position: absolute;
  inset: 0.35rem;
  border: 1px dashed rgba(26, 71, 42, 0.25);
  border-radius: 10px;
  pointer-events: none;
}

.sticker-frame::after {
  content: '';
  position: absolute;
  top: -35%;
  left: -65%;
  width: 80%;
  height: 170%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
  transform: rotate(18deg);
  pointer-events: none;
}

.sticker-top {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 0.45rem;
  min-height: 38px;
  margin-bottom: 0.5rem;
  padding: 0.35rem 0.45rem;
  background: linear-gradient(110deg, var(--color-primary), var(--color-secondary) 65%, var(--color-blue));
  border-radius: 11px 11px 5px 5px;
  box-shadow: inset 0 -2px 0 rgba(244, 196, 48, 0.65);
}

.sticker-code {
  color: var(--color-accent);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.03em;
  white-space: nowrap;
}

.sticker-series {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.66rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.country-flag {
  width: 38px;
  height: 25px;
  object-fit: cover;
  border-radius: 3px;
  border: 2px solid white;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.24);
}

.photo-area {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-height: 205px;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 18%, rgba(255, 255, 255, 0.85), transparent 28%),
    linear-gradient(145deg, #c9f0d6, #fff2a6 58%, #c8e8ff);
  border: 1px solid rgba(26, 71, 42, 0.18);
  border-radius: 11px;
  box-shadow: inset 0 0 0 4px rgba(255, 255, 255, 0.45);
}

.flag-strip {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 42px;
  background:
    linear-gradient(90deg, var(--color-secondary) 0 33%, var(--color-accent) 33% 66%, var(--color-blue) 66%);
  opacity: 0.35;
}

.team-watermark {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.1;
}

.team-watermark img {
  width: 150px;
  height: 150px;
  object-fit: contain;
}

.player-photo {
  position: relative;
  z-index: 1;
  width: 168px;
  height: 168px;
  object-fit: cover;
  object-position: top center;
  border: 5px solid white;
  border-radius: 50%;
  margin-bottom: 1.15rem;
  background: #f8fafc;
  box-shadow: 0 12px 24px rgba(18, 34, 24, 0.24);
}

.player-number {
  position: absolute;
  right: 0.7rem;
  bottom: 0.7rem;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: white;
  background: var(--color-blue);
  border: 3px solid var(--color-accent);
  border-radius: 50%;
  font-size: 0.95rem;
  font-weight: 900;
}

.card-content {
  position: relative;
  z-index: 2;
  padding: 0.9rem 0.25rem 0.25rem;
  text-align: center;
}

.team-name {
  display: block;
  color: var(--color-secondary);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.player-name {
  min-height: 2.55rem;
  margin: 0.35rem 0 0.6rem;
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 900;
  letter-spacing: 0.025em;
  line-height: 1.2;
  text-transform: uppercase;
}

.position-row {
  display: flex;
  justify-content: center;
  margin-bottom: 0.8rem;
}

.position-badge {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.position-goalkeeper {
  background-color: #fef3c7;
  color: #92400e;
}

.position-defender {
  background-color: #dbeafe;
  color: #1e40af;
}

.position-midfielder {
  background-color: #dcfce7;
  color: #166534;
}

.position-attacker {
  background-color: #fee2e2;
  color: #b91c1c;
}

.player-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem;
}

.detail-item {
  min-width: 0;
  padding: 0.48rem 0.35rem;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(0, 140, 90, 0.15);
  border-radius: 8px;
}

.detail-label {
  display: block;
  color: var(--color-text-light);
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
}

.detail-item strong {
  display: block;
  overflow: hidden;
  color: var(--color-text);
  font-size: 0.82rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .photo-area {
    min-height: 165px;
  }

  .player-photo {
    width: 128px;
    height: 128px;
  }

  .player-details {
    grid-template-columns: 1fr;
  }
}
</style>
