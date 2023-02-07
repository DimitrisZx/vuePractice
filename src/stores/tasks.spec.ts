import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useTasksStore } from "./tasks";

describe("Tasks store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("adds a task", () => {
    const store = useTasksStore();
    expect(store.tasksList.length).toBe(0);
    const newTaskId = store.addTask("test");
    expect(store.tasksList.length).toBe(1);
    expect(store.tasksList.find((itm) => itm.id === newTaskId)?.name).toBe(
      "test"
    );
  });

  it("toggles status of given task by id", () => {
    const store = useTasksStore();
    const taskId = store.addTask("do something");
    const task = store.tasksList.find((task) => task.id === taskId);
    expect(task?.done).toBe(false);
    store.toggleDone(taskId);
    expect(task?.done).toBe(true);
    store.toggleDone(taskId);
    expect(task?.done).toBe(false);
  });

  it("removes a specific task by id", () => {
    const store = useTasksStore();
    const firstTaskId = store.addTask("do something");
    const secondTaskId = store.addTask("do something else");
    store.removeTask(secondTaskId);
    expect(store.tasksList.length).toBe(1);
    expect(store.tasksList.find((itm) => itm.id === secondTaskId)).toBe(
      undefined
    );
    expect(store.tasksList.find((itm) => itm.id === firstTaskId)).toBeTruthy();
  });

  it("clears all tasks", () => {
    const store = useTasksStore();
    store.addTask("test");
    store.addTask("test2");
    store.clearTasks();
    expect(store.tasksList.length).toBe(0);
  });
});
