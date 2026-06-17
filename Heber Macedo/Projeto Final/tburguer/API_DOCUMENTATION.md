# 🔗 DOCUMENTAÇÃO DE API - PizzaFresh

URL Base (Desenvolvimento): `http://localhost:3000`
URL Base (Produção): `https://pizzeria-api.onrender.com`

---

## 📍 ENDPOINTS

### 1. GET /menu
Retorna o catálogo de pizzas e itens especiais.

**Resposta:**
```json
{
  "limitado": [
    {
      "id": 1,
      "nome": "Especial Premium",
      "foto": "https://images.unsplash.com/...",
      "descricao": "Pizza artesanal com massa crocante...",
      "valor": 48,
      "eh_novidade": true
    }
  ],
  "burgues": [
    {
      "id": 1,
      "nome": "Margherita",
      "foto": "https://images.unsplash.com/...",
      "descricao": "Clássica pizza italiana...",
      "valor": 35,
      "eh_novidade": true
    }
    // ... mais pizzas
  ]
}
```

**Exemplo de Uso (Vue.js):**
```javascript
async consultarMenu() {
  const response = await fetch(`${this.$apiUrl}/menu`);
  const dados = await response.json();
  this.listaMenuPizzas = dados.burgues;
}
```

---

### 2. GET /tipos_pontos
Retorna os tamanhos disponíveis de pizza.

**Resposta:**
```json
[
  {
    "id": 1,
    "descricao": "Pequena (30cm)"
  },
  {
    "id": 2,
    "descricao": "Média (35cm)"
  },
  {
    "id": 3,
    "descricao": "Grande (40cm)"
  },
  {
    "id": 4,
    "descricao": "Gigante (45cm)"
  }
]
```

---

### 3. GET /opcionais
Retorna complementos (adicionais) e bebidas.

**Resposta:**
```json
{
  "complemento": [
    {
      "id": 1,
      "nome": "Combo Bebida + Batata",
      "descricao": "Batata ondulada sequinha e crocante...",
      "foto": "https://...",
      "valor": 11,
      "eh_novidade": true
    },
    {
      "id": 2,
      "nome": "Batata ondulada com lemon pepper",
      "descricao": "",
      "foto": "https://...",
      "valor": 7,
      "eh_novidade": false
    }
  ],
  "bebidas": [
    {
      "id": 1,
      "nome": "Coca Cola Lata 310 ml",
      "descricao": "",
      "foto": "https://...",
      "valor": 6,
      "eh_novidade": false
    },
    {
      "id": 2,
      "nome": "Shweppes Citrus 310 ml",
      "descricao": "",
      "foto": "https://...",
      "valor": 6,
      "eh_novidade": false
    }
    // ... mais bebidas
  ]
}
```

---

### 4. GET /status_pedido
Retorna os possíveis status de um pedido.

**Resposta:**
```json
[
  {
    "id": 1,
    "descricao": "Pedido em espera"
  },
  {
    "id": 2,
    "descricao": "Em produção"
  },
  {
    "id": 3,
    "descricao": "A caminho"
  },
  {
    "id": 4,
    "descricao": "Entregue"
  },
  {
    "id": 5,
    "descricao": "Pedido pendente"
  },
  {
    "id": 6,
    "descricao": "Pedido realizado"
  }
]
```

---

