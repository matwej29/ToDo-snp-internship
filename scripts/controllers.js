import { Task_list, TASK_TYPES } from "./tasks";
import { edit_input, todo_template } from "./view";

const tasks = new Task_list();
let activeFilter = TASK_TYPES.ALL;

// helper
const getTaskDocumentElementById = (id) => {
  const todo_list = document.getElementById("todo_list");

  for (let child of todo_list.children) {
    if (+child.dataset.id === +id) {
      return child;
    }
  }
  return null;
};

const deleteButtonOnClick = (event) => {
  tasks.deleteTask(event.target.dataset.id);
  update();
};

const taskOnDblClick = (event) => {
  const taskElem = getTaskDocumentElementById(event.target.dataset.id);
  taskElem.classList.add("task_state_editing");

  const task = tasks.getTaskByID(+taskElem.dataset.id);

  const innerInputOnChange = (event) => {
    event.preventDefault();
    taskElem.classList.remove("task_state_editing");

    for (let child of taskElem.children) {
      child.classList.remove("hide");
    }

    task.text = event.target.value;
    event.target.removeEventListener("blur", innerInputOnChange);
    event.target.remove();
    redrawTask(task);
  };

  const innerInput = edit_input(task.text, innerInputOnChange);

  for (let child of taskElem.children) {
    child.classList.add("hide");
  }

  taskElem.append(innerInput);

  innerInput.focus();
};

const todo_toggle_state = (event) => {
  const todo = event.target.parentNode;
  const task = tasks.getTaskByID(+todo.dataset.id);
  task.toggleState();
  redrawTask(task);
  update();
};

const createTask = (event) => {
  const input = event.target;

  if (input.value.trim() === "") return;
  const text = input.value;
  input.value = "";

  const task = tasks.addTask(text);
  const todo = todo_template(
    text,
    taskOnDblClick,
    deleteButtonOnClick,
    task.id,
    todo_toggle_state
  );

  document.getElementById("todo_list").append(todo);
  update();
};

const update = () => {
  updateFooterVisibility();
  updateCounter();
  updateToggleCompleteButtonState();
  updateClearCompletedVisibility();
};

const redrawAllTasks = () => {
  const todo_list = document.getElementById("todo_list");
  todo_list.innerHTML = "";
  for (let task of tasks.getTasks()) {
    const todoNode = todo_template(
      task.text,
      taskOnDblClick,
      deleteButtonOnClick,
      task.id,
      todo_toggle_state,
      task.state
    );
    if (activeFilter !== TASK_TYPES.ALL && task.state !== activeFilter) {
      todoNode.classList.add("hide");
    }
    todo_list.append(todoNode);
  }
};

const redrawTask = (task) => {
  const todoNode = getTaskDocumentElementById(task.id);
  const todoToReplace = todo_template(
    task.text,
    taskOnDblClick,
    deleteButtonOnClick,
    task.id,
    todo_toggle_state,
    task.state
  );
  if (activeFilter !== TASK_TYPES.ALL && task.state !== activeFilter) {
    todoToReplace.classList.add("hide");
  } else {
    todoToReplace.classList.remove("hide");
  }

  todoNode.replaceWith(todoToReplace);
};

const updateCounter = () => {
  const activeTasksCounter = document.getElementById("itemsLeft");
  activeTasksCounter.textContent = `${tasks.getActiveTasksAmount()} items left`;
};

const updateFooterVisibility = () => {
  const footer = document.getElementById("todo_footer");
  if (tasks.getLength() === 0) {
    footer.classList.add("hide");
  } else {
    footer.classList.remove("hide");
  }
};

const updateToggleCompleteButtonState = () => {
  const button = document.getElementById("toggleTasksState");
  if (tasks.getActiveTasksAmount() === 0) {
    button.classList.add("btn-primary-active");
  } else {
    button.classList.remove("btn-primary-active");
  }

  if (tasks.getLength() === 0) {
    button.classList.add("hide");
  } else {
    button.classList.remove("hide");
  }
};

const updateClearCompletedVisibility = () => {
  const clearCompletedButton = document.getElementById("clear-completed");
  if (tasks.getLength() !== tasks.getActiveTasksAmount()) {
    clearCompletedButton.classList.remove("hide");
  } else {
    clearCompletedButton.classList.add("hide");
  }
};

const toggleCompleteButton = (event) => {
  const isButtonActive =
    toggleTasksStateButton.classList.contains("btn-primary-active");
  tasks.toggleTasksState(
    isButtonActive ? TASK_TYPES.ACTIVE : TASK_TYPES.COMPLETED
  );

  tasks.toggleTasksState(target_val);

  update();
  redrawAllTasks();
};

const clearCompleted = (event) => {
  event.preventDefault();
  tasks.clearCompleted();

  update();
  redrawAllTasks();
};

const clearFilterButtonsSelection = () => {
  const buttons = document.getElementById("todo_filters").children;
  for (const item of buttons) {
    item.classList.remove("button-selected");
  }
};

const showAll = (event) => {
  activeFilter = TASK_TYPES.ALL;
  clearFilterButtonsSelection();
  document.getElementById("filterAll").classList.add("button-selected");

  const taskNodes = document.getElementById("todo_list");
  for (const item of taskNodes.children) {
    item.classList.remove("hide");
  }
};

const showActive = (event) => {
  activeFilter = TASK_TYPES.ACTIVE;
  clearFilterButtonsSelection();
  document.getElementById("filterActive").classList.add("button-selected");

  const taskNodes = document.getElementById("todo_list");
  for (const node of taskNodes.children) {
    const task = tasks.getTaskByID(+node.dataset.id);
    if (task.state === TASK_TYPES.ACTIVE) node.classList.remove("hide");
    else node.classList.add("hide");
  }
};

const showCompleted = (event) => {
  activeFilter = TASK_TYPES.COMPLETED;
  clearFilterButtonsSelection();
  document.getElementById("filterCompleted").classList.add("button-selected");

  const taskNodes = document.getElementById("todo_list");
  for (const node of taskNodes.children) {
    const task = tasks.getTaskByID(+node.dataset.id);
    if (task.state === TASK_TYPES.COMPLETED) node.classList.remove("hide");
    else node.classList.add("hide");
  }
};

export {
  createTask,
  toggleCompleteButton,
  clearCompleted,
  showAll,
  showActive,
  showCompleted,
};
