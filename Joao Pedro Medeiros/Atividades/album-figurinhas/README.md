# Álbum de Figurinhas das Seleções

Aplicação Vue 3 que consome a API-Football para montar um álbum virtual de jogadores das seleções.

## Fluxo da API

1. Carrega países pelo endpoint `/teams/countries`.
2. Busca a seleção escolhida pelo endpoint `/teams?name={pais}`.
3. Usa o ID retornado para carregar o elenco em `/players/squads?team={id}`.

## Configuração

Crie um arquivo `.env` na raiz do projeto com a sua chave:

```sh
VITE_API_FOOTBALL_KEY=sua_chave_da_api
```

## Como rodar

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```
