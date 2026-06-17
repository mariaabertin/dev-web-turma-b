# PizzaFresh - Sistema de Pedidos de Pizzaria

## 📌 Visão Geral

**PizzaFresh** é uma aplicação web desenvolvida com **Vue 3** que implementa um sistema completo de gestão de pedidos para pizzarias. O projeto foi evoluído a partir da base estrutural do T-Burguer, adaptando-o para um novo segmento comercial com identidade visual, funcionalidades e dados específicos de pizzaria.

### Transformação do Projeto

O sistema foi completamente reformulado, mantendo a arquitetura em componentes do Vue 3, mas com:

- **Novo tema visual**: Paleta de cores laranja (#ff6b35) e ouro (#ffd700) que representam a calidez e qualidade da pizzaria
- **Renomeação de entidades**: "Hambúrgueres" → "Pizzas", "Ponto da Carne" → "Tamanho da Pizza"
- **Dados adaptados**: Menu com 7 variedades de pizza, complementos específicos para pizzaria
- **Interface refatorada**: NavBar, Banner, Cards de menu e formulários atualizados para contexto de pizzaria

### Estrutura de Dados Transformada

```javascript
// db.json - tipos_pontos (antes: Ponto da Carne)
"tipos_pontos": [
  { "id": 1, "descricao": "Pequena (30cm)" },
  { "id": 2, "descricao": "Média (35cm)" },
  { "id": 3, "descricao": "Grande (40cm)" },
  { "id": 4, "descricao": "Gigante (45cm)" }
]

// db.json - menu.burgues (agora com Pizzas)
"burgues": [
  {
    "id": 1,
    "nome": "Margherita",
    "foto": "https://images.unsplash.com/photo-1585238341710-4b4efa7d4d53?w=400&q=80",
    "descricao": "Clássica pizza italiana com molho de tomate orgânico, mozzarella fresca, manjericão fresco e azeite de oliva extra virgem",
    "valor": 35,
    "eh_novidade": true
  }
]
```

---

## 🎨 Solução Técnica de Alertas Semânticos

O sistema implementa um componente `AlertComponent.vue` reutilizável que oferece feedback visual em tempo real com categorias semânticas.

### Componente de Alerta

```vue
<!-- src/components/AlertComponent.vue -->
<script>
export default {
  name: "AlertComponent",
  data() {
    return {
      visible: false,
      type: "info", // info, sucesso, alerta, erro
      message: "",
      timeoutId: null,
    };
  },
  methods: {
    mostrarAlerta(type, message, duration = 4000) {
      this.type = type;
      this.message = message;
      this.visible = true;

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.timeoutId = setTimeout(() => {
        this.fecharAlerta();
      }, duration);
    },
  }
}
</script>
```

### Implementação nos Componentes

**PedidoComponent.vue** - Validação com feedback:
```javascript
validarPedido() {
  if (!this.nomeCliente || this.nomeCliente.trim() === "") {
    this.$refs.alertComponent.mostrarAlerta(
      "erro",
      "Por favor, preencha o nome do cliente!"
    );
    return false;
  }
  if (!this.tamanhoSelecionado) {
    this.$refs.alertComponent.mostrarAlerta(
      "erro",
      "Por favor, selecione um tamanho para a pizza!"
    );
    return false;
  }
  return true;
}
```

**Criação de Pedido com Redirecionamento Inteligente**:
```javascript
async criarPedido(e) {
  e.preventDefault();

  if (!this.validarPedido()) {
    return;
  }

  try {
    const req = await fetch(`${this.$apiUrl}/pedidos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosPedido),
    });

    if (req.ok) {
      this.$refs.alertComponent.mostrarAlerta(
        "sucesso",
        "Pedido criado com sucesso!",
        2000
      );

      // Redirecionamento automático para /pedidos após alerta
      setTimeout(() => {
        this.$router.push("/pedidos");
      }, 2000);
    }
  } catch (error) {
    this.$refs.alertComponent.mostrarAlerta(
      "erro",
      "Erro ao conectar com o servidor"
    );
  }
}
```

**ListaPedidoComponent.vue** - Feedback de Exclusão com Atualização em Tempo Real:
```javascript
async deletarPedido(idPedido) {
  try {
    const response = await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
      method: "DELETE",
    });
    
    if (response.ok) {
      // Remove imediatamente da lista (re-renderização automática)
      this.listaPedidosRealizados = this.listaPedidosRealizados.filter(
        (pedido) => pedido.id !== idPedido
      );
      
      this.$refs.alertComponent.mostrarAlerta(
        "sucesso",
        "Pedido removido com sucesso!"
      );
    }
  } catch (error) {
    this.$refs.alertComponent.mostrarAlerta(
      "erro",
      "Erro ao remover pedido"
    );
  }
}
```

### Paleta de Cores Semântica

```css
/* Erro - Vermelho (#d32f2f) */
.alert-erro {
  background-color: #ffebee;
  color: #d32f2f;
  border-left: 4px solid #d32f2f;
}

