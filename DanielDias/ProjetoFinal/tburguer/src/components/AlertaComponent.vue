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
  align-items: flex-start;
  gap: 10px;
  padding: 11px 14px;
  border-radius: 6px;
  border-left: 4px solid;
  margin-bottom: 20px;
  font-size: 14px;
  font-family: Georgia, serif;
  font-style: italic;
  line-height: 1.5;
}

.alerta-icone {
  font-size: 15px;
  flex-shrink: 0;
  margin-top: 1px;
}

.erro {
  background-color: #fff0f0;
  border-color: #c0392b;
  color: #922b21;
}

.aviso {
  background-color: #fffbf0;
  border-color: #d4a847;
  color: #8a6000;
}

.info {
  background-color: #f0f4ff;
  border-color: #5b7ec9;
  color: #2c4a8a;
}

.sucesso {
  background-color: #f0faf4;
  border-color: #27ae60;
  color: #1a7a40;
}
</style>