# 🥐 Bistrô Français

Sistema web de pedidos para restaurante francês, desenvolvido como Projeto Final do curso de Desenvolvimento Web. A aplicação permite visualizar o menu, montar e realizar pedidos, e gerenciar o status de cada pedido realizado.

---

## 🖥️ Tecnologias Utilizadas

| Tecnologia | Versão | Função |
|---|---|---|
| [Vue.js](https://vuejs.org/) | 3.2.13 | Framework front-end (SPA) |
| [Vue Router](https://router.vuejs.org/) | 4.0.3 | Gerenciamento de rotas |
| [JSON Server](https://github.com/typicode/json-server) | 0.17.4 | API REST fake (banco de dados local) |
| [Vue CLI](https://cli.vuejs.org/) | 5.0.0 | Tooling e build |
| [Core JS](https://github.com/zloirock/core-js) | 3.8.3 | Polyfills de compatibilidade |

---

## 📁 Estrutura do Projeto

```
tburguer/
├── db/
│   └── db.json                      # Banco de dados (JSON Server)
├── public/
│   ├── index.html                   # HTML raiz da aplicação
│   └── img/
│       └── icone_lixeira.png        # Ícone de exclusão de pedido
├── src/
│   ├── main.js                      # Ponto de entrada da aplicação
│   ├── App.vue                      # Componente raiz
│   ├── router/
│   │   └── index.js                 # Definição de rotas
│   ├── views/
│   │   ├── MenuView.vue             # Tela do cardápio
│   │   ├── ConfiguracaoPedidoView.vue  # Tela de configuração do pedido
│   │   └── PedidosView.vue          # Tela de pedidos realizados
│   └── components/
│       ├── NavBarComponent.vue      # Barra de navegação
│       ├── BannerComponent.vue      # Banner principal
│       ├── AlertaComponent.vue      # Componente de feedback visual
│       ├── PedidoComponent.vue      # Formulário de pedido
│       └── ListaPedidoComponent.vue # Lista de pedidos realizados
├── .env.development                 # Variáveis de ambiente (desenvolvimento)
├── .env.production                  # Variáveis de ambiente (produção)
└── package.json
```

---

## ⚙️ Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) — versão 14 ou superior
- [Vue CLI](https://cli.vuejs.org/) — instalado globalmente

Para instalar o Vue CLI globalmente:

```bash
npm install -g @vue/cli
```

---

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Danieldiaxf/dev-web-turma-b.git
cd dev-web-turma-b/DanielDias/ProjetoFinal/tburguer
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o banco de dados (JSON Server)

Abra um terminal e rode:

```bash
npm run bancojson
```

> A API ficará disponível em `http://localhost:3000`

### 4. Inicie a aplicação Vue

Abra **outro terminal** e rode:

```bash
npm run serve
```

> A aplicação ficará disponível em `http://localhost:8080`

---

## 🗺️ Rotas da Aplicação

| Rota | View | Descrição |
|---|---|---|
| `/` | `MenuView` | Página inicial — exibe o cardápio |
| `/menu` | `MenuView` | Cardápio de pratos disponíveis |
| `/config-pedido` | `ConfiguracaoPedidoView` | Formulário para montar o pedido |
| `/pedidos` | `PedidosView` | Lista de pedidos realizados |

---

## 🍽️ Funcionalidades

- **Cardápio** — listagem dos pratos com foto, nome, preço e badge de novidade
- **Realizar Pedido** — seleção de prato, molho, acompanhamentos e bebidas
- **Validação de Campos** — campos obrigatórios bloqueiam o envio com alerta visual
- **Feedback Visual** — componente de alerta com 4 tipos: erro, aviso, informação e sucesso
- **Gerenciar Pedidos** — visualização, atualização de status e exclusão de pedidos

---

## 🔌 Endpoints da API (JSON Server)

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/menu` | Retorna o cardápio completo |
| `GET` | `/opcionais` | Retorna acompanhamentos e bebidas |
| `GET` | `/tipos_molho` | Retorna os tipos de molho disponíveis |
| `GET` | `/status_pedido` | Retorna os status de pedido |
| `GET` | `/pedidos` | Lista todos os pedidos |
| `POST` | `/pedidos` | Cria um novo pedido |
| `PATCH` | `/pedidos/:id` | Atualiza o status de um pedido |
| `DELETE` | `/pedidos/:id` | Remove um pedido |

---

## 🧩 Componentes

### `AlertaComponent`
Componente reutilizável de feedback visual. Recebe duas props:

| Prop | Tipo | Valores aceitos |
|---|---|---|
| `mensagem` | `String` | Texto a ser exibido |
| `tipo` | `String` | `erro` / `aviso` / `info` / `sucesso` |

**Exemplo de uso:**
```vue
<AlertaComponent mensagem="Pedido realizado com sucesso!" tipo="sucesso" />
```

### `PedidoComponent`
Formulário de pedido. Recebe o prato selecionado via prop:

| Prop | Tipo | Descrição |
|---|---|---|
| `prato` | `Object` | Objeto do prato selecionado no menu |

---

## 🌐 Variáveis de Ambiente

| Arquivo | Variável | Valor |
|---|---|---|
| `.env.development` | `VUE_APP_API_BASE_URL` | `http://localhost:3000` |
| `.env.production` | `VUE_APP_API_BASE_URL` | `https://api-tburguer.onrender.com` |

A variável é registrada globalmente em `main.js` como `$apiUrl` e utilizada em todos os componentes que fazem requisições à API.

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run serve` | Inicia o servidor de desenvolvimento com hot-reload |
| `npm run build` | Gera o build otimizado para produção na pasta `/dist` |
| `npm run bancojson` | Inicia o JSON Server na porta 3000 |

---

## 👨‍💻 Autor

Desenvolvido por **Daniel Dias** como Projeto Final do curso de Desenvolvimento Web — Turma B.
