import { defineStore } from "pinia";
import { ref } from "vue";

export type Task = {
  done: boolean;
  name: string;
  id: number;
};

export const useTasksStore = defineStore("tasks", () => {
  let id = 1;
  const tasksList = ref<Task[]>([]);
  const addTask = (inputValue: string) => {
    tasksList.value.push({ id, done: false, name: inputValue });
    return id++;
  };
  const toggleDone = (taskId: number) => {
    const task = tasksList.value.find((task) => task.id === taskId);
    if (!task) return;
    task.done = !task.done;
  };

  const clearTasks = () => {
    tasksList.value = [];
  };

  const removeTask = (taskId: number) => {
    tasksList.value = tasksList.value.filter((itm) => itm.id !== taskId);
  };

  return { clearTasks, removeTask, toggleDone, addTask, tasksList };
});
