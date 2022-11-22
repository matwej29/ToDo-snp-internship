const TASK_TYPES = Object.freeze({
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
});

class Task {
  constructor(text, id) {
    this.text = text;
    this.state = TASK_TYPES.ACTIVE;
    this.id = id;
  }

  toggleState() {
    if (this.state === TASK_TYPES.ACTIVE) this.state = TASK_TYPES.COMPLETED;
    else this.state = TASK_TYPES.ACTIVE;
  }
}

class Task_list {
  #next_id = 0;
  #activeTasksAmount = 0;

  constructor() {
    this.tasks = [];
  }

  getTasks() {
    return this.tasks;
  }

  getLength() {
    return this.tasks.length;
  }

  getActiveTasksAmount() {
    return this.filterActive().length;
  }

  addTask(text) {
    const task = new Task(text, this.#next_id);
    this.tasks.push(task);
    this.#next_id += 1;

    return task;
  }

  getTaskByID(id) {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTask(id) {
    const ind = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(ind);
  }

  toggleTasksState(target_value) {
    this.tasks.map((task) => (task.state = target_value));
  }

  filterAll() {
    return this.tasks;
  }

  filterActive() {
    return this.tasks.filter((task) => task.state === TASK_TYPES.ACTIVE);
  }

  filterCompleted() {
    return this.tasks.filter(
      (task) => task.state === TASK_TYPES.COMPLETED
    );
  }

  clearCompleted() {
    this.tasks = this.tasks.filter(
      (task) => task.state !== TASK_TYPES.COMPLETED
    );
  }
}

export { Task, Task_list, TASK_TYPES };
