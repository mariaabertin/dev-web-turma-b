# PetSpa - Projeto Final de Desenvolvimento Web

Este projeto é a adaptação do sistema **T-Burguer** para um **PetSpa**, com foco em agendamento de serviços de banho, tosa, hidratação e spa para pets.

## ✅ O que foi feito
- Substituição completa da identidade visual.
- Atualização de telas, textos e estrutura para o novo negócio.
- Adição de validação em formulário e alertas semânticos.
- Implementação de redirecionamento automático após confirmação de agendamento.
- Uso de mock local com `src/services/api.js` e suporte opcional para **JSON Server**.
- Deploy preparado para **GitHub Pages** com `publicPath: './'`.

## 🚀 Como rodar o projeto
### Instalar dependências
```bash
npm install
```

### Executar o front-end
```bash
npm run serve
```

### Executar apenas o JSON Server (mock API)
```bash
npm run serve:api
```

### Executar o sistema local completo com módulos diretos
```bash
npm run serve:local
```

> Se você estiver usando o pacote com `node_modules` local, este comando usa o caminho direto dos módulos instalados:
> `node node_modules/@vue/cli-service/bin/vue-cli-service.js serve | node node_modules/json-server/lib/cli/bin.js --watch db/db.json --port 3000`

## 📁 Estrutura do projeto
- `src/` - Código-fonte do Vue 3
- `public/` - Arquivos públicos e estáticos
- `db/db.json` - Base de dados do JSON Server
- `src/services/api.js` - Serviço que alimenta os dados do app
- `README.md` - Documentação principal para entrega

## 📌 Endpoints da API local
- `GET /produtos`
- `GET /pedidos`
- `POST /pedidos`
- `DELETE /pedidos/:id`

## 🌐 Deploy
- GitHub Pages: `https://ofxzinho.github.io/dev-web-turma-b/`

## 💡 Observações sobre os repositórios
O professor solicitou dois repositórios:
1. Um para o projeto front-end
2. Um para o banco JSON Server

Neste repositório está o projeto front-end completo e o arquivo `db/db.json` já preparado para ser usado no segundo repositório de API.

## 📎 Filtros de entrega
- `src` presente: sim
- `public` presente: sim
- `db/db.json` presente: sim
- `README.md` na raiz: sim
