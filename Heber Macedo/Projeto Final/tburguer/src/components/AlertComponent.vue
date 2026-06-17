<template>
  <transition name="alert-fade">
    <div v-if="visible" :class="['alert-container', `alert-${type}`]">
      <div class="alert-content">
        <span class="alert-icon">{{ getIcon }}</span>
        <p class="alert-message">{{ message }}</p>
        <button class="alert-close" @click="fecharAlerta">×</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AlertComponent",
  data() {
    return {
      visible: false,
      type: "info", // info, sucesso, alerta, erro
      message: "",
      timeoutId: null,
    };
  },
  computed: {
    getIcon() {
      const icons = {
        info: "ℹ️",
        sucesso: "✓",
        alerta: "⚠️",
        erro: "✕",
      };
      return icons[this.type] || icons.info;
    }
  },
  methods: {
    mostrarAlerta(type, message, duration = 4000) {
      this.type = type;
      this.message = message;
      this.visible = true;

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.timeoutId = setTimeout(() => {
        this.fecharAlerta();
      }, duration);
    },
    fecharAlerta() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>
.alert-container {
  position: fixed;
  top: 20px;
  right: 20px;
  max-width: 400px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 12px;
}

.alert-content {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.alert-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.alert-message {
  margin: 0;
  flex: 1;
  font-size: 14px;
  font-weight: 500;
}

.alert-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.2s;
  flex-shrink: 0;
}

.alert-close:hover {
  opacity: 1;
}

/* Estilos por tipo */
.alert-info {
  background-color: #e3f2fd;
  color: #1976d2;
  border-left: 4px solid #1976d2;
}

.alert-sucesso {
  background-color: #e8f5e9;
  color: #388e3c;
  border-left: 4px solid #388e3c;
}

.alert-alerta {
  background-color: #fff3e0;
  color: #f57c00;
  border-left: 4px solid #f57c00;
}

.alert-erro {
  background-color: #ffebee;
  color: #d32f2f;
  border-left: 4px solid #d32f2f;
}

/* Animação de fade */
.alert-fade-enter-active,
.alert-fade-leave-active {
  transition: opacity 0.3s ease;
}

.alert-fade-enter-from,
.alert-fade-leave-to {
  opacity: 0;
}
</style>
