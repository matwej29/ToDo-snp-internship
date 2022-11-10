import {
  task,
  inputTask,
  todo_template,
  footer,
  footer_template,
} from "./view";
import { createTask } from "./controllers";

// может это как-то покрасивее сделать
const update = () => {
  updateCounter();
  updateFooterVisability();
  updateToggleCompleteButtonState();
  updateClearCompletedVisability();
};

const updateCounter = () => {
  document.getElementById(
    "itemsLeft"
  ).textContent = `${activeElements} items left`;
};

const updateFooterVisability = () => {
  if (list.length == 0) {
    document.getElementsByClassName("todo__footer")[0].classList.add("hide");
  } else {
    document.getElementsByClassName("todo__footer")[0].classList.remove("hide");
  }
};

const updateToggleCompleteButtonState = () => {
  const button = document.getElementById("toggleTasksState");
  if (activeElements == 0) {
    button.classList.add("btn-primary-active");
  } else {
    button.classList.remove("btn-primary-active");
  }

  if (list.length == 0) {
    button.classList.add("hide");
  } else {
    button.classList.remove("hide");
  }
};

const updateClearCompletedVisability = () => {
  if (list.length != activeElements) {
    document
      .getElementsByClassName("clear-completed")[0]
      .classList.remove("hide");
  } else {
    document.getElementsByClassName("clear-completed")[0].classList.add("hide");
  }
};

// TODO
const toggleCompleteButton = (button) => {
  let target_val;
  if (button.classList.contains("btn-primary-active")) {
    target_val = "active";
  } else {
    target_val = "completed";
  }
  list.forEach((todo) => {
    let div = document.getElementById(todo.id);
    div.toggleComplete(target_val);
  });

  update();
};

// TODO
const clearCompleted = () => {
  let idToDelete = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].state == "completed") {
      document.getElementById(list[i].id).remove();
      idToDelete.push(list[i].id);
    }
  }

  idToDelete.forEach((id) => {
    const ind = list.findIndex((item) => item.id == id);
    list.splice(ind, 1);
  });

  update();
};

const clearFilterButtonsSelection = () => {
  const buttons = document.getElementsByClassName("todo__filters")[0].children;
  for (item of buttons) {
    item.classList.remove("button-selected");
  }
};
// TODO
const showAll = () => {
  activeFilter = "all";
  clearFilterButtonsSelection();
  document.getElementById("button-all").classList.add("button-selected");

  const tasks = document.getElementsByClassName("task");
  for (item of tasks) {
    item.classList.remove("hide");
  }
};
// TODO
const showActive = () => {
  activeFilter = "active";
  clearFilterButtonsSelection();
  document.getElementById("button-active").classList.add("button-selected");

  const tasks = document.getElementsByClassName("task");
  for (item of tasks) {
    if (item.dataset.state == "active") item.classList.remove("hide");
    else item.classList.add("hide");
  }
};
// TODO
const showCompleted = () => {
  activeFilter = "completed";
  clearFilterButtonsSelection();
  document.getElementById("button-completed").classList.add("button-selected");

  const tasks = document.getElementsByClassName("task");
  for (item of tasks) {
    if (item.dataset.state == "completed") item.classList.remove("hide");
    else item.classList.add("hide");
  }
};

const inputNewTodo = inputTask(toggleCompleteButton, createTask);
const footer = footer_template(
  showAll,
  showActive,
  showCompleted,
  clearCompleted
);

const todo = document.createElement("div");
todo.innerHTML = todo_template(inputNewTodo, footer);
console.log(todo_template(inputNewTodo, footer));
document.getElementsByClassName("main")[0].append(todo.content);
