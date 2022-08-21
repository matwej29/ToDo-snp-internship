const list = [];
list.activeElements = 0;
let activeFilter = "all";

let next_id = 0;

const addItem = (text) => {
  // state: "active", "completed"
  const item = { state: "active", text: text, id: next_id++ };
  list.activeElements += 1;
  list.push(item);

  const div = document.createElement("div");
  div.className = "task";
  div.id = item.id;
  div.dataset.state = item.state;
  div.dataset.clicked = false;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onclick = () => {
    div.toggleComplete();
  };

  const content = document.createElement("p");
  content.textContent = item.text;
  content.classList = "task-content";

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.onclick = () => {
    const ind = list.findIndex((item) => item.id == div.id);
    list.splice(ind);
    div.remove();
    update();
  };

  content.ondblclick = () => {
    const edit_input = document.createElement("input");
    edit_input.type = "text";
    edit_input.value = content.textContent;

    div.classList.add("editing");
    deleteButton.classList.add("hide");
    checkbox.classList.add("hide");
    content.classList.add("hide");

    content.after(edit_input);
    edit_input.onblur = edit_input.onchange = () => {
      div.classList.remove("editing");
      deleteButton.classList.remove("hide");
      checkbox.classList.remove("hide");
      content.classList.remove("hide");

      const ind = list.findIndex((item) => item.id == div.id);
      content.textContent = edit_input.value;
      list[ind].text = edit_input.value;
      edit_input.remove();
    };
    edit_input.focus();
  };

  div.append(checkbox, content, deleteButton);
  document.getElementsByClassName("todos")[0].append(div);
  update();

  div.toggleComplete = (target_val) => {
    const curr_item_ind = list.findIndex((elem) => elem.id == div.id);
    if (
      (target_val == "completed" && list[curr_item_ind].state == "active") ||
      (list[curr_item_ind].state == "active" && target_val == undefined)
    ) {
      div.classList.add("completed");
      checkbox.checked = true;
      list[curr_item_ind].state = div.dataset.state = "completed";
      list.activeElements -= 1;
    } else if (
      (target_val == "active" && list[curr_item_ind].state == "completed") ||
      (list[curr_item_ind].state == "completed" && target_val == undefined)
    ) {
      div.classList.remove("completed");
      checkbox.checked = false;
      list[curr_item_ind].state = div.dataset.state = "active";
      list.activeElements += 1;
    }
    if (div.dataset.state != activeFilter && activeFilter != "all") {
      div.classList.add("hide");
    }
    update();
  };
};

// может это как-то покрасивее сделать
const update = () => {
  updateCounter();
  updateSummaryVisability();
  updateToggleCompleteButtonState();
  updateClearCompletedVisability();
};

const updateClearCompletedVisability = () => {
  if (list.length != list.activeElements) {
    document
      .getElementsByClassName("clear-completed")[0]
      .classList.remove("hide");
  } else {
    document.getElementsByClassName("clear-completed")[0].classList.add("hide");
  }
};

const updateCounter = () => {
  document.getElementById(
    "itemsLeft"
  ).textContent = `${list.activeElements} items left`;
};

const updateSummaryVisability = () => {
  if (list.length == 0) {
    document.getElementsByClassName("summary")[0].classList.add("hide");
  } else {
    document.getElementsByClassName("summary")[0].classList.remove("hide");
  }
};

const toggleCompleteButton = (button) => {
  let target_val;
  if (button.classList.contains("complete-button-active")) {
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

const updateToggleCompleteButtonState = () => {
  const button = document.getElementsByClassName("complete-button")[0];
  if (list.activeElements == 0) {
    button.classList.add("complete-button-active");
  } else {
    button.classList.remove("complete-button-active");
  }

  if (list.length == 0) {
    button.classList.add("hide");
  } else {
    button.classList.remove("hide");
  }
};

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
  const buttons = document.getElementsByClassName("filter")[0].children;
  for (item of buttons) {
    item.classList.remove("button-selected");
  }
};

const showAll = () => {
  activeFilter = "all";
  clearFilterButtonsSelection();
  document.getElementById("button-all").classList.add("button-selected");

  const tasks = document.getElementsByClassName("task");
  for (item of tasks) {
    item.classList.remove("hide");
  }
};

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
