import { TASK_TYPES } from "./tasks";

const todo_template = (text, taskOnDblClick, onClickDelete, id, toggleTaskState, taskState=TASK_TYPES.ACTIVE) => {
  const todo = document.createElement("div");
  todo.className = "task";
  todo.addEventListener("dblclick", taskOnDblClick);
  todo.dataset.id = id;

  const todo_toggle_state = document.createElement("input");
  todo_toggle_state.type = "checkbox";
  todo_toggle_state.dataset.id = id;
  todo_toggle_state.addEventListener("click", toggleTaskState);

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
    todo_toggle_state.checked = false;
  } else if (taskState === TASK_TYPES.COMPLETED) {
    todo.classList.add("task_state_completed");
    todo_toggle_state.checked = true;
  }

  todo.append(todo_toggle_state, todo_content, todo_delete_button);

  return todo;
};

const todoInputTask = (toggleComplete, addItem) => {
  const new_task_container = document.createElement("div");
  new_task_container.className = "todo__input";

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

const edit_input = (value, onChange) => {
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
  const todo_footer = document.createElement("div");
  todo_footer.className = "todo__footer hide";
  todo_footer.id = "todo_footer";

  const itemsLeft = document.createElement("p");
  itemsLeft.id = "itemsLeft";
  itemsLeft.textContent = "n left";

  const todo__filters = document.createElement("div");
  todo__filters.className = "todo__filters";
  todo__filters.id = "todo_filters";

  const filterAll = createFilter("filterAll", "All", (selected = true));
  filterAll.addEventListener("click", filterAllOnClick);

  const filterActive = createFilter("filterActive", "Active");
  filterActive.addEventListener("click", filterActiveOnClick);

  const filterCompleted = createFilter("filterCompleted", "Completed");
  filterCompleted.addEventListener("click", filterCompletedOnClick);

  todo__filters.append(filterAll, filterActive, filterCompleted);

  const clearCompletedButton = document.createElement("a");
  clearCompletedButton.textContent = "clear completed"
  clearCompletedButton.href = "#";
  clearCompletedButton.id = "clear-completed";
  clearCompletedButton.className = "link clear-completed";
  clearCompletedButton.addEventListener("click", clearCompleted);

  todo_footer.append(itemsLeft, todo__filters, clearCompletedButton);

  return todo_footer;
};

export { todo_template, todoInputTask, edit_input, footer_template };
