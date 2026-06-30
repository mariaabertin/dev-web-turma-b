<template>
  <div id="conteudo" :class="temaAtual">
    <!-- Botão de tema -->
    <button class="btn-tema" @click="alternarTema" :aria-label="temaAtual === 'tema-escuro' ? 'Ativar modo claro' : 'Ativar modo escuro'">
      {{ temaAtual === 'tema-escuro' ? '☀️' : '🌙' }}
    </button>

    <HeaderComponent />

    <router-view />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
  },
  data() {
    return {
      temaAtual: "tema-escuro",
    };
  },
  mounted() {
    this.temaAtual = localStorage.getItem("tema") || "tema-escuro";
  },
  methods: {
    alternarTema() {
      this.temaAtual = this.temaAtual === "tema-escuro" ? "tema-claro" : "tema-escuro";
      localStorage.setItem("tema", this.temaAtual);
    },
  },
};
</script>

<style>
/* ============================================================
   ESTILOS GLOBAIS — PALETA VERMELHO / GRAFITE
   ============================================================ */
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Trebuchet MS', 'Segoe UI', Arial, sans-serif;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  transition: background 0.3s, color 0.3s;
}

/* Tema escuro (padrão) — grafite */
body:has(#conteudo.tema-escuro) {
  background: #121214;
  color: #f4f4f5;
}

/* Tema claro */
body:has(#conteudo.tema-claro) {
  background: #f5f5f7;
  color: #232328;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Variáveis de tema (cascateiam para views e componentes) */
.tema-escuro {
  --bg-header:    linear-gradient(135deg, #2b2b30, #161618);
  --bg-card:      linear-gradient(160deg, #2b2b30, #1b1b1f);
  --bg-card-foto: #161618;
  --bg-grupo:     #1e1e22;
  --bg-selecao:   #2b2b30;
  --bg-input:     #2b2b30;
  --border:       #44444c;
  --text-primary: #f4f4f5;
  --text-muted:   #a8a8b3;
  --text-idade:   #c0c0c8;
  --accent:       #e63946;
  --accent-forte: #ff4d5a;
  --contraste:    #ffffff;
  --erro-bg:      #3d1a1a;
  --erro-border:  #c0392b;
  --erro-text:    #ff6b6b;
}

.tema-claro {
  --bg-header:    linear-gradient(135deg, #3a3a40, #5a5a64);
  --bg-card:      #ffffff;
  --bg-card-foto: #f0f0f2;
  --bg-grupo:     #ececef;
  --bg-selecao:   #ffffff;
  --bg-input:     #ffffff;
  --border:       #c8c8d0;
  --text-primary: #232328;
  --text-muted:   #5c5c66;
  --text-idade:   #4a4a54;
  --accent:       #c1121f;
  --accent-forte: #e63946;
  --contraste:    #ffffff;
  --erro-bg:      #fff0f0;
  --erro-border:  #e74c3c;
  --erro-text:    #c0392b;
}

/* Botão de tema */
.btn-tema {
  position: fixed;
  top: 16px;
  right: 16px;
  background: var(--border);
  border: none;
  border-radius: 8px;
  width: 42px;
  height: 42px;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 100;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-tema:hover { transform: scale(1.1); background: var(--accent); }

/* Mensagem de erro (compartilhada entre views) */
.erro {
  background: var(--erro-bg);
  border: 1px solid var(--erro-border);
  color: var(--erro-text);
  padding: 14px 18px;
  border-radius: 6px;
  margin-bottom: 20px;
}

/* Animação de entrada (compartilhada) */
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.fade-enter-from { opacity: 0; transform: translateY(16px); }
.fade-leave-to   { opacity: 0; transform: translateY(-8px); }
</style>
