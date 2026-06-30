<template>
  <div>
    <div class="section-1">
      <h1>Tarefas</h1>
      <div class="input-group">
        <input class="input-task" type="text" v-model="newTask" placeholder="Nova tarefa..." />
        <button class="btn-add-task" @click="addTask"><i class="fa-solid fa-plus"></i></button>
      </div>
    </div>
    <ul class="section-2">
      <li v-for="(task, index) in tasks" :key="task.id" class="task-item">
        <TaskComponent :task="task" @remove="removeTask(index)" />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import TaskComponent from "./components/TaskComponent.vue";

export default {
  name: "App",
  components: {
    TaskComponent,
  },

  setup() {
    const tasks = ref([]);
    const newTask = ref("");

    // Adiciona tarefa
    const addTask = () => {
      if (newTask.value.trim() !== "") {
        tasks.value.push({
          // Cria um id para saber qual remover
          id: Date.now(),
          description: newTask.value
        });
        //limpa o imput
        newTask.value = "";
      }
    };

    // Remove
    const removeTask = (index) => {
      tasks.value.splice(index, 1);
    };

    return {
      tasks,
      newTask,
      addTask,
      removeTask
    };
  },
};
</script>

<style>
.section-1 {
  margin: 5% 25% 0 25%;
  display: flex;
  flex-direction: column;
  text-align: start;
  border: solid 2px #2c3e50;
  border-radius: 1em;
  padding: 1em;
}

.section-2 {
  margin: 1em 25%;
  padding: 0;
}

.task-item {
  list-style-type: none;
  margin-bottom: 0.5em;
}

.section-1 h1 {
  margin: 0;
  margin-bottom: 0.5em;
}

.input-group {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.input-task {
  font-size: 1em;
  padding: 0.5em 0.7em;
  flex: 1;
  margin-right: 0.5em;
  border: solid 2px #2c3e50;
  border-radius: 50vh;
}

.btn-add-task {
  color: azure;
  background-color: #1ca046;
  width: 40px;
  height: 40px;
  font-size: 1em;
  padding: 0.5em;
  border: none;
  border-radius: 50vh;
  cursor: pointer;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>