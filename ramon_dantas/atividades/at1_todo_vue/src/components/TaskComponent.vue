<template>
    <div @click="toggleComplete" class="task" :class="{ 'task-complete' : isComplete }">
        <p>{{ task.description }}</p>
        <button @click.stop="$emit('remove')"><i class="fa-solid fa-xmark"></i></button>
    </div>
</template>

<script>
export default {
    name: "TaskComponent",
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    
    data() {
        return {
            isComplete: false
        };
    },

    methods: {
        toggleComplete() {
            this.isComplete = !this.isComplete;
        }
    },
    
    emits: ['remove']
};
</script>

<style>
:scope .task {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: solid 2px #2c3e50;
    border-radius: 1em;
    padding: 1em;
}

.task-complete {
    text-decoration: line-through;
    opacity: 50%;
}

.task p {
    margin: 0;
}

.task button {
    color: azure;
    background-color: #cc3a3a;
    margin: 0;
    margin-left: 0.5em;
    width: 2em;
    height: 2em;
    border: none;
    border-radius: 5vh;
    cursor: pointer;
}
</style>