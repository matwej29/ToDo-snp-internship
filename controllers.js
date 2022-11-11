import { Tasks } from "./tasks";
import { edit_input, task } from "./view";

const tasks = new Tasks();

const activeTasksCounter = document.getElementById("itemsLeft");
const footer = document.getElementsByClassName("todo__footer")[0]

const deleteButtonOnClick = (event) => {
  tasks.deleteTask(event.target.id);
  event.target.remove();
  update();
};

const taskOnDblClick = (event) => {
  const taskElem = event.target;
  taskElem.classList.add("task_state_editing");
  const task = tasks.getTaskByID(div.id);

  const innerInputOnChange = (event) => {
    taskElem.classList.remove("task_state_editing");

    for (child of div.childNodes) {
      child.hidded = false;
    }

    task.text = event.target.value;
    event.target.remove();
  };

  const inner_input = edit_input(task.text, innerInputOnChange);

  for (child of div.childNodes) {
    child.hidded = true;
  }

  taskElem.append(inner_input);

  inner_input.focus();
};

const createTask = (event) => {
  const input = event.target;

  if (input.value.trim() == "") return;
  const text = input.value;
  input.value = "";

  const newTask = task(text, taskOnDblClick, deleteButtonOnClick);

  document.getElementsByClassName("todo__list")[0].append(newTask);
  update();
};

// может это как-то покрасивее сделать
const update = () => {
  updateCounter();
  updateFooterVisability();
  updateToggleCompleteButtonState();
  updateClearCompletedVisability();
};

const updateCounter = () => {
  debugger
  activeTasksCounter.textContent = `${tasks.getActiveTasksAmount()} items left`;
};

const updateFooterVisability = () => {
  if (tasks.getLength() == 0) {
    footer.classList.add("hide");
  } else {
    footer.classList.remove("hide");
  }
};

const updateToggleCompleteButtonState = () => {
  const button = document.getElementById("toggleTasksState");
  if (tasks.getActiveTasksAmount() == 0) {
    button.classList.add("btn-primary-active");
  } else {
    button.classList.remove("btn-primary-active");
  }

  if (task.getLength() == 0) {
    button.classList.add("hide");
  } else {
    button.classList.remove("hide");
  }
};

const updateClearCompletedVisability = () => {
  if (tasks.getLength() != tasks.getActiveTasksAmount()) {
    document
      .getElementsByClassName("clear-completed")[0]
      .classList.remove("hide");
  } else {
    document.getElementsByClassName("clear-completed")[0].classList.add("hide");
  }
};

// TODO
const toggleCompleteButton = (event) => {
  const button = undefined;
  let target_val;
  if (button.classList.contains("btn-primary-active")) {
    target_val = "active";
  } else {
    target_val = "completed";
  }
  
  tasks.toggleTasksState(target_val);

  update();
};

// TODO
const clearCompleted = (event) => {
  tasks.clearCompleted();

  update();
};
// TODO
const clearFilterButtonsSelection = () => {
  const buttons = document.getElementsByClassName("todo__filters")[0].children;
  for (item of buttons) {
    item.classList.remove("button-selected");
  }
};

// TODO
const showAll = (event) => {
  activeFilter = "all";
  clearFilterButtonsSelection();
  document.getElementById("button-all").classList.add("button-selected");

  const tasks = document.getElementsByClassName("task");
  for (item of tasks) {
    item.classList.remove("hide");
  }
};
// TODO
const showActive = (event) => {
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
const showCompleted = (event) => {
  activeFilter = "completed";
  clearFilterButtonsSelection();
  document.getElementById("button-completed").classList.add("button-selected");

  const tasks = document.getElementsByClassName("task");
  for (item of tasks) {
    if (item.dataset.state == "completed") item.classList.remove("hide");
    else item.classList.add("hide");
  }
};

export { createTask, toggleCompleteButton, clearCompleted, showAll, showActive, showCompleted };
