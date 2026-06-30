<template>
  <div class="container">

    <div class="cabecalho">
        <h2>{{ titulo }}</h2>
        <p>{{ descricao }}</p>
        <p style="font-size: 0.9rem; color: #484f58; margin-top: 10px;">Perdão, Professor. Tive que estilizar com IA, estava sem ideias.)</p>
    </div>

    <div class="input-group">
      <input
       v-model="novaTarefa"
       @keyup.enter="adicionarTarefa"
       placeholder="Digite uma nova tarefa e pressione no ícone"
       class="input-campo"/>
      <button class="btn-add" @click="adicionarTarefa">+</button>
    </div>

    <div class="container-lista">
      <ul>
        <li v-for="(tarefa, index) in tarefas" :key="index" :class="{concluida: tarefa.feita}">
          <span @click="alternarConcluida(index)">{{ tarefa.texto }}</span>
          <button class="btn-remover" @click="removerTarefa(index)">x</button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: "HomeComponent",
  data() {
    return {
      titulo: 'Tarefa Todo Refatorada',
      descricao: 'Engenharia de Software - Turma B - Atividade Vue.js',
      novaTarefa: '',
      tarefas: []
    };
  },
  methods: {
    adicionarTarefa() {
      if (this.novaTarefa.trim() !== '') {
        this.tarefas.push({ texto: this.novaTarefa, feita: false });
        this.novaTarefa = '';
      }
    },
    alternarConcluida(index) {
      this.tarefas[index].feita = !this.tarefas[index].feita;
    },
    removerTarefa(index) {
      this.tarefas.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.cabecalho {
  text-align: center;
  margin-bottom: 50px;
  padding-bottom: 20px;
  border-bottom: 2px solid #30363d;
}

.cabecalho h2 {
  color: #58a6ff;
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(88, 166, 255, 0.3);
}

.cabecalho p {
  color: #8b949e;
  font-size: 1.2rem;
  margin: 0;
  font-weight: 300;
}

.input-group {
  display: flex;
  background-color: #0d1117;
  border: 2px solid #30363d;
  border-radius: 50px;
  padding: 5px 10px;
  margin-bottom: 40px;
  transition: border-color 0.3s, box-shadow 0.3s;
  width: 100%;
  box-sizing: border-box;
}

.input-group:focus-within {
  border-color: #1f6feb;
  box-shadow: 0 0 15px rgba(31, 111, 235, 0.3);
}

.input-group input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 20px;
  font-size: 1.2rem;
  color: #c9d1d9;
  outline: none;
}

.input-group input::placeholder {
  color: #484f58;
}

.input-group button {
  background-color: #1f6feb;
  color: white;
  border: none;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  margin: 3px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  transition: background-color 0.2s, transform 0.1s;
}

.input-group button:hover {
  background-color: #388bfd;
}

.input-group button:active {
  transform: scale(0.95);
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #161b22;
  border-bottom: 1px solid #30363d;
  transition: background-color 0.2s;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #21262d;
}

li span {
  font-size: 1.2rem;
  background: transparent;
  cursor: pointer;
  color: #c9d1d9;
}

.concluida span {
  text-decoration: line-through;
  color: #484f58;
}

.btn-remover {
  background: none;
  border: none;
  color: #f85149;
  font-size: 20px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s, transform 0.1s;
  font-weight: bold;
}

li:hover .btn-remover {
  opacity: 1;
}

.btn-remover:active {
  transform: scale(1.2);
}
</style>