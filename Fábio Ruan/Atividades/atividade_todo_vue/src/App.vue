<template>
  <div class="container">
    <h1>Lista de Tarefas</h1>

    <div class="input-area">
      <input type="text" v-model="novaTarefa" placeholder="Digite uma tarefa..." />
      <button @click="adicionarTarefa">Adicionar</button>
    </div>

    <ul>
      <li v-for="tarefa in tarefas" :key="tarefa.id">
        <span :class="{ concluida: tarefa.concluida }">{{ tarefa.texto }}</span>
        <div>
          <button class="btn-concluir" @click="concluirTarefa(tarefa)">Concluir</button>
          <button class="btn-remover" @click="removerTarefa(tarefa.id)">Remover</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      novaTarefa: "",
      tarefas: []
    }
  },
  methods: {
    adicionarTarefa() {
      if (this.novaTarefa.trim() == "") {
        return
      }
      this.tarefas.push({
        id: Date.now(),
        texto: this.novaTarefa,
        concluida: false
      })
      this.novaTarefa = ""
    },
    concluirTarefa(tarefa) {
      tarefa.concluida = !tarefa.concluida
    },
    removerTarefa(id) {
      this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  padding: 40px;
}

.container {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 500px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover { background-color: #369870; }

ul { list-style: none; }

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.concluida {
  text-decoration: line-through;
  color: #aaa;
}

.btn-concluir { background-color: #4a90d9; margin-right: 5px; }
.btn-concluir:hover { background-color: #357abd; }
.btn-remover { background-color: #e74c3c; }
.btn-remover:hover { background-color: #c0392b; }
</style>