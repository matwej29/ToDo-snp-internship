import { task, todoInputTask, footer_template } from "./view";
import {
  createTask,
  toggleCompleteButton,
  showAll,
  showActive,
  showCompleted,
  clearCompleted,
} from "./controllers";

const inputNewTodo = todoInputTask(toggleCompleteButton, createTask);
const footer = footer_template(
  showAll,
  showActive,
  showCompleted,
  clearCompleted
);

const todo = document.getElementById("todos");
todo.prepend(inputNewTodo);
todo.append(footer);
document.getElementsByClassName("main")[0].append(todo);
