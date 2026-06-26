<template>
  <div class="alerta" :class="`alerta-${tipo}`" role="alert">
    <span class="alerta-icone">{{ icone }}</span>
    <div class="alerta-conteudo">
      <strong class="alerta-titulo">{{ tituloFinal }}</strong>
      <p class="alerta-mensagem">{{ mensagem }}</p>
    </div>
    <button class="alerta-fechar" @click="$emit('fechar')" aria-label="Fechar alerta">
      ×
    </button>
  </div>
</template>

<script>
export default {
  name: "AlertaComponent",
  props: {
    tipo: {
      type: String,
      required: true,
      validator: (valor) => ["erro", "aviso", "info", "sucesso"].includes(valor),
    },
    mensagem: {
      type: String,
      required: true,
    },
    titulo: {
      type: String,
      default: "",
    },
  },
  emits: ["fechar"],
  computed: {
    icone() {
      const icones = {
        erro: "⛔",
        aviso: "⚠️",
        info: "ℹ️",
        sucesso: "✅",
      };
      return icones[this.tipo];
    },
    tituloFinal() {
      if (this.titulo) return this.titulo;
      const titulos = {
        erro: "Erro",
        aviso: "Atenção",
        info: "Informação",
        sucesso: "Sucesso",
      };
      return titulos[this.tipo];
    },
  },
};
</script>

<style scoped>
.alerta {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 10px;
  border-left: 6px solid;
  margin: 16px auto;
  max-width: 600px;
  text-align: left;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  animation: entrada 0.25s ease-out;
}

.alerta-icone {
  font-size: 22px;
  line-height: 1;
}

.alerta-conteudo {
  flex: 1;
}

.alerta-titulo {
  display: block;
  margin-bottom: 2px;
  font-size: 15px;
}

.alerta-mensagem {
  margin: 0;
  font-size: 14px;
  color: #444;
}

.alerta-fechar {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #888;
  line-height: 1;
}

.alerta-fechar:hover {
  color: #222;
}

/* Vermelho: erros de preenchimento ou ações inválidas */
.alerta-erro {
  background-color: #fdecea;
  border-color: #e53935;
}
.alerta-erro .alerta-titulo {
  color: #c62828;
}

/* Laranja: alertas e avisos importantes */
.alerta-aviso {
  background-color: #fff4e5;
  border-color: #fb8c00;
}
.alerta-aviso .alerta-titulo {
  color: #ef6c00;
}

/* Azul: informações contextuais e gerais */
.alerta-info {
  background-color: #e8f1fb;
  border-color: #1e88e5;
}
.alerta-info .alerta-titulo {
  color: #1565c0;
}

/* Verde: sucesso ao cadastrar, editar ou excluir dados */
.alerta-sucesso {
  background-color: #e9f6ec;
  border-color: #43a047;
}
.alerta-sucesso .alerta-titulo {
  color: #2e7d32;
}

@keyframes entrada {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
