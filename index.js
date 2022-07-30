const list = [];
list.activeElements = 0;

let next_id = 0;

// const item = { state: 0, text: "", id: 0 };

const addItem = (text) => {
  const item = { state: 0, text: text, id: next_id++ };
  list.activeElements += 1;
  list.push(item);

  const div = document.createElement("div");
  div.className = "task";
  div.id = item.id;
  div.dataset.state = item.state;
  // div.innerHTML = `
  // <input type="checkbox" onclick="changeState(${id}, this.value)"/>
  // <p>${text}</p>
  // <button onclick="deleteItem(${id})">X</button>`;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onclick = () => {
    changeState(div.id);
  };

  const content = document.createElement("p");
  content.textContent = item.text;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.onclick = () => {
    deleteItem(div.id);
  };

  div.append(checkbox, content, deleteButton);
  document.getElementsByClassName("todos")[0].append(div);

  update();
};

const deleteItem = (id) => {
  const ind = list.findIndex((item) => item.id == id);
  list.splice(ind);

  document.getElementById(id).remove();

  update();
};

const changeState = (id) => {
  const ind = list.findIndex((item) => item.id == id);

  const div = document.getElementById(id);
  console.log(div, ind, list);
  if (list[ind].state === 0) {
    div.classList.add("completed");
    div.dataset.state = 1;
    list[ind].state = 1;
    list.activeElements -= 1;
  } else {
    list[ind.state] = 0;
    div.dataset.state = 0;
    div.classList.remove("completed");
    list.activeElements += 1;
  }

  update();
};

// может это как-то покрасивее сделать
const update = () => {
  updateCounter();
  updateSummaryVisability();
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

const clearCompleted = () => {
  let idToDelete = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].state == 1) {
      document.getElementById(list[i].id).remove();
      idToDelete.push(list[i].id);
    }
  }

  idToDelete.forEach((id) => {
    const ind = list.findIndex((item) => item.id == id);
    list.splice(ind);
  });

  console.log(list, idToDelete)
  update();
};

const clearFilterButtonsSelection = () => {
  const buttons = document.getElementsByClassName("filter")[0].children;
  console.log();
  for (item of buttons) {
    item.classList.remove("button-selected");
  }
};

const showAll = () => {
  clearFilterButtonsSelection();
  document.getElementById("button-all").classList.add("button-selected");

  const tasks = document.getElementsByClassName("task");
  for (item of tasks) {
    item.classList.remove("hide");
  }
};

const showActive = () => {
  clearFilterButtonsSelection();
  document.getElementById("button-active").classList.add("button-selected");

  const tasks = document.getElementsByClassName("task");
  for (item of tasks) {
    if (item.dataset.state == 0) item.classList.remove("hide");
    else item.classList.add("hide");
  }
};

const showCompleted = () => {
  clearFilterButtonsSelection();
  document.getElementById("button-completed").classList.add("button-selected");

  const tasks = document.getElementsByClassName("task");
  for (item of tasks) {
    if (item.dataset.state == 1) item.classList.remove("hide");
    else item.classList.add("hide");
  }
};
