<template>
  <div v-if="mensagem" :class="['alerta', tipo]">
    <span class="alerta-icone">{{ icone }}</span>
    <span class="alerta-texto">{{ mensagem }}</span>
  </div>
</template>

<script>
export default {
  name: "AlertaComponent",
  props: {
    mensagem: {
      type: String,
      default: "",
    },
    tipo: {
      type: String,
      default: "info",
    },
  },
  computed: {
    icone() {
      const icones = {
        erro: "✖",
        aviso: "⚠",
        info: "ℹ",
        sucesso: "✔",
      };
      return icones[this.tipo] || "ℹ";
    },
  },
};
</script>

<style scoped>
.alerta {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 6px;
  border-left: 5px solid;
  margin-bottom: 16px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 14px;
}

.alerta-icone {
  font-size: 18px;
  flex-shrink: 0;
}

.erro {
  background-color: #fde8e8;
  border-color: #e53e3e;
  color: #c53030;
}

.aviso {
  background-color: #fef3cd;
  border-color: #f6a623;
  color: #b76d00;
}

.info {
  background-color: #e8f0fd;
  border-color: #3b82f6;
  color: #1d4ed8;
}

.sucesso {
  background-color: #e8f5e9;
  border-color: #38a169;
  color: #276749;
}
</style>