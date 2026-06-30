# MechKeys — Loja de Teclados Mecânicos

> Projeto Final da disciplina de Desenvolvimento Web — Vue 3  
> Adaptação do sistema T-Burguer para um novo segmento comercial: **loja de teclados mecânicos**.

---

## Visão Geral

O sistema **MechKeys** é uma loja virtual de teclados mecânicos desenvolvida a partir da base do projeto T-Burguer, com identidade visual, dados e regras de negócio completamente reformulados para o novo segmento.

### Alterações Visuais e Estruturais

| Elemento | T-Burguer (original) | MechKeys (adaptado) |
|---|---|---|
| Nome do sistema | T-Burguer | MechKeys |
| Identidade visual | Tons de laranja/vermelho | Paleta dark com roxo (#7c3aed) |
| Logo | Hambúrguer | Logo SVG customizado com letra "M" |
| Banner | Imagem de hambúrguer | Banner fotográfico de teclados |
| Produto principal | Hambúrguer | Teclado mecânico |
| Campo "Ponto da Carne" | presente | removido |
| Campo "Tipo de Switch" | ausente | adicionado (Linear, Tátil, Clicky, Speed) |
| Opcionais | Adicionais de lanche | Acessórios (Keycaps, Wrist Rest, Ferramentas) e Cabos USB-C |
| Produtos no catálogo | Hambúrgueres | Attack Shark K86, AKS068, Ninja Leap 60%, Fizz Sunrise, Keychron K8, Ducky One 3 |

### Componentes Vue utilizados

```
src/
├── components/
│   ├── NavBarComponent.vue        # Barra de navegação com logo MechKeys
│   ├── BannerComponent.vue        # Banner principal com scroll suave ao catálogo
│   ├── PedidoComponent.vue        # Formulário de configuração e envio do pedido
│   ├── ListaPedidoComponent.vue   # Tabela de pedidos com status e exclusão
│   └── AlertComponent.vue         # Alertas semânticos reutilizáveis
├── views/
│   ├── MenuView.vue               # Catálogo de teclados em grid
│   ├── ConfiguracaoPedidoView.vue # Tela de configuração do pedido selecionado
│   └── PedidosView.vue            # Tela de monitoramento de pedidos
└── router/
    └── index.js                   # Rotas: /, /menu, /pedidos, /config-pedido
```

---

## Solução Técnica dos Alertas

O componente `AlertComponent.vue` é reutilizável e recebe duas props: `tipo` e `mensagem`. A exibição é controlada por `v-if="mensagem"` — o alerta só renderiza quando há uma mensagem ativa.

### Paleta semântica

| Tipo | Cor | Uso |
|---|---|---|
| `erro` | Vermelho (`#ef4444`) | Campos obrigatórios não preenchidos, ações inválidas |
| `aviso` | Laranja (`#f97316`) | Redirecionamento automático sem teclado selecionado |
| `info` | Azul (`#3b82f6`) | Nenhum pedido encontrado na listagem |
| `sucesso` | Verde (`#22c55e`) | Pedido criado, status atualizado, pedido removido |

### Estrutura do componente

```vue
<!-- AlertComponent.vue -->
<template>
  <Transition name="alerta-fade">
    <div v-if="mensagem" :class="['alerta', tipo]">
      <span class="alerta-icone">{{ icones[tipo] }}</span>
      <span class="alerta-texto">{{ mensagem }}</span>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    tipo: { type: String, default: "info" },
    mensagem: { type: String, default: "" },
  },
  data() {
    return {
      icones: { erro: "✕", aviso: "⚠", info: "ℹ", sucesso: "✓" },
    };
  },
};
</script>
```

### Como é chamado nos componentes pais

```js
// Validação de campo obrigatório (PedidoComponent.vue)
if (!this.nomeCliente.trim()) {
  this.exibirAlerta("erro", "O nome do cliente é obrigatório.");
  return;
}

// Sucesso ao criar pedido + redirecionamento automático
if (req.status === 201) {
  this.exibirAlerta("sucesso", "Pedido realizado com sucesso!");
  setTimeout(() => {
    this.$router.push("/pedidos");
  }, 1500);
}
```

A transição CSS `alerta-fade` aplica uma animação suave de entrada e saída (`translateY(-8px) → 0` com `opacity 0 → 1`) via `<Transition>` do Vue 3, sem necessidade de bibliotecas externas.

---

## Links

| | |
|---|---|
| **API (JSON Server)** | `https://mechkeys-banco-json.onrender.com` |
| **Projeto em Produção** | `https://mechkeys.vercel.app/` |
| **Repositório GitHub** | `https://github.com/Martins20321/dev-web-turma-b/tree/main/j.msilva/projeto_Final/mechkeys` |

---

## Como executar localmente

```bash
# Instalar dependências
npm install

# Iniciar o JSON Server (banco de dados)
npx json-server --watch db/db.json --port 3000

# Iniciar o projeto Vue
npm run serve
```

> Crie um arquivo `.env.local` na raiz do projeto com:
> ```
> VUE_APP_API_URL=http://localhost:3000
> ```
