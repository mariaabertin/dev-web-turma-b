# 🚀 GUIA DE DEPLOY - PizzaFresh

Este arquivo contém instruções passo a passo para publicar o projeto PizzaFresh em produção.

---

## FASE 1: PREPARAÇÃO LOCAL

### 1.1 Instalar Dependências
```bash
cd "caminho/para/pizzeria-web"
npm install
```

### 1.2 Testar Localmente
```bash
# Terminal 1: Iniciar JSON Server
npm run bancojson

# Terminal 2: Iniciar Vue CLI
npm run serve
```

Acesse `http://localhost:8080` para testar.

### 1.3 Build para Produção
```bash
npm run build
```

Isso gera a pasta `/dist` com arquivos otimizados.

---

## FASE 2: CRIAR REPOSITÓRIOS NO GITHUB

### 2.1 Repositório Frontend (pizzeria-web)

1. Acesse [GitHub.com](https://github.com)
2. Clique em **"New repository"**
3. Configure:
   - **Repository name**: `pizzeria-web`
   - **Description**: "Sistema de Pedidos de Pizzaria - Vue 3"
   - **Public**: Sim (necessário para GitHub Pages)
   - **Initialize with**: None
4. Clique em **"Create repository"**

### 2.2 Repositório Backend (pizzeria-api)

Repita o processo anterior com:
   - **Repository name**: `pizzeria-api`
   - **Description**: "API Mockada com JSON Server para PizzaFresh"

---

## FASE 3: PUBLICAR FRONTEND NO GITHUB PAGES

### 3.1 Clonar e Adicionar Repositório

```bash
cd "caminho/para/pizzeria-web"
git init
git add .
git commit -m "Initial commit: PizzaFresh Sistema de Pedidos"
git branch -M main
git remote add origin https://github.com/seu-usuario/pizzeria-web.git
git push -u origin main
```

### 3.2 Configurar GitHub Pages

1. Acesse seu repositório no GitHub
2. Vá para **Settings** → **Pages**
3. Em **Source**, selecione:
   - Branch: `main`
   - Folder: `/dist` (NÃO root)
4. Clique em **"Save"**

⚠️ **IMPORTANTE**: Você precisa ter a pasta `/dist` no repositório ou usar GitHub Actions

### 3.3 Usar GitHub Actions (Alternativa Automática)

Crie arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build project
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Commit e push esse arquivo. O GitHub construirá e publicará automaticamente.

**URL de acesso**: `https://seu-usuario.github.io/pizzeria-web`

---

## FASE 4: PUBLICAR BACKEND NO RENDER (ou alternativa)

### 4.1 Preparar Repositório da API

1. Clone o repositório `pizzeria-api` (já criado)
2. Adicione o `db.json` na raiz
3. Crie arquivo `package.json`:

```json
{
  "name": "pizzeria-api",
  "version": "1.0.0",
  "description": "API Mockada para PizzaFresh",
  "main": "db.json",
  "scripts": {
    "start": "json-server --host 0.0.0.0 --port 3000 db.json"
  },
  "dependencies": {
    "json-server": "^0.17.4"
  }
}
```

4. Push para GitHub:
```bash
git add .
git commit -m "Initial commit: PizzaFresh JSON Server API"
git push -u origin main
```

### 4.2 Deploy no Render

1. Acesse [render.com](https://render.com)
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu repositório GitHub `pizzeria-api`
4. Configure:
   - **Name**: `pizzeria-api`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (gratuito)
5. Clique em **"Deploy Web Service"**

⏳ Aguarde ~5 minutos para o deploy completar

**URL de acesso**: `https://pizzeria-api.onrender.com`

### 4.3 Alternativa: Railway

1. Acesse [railway.app](https://railway.app)
2. Clique em **"New Project"** → **"Deploy from GitHub"**
3. Selecione o repositório `pizzeria-api`
4. Configure variável `PORT=3000` (se necessário)
5. Railway detectará automaticamente e fará deploy

**URL de acesso**: Fornecida automaticamente

---

## FASE 5: ATUALIZAR URLS DO FRONTEND

### 5.1 Atualizar .env.production

Arquivo `.env.production`:
```dotenv
VUE_APP_API_BASE_URL=https://pizzeria-api.onrender.com
```

Substitua `pizzeria-api` pela URL real do seu deploy.

### 5.2 Rebuild e Republish

```bash
npm run build
git add .
git commit -m "Update API URL to production"
git push origin main
```

O GitHub Actions (ou manual) reconstrói o site.

---

## FASE 6: TESTAR EM PRODUÇÃO

### 6.1 Verificar Frontend
- Acesse: `https://seu-usuario.github.io/pizzeria-web`
- Navegue pelo menu
- Teste a criação de um pedido

### 6.2 Verificar API
- Acesse: `https://pizzeria-api.onrender.com/menu`
- Acesse: `https://pizzeria-api.onrender.com/pedidos`
- Deve retornar JSON

### 6.3 Testar Integração
1. Vá até a página de menu
2. Selecione uma pizza
3. Preencha o formulário
4. Confirme o pedido
5. Verifique se o alerta aparece e redireciona
6. Veja o pedido na listagem

---

## 📋 TROUBLESHOOTING

### Problema: "GitHub Pages não está gerando a página"
- **Solução**: Certifique-se de que a pasta `/dist` foi gerada com `npm run build`
- Use GitHub Actions para automatizar

### Problema: "API retorna CORS error"
- **Solução**: JSON Server por padrão permite CORS. Se mesmo assim tiver erro:
  - Criar arquivo `db.js` ao invés de `db.json`
  - Configurar CORS explicitamente

### Problema: "Alertas não aparecem em produção"
- **Verifique**: Console do navegador (F12 → Console)
- **Possível causa**: Caminho de import incorreto
- **Solução**: Verificar `process.env.VUE_APP_API_BASE_URL`

### Problema: "Pedidos não salvam"
- **Verifique**: Se a API está rodando
- **Verifique**: Se a URL está correta em `.env.production`
- **Teste**: Acessar diretamente a API no navegador

---

## ✅ CHECKLIST FINAL

Antes de considerar o deploy completo:

- [ ] Frontend está disponível em GitHub Pages
- [ ] API está respondendo corretamente
- [ ] Integração funciona (criar pedido e receber resposta)
- [ ] Alertas aparecem corretamente
- [ ] Redirecionamento após pedido funciona
- [ ] Lista de pedidos atualiza em tempo real
- [ ] Exclusão de pedidos funciona
- [ ] Responsividade mantida em mobile
- [ ] README.md está atualizado com links
- [ ] Ambos repositórios estão públicos

---

## 📞 CONTATOS ÚTEIS

- **GitHub Docs**: https://docs.github.com
- **GitHub Pages**: https://pages.github.com
- **Render Docs**: https://render.com/docs
- **Railway Docs**: https://docs.railway.app
- **Vue.js Docs**: https://vuejs.org

---

**Tempo estimado total**: 30-45 minutos

Após completar, você terá um sistema completo de pizzaria publicado e acessível ao público! 🍕🎉
