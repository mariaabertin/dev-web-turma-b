# PetSpa - Sistema de Agendamento de Serviços para Pets

![PetSpa Banner](public/img/banner.png)

## 📋 Visão Geral

**PetSpa** é a evolução do projeto **T-Burguer**, transformado para um segmento completamente diferente: um **sistema de agendamento e gestão de serviços de banho, tosa e spa para animais de estimação**.

### Mudanças de Identidade Visual e Estrutural

A aplicação foi totalmente customizada, migrando de um sistema de hamburgueria para um serviço de grooming de pets:

#### 1. **Mudança Completa de Dados e Campos**
- **Antes (T-Burguer):** Hambúrgueres, pontos de carne, complementos, bebidas
- **Depois (PetSpa):** Serviços (Banho Simples, Tosa Completa, Hidratação, Spa de Ofurô), seleção de porte do animal

#### 2. **Adaptação de Formulários**
```vue
<!-- Campo de Porte do Pet (substituindo "Ponto da Carne") -->
<select v-model="form.porte">
  <option value="P">Pequeno (até 10kg)</option>
  <option value="M">Médio (10kg a 25kg)</option>
  <option value="G">Grande (25kg a 40kg)</option>
  <option value="GG">Gigante (acima de 40kg)</option>
</select>

<!-- Cálculo de valor baseado no porte -->
Valor estimado: R$ {{ (preco * fatorPorte).toFixed(2) }}
```

#### 3. **Atualização Visual e Assets**
- Logo e branding completamente novo
- Imagens dos serviços de grooming
- Paleta de cores com tons verdes e azuis (natureza e cuidado animal)

---

## ✨ Funcionalidades Implementadas

### 1. **Sistema de Validação com Feedback Visual**

Bloqueio de confirmação sem campos obrigatórios:

```javascript
validar() {
  const faltando = [];
  if (!this.form.nomeCliente.trim()) faltando.push("Nome do Cliente");
  if (!this.form.nomePet.trim()) faltando.push("Nome do Pet");
  if (!this.form.porte) faltando.push("Porte do Pet");
  if (!this.form.produtoId) faltando.push("Serviço");
  if (!this.form.telefone.trim()) faltando.push("Telefone");
  if (!this.form.dataHora) faltando.push("Data e Horário");
  return faltando;
}

confirmarAgendamento() {
  const faltando = this.validar();
  if (faltando.length > 0) {
    this.alertaErro = `Preencha: ${faltando.join(", ")}.`;
    return;
  }
  // Continua com o agendamento...
}
```

### 2. **Alertas Semânticos Reativos**

Componentes de alerta com cores semânticas:

- 🔴 **Vermelho:** Erros de validação
- 🟠 **Laranja:** Avisos (ex: horários de funcionamento)
- 🔵 **Azul:** Informações gerais
- 🟢 **Verde:** Sucesso ao agendar

O componente `AlertComponent.vue` recebe `tipo` e `mensagem` via props e aplica automaticamente a cor e o ícone corretos:

```vue
<!-- Uso na tela de agendamento -->
<AlertComponent tipo="info" mensagem="Atendemos de segunda a sábado, das 8h às 18h." />
<AlertComponent tipo="erro" :mensagem="alertaErro" />
<AlertComponent tipo="aviso" :mensagem="alertaAviso" />
<AlertComponent tipo="sucesso" :mensagem="alertaSucesso ? 'Agendamento confirmado! Redirecionando...' : ''" />
```

O componente valida o `tipo` via `validator` e renderiza o ícone e a cor correspondentes:

```vue
<!-- AlertComponent.vue -->
<div v-if="mensagem" :class="['alerta', `alerta-${tipo}`]">
  <span class="alerta-icone">{{ icones[tipo] }}</span>
  <span>{{ mensagem }}</span>
</div>
```

### 3. **Redirecionamento Inteligente Pós-Agendamento**

Após a confirmação, o usuário é redirecionado automaticamente:

```javascript
this.alertaSucesso = true;

setTimeout(() => {
  this.$router.push("/pedidos");
}, 1500);
```

