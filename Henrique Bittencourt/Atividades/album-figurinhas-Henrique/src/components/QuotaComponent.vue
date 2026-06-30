<template>
  <div
    v-if="restantes !== null"
    class="quota"
    :class="{ 'quota-alerta': restantes < 20 }"
    aria-live="polite"
  >
    🔢 Requisições restantes hoje: <strong>{{ restantes }}</strong> / 100
    <span v-if="restantes < 20" class="quota-aviso">⚠️ Quota baixa!</span>
  </div>
</template>

<script>
export default {
  name: "QuotaComponent",
  props: {
    restantes: {
      type: Number,
      default: null,
    },
  },
};
</script>

<style scoped>
.quota { margin-bottom: 16px; font-size: 0.8rem; color: var(--text-muted); }
.quota strong { color: var(--accent-forte); }
.quota-alerta, .quota-alerta strong { color: #ff6b6b !important; font-weight: 600; }
.quota-aviso { display: inline-block; margin-left: 6px; animation: piscar 1.2s infinite; }
@keyframes piscar { 0%,100%{opacity:1} 50%{opacity:0.4} }
</style>
