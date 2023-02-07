<script setup lang="ts">
import { useTasksStore } from "@/stores/tasks";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const inputValue = ref("");
const store = useTasksStore();
const { tasksList } = storeToRefs(store);
const { toggleDone, removeTask, addTask, clearTasks } = store;
function handleAddTask() {
  addTask(inputValue.value);
  inputValue.value = "";
}
</script>

<template>
  <div class="container">
    <h1>My Tasks</h1>
    <div class="inputGroup">
      <input type="text" v-model="inputValue" />
      <button :disabled="Boolean(!inputValue)" @click="handleAddTask">
        Add
      </button>
    </div>

    <ul class="tasksList">
      <li
        :class="{ done: task.done }"
        key="task.id"
        @click="toggleDone(task.id)"
        v-for="task in tasksList"
      >
        {{ task.name }}<span> [{{ task.done ? "x" : "o" }}]</span
        ><span
          ><button @click="removeTask(task.id)" style="margin-left: 8px">
            x
          </button></span
        >
      </li>
    </ul>
    <button
      class="clearTasksBtn"
      @click="clearTasks"
      :disabled="!Boolean(tasksList.length)"
    >
      Clear Tasks
    </button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.container > h1 {
  margin-bottom: 8px;
}
.done {
  text-decoration: line-through;
}
.inputGroup {
  display: flex;
}

.inputGroup > button {
  margin-left: 8px;
}
.clearTasksBtn {
  width: 20%;
}

.tasksList {
  margin-top: 24px;
  margin-bottom: 24px;
}
</style>
