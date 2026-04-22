<script setup>
import { ref } from 'vue'

const novaTarefa = ref('')
const listaTarefas = ref([])

function adicionar() {
  if (novaTarefa.value.trim() !== '') {
    listaTarefas.value.push({
      texto: novaTarefa.value,
      concluida: false
    })
    novaTarefa.value = '' //limpa o input automaticamente
  }
}

function remover(index) {
  listaTarefas.value.splice(index, 1)
}
</script>

<template>
  <main>
    <h1>Tarefas</h1>
    
    <div class="inputArea">
      <input v-model="novaTarefa" type="text" placeholder="Digite sua Tarefa!" id="tarefaInput">
      <button @click="adicionar" id="btnAdicionar">+</button>
    </div>

    <ul id="listaTarefas">
      <li v-for="(tarefa, index) in listaTarefas" :key="index" :class="{ concluida: tarefa.concluida }"
      @click="tarefa.concluida = !tarefa.concluida">
        {{ tarefa.texto }}
        
        <button class="fechar" @click.stop="remover(index)">x</button>
      </li>
    </ul>
  </main>
</template>

<style scoped>
body {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;}

main {
  background: #dbd7f1;
  padding: 16px;
  min-height: 100vh;}

h1 {
  color: rgb(45, 22, 66);
  text-align: center;}

.inputArea {
  text-align: center;
  margin-bottom: 25px;}

#tarefaInput {
  padding: 8px;
  border-radius: 15px;
  border: rgb(56, 30, 80) solid 1px;}

#btnAdicionar {
  color: #dbd7f1;
  padding: 7px 10px;
  border-radius: 50px;
  border: rgb(56, 30, 80) solid 1px;
  background-color: rgb(56, 30, 80);
  cursor: pointer;
  margin-left: 5px;}

#btnAdicionar:hover {
  background-color: rgb(4, 1, 7);
  color: white;
  transition: 0.5s;}

ul {
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;}

li {
  background-color: #b6acec;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  cursor: pointer;}

.fechar {
  background-color: #b91e1e;
  border-radius: 100px;
  border: 0px;
  color: white;
  width: 20px;
  height: 20px;
  line-height: 10px;
  cursor: pointer;}

.concluida {
  text-decoration: line-through;
  color: gray;
  opacity: 0.6;}
</style>