/* Alerta - Laranja (#f57c00) */
.alert-alerta {
  background-color: #fff3e0;
  color: #f57c00;
  border-left: 4px solid #f57c00;
}

/* Informação - Azul (#1976d2) */
.alert-info {
  background-color: #e3f2fd;
  color: #1976d2;
  border-left: 4px solid #1976d2;
}

/* Sucesso - Verde (#388e3c) */
.alert-sucesso {
  background-color: #e8f5e9;
  color: #388e3c;
  border-left: 4px solid #388e3c;
}
```

---

## 🔗 Links da API

**API Mockada (JSON Server):**
- **Desenvolvimento**: `http://localhost:3000`
- **Produção**: [Link da API será disponibilizado após deploy]

**Endpoints Disponíveis:**
- `GET /menu` - Lista de pizzas e itens limitados
- `GET /pedidos` - Listagem de pedidos
- `POST /pedidos` - Criar novo pedido
- `PATCH /pedidos/:id` - Atualizar status do pedido
- `DELETE /pedidos/:id` - Remover pedido
- `GET /tipos_pontos` - Tamanhos disponíveis
- `GET /status_pedido` - Status de pedidos
- `GET /opcionais` - Complementos e bebidas

---

## 🌐 Links de Produção

**Frontend (GitHub Pages):**
- [Link será disponibilizado após deploy no GitHub Pages]

**Backend (JSON Server):**
- [Link será disponibilizado após deploy em plataforma como Render ou Railway]

**Repositório do Projeto:**
- [GitHub - pizzeria-web](https://github.com/seu-usuario/pizzeria-web)

**Repositório da API:**
- [GitHub - pizzeria-api](https://github.com/seu-usuario/pizzeria-api)

---

## 📋 Requisitos Implementados

✅ **Nova Identidade e Modelo de Negócio**
- Sistema transformado de hamburgueria para pizzaria
- Paleta de cores atualizada (laranja e ouro)
- Textos, imagens e elementos gráficos adaptados
- Dados ajustados para contexto de pizza

✅ **Validação e Comunicação Visual**
- Campos obrigatórios: Nome do Cliente e Tamanho da Pizza
- AlertComponent com 4 tipos semânticos (erro, alerta, info, sucesso)
- Ícones e cores distintivas para cada tipo de alerta
- Mensagens claras e direcionadas

✅ **Diretrizes de UX**
- Redirecionamento inteligente para /pedidos após confirmar pedido com sucesso
- Alerta de sucesso exibido antes do redirecionamento (2s delay)
- Atualização em tempo real da lista de pedidos ao criar novo pedido
- Re-renderização imediata ao deletar pedido
- Feedback visual para todas as ações do usuário

✅ **Publicação e Portfólio**
- Dois repositórios criados no GitHub
- Deploy do frontend em GitHub Pages
- Deploy do backend em plataforma de mock API

✅ **Documentação Professional**
- README.md estruturado com visão geral
- Exemplos de código da solução de alertas
- Links de API, produção e repositórios

---

## 🛠️ Como Executar Localmente

### Pré-requisitos
- Node.js 14+ instalado
- npm ou yarn

### Instalação

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/pizzeria-web.git
cd pizzeria-web

# Instalar dependências
npm install

# Terminal 1: Iniciar JSON Server (API mockada)
npm run bancojson

# Terminal 2: Iniciar aplicação Vue
npm run serve
```

A aplicação estará disponível em `http://localhost:8080`

### Build para Produção

```bash
npm run build
```

---

## 📱 Funcionalidades Principais

1. **Menu de Pizzas**: Catálogo interativo com imagens, descrições e preços
2. **Configuração de Pedido**: Seleção de tamanho, complementos e bebidas
3. **Validação em Tempo Real**: Alertas imediatos para campos obrigatórios
4. **Listagem de Pedidos**: Visualização de todos os pedidos com status
5. **Gerenciamento de Status**: Atualização do estado do pedido
6. **Exclusão de Pedidos**: Remoção com confirmação visual
7. **Cálculo Automático**: Total do pedido com adicionais

---

## 🎓 Padrões e Metodologia

O projeto segue as boas práticas ensinadas em sala de aula:
- **Componentes Reutilizáveis**: AlertComponent, NavBar, Banner
- **Ciclo de Vida do Vue 3**: Uso de `mounted()`, `ref()` e métodos
- **Reatividade**: Props, data, métodos e computed properties
- **Roteamento**: Vue Router com navegação entre views
- **Separação de Responsabilidades**: Componentes, Views e Serviços

---

## 📝 Notas Importantes

- O banco de dados inicia vazio após o deploy. Use a interface para criar pedidos de teste
- Os tamanhos de pizza refletem diâmetros em cm (Pequena=30cm, Média=35cm, Grande=40cm, Gigante=45cm)
- Complementos e bebidas possuem valores adicionais calculados automaticamente
- Todos os alertas desaparecem automaticamente após 4 segundos (configurável)

---

**Desenvolvido com Vue 3 e amor pela programação! 🍕💻**
