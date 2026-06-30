const { createApp } = Vue;

createApp({
  data() {
    return {
      newTask: '',
      activeFilter: 'all',
      nextId: 1,
      tasks: [],
      filters: [
        { label: 'todas',      value: 'all'     },
        { label: 'pendentes',  value: 'pending' },
        { label: 'concluídas', value: 'done'    },
      ],
    };
  },

  computed: {
    filteredTasks() {
      if (this.activeFilter === 'pending') return this.tasks.filter(t => !t.done);
      if (this.activeFilter === 'done')    return this.tasks.filter(t =>  t.done);
      return this.tasks;
    },

    pendingCount() {
      return this.tasks.filter(t => !t.done).length;
    },
  },

  methods: {
    addTask() {
      const text = this.newTask.trim();
      if (!text) return;

      this.tasks.push({ id: this.nextId++, text, done: false });
      this.newTask = '';
    },

    toggleTask(task) {
      task.done = !task.done;
    },

    removeTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
    },

    clearDone() {
      this.tasks = this.tasks.filter(t => !t.done);
    },
  },
}).mount('#app');