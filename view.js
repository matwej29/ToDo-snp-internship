const todo_template = (input, footer) => /*html*/ `
  <div class="todo">
    ${input}
    <div class="todo__list">
      <!-- todos -->
    </div>
    ${footer}
  </div>
`;

const task = (text, taskOnDblClick, onClickDelete, id) => {
  const task = document.createElement("template");
  task.innerHTML = /*html*/ `
    <div class="task" ondblclick="taskOnDblClick" id="${id}">
      <input type="checkbox" class="input_type_checkbox" />
      <p class="task__content">${text}</p>
      <button
        class="task__button_type_delete"
        onclick="onClickDelete"
      ></button>
    </div>
  `;

  task.addEventListener("dbclick", taskOnDblClick);
};

const inputTask = (toggleComplete, addItem) =>
  /*html*/
  `<div class="todo__input">
    <button
      onclick="toggleComplete"
      id="toggleTasksState"
      class="btn btn-primary hide"
    >
      toggle state
    </button>
    <input type="text" class="input" onchange="${addItem}" autofocus />
  </div>`;

const edit_input = (value, onChange) => /*html*/ `<input
  class="input"
  type="text"
  value="${value}"
  onblur="onChange"
  onchange="onChange"
/>`;

const footer_template = (
  filterAll,
  filterActive,
  filterCompleted,
  clearCompleted
) => /*html*/ `<div class="todo__footer hide">
  <p id="itemsLeft">n left</p>
  <div class="todo__filters">
    <a
      href="#"
      onclick="filterAll"
      id="button-all"
      class="link button-selected"
      >All</a
    >
    <a href="#" onclick="filterActive" id="button-active" class="link"
      >Active</a
    >
    <a href="#" onclick="filterCompleted" id="button-completed" class="link"
      >Completed</a
    >
  </div>
  <a href="#" onclick="clearCompleted" class="link clear-completed"
    >clear completed</a
  >
</div>`;

export { task, inputTask, edit_input, footer_template, todo_template };
