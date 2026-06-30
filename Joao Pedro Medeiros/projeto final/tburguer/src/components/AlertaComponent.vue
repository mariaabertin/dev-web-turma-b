<template>
  <div v-if="mensagem" class="alerta" :class="`alerta-${tipo}`" role="alert">
    <span class="alerta-icone" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path :d="iconeAtual" />
      </svg>
    </span>
    <div>
      <strong>{{ titulo }}</strong>
      <p>{{ mensagem }}</p>
    </div>
  </div>
</template>

<script>
const icones = {
  erro: "M12 2 1 21h22L12 2Zm1 15h-2v2h2v-2Zm0-8h-2v6h2V9Z",
  aviso: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V6h2v7Z",
  info: "M11 10h2v7h-2v-7Zm0-3h2v2h-2V7Zm1-5a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z",
  sucesso:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.2 14.3-4-4 1.4-1.4 2.6 2.6 5-5 1.4 1.4-6.4 6.4Z",
};

export default {
  name: "AlertaComponent",
  props: {
    tipo: {
      type: String,
      default: "info",
    },
    titulo: {
      type: String,
      default: "Informação",
    },
    mensagem: {
      type: String,
      default: "",
    },
  },
  computed: {
    iconeAtual() {
      return icones[this.tipo] || icones.info;
    },
  },
};
</script>

<style scoped>
.alerta {
  width: min(760px, 92%);
  margin: 16px auto;
  padding: 14px 16px;
  border: 1px solid;
  border-radius: 8px;
  display: flex;
  gap: 12px;
  text-align: left;
  align-items: flex-start;
}

.alerta strong {
  display: block;
}

.alerta p {
  margin: 3px 0 0;
  line-height: 1.45;
}

.alerta-icone {
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
}

.alerta-icone svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

.alerta-erro {
  background: #fff1f0;
  border-color: #f5b5ae;
  color: #b42318;
}

.alerta-aviso {
  background: #fff7e6;
  border-color: #ffd28a;
  color: #a15c07;
}

.alerta-info {
  background: #eef4ff;
  border-color: #b7ccff;
  color: #155eef;
}

.alerta-sucesso {
  background: #ecfdf3;
  border-color: #9fe0bf;
  color: #067647;
}
</style>
