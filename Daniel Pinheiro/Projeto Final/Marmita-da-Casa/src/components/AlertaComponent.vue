<template>
  <!-- Só aparece quando "visivel" for true (mesmo padrão de v-show das aulas).
       Cada tipo de alerta tem seu próprio bloco, exibido conforme o "tipo". -->
  <div v-show="visivel">
    <div v-show="tipo === 'erro'" class="alerta alerta--erro" role="alert">
      <span class="alerta__icone">✕</span>
      <p class="alerta__mensagem">{{ mensagem }}</p>
      <button type="button" class="alerta__fechar" @click="$emit('fechar')">×</button>
    </div>

    <div v-show="tipo === 'aviso'" class="alerta alerta--aviso" role="alert">
      <span class="alerta__icone">!</span>
      <p class="alerta__mensagem">{{ mensagem }}</p>
      <button type="button" class="alerta__fechar" @click="$emit('fechar')">×</button>
    </div>

    <div v-show="tipo === 'info'" class="alerta alerta--info" role="alert">
      <span class="alerta__icone">i</span>
      <p class="alerta__mensagem">{{ mensagem }}</p>
      <button type="button" class="alerta__fechar" @click="$emit('fechar')">×</button>
    </div>

    <div v-show="tipo === 'sucesso'" class="alerta alerta--sucesso" role="alert">
      <span class="alerta__icone">✓</span>
      <p class="alerta__mensagem">{{ mensagem }}</p>
      <button type="button" class="alerta__fechar" @click="$emit('fechar')">×</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlertaComponent",
  // tipo aceita: "erro" (vermelho), "aviso" (laranja), "info" (azul), "sucesso" (verde)
  props: {
    tipo: String,
    mensagem: String,
    visivel: Boolean,
  },
  emits: ["fechar"],
};
</script>

<style scoped>
.alerta {
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 750px;
  margin: 16px auto;
  padding: 14px 18px;
  border-radius: 10px;
  border-left: 6px solid;
  font-weight: bold;
  text-align: left;
}

.alerta__icone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: #fff;
  font-size: 16px;
  flex-shrink: 0;
}

.alerta__mensagem {
  flex: 1;
  margin: 0;
}

.alerta__fechar {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px;
  line-height: 1;
  color: inherit;
}

/* Vermelho — erros de preenchimento ou ações inválidas */
.alerta--erro {
  background: #fdecea;
  border-color: #e74c3c;
  color: #a93226;
}
.alerta--erro .alerta__icone {
  background: #e74c3c;
}

/* Laranja — alertas e avisos importantes */
.alerta--aviso {
  background: #fef5e7;
  border-color: #e67e22;
  color: #b9770e;
}
.alerta--aviso .alerta__icone {
  background: #e67e22;
}

/* Azul — informações contextuais e gerais */
.alerta--info {
  background: #eaf2fb;
  border-color: #3498db;
  color: #2471a3;
}
.alerta--info .alerta__icone {
  background: #3498db;
}

/* Verde — sucesso ao cadastrar, editar ou excluir */
.alerta--sucesso {
  background: #eafaf1;
  border-color: #27ae60;
  color: #1e8449;
}
.alerta--sucesso .alerta__icone {
  background: #27ae60;
}
</style>
