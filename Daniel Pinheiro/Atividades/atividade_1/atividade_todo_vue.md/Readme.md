# Atividade: Refatoração To-Do com Vue 3

Refatoração do aplicativo de lista de tarefas de JavaScript puro para Vue 3, com foco na diretiva `v-for`.

---

## Como executar

Não precisa instalar nada. Basta abrir o arquivo `index.html` diretamente no navegador.

1. Baixe o arquivo `index.html`
2. Dê dois cliques nele
3. O aplicativo abre no navegador

---

## Como usar o aplicativo

**Adicionar uma tarefa**
- Digite o nome da tarefa no campo de texto
- Clique no botão **Adicionar** ou pressione **Enter**

**Marcar como concluída**
- Clique no círculo à esquerda da tarefa
- O círculo fica azul e o texto é riscado

**Remover uma tarefa**
- Passe o mouse sobre a tarefa
- Clique no botão **✕** que aparece à direita

---

## Tecnologias utilizadas

- HTML5
- CSS3
- Vue 3 (embutido no arquivo, sem necessidade de CDN ou internet)

---

## Diretivas Vue utilizadas

| Diretiva | Onde foi usada |
|---|---|
| `v-for` | Renderiza a lista de tarefas |
| `v-model` | Liga o input de texto e os checkboxes aos dados |
| `@click` | Botões de adicionar e remover |
| `v-if` | Exibe mensagem quando a lista está vazia |
| `:class` | Aplica a classe `concluida` quando a tarefa é marcada |

---

## Estrutura do projeto

```
atividade_todo_vue/
├── index.html    ← aplicativo completo (HTML + CSS + Vue 3)
└── README.md
```

---

## Regras atendidas

**Não foi utilizado:**
- `document.getElementById`
- `createElement`
- `addEventListener`

**Foi utilizado:**
- Vue 3
- `v-model`
- `@click`
- `v-for` (obrigatório)