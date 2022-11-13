const TASK_TYPES = Object.freeze({
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
});

class Task {
  constructor(text, taskOnDblClick, onClickDelete, id) {
    this.text = text;
    this.state = this.TASK_TYPES.ACTIVE;
    this.id = id;
  }

  get state() {
    return this.state;
  }

  /**
   * @param {TASK_TYPES} new_state
   */
  set state(new_state) {
    this.state = new_state;
  }
}

class Task_list {
  #next_id = 0;
  #activeTasksAmount = 0;

  constructor() {
    this.tasks = [];
  }

  getLength() {
    return this.tasks.length;
  }

  // TODO
  getActiveTasksAmount() {
    return this.filterActive().length;
  }

  addTask(text) {
    const task = new Task(text, this.#next_id);
    this.tasks.push(task);
    this.#next_id += 1;
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
    return this.tasks.filter((task) => task.state === Task.TASK_TYPES.ACTIVE);
  }

  filterCompleted() {
    return this.tasks.filter(
      (task) => task.state === Task.TASK_TYPES.COMPLETED
    );
  }

  clearCompleted() {
    let to_delete = [];

    this.tasks.map((task) => {
      if (task.state == TASK_TYPES.COMPLETED) {
        to_delete.push(task);
      }
    });

    to_delete.map((task) => this.deleteTask(task.id));
  }
}

export { Task, Task_list, TASK_TYPES };
