import { todoInputTask } from "./scripts/view";
import {
  createTask,
  toggleCompleteButton,
  showAll,
  showActive,
  showCompleted,
  clearCompleted,
  update,
} from "./scripts/controllers";

const inputNewTodo = todoInputTask(toggleCompleteButton, createTask);
const todo = document.getElementById("todos");
todo.prepend(inputNewTodo);

document.getElementsByClassName("main")[0].append(todo);

const filterAll = document.getElementById("filterAll");
filterAll.addEventListener("click", showAll);

const filterActive = document.getElementById("filterActive");
filterActive.addEventListener("click", showActive);

const filterCompleted = document.getElementById("filterCompleted");
filterCompleted.addEventListener("click", showCompleted);

const clearCompletedButton = document.getElementById("clearCompleted");
clearCompletedButton.addEventListener("click", clearCompleted);

update();
