import { task, todoInputTask, todo_template, footer_template } from "./view";
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

const todo = todo_template(inputNewTodo, footer);
console.log(todo);
document.getElementsByClassName("main")[0].append(todo);
