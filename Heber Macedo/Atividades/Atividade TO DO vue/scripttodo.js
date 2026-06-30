const { createApp } = Vue;

createApp({
  data() {
    return {
      novaTarefa: "",
      tarefas: []
    };
  },
  methods: {
    adicionarTarefa() {
      if (this.novaTarefa.trim() === "") return;

      this.tarefas.push({
        texto: this.novaTarefa,
        concluida: false
      });

      this.novaTarefa = "";
    },
    removerTarefa(index) {
      this.tarefas.splice(index, 1);
    }
  }
}).mount("#app");
