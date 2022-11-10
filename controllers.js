import { Tasks } from "./tasks";
import { edit_input, task } from "./view";

const tasks = new Tasks();

const createTask = (event) => {
  const input = event.target;

  if (input.value.trim() == "") return;
  const text = input.value;
  input.value = "";

  deleteButtonOnClick = (event) => {
    tasks.deleteTask(event.target.id);
    event.target.remove();
    update();
  };

  taskOnDblClick = (event) => {
    const taskElem = event.target;
    taskElem.classList.add("task_state_editing");
    const task = tasks.getTaskByID(div.id);

    innerInputOnChange = (event) => {
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

    edit_input.focus();
  };

  const newTask = task(text, taskOnDblClick, deleteButtonOnClick);

  document.getElementsByClassName("todo__list")[0].append(newTask);
  update();
};

export default { createTask };
