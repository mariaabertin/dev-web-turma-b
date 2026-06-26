<template>
  <div id="app">
    <header class="app-header">
      <div>
        <strong>Portal de Transparência Parlamentar</strong>
        <p>Lista de deputados e acompanhamento das despesas públicas.</p>
      </div>
    </header>

    <main>
      <router-view />
    </main>

    <footer class="app-footer">
      Dados Abertos da Câmara dos Deputados • Curso Vue 3
    </footer>
  </div>
</template>

<style scoped>
.app-header {
  background: #034f32;
  color: #fff;
  padding: 1.4rem 1.2rem;
  border-radius: 0 0 1rem 1rem;
}

.app-header strong {
  font-size: 1.4rem;
}

.app-header p {
  margin: 0.5rem 0 0;
  color: #daf1dc;
}

.app-footer {
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
  color: #555;
  font-size: 0.95rem;
}
</style>
