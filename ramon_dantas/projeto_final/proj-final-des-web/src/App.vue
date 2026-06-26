<template>
  <div id="app-container">
    <NavBarComponent />
    <main class="main-content">
      <router-view />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import NavBarComponent from "./components/NavBarComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  name: "App",
  components: {
    NavBarComponent,
    FooterComponent,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color-text-main);
}

:root {
  /* --- Cores de Layout e Fundo --- */
  --color-bg: #f8f9fa;
  --color-surface: #ffffff;
  --color-navbar: rgb(30, 41, 59, 0.90);

  /* --- Cores de Branding/Ação --- */
  --color-primary: #42b883;
  --color-primary-hover: #33a06f;
  --color-secondary: #0ea5e9;
  --color-secondary-hover: #0284c7;

  /* --- Tipografia (Texto) --- */
  --color-text-main: #1e293b;
  --color-text-muted: #64748b;
  --color-text-on-dark: #ffffff;

  /* --- Cores de Suporte Interessantes (Bordas e Detalhes) --- */
  --color-border: #e2e8f0;
  --color-border-alt: rgba(0, 0, 0, 0.25);
  --color-shadow: rgba(30, 41, 59, 0.08);

  /* --- Sistema de Alertas (Exigência de Rubrica/UX) --- */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}

#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  padding-top: 70px;
}
</style>