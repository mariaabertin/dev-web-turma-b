# PetSpa - Sistema de Agendamento 🐾

Este projeto foi desenvolvido como o trabalho final da disciplina de Desenvolvimento Web. O sistema consiste na evolução, customização e transição de modelo de negócio com base na estrutura original do projeto **T-Burguer**, utilizando **Vue 3**.

---

## 🏢 Novo Segmento de Negócio

O sistema foi completamente transformado de uma hamburgueria para um **PetSpa**, focado em serviços estéticos e de cuidados para animais de estimação.

- **Alterações Visuais:** Substituição completa da paleta de cores para tons de verde e azul semântico, aplicação de nova identidade visual, logo temática e reformulação completa do banner principal.
- **Adaptação de Dados:** A escolha de ingredientes e ponto da carne foi substituída pela seleção de serviços essenciais de pet shop, como tipo de banho, hidratação e tosa estilizada.

### Exemplo de Adaptação Estrutural (Campos de Formulário)

```html
<div class="input-container">
  <label for="servico">Escolha o serviço principal:</label>
  <select name="servico" id="servico" v-model="servicoPrincipal">
    <option value="">Selecione um serviço</option>
    <option v-for="prod in produtos" :key="prod.id" :value="prod.nome">
      {{ prod.nome }} - R$ {{ prod.preco }}
    </option>
  </select>
</div>
```

---

## 🛠️ Solução Técnica dos Alertas

A comunicação visual e os feedbacks imediatos foram tratados através de um componente reativo no **Vue 3** (`AlertaComponent`). A lógica utiliza propriedades dinâmicas (`props`) para renderizar paletas semânticas baseadas na ação do usuário.

### Tipos de Alertas

- 🔴 **Erro:** Disparado em falhas de preenchimento ou formulários vazios.
- 🟢 **Sucesso:** Exibido na confirmação, edição ou exclusão de agendamentos.
- 🟠🔵 **Aviso/Informação:** Utilizado para mensagens contextuais do sistema.

### Lógica de Validação dos Alertas

```javascript
if (!this.nomeCliente || !this.servicoPrincipal) {
  this.msg = "Não foi possível cadastrar. Preencha todos os campos obrigatórios.";
  this.tipoAlerta = "erro";
  return;
}
```

---

## ⚙️ Solução Técnica da API (Mock Local)

Para garantir a estabilidade do deploy e evitar problemas de **CORS** ou indisponibilidade de servidores públicos de mock, os dados de produtos e serviços foram estruturados localmente dentro do serviço da API (`src/services/api.js`).

O sistema simula requisições assíncronas utilizando `Promise.resolve`, mantendo o comportamento esperado de uma API real e integrando-se aos métodos do ciclo de vida do **Vue 3**, além de permitir atualização em tempo real ao criar, editar ou excluir registros.

---

## 🌐 Links do Projeto

- **Produção (GitHub Pages):** https://ofxzinho.github.io/dev-web-turma-b/
- **API:** Mock local implementado em `src/services/api.js`
- **Repositório:** https://github.com/ofxzinho/dev-web-turma-b