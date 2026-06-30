const { createApp } = Vue;

createApp({
    data() {
        return {
            novaTarefa: '', 
            tarefas: []     
        }
    },
    methods: {
        adicionarTarefa() {
            if (this.novaTarefa.trim() !== "") {
                this.tarefas.push({
                    texto: this.novaTarefa,
                    feita: false
                });
                this.novaTarefa = ""; 
            }
        },
        removerTarefa(index) {
            this.tarefas.splice(index, 1);
        },
        alternarTarefa(tarefa) {
            tarefa.feita = !tarefa.feita;
        }
    }
}).mount('#app');