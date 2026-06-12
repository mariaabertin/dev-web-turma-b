<template>
  <header>
    <div class="header-faixa"></div>
    <h1>⚽ Álbum de Figurinhas</h1>
    <p>Seleções Mundiais de Futebol — Copa do Mundo 2026</p>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style scoped>
header {
  position: relative;
  text-align: left;
  padding: 36px 28px 26px;
  background: var(--bg-header);
  border-radius: 6px;
  margin-bottom: 28px;
  border-left: 6px solid var(--accent);
  overflow: hidden;
}
.header-faixa {
  position: absolute;
  top: 0; right: 0;
  width: 140px; height: 100%;
  background: linear-gradient(115deg, transparent 30%, rgba(230, 57, 70, 0.18) 30%, rgba(230, 57, 70, 0.18) 55%, transparent 55%, transparent 65%, rgba(230, 57, 70, 0.3) 65%);
  pointer-events: none;
}
header h1 { font-size: 2.3rem; font-weight: 900; color: var(--accent-forte); letter-spacing: -0.5px; text-transform: uppercase; }
header p  { color: var(--text-muted); font-size: 1rem; margin-top: 6px; }

@media (max-width: 600px) {
  header h1 { font-size: 1.5rem; }
}
</style>
