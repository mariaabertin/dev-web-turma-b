# Pichado 🦦💻

Projeto acadêmico de desenvolvimento web construído com Vue.js 3. Trata-se de uma aplicação front-end que consome uma API REST mockada (JSON Server), simulando o fluxo de catálogo, montagem e gestão de pedidos de um e-commerce de hardware e periféricos.

## 🔗 Links do Projeto

* **Produção (Vercel):** [Acessar Pichado](https://proj-final-des-web.vercel.app/)
* **Repositório (GitHub):** [Acessar Código-Fonte](https://github.com/RamonDantasPolicarpo/proj-final-des-web)

---

## 🎯 Visão Geral do Novo Segmento

O projeto original (uma hamburgueria) foi completamente refatorado para dar vida à **"Pichado"**, uma paródia de e-commerces de tecnologia.

### Alterações Estruturais (Back-end e Lógica)

O banco de dados (`db.json`) foi reescrito para suportar a modelagem de computadores. Chaves legadas de ingredientes foram substituídas por arrays de `desktops`, `notebooks`, `hardware_extra` e `perifericos`. Todo o roteamento HTTP interno da aplicação foi atualizado para consumir URLs relativas usando variáveis de ambiente (`process.env.VUE_APP_API_URL`), eliminando hardcodes locais.

### Alterações Visuais (UI/UX)

A interface crua foi substituída por um design moderno, focado em conversão e usabilidade:

* **CSS Global e Variáveis:** Implementação de uma paleta de cores centralizada no `App.vue` (Slate escuro para navegação, verde esmeralda para ações primárias).
* **Layout Responsivo:** Substituição de redimensionamentos estáticos (`width: 900px`) por sistemas de Grid responsivos (`display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));`).
* **Componentização:** Criação de `NavBarComponent` com efeito blur, `BannerComponent` e `FooterComponent` para unificar a identidade visual.

**Exemplo da refatoração de CSS (Catálogo):**

```css
.catalogo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    width: 100%;
}

```

---

## 🛠️ Solução Técnica dos Alertas

Para atender aos requisitos de UX e fornecer feedback visual imediato às interações do usuário (como tentar enviar um formulário vazio ou concluir uma compra), foi desenvolvido o componente dinâmico `AlertComponent.vue`.

A lógica de validação foi estruturada da seguinte forma no Vue 3:

1. **Componente Dinâmico:** O componente recebe `props` (`mensagem`, `tipo`, `icone`, `visivel`) e altera sua classe CSS dinamicamente para renderizar cores semânticas de sucesso (verde), erro (vermelho), aviso (amarelo) e info (azul).
2. **Validação no Formulário:** No `PedidoComponent`, o evento de submit intercepta a requisição. Se os campos obrigatórios (nome e frete) estiverem vazios, a função altera as variáveis de estado do alerta, bloqueando o `POST`.
3. **Animação de Transição:** O componente foi envolvido na tag nativa `<Transition name="fade">` do Vue, acoplado a um temporizador (`setTimeout`) que altera a prop `visivel` para `false` após 3 segundos, garantindo uma entrada e saída suaves da tela.

**Trecho de Código (Lógica de Validação e Feedback):**

```javascript
// Dentro do método criarPedido() no PedidoComponent.vue
if (this.nomeCliente.trim() === "" || this.opcaoFreteSelecionada === "") {
    this.exibirAlerta("O nome do cliente e o frete são campos obrigatórios!", "warning", "warning");
    return; // Bloqueia a requisição
}

// ... requisição POST ocorre aqui ...

this.exibirAlerta("Pedido montado com sucesso! A redirecionar...", "success", "circle-check");
setTimeout(() => {
    this.$router.push('/pedidos'); // Redirecionamento inteligente
}, 2000);

```

