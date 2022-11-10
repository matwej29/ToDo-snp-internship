class Task {
  TASK_TYPES = Object.freeze({
    ALL: "all",
    ACTIVE: "active",
    COMPLETED: "completed",
  });

  constructor(text, taskOnDblClick, onClickDelete, id) {
    this.text = text;
    this.taskOnDblClick = taskOnDblClick;
    this.onClickDelete = onClickDelete;
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

class Tasks {
  #next_id = 0;

  constructor() {
    this.tasks = [];
  }

  addTask(text, taskOnDblClick, onClickDelete) {
    const task = new Task(text, taskOnDblClick, onClickDelete, this.#next_id);
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
}

export {Task, Tasks};