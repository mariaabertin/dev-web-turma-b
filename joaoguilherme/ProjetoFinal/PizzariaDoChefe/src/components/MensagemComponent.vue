<template>
  <div v-if="isVisible" :class="['mensagem-container', tipo]">
    <span class="mensagem-icone">{{ icone }}</span>
    <span class="mensagem-texto">{{ mensagem }}</span>
  </div>
</template>

<script>
export default {
  name: "MensagemComponent",
  props: {
    mensagem: String,
    tipo: String,
    isVisible: Boolean,
  },
  computed: {
    icone() {
      if (this.tipo === "erro") return "✖";
      if (this.tipo === "alerta") return "⚠";
      if (this.tipo === "info") return "ℹ";
      if (this.tipo === "sucesso") return "✔";
      return "";
    },
  },
};
</script>

<style scoped>
.mensagem-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 8px;
  margin: 16px auto;
  max-width: 750px;
  font-weight: bold;
  font-size: 15px;
}

.mensagem-icone {
  font-size: 18px;
}

.erro {
  background-color: #fdecea;
  color: #c0392b;
  border-left: 5px solid #c0392b;
}

.alerta {
  background-color: #fff4e5;
  color: #d35400;
  border-left: 5px solid #d35400;
}

.info {
  background-color: #e8f4fd;
  color: #2980b9;
  border-left: 5px solid #2980b9;
}

.sucesso {
  background-color: #eafaf1;
  color: #1e8449;
  border-left: 5px solid #1e8449;
}
</style>