### 4. **Atualização em Tempo Real da Listagem**

A tela de agendamentos exibe imediatamente novos pedidos:

```javascript
created() {
  this.carregarPedidos();
},
methods: {
  carregarPedidos() {
    const dados = localStorage.getItem("pedidos");
    this.pedidos = dados ? JSON.parse(dados) : [];
  }
}
```

### 5. **Remoção com Re-renderização Imediata**

```javascript
cancelar(id) {
  this.pedidos = this.pedidos.filter((p) => p.id !== id);
  localStorage.setItem("pedidos", JSON.stringify(this.pedidos));
}
```

---

## 🏗️ Arquitetura e Componentes

```
petspa/
├── public/
│   ├── index.html
│   └── img/
│       ├── banho.jpg
│       ├── tosa.jpg
│       ├── hidratacao.jpg
│       └── spa.jpg
├── src/
│   ├── App.vue                          (Layout principal)
│   ├── main.js                          (Entrada da aplicação)
│   ├── components/
│   │   ├── NavBarComponent.vue          (Navegação)
│   │   └── BannerComponent.vue          (Banner de apresentação)
│   ├── router/
│   │   └── index.js                     (Configuração de rotas)
│   └── views/
│       ├── MenuView.vue                 (Listagem de serviços)
│       ├── PedidosView.vue              (Listagem de agendamentos)
│       └── ConfiguracaoPedidoView.vue   (Formulário de agendamento)
├── db/
│   └── db.json                          (Dados mockados)
├── package.json
├── vue.config.js
└── README.md
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 14+
- npm

### 1. Instalar Dependências
```bash
npm install
```

### 2. Executar o Servidor de Desenvolvimento
```bash
npm run serve
```

Acesse: **http://localhost:8080**

### 3. (Opcional) Executar JSON Server
```bash
npm run bancojson
```

---

## 🌐 Deploy no GitHub Pages

### 1. Fazer Build
```bash
npm run build
```

### 2. Deploy
```bash
npm run deploy
```

---

## 🔗 Links Importantes

| Tipo | Link | Status |
|------|------|--------|
| 🌍 **Aplicação em Produção** | [PetSpa Live](https://ofxzinho.github.io/dev-web-turma-b/) | ✅ Ativo |
| 📊 **API Mock (JSON Server)** | Não publicada — dados persistidos via localStorage | ⚠️ Não disponível |
| 💾 **Repositório GitHub** | [github.com/ofxzinho/dev-web-turma-b](https://github.com/ofxzinho/dev-web-turma-b) | ✅ Ativo |

---

## 📝 Tecnologias Utilizadas

- **Vue 3:** Framework reativo
- **Vue Router 4:** Roteamento client-side
- **LocalStorage:** Persistência de dados
- **CSS3 + Responsive Design:** Interface responsiva

---

## 📋 Checklist de Requisitos

- ✅ Mudança completa de identidade (Hamburgueria → PetSpa)
- ✅ Adaptação de campos, dados e imagens
- ✅ Validação de campos obrigatórios
- ✅ Sistema de alertas semânticos (cores e ícones)
- ✅ Redirecionamento automático pós-agendamento
- ✅ Atualização em tempo real da listagem
- ✅ Remoção de pedidos com re-renderização
- ✅ Configuração para GitHub Pages
- ✅ README.md profissional

---

**Desenvolvido como Projeto Final de Desenvolvimento Web - CEUB**

Última atualização: 26 de junho de 2026
- GitHub Pages: `https://ofxzinho.github.io/dev-web-turma-b/`

## 💡 Observações sobre os repositórios
O professor solicitou dois repositórios:
1. Um para o projeto front-end
2. Um para o banco JSON Server

Neste repositório está o projeto front-end completo e o arquivo `db/db.json` já preparado para ser usado no segundo repositório de API.

## 📎 Filtros de entrega
- `src` presente: sim
- `public` presente: sim
- `db/db.json` presente: sim
- `README.md` na raiz: sim
