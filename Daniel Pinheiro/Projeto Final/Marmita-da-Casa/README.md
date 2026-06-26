# Marmita da Casa

Sistema de pedidos online para uma **marmitaria** desenvolvido em **Vue 3**.

Este projeto foi construído seguindo a estrutura do exemplo do professor **T-Burguer**, com Vue Router, componentes reutilizáveis, consumo com `fetch` e JSON Server. A identidade foi adaptada para o universo da marmitaria, mantendo a lógica e os métodos ensinados em sala.

---

## 1. Visão Geral

A aplicação permite que o usuário:

- visualize o cardápio de marmitas;
- escolha um prato e monte o pedido;
- informe nome, tamanho, acompanhamentos e bebidas;
- confirme o pedido e acompanhe os pedidos realizados;
- altere o status de um pedido e exclua pedidos da lista.

---

## 2. Tecnologias e estrutura utilizadas

- **Vue 3** com **Options API**
- **Vue Router** para navegação entre telas
- **JSON Server** para simular uma API local
- **CSS puro** com `scoped` nos componentes
- **Fetch API** para realizar requisições `GET`, `POST`, `PATCH` e `DELETE`

### Estrutura principal

- `src/views/MenuView.vue` — exibe o cardápio
- `src/views/ConfiguracaoPedidoView.vue` — recebe o prato selecionado e abre o formulário
- `src/components/PedidoComponent.vue` — formulário de pedido e validações
- `src/components/ListaPedidoComponent.vue` — lista, atualiza status e exclui pedidos
- `src/components/AlertaComponent.vue` — feedback visual para ações do sistema
- `src/components/NavBarComponent.vue` e `src/components/BannerComponent.vue` — identidade visual da aplicação

---

## 3. Funcionalidades implementadas

- Exibição de pratos com imagem, nome, descrição e valor
- Navegação para a tela de configuração do pedido
- Validação de formulário com alertas semânticos
- Seleção de acompanhamentos e bebidas
- Cadastro de pedido com valor total calculado
- Listagem de pedidos com status e ação de exclusão
- Atualização do status do pedido
- Interface visual voltada para o tema marmitaria

---

## 4. Como rodar localmente

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor da API mockada:

```bash
npm run bancojson
```

3. Em outro terminal, inicie o projeto:

```bash
npm run serve
```

A API fica disponível em `http://localhost:3000` e o front-end em `http://localhost:8080`.

---

## 5. Observações

Este projeto foi desenvolvido com foco em aprender a estrutura do projeto do professor, mantendo o uso de componentes, rotas, fetch e JSON Server de forma simples e consistente.

Projeto acadêmico — Desenvolvimento Web (Vue 3).

LINKS:
marmita-da-casa-git-main-daniel-pinheiro.vercel.app
https://marmita-da-casa-banco-json.onrender.com

