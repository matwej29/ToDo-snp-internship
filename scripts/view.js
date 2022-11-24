import { TASK_TYPES } from "./tasks";

const todoTemplate = (
  text,
  taskOnDblClick,
  onClickDelete,
  id,
  toggleTaskState,
  taskState = TASK_TYPES.ACTIVE
) => {
  const todo = document.createElement("li");
  todo.className = "task";
  todo.addEventListener("dblclick", taskOnDblClick);
  todo.dataset.id = id;

  const todoToggleState = document.createElement("input");
  todoToggleState.type = "checkbox";
  todoToggleState.dataset.id = id;
  todoToggleState.addEventListener("click", toggleTaskState);

  const todo_content = document.createElement("p");
  todo_content.className = "task__content";
  todo_content.textContent = text;
  todo_content.dataset.id = id;

  const todo_delete_button = document.createElement("button");
  todo_delete_button.className = "task__button_type_delete";
  todo_delete_button.addEventListener("click", onClickDelete);
  todo_delete_button.dataset.id = id;

  if (taskState === TASK_TYPES.ACTIVE) {
    todo.classList.remove("task_state_completed");
    todoToggleState.checked = false;
  } else if (taskState === TASK_TYPES.COMPLETED) {
    todo.classList.add("task_state_completed");
    todoToggleState.checked = true;
  }

  todo.append(todoToggleState, todo_content, todo_delete_button);

  return todo;
};

const todoInputTask = (toggleComplete, addItem) => {
  const new_task_container = document.createElement("div");
  new_task_container.className = "todos__input";

  const toggle_todo_state_button = document.createElement("button");
  toggle_todo_state_button.id = "toggleTasksState";
  toggle_todo_state_button.className = "btn btn-primary hide";
  toggle_todo_state_button.textContent = "toggle state";
  toggle_todo_state_button.addEventListener("click", toggleComplete);

  const new_todo_input = document.createElement("input");
  new_todo_input.type = "text";
  new_todo_input.className = "input";
  new_todo_input.autofocus = true;
  new_todo_input.addEventListener("change", addItem);

  new_task_container.append(toggle_todo_state_button, new_todo_input);

  return new_task_container;
};

const editingInput = (value, onChange) => {
  const input = document.createElement("input");
  input.className = "input";
  input.type = "text";
  input.value = value;
  input.addEventListener("change", onChange);
  input.addEventListener("blur", onChange);

  return input;
};

const createFilter = (id, textContent, selected = false) => {
  const filter = document.createElement("a");
  filter.href = "#";
  filter.id = id;
  filter.className = `link ${selected ? "button-selected" : ""}`;
  filter.textContent = textContent;

  return filter;
};

const footer_template = (
  filterAllOnClick,
  filterActiveOnClick,
  filterCompletedOnClick,
  clearCompleted
) => {

  const filterAll = createFilter("filterAll", "All", (selected = true));
  filterAll.addEventListener("click", filterAllOnClick);

  const filterActive = createFilter("filterActive", "Active");
  filterActive.addEventListener("click", filterActiveOnClick);

  const filterCompleted = createFilter("filterCompleted", "Completed");
  filterCompleted.addEventListener("click", filterCompletedOnClick);

  const clearCompletedButton = document.createElement("a");
  clearCompletedButton.addEventListener("click", clearCompleted);
};

export { todoTemplate, todoInputTask, editingInput, footer_template };
