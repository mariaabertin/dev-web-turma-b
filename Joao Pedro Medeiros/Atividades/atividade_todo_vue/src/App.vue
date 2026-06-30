<template>
  <main class="page">
    <section class="todo-card">
      <header class="todo-header">
        <div>
          <p class="eyebrow">Vue 3 • v-model • @click • v-for</p>
          <h1>Minha Lista de Tarefas</h1>
          <p class="subtitle">
            Adicione, conclua e remova tarefas usando renderização reativa do Vue.
          </p>
        </div>

        <div class="counter">
          <strong>{{ tarefasPendentes }}</strong>
          <span>pendentes</span>
        </div>
      </header>

      <form class="task-form" @submit.prevent="adicionarTarefa">
        <input
          v-model="novaTarefa"
          type="text"
          placeholder="Digite uma nova tarefa..."
        />

        <button type="submit">
          Adicionar
        </button>
      </form>

      <section class="summary">
        <span>Total: {{ tarefas.length }}</span>
        <span>Concluídas: {{ tarefasConcluidas }}</span>
      </section>

      <ul v-if="tarefas.length > 0" class="task-list">
        <TodoItem
          v-for="tarefa in tarefas"
          :key="tarefa.id"
          :tarefa="tarefa"
          @alternar-conclusao="alternarConclusao"
          @remover-tarefa="removerTarefa"
        />
      </ul>

      <div v-else class="empty-state">
        <h2>Nenhuma tarefa cadastrada</h2>
        <p>Digite uma tarefa acima para começar sua lista.</p>
      </div>
    </section>
  </main>
</template>

<script>
import TodoItem from './components/TodoItem.vue'

export default {
  name: 'App',

  components: {
    TodoItem
  },

  data() {
    return {
      novaTarefa: '',
      tarefas: []
    }
  },

  computed: {
    tarefasConcluidas() {
      return this.tarefas.filter(tarefa => tarefa.concluida).length
    },

    tarefasPendentes() {
      return this.tarefas.filter(tarefa => !tarefa.concluida).length
    }
  },

  methods: {
    adicionarTarefa() {
      const texto = this.novaTarefa.trim()

      if (!texto) {
        return
      }

      this.tarefas.push({
        id: Date.now(),
        texto,
        concluida: false
      })

      this.novaTarefa = ''
    },

    alternarConclusao(id) {
      const tarefa = this.tarefas.find(tarefa => tarefa.id === id)

      if (tarefa) {
        tarefa.concluida = !tarefa.concluida
      }
    },

    removerTarefa(id) {
      this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id)
    }
  }
}
</script>
