# 🍕 Pizzaria do Chefe

🌐 **Aplicação:** https://pizzariadochefev.vercel.app/

🗄️ **API:** https://api-pizzariadochefe.onrender.com/

📁 **Repositório:** https://github.com/joaoguilhermee12/pizzariadochefe

> **Aviso de Cold Start:** A API está hospedada na camada gratuita do Render. Após períodos de inatividade, o servidor pode levar até 50 segundos para responder na primeira requisição. Caso o cardápio não carregue imediatamente, aguarde alguns instantes e atualize a página (F5).

---

## Visão Geral

A Pizzaria do Chefe é uma evolução direta do projeto T-Burguer desenvolvido em sala de aula. O sistema foi adaptado para atender ao segmento de pizzaria, preservando a arquitetura base do projeto original e aplicando os conceitos trabalhados ao longo do semestre com Vue 3.

A transição de hamburgueria para pizzaria exigiu repensar a lógica de configuração do pedido. O campo "Ponto da Carne" foi substituído pela escolha de **tamanho** — com precificação individual por tamanho —, e os complementos deram lugar às **bordas recheadas**, com a possibilidade de pedir uma pizza **meio a meio** entre dois sabores. A tela de pedidos foi reformulada para exibir todos os detalhes do pedido em cards individuais, incluindo forma de pagamento, troco (quando aplicável) e valor total calculado.

### Principais mudanças estruturais

O banco de dados foi reestruturado para suportar o novo modelo de negócio. O endpoint `menu` passou a armazenar as pizzas com foto, descrição e valor base. Os `opcionais` foram divididos entre `bordas` e `bebidas`, cada um com seu respectivo `valor`. Um novo endpoint `tamanhos` foi adicionado, com os tamanhos Pequena, Média, Grande e Família.

```json
"tamanhos": [
  { "id": 1, "descricao": "Pequena (4 fatias)" },
  { "id": 2, "descricao": "Média (6 fatias)" },
  { "id": 3, "descricao": "Grande (8 fatias)" },
  { "id": 4, "descricao": "Família (12 fatias)" }
],
"opcionais": {
  "bordas": [
    { "id": 1, "nome": "Borda Tradicional", "valor": 0 },
    { "id": 2, "nome": "Borda de Catupiry", "valor": 12 }
  ],
  "bebidas": [
    { "id": 1, "nome": "Não quero bebida", "valor": 0 },
    { "id": 2, "nome": "Coca Cola 2L", "valor": 14 }
  ]
}
```

Na tela de configuração do pedido, o valor total é recalculado automaticamente conforme o usuário seleciona tamanho, borda e bebida. O preço da pizza é definido pelo tamanho escolhido — P: R$35, M: R$42, G: R$48, F: R$56 — e os adicionais são somados sobre esse valor base.

---

## Solução Técnica dos Alertas

O sistema de feedback visual foi centralizado em um único componente reutilizável: o `MensagemComponent.vue`. Ele recebe três `props` — `mensagem`, `tipo` e `isVisible` — e permanece invisível até que o componente pai ative a exibição, evitando que alertas apareçam desnecessariamente ao carregar a tela.

```vue
<template>
  <div v-if="isVisible" :class="['mensagem-container', tipo]">
    <span class="mensagem-icone">{{ icone }}</span>
    <span class="mensagem-texto">{{ mensagem }}</span>
  </div>
</template>

<script>
export default {
  name: "MensagemComponent",
  props: {
    mensagem: String,
    tipo: String,
    isVisible: Boolean,
  },
  computed: {
    icone() {
      if (this.tipo === "erro") return "✖";
      if (this.tipo === "alerta") return "⚠";
      if (this.tipo === "info") return "ℹ";
      if (this.tipo === "sucesso") return "✔";
      return "";
    },
  },
};
</script>
```

O componente foi construído para suportar quatro tipos semânticos. No projeto atual, os tipos `erro` e `sucesso` são os utilizados ativamente:

| Tipo | Cor | Ícone | Situação de uso no projeto |
|---|---|---|---|
| `erro` | Vermelho | ✖ | Campo obrigatório não preenchido ao tentar confirmar pedido |
| `sucesso` | Verde | ✔ | Pedido confirmado com sucesso / Pedido removido da lista |

Nos componentes pai, o alerta é ativado pelo método `mostrarMensagem()`, que atualiza as três variáveis de controle e repassa para o componente via binding:

```vue
<mensagem-component-vue
  :mensagem="textoMensagem"
  :tipo="tipoMensagem"
  :isVisible="exibirMensagem"
/>
```

```javascript
mostrarMensagem(texto, tipo) {
  this.textoMensagem = texto;
  this.tipoMensagem = tipo;
  this.exibirMensagem = true;
},
async criarPedido(e) {
  e.preventDefault();

  if (!this.nomeCliente) {
    this.mostrarMensagem("Campo obrigatório: informe o seu nome.", "erro");
    return;
  }
  if (!this.tamanhoSelecionado) {
    this.mostrarMensagem("Campo obrigatório: selecione o tamanho da pizza.", "erro");
    return;
  }

  // após todas as validações passarem:
  this.mostrarMensagem("Pedido realizado com sucesso!", "sucesso");
  setTimeout(() => {
    this.$router.push({ path: "/pedidos" });
  }, 1500);
},
```

Na tela de pedidos, ao excluir um registro, a lista é filtrada localmente sem necessidade de nova requisição à API, garantindo atualização imediata da interface:

```javascript
async deletarPedido(idPedido) {
  await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
    method: "DELETE",
  });
  this.listaPedidosRealizados = this.listaPedidosRealizados.filter(
    (pedido) => pedido.id !== idPedido
  );
  this.mostrarMensagem("Pedido removido com sucesso.", "sucesso");
},
```

### Decisões técnicas adicionais

Três recursos do Vue 3 foram utilizados além do escopo ensinado diretamente em sala, e estão documentados aqui para fins de avaliação:

- **`computed:`** utilizado para calcular `valorTotal` e `valorPizzaAtual` de forma reativa, recalculando automaticamente quando tamanho, borda ou bebida são alterados.
- **`:class="{ ativo: ... }"`** aplicado nos cards de tamanho e pagamento para indicar visualmente a opção selecionada.
- **`emits: ["alternarTema"]`** utilizado no `NavBarComponent` para comunicar o evento do toggle de tema claro/escuro ao `App.vue`.
