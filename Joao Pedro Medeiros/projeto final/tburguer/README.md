# T-Flor - Sistema de Encomendas Florais

## Visao geral

Este projeto evolui a base do **T-Burguer** trabalhada em aula para um novo segmento comercial: uma floricultura chamada **T-Flor**. A estrutura foi mantida conforme a referencia do professor em `Professor/Projeto Final/tburguer`, preservando componentes como `NavBarComponent`, `BannerComponent`, `PedidoComponent`, `ListaPedidoComponent`, `MenuView`, `ConfiguracaoPedidoView` e `PedidosView`.

Principais alteracoes realizadas:

- troca da identidade visual para T-Flor, com logo em `public/img/logo_tflor.svg` e banner floral em `public/img/banner.jpeg`;
- substituicao do menu de hamburgueres por um menu de arranjos florais em `MenuView.vue`;
- adaptacao do formulario de pedido em `PedidoComponent.vue`, removendo "Ponto da carne" e adicionando tamanho do arranjo, flores principais, embalagem, entrega, data especial e mensagem no cartao;
- atualizacao do `db/db.json` para endpoints de floricultura: `menu`, `tamanhos`, `opcionais`, `status_pedido` e `pedidos`;
- monitoramento de pedidos com atualizacao de status e exclusao em tempo real em `ListaPedidoComponent.vue`.

## Checklist do aluno

- [x] Definir o novo tema e escopo do projeto, usando um segmento diferente de hamburgueres: floricultura T-Flor.
- [x] Adaptar textos, campos, dados e trocar imagens ilustrativas para a nova identidade visual.
- [x] Configurar validacao de formularios para impedir pedidos vazios ou sem campos obrigatorios.
- [x] Desenvolver alertas semanticos reativos com os estados de erro, aviso, informacao e sucesso.
- [x] Garantir diretrizes de experiencia do usuario com redirecionamento automatico apos o pedido e lista atualizada em tempo real.
- [x] Publicar as aplicacoes com front-end no GitHub Pages e mock JSON Server publico.
- [x] Construir README com mudancas realizadas, trechos de codigo, logica dos alertas e links publicos.

Trecho da validacao principal:

```js
if (
  !this.tamanhoSelecionado ||
  this.listaFloresSelecionadas.length === 0 ||
  !this.embalagemSelecionada ||
  !this.entregaSelecionada
) {
  this.definirAlerta(
    "erro",
    "Pedido incompleto",
    "Selecione tamanho, flores, embalagem e entrega."
  );
  return false;
}
```

## Solucao tecnica dos alertas

O componente `AlertaComponent.vue` centraliza os feedbacks visuais solicitados. Ele recebe `tipo`, `titulo` e `mensagem` por props e aplica classes semanticas:

- `erro`: vermelho para campos obrigatorios e falhas de API;
- `aviso`: laranja para alertas importantes, como data invalida ou fila vazia;
- `info`: azul para informacoes contextuais;
- `sucesso`: verde para cadastro, edicao de status e exclusao.

Uso nos componentes:

```vue
<AlertaComponent
  :tipo="alerta.tipo"
  :titulo="alerta.titulo"
  :mensagem="alerta.mensagem"
/>
```

O estado reativo fica no proprio componente de tela:

```js
definirAlerta(tipo, titulo, mensagem) {
  this.alerta = { tipo, titulo, mensagem };
}
```

## Fluxo de UX implementado

Apos confirmar um pedido, o sistema exibe alerta de sucesso e redireciona automaticamente para a tela de monitoramento:

```js
setTimeout(() => {
  this.$router.push({ path: "/pedidos", query: { atualizado: "1" } });
}, 1200);
```

Na tela de pedidos, a listagem busca os dados atualizados no JSON Server. Ao excluir um pedido, a interface remove o item do array local imediatamente:

```js
this.listaPedidosRealizados = this.listaPedidosRealizados.filter(
  (pedido) => pedido.id !== idPedido
);
```

Na publicacao web, a API mockada usa o My JSON Server. Como esse servico simula POST/PATCH/DELETE sem persistir os dados no repositorio, os pedidos criados no navegador tambem sao guardados em `localStorage` quando a URL de producao aponta para `my-json-server.typicode.com`. Dessa forma, o fluxo publicado continua demonstrando a atualizacao imediata da lista apos cadastrar, editar ou excluir pedidos.

## Como executar localmente

Instale as dependencias:

```bash
npm install
```

Inicie o JSON Server:

```bash
npm run bancojson
```

Em outro terminal, rode o Vue:

```bash
npm run serve
```

## Variaveis de ambiente

O projeto segue o padrao da base de aula usando a propriedade global `$apiUrl`, configurada em `src/main.js` a partir da variavel:

```txt
VUE_APP_API_BASE_URL=http://localhost:3000
```

Em producao, edite `.env.production` com a URL publica do JSON Server.

## Links de publicacao

Links publicos do projeto:

- API JSON Server: `https://my-json-server.typicode.com/JPMFA2004/banco-json`
- Producao GitHub Pages: `https://jpmfa2004.github.io/t-flor/`
- Repositorio do projeto: `https://github.com/JPMFA2004/t-flor`

## Deploy sugerido

Para gerar a pasta de producao:

```bash
npm run build
```

Publique a pasta `dist` no GitHub Pages. O projeto usa `createWebHashHistory()` para evitar erro de rota ao recarregar a pagina em producao.
