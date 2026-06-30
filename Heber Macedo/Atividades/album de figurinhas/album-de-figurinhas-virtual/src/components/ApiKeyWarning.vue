<template>
  <div class="warning-container">
    <div class="warning-card">
      <div class="warning-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12.9 2.1a1 1 0 0 0-1.8 0L2.4 18.4A1 1 0 0 0 3.3 20h17.4a1 1 0 0 0 .9-1.6z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
      <h2 class="warning-title">Chave de API N&atilde;o Configurada</h2>
      <p class="warning-text">
        Para utilizar o &aacute;lbum de figurinhas, &eacute; necess&aacute;rio configurar a chave da API-Football.
      </p>
      <div class="steps">
        <h3>Como obter sua chave:</h3>
        <ol>
          <li>Acesse <a href="https://www.api-football.com/" target="_blank" rel="noopener noreferrer">api-football.com</a></li>
          <li>Crie uma conta gratuita</li>
          <li>Acesse o Dashboard e copie sua API Key</li>
          <li>Adicione a vari&aacute;vel de ambiente <code>VITE_API_FOOTBALL_KEY</code></li>
        </ol>
      </div>
      <div class="env-example">
        <p>Exemplo de arquivo <code>.env</code>:</p>
        <pre>VITE_API_FOOTBALL_KEY=sua_chave_aqui</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.warning-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.warning-card {
  max-width: 500px;
  padding: 2.5rem;
  text-align: center;
  background: var(--color-card);
  border: 1px solid rgba(26, 71, 42, 0.12);
  border-radius: 8px;
  box-shadow: 0 14px 34px rgba(19, 43, 30, 0.12);
}

.warning-icon {
  color: #d97706;
  margin-bottom: 1.5rem;
}

.warning-title {
  color: var(--color-text);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.warning-text {
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.steps {
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: left;
  background: #f9fafb;
  border-radius: 8px;
}

.steps h3 {
  color: var(--color-text);
  font-size: 1rem;
  margin-bottom: 1rem;
}

.steps ol {
  padding-left: 1.25rem;
  color: var(--color-text-light);
}

.steps li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.steps a {
  color: var(--color-primary);
  text-decoration: underline;
}

.steps a:hover {
  color: var(--color-secondary);
}

.env-example {
  padding: 1rem 1.5rem;
  text-align: left;
  background: #1a1a1a;
  border-radius: 8px;
}

.env-example p {
  color: #9ca3af;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.env-example pre {
  overflow-x: auto;
  color: #10b981;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.875rem;
}

code {
  padding: 0.125rem 0.375rem;
  color: var(--color-primary);
  background: #e5e7eb;
  border-radius: 4px;
  font-size: 0.875rem;
}
</style>
