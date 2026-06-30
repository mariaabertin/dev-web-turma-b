<template>
  <div class="alerta" :class="`alerta--${tipo}`" role="alert" aria-live="assertive">
    <span class="alerta-icone" aria-hidden="true">
      <!-- erro -->
      <svg v-if="tipo === 'erro'" viewBox="0 0 24 24" width="22" height="22">
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="#fff" stroke-width="2" stroke-linecap="round" />
      </svg>
      <!-- aviso -->
      <svg v-else-if="tipo === 'aviso'" viewBox="0 0 24 24" width="22" height="22">
        <path d="M12 3l9.5 16.5h-19z" fill="currentColor" />
        <path d="M12 9v5" stroke="#fff" stroke-width="2" stroke-linecap="round" />
        <circle cx="12" cy="17" r="1.2" fill="#fff" />
      </svg>
      <!-- info -->
      <svg v-else-if="tipo === 'info'" viewBox="0 0 24 24" width="22" height="22">
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <circle cx="12" cy="8" r="1.3" fill="#fff" />
        <path d="M12 11v6" stroke="#fff" stroke-width="2" stroke-linecap="round" />
      </svg>
      <!-- sucesso -->
      <svg v-else viewBox="0 0 24 24" width="22" height="22">
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path d="M7.5 12.5l3 3 6-6.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      </svg>
    </span>

    <div class="alerta-texto">
      <strong v-if="titulo" class="alerta-titulo">{{ titulo }}</strong>
      <ul v-if="Array.isArray(mensagem)" class="alerta-lista">
        <li v-for="(item, i) in mensagem" :key="i">{{ item }}</li>
      </ul>
      <span v-else>{{ mensagem }}</span>
    </div>

    <button v-if="fechavel" class="alerta-fechar" @click="$emit('fechar')" aria-label="Fechar alerta">×</button>
  </div>
</template>

<script>
export default {
  name: "AlertaComponent",
  props: {
    // "erro" | "aviso" | "info" | "sucesso"
    tipo: { type: String, default: "info" },
    titulo: { type: String, default: "" },
    // texto único ou lista de mensagens
    mensagem: { type: [String, Array], default: "" },
    fechavel: { type: Boolean, default: true },
  },
  emits: ["fechar"],
};
</script>

<style scoped>
.alerta {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  text-align: left;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid;
  border-left-width: 5px;
  font-size: 15px;
  line-height: 1.45;
  margin: 0 auto 18px;
  max-width: 720px;
  animation: alerta-entra 0.22s ease-out;
}

.alerta-icone { flex-shrink: 0; line-height: 0; margin-top: 1px; }
.alerta-texto { flex: 1; }
.alerta-titulo { display: block; margin-bottom: 2px; }
.alerta-lista { margin: 4px 0 0; padding-left: 18px; }
.alerta-lista li { margin: 2px 0; }

.alerta-fechar {
  background: none;
  border: none;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  color: inherit;
  opacity: 0.6;
  padding: 0 2px;
}
.alerta-fechar:hover { opacity: 1; }

.alerta--erro    { background: var(--erro-bg);  border-color: var(--erro-bd);  color: var(--erro-tx); }
.alerta--aviso   { background: var(--aviso-bg); border-color: var(--aviso-bd); color: var(--aviso-tx); }
.alerta--info    { background: var(--info-bg);  border-color: var(--info-bd);  color: var(--info-tx); }
.alerta--sucesso { background: var(--ok-bg);    border-color: var(--ok-bd);    color: var(--ok-tx); }

/* o ícone usa a cor da borda (mais saturada que o texto) */
.alerta--erro    .alerta-icone { color: var(--erro-bd); }
.alerta--aviso   .alerta-icone { color: var(--aviso-bd); }
.alerta--info    .alerta-icone { color: var(--info-bd); }
.alerta--sucesso .alerta-icone { color: var(--ok-bd); }

@keyframes alerta-entra {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