### 5. GET /pedidos
Retorna a lista de todos os pedidos.

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "ponto": {
      "id": 2,
      "descricao": "Média (35cm)"
    },
    "bebidas": [
      {
        "id": 1,
        "nome": "Coca Cola Lata 310 ml",
        "valor": 6
      }
    ],
    "complemento": [
      {
        "id": 1,
        "nome": "Combo Bebida + Batata",
        "valor": 11
      }
    ],
    "burguer": {
      "id": 1,
      "nome": "Margherita",
      "valor": 35
    },
    "statusId": 2
  }
]
```

**Exemplo de Uso:**
```javascript
async consultarPedidos() {
  const response = await fetch(`${this.$apiUrl}/pedidos`);
  this.listaPedidosRealizados = await response.json();
}
```

---

### 6. POST /pedidos
Cria um novo pedido.

**Corpo da Requisição:**
```json
{
  "nome": "João Silva",
  "ponto": {
    "id": 2,
    "descricao": "Média (35cm)"
  },
  "bebidas": [
    {
      "id": 1,
      "nome": "Coca Cola Lata 310 ml",
      "valor": 6
    }
  ],
  "complemento": [
    {
      "id": 1,
      "nome": "Combo Bebida + Batata",
      "valor": 11
    }
  ],
  "burguer": {
    "id": 1,
    "nome": "Margherita",
    "valor": 35
  },
  "statusId": 5
}
```

**Resposta (Status 201):**
```json
{
  "id": 1,
  "nome": "João Silva",
  "ponto": { ... },
  "bebidas": [ ... ],
  "complemento": [ ... ],
  "burguer": { ... },
  "statusId": 5
}
```

**Exemplo de Uso:**
```javascript
async criarPedido() {
  const dadosPedido = {
    nome: this.nomeCliente,
    ponto: this.tamanhoSelecionado,
    bebidas: this.listaBebidasSelecionadas,
    complemento: this.listaComplementosSelecionados,
    burguer: this.pizza,
    statusId: 5
  };

  const response = await fetch(`${this.$apiUrl}/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dadosPedido)
  });

  if (response.ok) {
    // Mostrar alerta de sucesso
    this.$refs.alertComponent.mostrarAlerta(
      "sucesso",
      "Pedido criado com sucesso!"
    );
    
    // Redirecionar para pedidos
    setTimeout(() => {
      this.$router.push("/pedidos");
    }, 2000);
  }
}
```

---

### 7. PATCH /pedidos/:id
Atualiza um pedido existente.

**Parâmetro:**
- `id`: ID do pedido (ex: `/pedidos/1`)

**Corpo da Requisição (Exemplo - Atualizar Status):**
```json
{
  "statusId": 3
}
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "João Silva",
  "statusId": 3,
  ...
}
```

**Exemplo de Uso:**
```javascript
async atualizarStatusPedido(event, idPedido) {
  const novoStatus = event.target.value;
  
  const response = await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ statusId: novoStatus })
  });

  if (response.ok) {
    this.$refs.alertComponent.mostrarAlerta(
      "sucesso",
      "Status atualizado com sucesso!"
    );
  }
}
```

---

### 8. DELETE /pedidos/:id
Deleta um pedido.

**Parâmetro:**
- `id`: ID do pedido (ex: `/pedidos/1`)

**Resposta:** Status 200 (sem corpo) ou 204

**Exemplo de Uso:**
```javascript
async deletarPedido(idPedido) {
  const response = await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
    method: "DELETE"
  });

  if (response.ok) {
    // Remove da lista imediatamente
    this.listaPedidosRealizados = this.listaPedidosRealizados.filter(
      p => p.id !== idPedido
    );
    
    // Mostra alerta
    this.$refs.alertComponent.mostrarAlerta(
      "sucesso",
      "Pedido removido com sucesso!"
    );
  } else {
    this.$refs.alertComponent.mostrarAlerta(
      "erro",
      "Erro ao remover pedido"
    );
  }
}
```

---

## 🧪 TESTANDO A API COM cURL

### Listar Menu
```bash
curl http://localhost:3000/menu
```

### Listar Tamanhos
```bash
curl http://localhost:3000/tipos_pontos
```

### Criar Pedido
```bash
curl -X POST http://localhost:3000/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste",
    "ponto": {"id": 2, "descricao": "Média (35cm)"},
    "bebidas": [],
    "complemento": [],
    "burguer": {"id": 1, "nome": "Margherita", "valor": 35},
    "statusId": 5
  }'
```

### Listar Pedidos
```bash
curl http://localhost:3000/pedidos
```

### Atualizar Status
```bash
curl -X PATCH http://localhost:3000/pedidos/1 \
  -H "Content-Type: application/json" \
  -d '{"statusId": 2}'
```

### Deletar Pedido
```bash
curl -X DELETE http://localhost:3000/pedidos/1
```

---

## 📊 ESTRUTURA DE DADOS COMPLETA

### Pizza (Item do Menu)
```javascript
{
  "id": number,
  "nome": string,
  "foto": string (URL),
  "descricao": string,
  "valor": number,
  "eh_novidade": boolean
}
```

### Tamanho (tipos_pontos)
```javascript
{
  "id": number,
  "descricao": string
}
```

### Complemento/Bebida
```javascript
{
  "id": number,
  "nome": string,
  "descricao": string,
  "foto": string (URL),
  "valor": number,
  "eh_novidade": boolean
}
```

### Pedido
```javascript
{
  "id": number,
  "nome": string,
  "ponto": { // tamanho selecionado
    "id": number,
    "descricao": string
  },
  "bebidas": Array<Bebida>,
  "complemento": Array<Complemento>,
  "burguer": Pizza,
  "statusId": number
}
```

### Status de Pedido
```javascript
{
  "id": number,
  "descricao": string
}
```

---

## ⚠️ CÓDIGOS DE ERRO

| Código | Significado |
|--------|-------------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 204 | No Content - Sucesso sem retorno de dados |
| 400 | Bad Request - Dados inválidos |
| 404 | Not Found - Recurso não encontrado |
| 500 | Server Error - Erro no servidor |

---

## 🔒 NOTAS DE SEGURANÇA

1. **JSON Server** é apenas para desenvolvimento/mock
2. Para produção real, migrar para API profissional (Node.js, Python, etc.)
3. Adicionar autenticação (JWT, OAuth, etc.)
4. Validar dados no backend
5. Implementar rate limiting
6. Usar HTTPS obrigatoriamente

---

## 📞 SUPORTE

Para dúvidas sobre a API:
1. Verifique se o servidor JSON está rodando
2. Confirme a URL base correta
3. Teste com cURL ou Postman
4. Verifique o console do navegador (F12)
5. Consulte a documentação oficial: https://github.com/typicode/json-server

---

**Última atualização**: Junho 2026
**Versão da API**: 1.0.0
