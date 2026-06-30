<template>
  <div id="app">
    <NavBarComponent />
    <BannerComponent />
    <main class="conteudo">
      <router-view />
    </main>
    <footer class="rodape">
      <p>Bella Pizza · Forno a lenha desde sempre · Brasília — DF</p>
    </footer>
  </div>
</template>

<script>
import BannerComponent from "./components/BannerComponent.vue";
import NavBarComponent from "./components/NavBarComponent.vue";
export default {
  name: "App",
  components: {
    NavBarComponent,
    BannerComponent,
  },
};
</script>

<style>
:root {
  /* Marca */
  --brand: #c8201f;        /* tomate */
  --brand-dark: #9e1714;   /* tomate escuro (hover) */
  --basil: #2e7d32;        /* manjericão */
  --wood: #2b1a14;         /* forno a lenha (navbar/rodapé) */
  --cream: #fff8f0;        /* mussarela / fundo */
  --ink: #2c2420;          /* texto */
  --muted: #7a6f68;        /* texto secundário */
  --line: #ece2d8;         /* divisórias */
  --card: #ffffff;

  /* Cores semânticas dos alertas */
  --erro-bg: #fdecea;   --erro-bd: #e53935;   --erro-tx: #b71c1c;
  --aviso-bg: #fff4e5;  --aviso-bd: #fb8c00;  --aviso-tx: #e65100;
  --info-bg: #e8f1fb;   --info-bd: #1e88e5;   --info-tx: #0d47a1;
  --ok-bg: #eaf6ec;     --ok-bd: #43a047;     --ok-tx: #1b5e20;

  --display: "Fraunces", Georgia, "Times New Roman", serif;
  --body: "Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  --radius: 14px;
  --shadow: 0 8px 24px rgba(43, 26, 20, 0.08);
}

* { box-sizing: border-box; }

html, body { margin: 0; padding: 0; }

body {
  background:
    radial-gradient(circle at 12% -5%, #fff 0, var(--cream) 38%),
    var(--cream);
  color: var(--ink);
  font-family: var(--body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

#app { display: flex; flex-direction: column; min-height: 100vh; }

h1, h2, h3 {
  font-family: var(--display);
  color: var(--ink);
  letter-spacing: -0.01em;
}

.conteudo {
  flex: 1;
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: 36px 20px 56px;
}

.conteudo h1 {
  font-size: clamp(28px, 4vw, 40px);
  margin: 0 0 6px;
}

button { font-family: var(--body); }

a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 3px solid rgba(200, 32, 31, 0.35);
  outline-offset: 2px;
}

.rodape {
  background: var(--wood);
  color: #f3e7da;
  text-align: center;
  padding: 26px 16px;
  font-size: 14px;
}
.rodape p { margin: 4px 0; }
.rodape-mini { color: #c8b4a4; font-size: 12px; }

@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}
</style>
