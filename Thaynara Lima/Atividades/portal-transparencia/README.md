# 🏛️ Portal de Transparência Parlamentar

Uma Single Page Application (SPA) desenvolvida em **Vue 3** que consome a API Oficial de Dados Abertos da Câmara dos Deputados. O objetivo do sistema é permitir a listagem, busca e o acompanhamento das despesas públicas declaradas pelos parlamentares.

Este projeto foi desenvolvido como parte da **Atividade 2**.

---

## 🚀 Funcionalidades Realizadas

### 🖥️ Tela 1: Lista e Busca de Deputados
* **Barra de Busca:** Permite pesquisar deputados em tempo real pelo nome diretamente com a API.
* **Layout em Grid/Cards:** Exibição organizada contendo:
  * Foto de perfil (`urlFoto`).
  * Nome do parlamentar.
  * Partido e Estado (`siglaPartido` - `siglaUf`).
  * E-mail de contato oficial.
* **Navegação Dinâmica:** Ao clicar em qualquer card, o usuário é redirecionado para a tela de detalhes (gerenciado via estado `v-if` / `v-else`).

### 🖥️ Tela 2: Detalhes e Lista de Gastos
* **Botão Voltar:** Retorna o usuário para a listagem principal limpando o estado.
* **Cabeçalho com Perfil:** Exibe a foto e dados principais do deputado selecionado.
* **Lista de Despesas Declaradas:** Traz as últimas 15 despesas mais recentes ordenadas por ano de forma decrescente.
* **Cards de Gastos:** Cada item exibe:
  * Tipo da despesa (`tipoDespesa`).
  * Data do documento formatada no padrão brasileiro (`DD/MM/AAAA`).
  * Valor do documento formatado em Real (`R$`).
  * Botão de acesso ao documento original (nota fiscal/recibo) que abre em uma nova aba (`target="_blank"`).

---

## 🛠️ Tecnologias Utilizadas

* [Vue.js 3](https://vuejs.org/) - Framework JavaScript Progressivo.
* [Vite](https://vite.dev/) - Ferramenta de build ultra-rápida.
* [Axios](https://axios-http.com/) - Cliente HTTP baseado em promessas para consumo da API.
* [API de Dados Abertos da Câmara](https://dadosabertos.camara.leg.br/swagger/api.html) - Fonte dos dados públicos dos deputados.

---

## 📦 Como Instalar e Rodar o Projeto Localmente

Siga os passos abaixo para executar a aplicação na sua máquina:

### 1. Clonar ou baixar o projeto
Certifique-se de estar na pasta raiz do projeto onde os arquivos foram criados.

### 2. Instalar as dependências
No terminal, execute o comando abaixo para baixar as pastas necessárias do ecossistema do Node:
```bash
npm install

3. Rodar o servidor de desenvolvimento
npm run dev

4. Acessar no Navegador
Abra o navegador e acesse o endereço fornecido no terminal