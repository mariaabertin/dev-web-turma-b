<template>
  <div v-if="mensagem" :class="['alerta', `alerta-${tipo}`]">
    <span class="alerta-icone">{{ icones[tipo] }}</span>
    <span>{{ mensagem }}</span>
  </div>
</template>

<script>
export default {
  name: "AlertComponent",
  props: {
    tipo: {
      type: String,
      default: "info",
      validator: (v) => ["erro", "aviso", "info", "sucesso"].includes(v),
    },
    mensagem: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      icones: {
        erro: "❌",
        aviso: "⚠️",
        info: "ℹ️",
        sucesso: "✅",
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
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 16px;
}

.alerta-icone {
  font-size: 18px;
  flex-shrink: 0;
}

.alerta-erro {
  background-color: #fde8e8;
  color: #c62828;
  border: 1px solid #ef9a9a;
}

.alerta-aviso {
  background-color: #fff3e0;
  color: #e65100;
  border: 1px solid #ffcc80;
}

.alerta-info {
  background-color: #e3f2fd;
  color: #0d47a1;
  border: 1px solid #90caf9;
}

.alerta-sucesso {
  background-color: #e8f5e9;
  color: #1b5e20;
  border: 1px solid #a5d6a7;
}
</style>
