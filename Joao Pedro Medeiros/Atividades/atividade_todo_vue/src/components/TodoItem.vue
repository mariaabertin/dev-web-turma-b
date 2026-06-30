<template>
  <li class="task-item" :class="{ done: tarefa.concluida }">
    <button
      class="check-button"
      type="button"
      @click="$emit('alternar-conclusao', tarefa.id)"
      :aria-label="tarefa.concluida ? 'Marcar como pendente' : 'Marcar como concluída'"
    >
      {{ tarefa.concluida ? '✓' : '' }}
    </button>

    <span
      class="task-text"
      @click="$emit('alternar-conclusao', tarefa.id)"
    >
      {{ tarefa.texto }}
    </span>

    <button
      class="remove-button"
      type="button"
      @click="$emit('remover-tarefa', tarefa.id)"
    >
      Remover
    </button>
  </li>
</template>

<script>
export default {
  name: 'TodoItem',

  props: {
    tarefa: {
      type: Object,
      required: true
    }
  },

  emits: ['alternar-conclusao', 'remover-tarefa']
}
</script>
