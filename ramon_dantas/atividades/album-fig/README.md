# Álbum de Figurinhas ⚽

## 🎯 Objetivo do Sistema
O **Álbum de Figurinhas** é uma aplicação web interativa desenvolvida para simular a experiência de colecionar figurinhas de seleções de futebol. O sistema consome dados reais e atualizados através de uma API externa para listar países e apresentar o elenco convocado de cada seleção em um formato de grid de cards (figurinhas). O foco do sistema é exibir informações detalhadas dos atletas, como foto, nome, posição tática, idade e o número da camisa, de forma rápida e dinâmica.

## 🛠️ Tecnologias Utilizadas
* **Vue.js (Vue 3)**: Framework progressivo responsável pela construção da interface de usuário, gerenciamento de estado (v-model, data) e renderização reativa (v-for, v-if).
* **Vite**: Ferramenta de build e servidor de desenvolvimento otimizado para ambientes modernos.
* **Tailwind CSS**: Framework de CSS utilitário (versão 4) utilizado para a estilização ágil e criação de um layout responsivo em grid.
* **API-Sports (Football API)**: Fornecedor de dados RESTful responsável pela entrega da listagem de países, seleções e elencos completos.

## ✨ Funcionalidades Principais
* **Seleção Dinâmica**: Menu de seleção (dropdown) alimentado pelos endpoints de países da API-Sports.
* **Geração de Figurinhas**: Componentização individual (`FigurinhaComponent`) para cada jogador.
* **Design Responsivo**: Adaptação estrutural do número de colunas do grid de jogadores de acordo com o tamanho da tela do usuário (mobile-first).

## 🚀 Configuração e Execução do Projeto

### Pré-requisitos
* Ter o [Node.js](https://nodejs.org/) instalado na máquina.
* Possuir uma chave de acesso (Token) válida da [API-Sports](https://api-sports.io/).

### Passo a Passo
1. Abra o terminal na raiz do projeto e instale as dependências:
   ```bash
   npm install
   ```
2. Crie um arquivo de variáveis de ambiente com o nome exato de `.env.development` na **raiz** do projeto (no mesmo nível do `package.json` e `vite.config.js`).
3. Insira a sua chave da API no arquivo criado com a seguinte sintaxe:
   ```env
   VITE_API_TOKEN=coloque_a_sua_chave_api_aqui
   ```
4. Inicie o servidor de desenvolvimento do Vite:
   ```bash
   npm run dev
   ```
5. Acesse o endereço local disponibilizado no terminal (geralmente `http://localhost:5173`) através do seu navegador.