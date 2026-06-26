<template>
  <Transition name="alerta-fade">
    <div v-if="mensagem" :class="['alerta', tipo]">
      <span class="alerta-icone">{{ icones[tipo] }}</span>
      <span class="alerta-texto">{{ mensagem }}</span>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "AlertComponent",
  props: {
    tipo: {
      type: String,
      default: "info",
    },
    mensagem: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      icones: {
        erro: "✕",
        aviso: "⚠",
        info: "ℹ",
        sucesso: "✓",
      },
    };
  },
};
</script>

<style scoped>
.alerta {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 5px solid;
  margin: 16px auto;
  font-weight: 500;
  max-width: 750px;
}

.alerta-icone {
  font-size: 18px;
  font-weight: bold;
  flex-shrink: 0;
}

.erro {
  background-color: #fee2e2;
  border-color: #ef4444;
  color: #991b1b;
}

.aviso {
  background-color: #ffedd5;
  border-color: #f97316;
  color: #9a3412;
}

.info {
  background-color: #dbeafe;
  border-color: #3b82f6;
  color: #1e40af;
}

.sucesso {
  background-color: #dcfce7;
  border-color: #22c55e;
  color: #166634;
}

/* Transição de entrada e saída */
.alerta-fade-enter-active,
.alerta-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.alerta-fade-enter-from,
.alerta-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
