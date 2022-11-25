import { TaskList, TASK_TYPES } from "./tasks";
import { editingInput, todoTemplate } from "./view";

const tasks = new TaskList();
let activeFilter = TASK_TYPES.ALL;

// helper
const getTaskDocumentElementById = (id) => {
  const todoList = document.getElementById("todos_list");

  for (let child of todoList.children) {
    if (+child.dataset.id === +id) {
      return child;
    }
  }
  return null;
};

const deleteButtonOnClick = (event) => {
  tasks.deleteTask(+event.target.parentNode.dataset.id);
  event.target.parentNode.remove();
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

  const innerInput = editingInput(task.text, innerInputOnChange);
  innerInput.className = "input_state_editing";

  for (let child of taskElem.children) {
    child.classList.add("hide");
  }

  taskElem.append(innerInput);

  innerInput.focus();
};

const todoToggleState = (event) => {
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
  const todo = todoTemplate(
    text,
    taskOnDblClick,
    deleteButtonOnClick,
    task.id,
    todoToggleState
  );

  document.getElementById("todos_list").append(todo);
  update();
};

const update = () => {
  updateFooterVisibility();
  updateCounter();
  updateToggleCompleteButtonState();
  updateClearCompletedVisibility();
};

const redrawAllTasks = () => {
  const todo_list = document.getElementById("todos_list");
  todo_list.innerHTML = "";
  for (let task of tasks.getTasks()) {
    const todoNode = todoTemplate(
      task.text,
      taskOnDblClick,
      deleteButtonOnClick,
      task.id,
      todoToggleState,
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
  const todoToReplace = todoTemplate(
    task.text,
    taskOnDblClick,
    deleteButtonOnClick,
    task.id,
    todoToggleState,
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
  const footer = document.getElementById("todos_footer");
  if (tasks.getLength() === 0) {
    footer.classList.add("hide");
  } else {
    footer.classList.remove("hide");
  }
};

const updateToggleCompleteButtonState = () => {
  const button = document.getElementById("toggleTasksState");
  if (tasks.getActiveTasksAmount() === 0) {
    button.classList.add("button-primaty_active");
  } else {
    button.classList.remove("button-primaty_active");
  }

  if (tasks.getLength() === 0) {
    button.classList.add("hide");
  } else {
    button.classList.remove("hide");
  }
};

const updateClearCompletedVisibility = () => {
  const clearCompletedButton = document.getElementById("clearCompleted");
  if (tasks.getLength() !== tasks.getActiveTasksAmount()) {
    clearCompletedButton.classList.remove("hide");
  } else {
    clearCompletedButton.classList.add("hide");
  }
};

const toggleCompleteButton = (event) => {
  const isButtonActive =
    toggleTasksStateButton.classList.contains("button-primaty_active");
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
  const buttons = document.getElementById("todos_filters").children;
  for (const item of buttons) {
    item.classList.remove("link_state_selected");
  }
};

const addFilterSelectionStyle = (element) => {
  element.classList.add("link_state_selected");
};

const showAll = (event) => {
  activeFilter = TASK_TYPES.ALL;
  clearFilterButtonsSelection();
  addFilterSelectionStyle(document.getElementById("filterAll"));

  const taskNodes = document.getElementById("todos_list");
  for (const item of taskNodes.children) {
    item.classList.remove("hide");
  }
};

const showActive = (event) => {
  activeFilter = TASK_TYPES.ACTIVE;
  clearFilterButtonsSelection();
  addFilterSelectionStyle(document.getElementById("filterActive"));

  const taskNodes = document.getElementById("todos_list");
  for (const node of taskNodes.children) {
    const task = tasks.getTaskByID(+node.dataset.id);
    if (task.state === TASK_TYPES.ACTIVE) node.classList.remove("hide");
    else node.classList.add("hide");
  }
};

const showCompleted = (event) => {
  activeFilter = TASK_TYPES.COMPLETED;
  clearFilterButtonsSelection();
  addFilterSelectionStyle(document.getElementById("filterCompleted"));

  const taskNodes = document.getElementById("todos_list");
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
  update,
};
