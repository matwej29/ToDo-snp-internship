const todo_template = (input, footer) => {
  const todo = document.createElement("div");
  todo.className = "todo";

  const todo__list = document.createElement("div");
  todo__list.className = "todo__list";

  todo.append(input, todo__list, footer);

  return todo;
};

const task = (text, taskOnDblClick, onClickDelete, id) => {
  const task = document.createElement("div");
  task.className = "task";
  task.addEventListener("dbclick", taskOnDblClick);

  const task_input = document.createElement("input");
  task_input.type = "checkbox";

  const task_content = document.createElement("p");
  task_content.className = "task__content";
  task_content.value = text;

  const task_delete_button = document.createElement("button");
  task_delete_button.className = "task__button_type_delete";
  task_delete_button.addEventListener("click", onClickDelete);

  task.append(task_input, task_content, task_delete_button);

  return task;
};

const todoInputTask = (toggleComplete, addItem) => {
  const todoInputBlock = document.createElement("div");
  todoInputBlock.className = "todo__input";

  const toggleCompleteButton = document.createElement("button");
  toggleCompleteButton.id = "toggleTasksState";
  toggleCompleteButton.className = "btn btn-primary hide";
  toggleCompleteButton.value = "toggle state";
  toggleCompleteButton.addEventListener("click", toggleComplete);

  const input = document.createElement("input");
  input.type = "text";
  input.className = "input";
  input.autofocus = true;
  input.addEventListener("change", addItem);

  todoInputBlock.append(toggleCompleteButton, input);

  return todoInputBlock;
};

const edit_input = (value, onChange) => {
  const input = document.createElement("input");
  input.className = "input";
  input.type = "text";
  input.value = value;
  input.addEventListener("blur", onChange);
  input.addEventListener("change", onChange);

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
  const todo__footer = document.createElement("div");
  todo__footer.className = "todo__footer hide";

  const itemsLeft = document.createElement("p");
  itemsLeft.id = "itemsLeft";
  itemsLeft.textContent = "n left";

  const todo__filters = document.createElement("div");
  todo__filters.className = "todo__filters";

  const filterAll = createFilter("filterAll", "All", selected=true);
  filterAll.addEventListener("click", filterAllOnClick);

  const filterActive = createFilter("filterActive", "Active");
  filterActive.addEventListener("click", filterActiveOnClick);

  const filterCompleted = createFilter("filterCompleted", "Completed");
  filterCompleted.addEventListener("click", filterCompletedOnClick);

  todo__filters.append(filterAll, filterActive, filterCompleted);

  const clearCompletedButton = document.createElement("a");
  clearCompletedButton.href = "#";
  clearCompletedButton.className = "link clear-completed";
  clearCompletedButton.addEventListener("click", clearCompleted);

  todo__footer.append(itemsLeft, todo__filters, clearCompletedButton);

  return todo__footer;
};

export { task, todoInputTask, edit_input, footer_template, todo_template };
