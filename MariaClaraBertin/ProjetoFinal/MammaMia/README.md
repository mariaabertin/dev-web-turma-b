# 🍕 Mamma Mia

Sitema de gerenciamento e monitoramento de pedidos em tempo real desenvolvido em **Vue 3**, adaptado a partir da estrutura base do projeto *T-Burguer*. O projeto foi totalmente reformulado para atender ao segmento gastronômico de pizzarias clássicas italianas. Tem como abjetivo possuir uma interface responsiva e integrada a um banco de dados em nuvem.

---

## Links do Projeto
* **Repositório do projeto (GitHub):** [https://github.com/mariaabertin/mammamia](https://github.com/mariaabertin/mammamia)
* **API Oficial (Render):** [https://api-mammamia.onrender.com/menu](https://api-mammamia.onrender.com/menu)
* **Sistema publicado (Vercel):** [https://mammamia-kc85ab4rq-sitemammamia.vercel.app](https://mammamia-kc85ab4rq-sitemammamia.vercel.app)

> Nota sobre o carregamento inicial (Cold Start): Como a API está hospedada na camada gratuita do Render Cloud, o servidor entra em modo de repouso após 15 minutos de inatividade. Ao abrir a aplicação pela primeira vez, as opções de pizza podem levar entre 30 e 50 segundos para carregar enquanto o banco de dados "acorda". Caso as pizzas não apareçam de imediato, basta aguardar alguns instantes e atualizar a página (F5). Os acessos seguintes serão instantâneos!

---

## Visão Geral & Mudanças Realizadas

Para migrar a identidade do antigo *T-Burguer* para a **Mamma Mia**, foram alteradas todas as camadas da aplicação (Interface, Estilização e Banco de Dados):

### 1. Modelo de Negócio & Semântica
O fluxo de montagem de hambúrgueres foi completamente removido. Agora, o usuário escolhe a **Pizza**, define o **Tamanho** (substituindo o antigo "Ponto da Carne") e adiciona **Bordas recheadas / Adicionais** e **Bebidas**.

### 2. Identidade Visual
A interface adota uma paleta baseada nas cores de trattorias italianas tradicionais: **Terracota/Vino (`#5c1d24`)**, **Verde Oliva (`#556b2f`)** e **Dourado Queimado (`#b8860b`)** sobre um fundo *Off-White (`#faf9f6`)*.

* **Ajuste de NavBar:** Correção do Webpack e injeção do título dinâmico no `index.html` e `vue.config.js` para atualizar o título do navegador para `Mamma Mia`.

---

## Solução Técnica dos Alertas (MensagemComponent)

Componente reativo chamado `MensagemComponent.vue` capaz de gerenciar **quatro comportamentos distintos** através da passagem de propriedades (`props`). Ele valida a integridade de dados do lado do cliente (*client-side*) antes de qualquer envio para a API do Render.

### Comportamento Semântico das Cores
* 🔴 **Vermelho (`erro`):** Disparado em falhas de validação estrita (ex: tentar confirmar pedido sem nome ou tamanho).
* 🟠 **Laranja (`aviso`):** Emitido em ações importantes de exclusão ou remoção de registros.
* 🔵 **Azul (`info`):** Alertas de contexto geral ou carregamento.
* 🟢 **Verde (`sucesso`):** Confirmação de persistência realizada com sucesso na API.

### Exemplo de Fluxo no Terminal (Bash)
Abaixo está o ciclo de execução simulado no terminal quando o sistema intercepta, valida e processa as ações do usuário:

```bash
# 1. Usuário tenta clicar em "Confirmar Pedido" deixando campos em branco:
Validação acionada: Campo 'nomeCliente' ou 'tamanhoSelecionado' ausente.
[MensagemComponent]: Renderizando estado dinâmico -> TIPO: "erro" (Caixa Vermelha + ❌)

# 2. Usuário preenche os dados corretamente e reenvia o formulário
Enviando payload JSON para [https://api-mammamia.onrender.com/pedidos].
Registro salvo com sucesso no banco de dados do Render.
[MensagemComponent]: Alternando estado -> TIPO: "sucesso" (Caixa Verde ✅).
[UX]: Iniciando contagem de 3 segundos para o redirecionamento automático para página de pedidos.

# 3. Na tela de Pedidos, o usuário clica no botão de Excluir (Lixeira)
Envia requisição para remover pedido /pedidos/id...
Removido da nuvem. Array filtrado via .filter() local instantaneamente.
[MensagemComponent]: Alternando estado -> TIPO: "aviso" (Caixa Laranja + ⚠️).
```

⚠️ Nota de Usabilidade (UX): Na tela de Configuração do Pedido, a mensagem de feedback visual é injetada estrategicamente logo abaixo do título principal da página. Dependendo do tamanho do monitor ou da rolagem atual do usuário no formulário, pode ser necessário rolar a página para cima para visualizar claramente o banner do alerta (seja ele de erro ou de sucesso).

---

## Diretrizes de UX Implementadas

1.  **Redirecionamento Inteligente da Confirmação:** Assim que o pedido é confirmado com sucesso no fluxo do menu, a aplicação aciona o alerta verde e realiza o redirecionamento automático imediato para a tela de listagem/monitoramento de pedidos via `this.$router.push("/pedidos")`, garantindo um fluxo fluido.
2.  **Atualização de Estado Sem Refresh:** Na tela de listagem de pedidos, a remoção é realizada em tempo real no array de estado. O componente intercepta o sucesso da requisição `DELETE` e re-renderiza o DOM instantaneamente via `.filter()`, fazendo o pedido desaparecer da tela sem necessidade de refresh.



