<template>
  <article
    class="card"
    :aria-label="jogador.name + ', ' + posicaoPt + ', camisa ' + (jogador.number || 'sem número')"
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
      <span class="posicao" :class="classePosicao">
        {{ posicaoPt }}
      </span>
      <p class="idade" v-if="jogador.age">{{ jogador.age }} anos</p>
    </div>
  </article>
</template>

<script>
export default {
  name: "FigurinhaComponent",
  props: {
    jogador: {
      type: Object,
      required: true,
    },
    posicaoPt: {
      type: String,
      default: "N/A",
    },
    classePosicao: {
      type: String,
      default: "pos-default",
    },
  },
  methods: {
    imagemFallback(event) {
      event.target.src = "https://placehold.co/100x100?text=Sem+Foto";
    },
  },
};
</script>

<style scoped>
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-top: 4px solid var(--accent);
  border-radius: 6px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}
.card:hover {
  transform: scale(1.04);
  box-shadow: 0 10px 30px rgba(230, 57, 70, 0.3);
  border-color: var(--accent);
}

.card-numero {
  position: absolute;
  top: 10px; left: 0;
  background: var(--accent);
  color: var(--contraste);
  font-size: 0.7rem; font-weight: 700;
  padding: 2px 8px;
  border-radius: 0 4px 4px 0;
}

.card-foto { background: var(--bg-card-foto); padding: 20px 16px 8px; }
.card-foto img { width: 100px; height: 100px; object-fit: cover; border-radius: 8px; border: 2px solid var(--border); }

.card-info { padding: 12px; }
.card-nome { font-size: 0.85rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; line-height: 1.3; }

.posicao { display: inline-block; padding: 3px 10px; border-radius: 4px; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.pos-goleiro  { background: #d4a000; color: #1b1b1f; }
.pos-defensor { background: #5c5c66; color: #fff; }
.pos-meio     { background: #8d99ae; color: #1b1b1f; }
.pos-atacante { background: #e63946; color: #fff; }
.pos-default  { background: #555;    color: #ccc; }

.idade { font-size: 0.75rem; color: var(--text-idade); margin-top: 6px; }

@media (max-width: 600px) {
  .card-foto img { width: 80px; height: 80px; }
}
</style>
