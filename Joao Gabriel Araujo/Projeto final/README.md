# Projeto Final - Pastelaria do Joao

**Aluno:** Joao Gabriel Araujo
**Turma:** Dev Web - Turma B

Sistema de pedidos online para uma pastelaria, desenvolvido em Vue 3 a partir da base do sistema T-Burguer.

## Links do Projeto

- **Site publicado:** https://joaogabrielao.github.io/Pastelaria_projeto_final/
- **API publica (Render):** https://pastelaria-banco-json.onrender.com
- **Repositorio do codigo:** https://github.com/JoaoGabrielAO/Pastelaria_projeto_final
- **Repositorio do banco (JSON):** https://github.com/JoaoGabrielAO/pastelaria-banco-json

## Visao Geral

O segmento escolhido foi uma pastelaria. O cliente escolhe o sabor do pastel, o tamanho (Individual, Grande ou Familia) e opcionais (borda de catupiry, queijo extra, bacon e molho da casa).

Principais alteracoes:
- Nova identidade visual (nome, cores marrom/laranja e emoji).
- Cardapio carregado dinamicamente da API.
- Formulario adaptado ao tema (sabor, tamanho e opcionais).
- Validacao de campos obrigatorios.
- Componente de alertas semanticos reutilizavel.
- Listagem de pedidos com exclusao em tempo real.

## Logica dos Alertas Semanticos

Componente reutilizavel (AlertaComponent.vue) que recebe via props: visivel, tipo e mensagem. Cada tipo aplica uma cor: vermelho (erro), laranja (aviso), azul (info), verde (sucesso).

A validacao acontece no metodo confirmarPedido(). Se um campo obrigatorio estiver vazio, o alerta e exibido e o envio e bloqueado com return.

## Como rodar localmente

```bash
npm install
npm run serve
# em outro terminal:
npx json-server --watch db/db.json --port 3000
```
