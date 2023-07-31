function addNewTask(text, completed) {
  const li = createLi(text);
  tasks.appendChild(li);
  addClass(li, completed);
  saveTask();
}

function clearInput() {
  taskInput.value = "";
  taskInput.focus();
}

function addClass(li, completed) {
  const button = li.querySelector(".complete-btn");
  if (completed) {
    const span = button.nextElementSibling;
    span.classList.add("complete-task");
    button.classList.add("active");
  }
}

function saveTask() {
  const liTasks = tasks.querySelectorAll("li > span");
  const listOfTasks = [];

  for (let task of liTasks) {
    const complete = task.classList.contains("complete-task");
    listOfTasks.push({ text: task.innerText, completed: complete });
  }

  const tasksJSON = JSON.stringify(listOfTasks);
  localStorage.setItem("tasks", tasksJSON);
}

function addSavedTasks() {
  const tasks = localStorage.getItem("tasks");
  const listOfTasks = JSON.parse(tasks);

  for (task of listOfTasks) {
    addNewTask(task.text, task.completed);
  }
}

function createLi(text) {
  const li = document.createElement("li");
  li.appendChild(addCompleteBtn());

  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(span);

  li.appendChild(addDeleteBtn());
  return li;
}

function addCompleteBtn() {
  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete-btn");

  const completeIcon = document.createElement("span");
  completeIcon.classList.add("material-symbols-outlined", "complete-icon");
  completeIcon.innerText = "done";

  completeBtn.appendChild(completeIcon);
  return completeBtn;
}

function addDeleteBtn() {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");

  const deleteIcon = document.createElement("span");
  deleteIcon.classList.add("material-symbols-outlined", "delete-icon");
  deleteIcon.innerText = "delete";

  deleteBtn.appendChild(deleteIcon);
  return deleteBtn;
}

const taskInput = document.querySelector(".task-input");
const taskBtn = document.querySelector(".task-btn");
const tasks = document.querySelector(".tasks");

taskBtn.addEventListener("click", () => {
  if (!taskInput.value) return;
  addNewTask(taskInput.value);
  clearInput();
});

taskInput.addEventListener("keypress", (e) => {
  if (e.keyCode === 13 || e.key === "Enter") {
    if (!taskInput.value) return;
    addNewTask(taskInput.value);
    clearInput();
  }
});

document.addEventListener("click", (e) => {
  const target = e.target;

  if (
    target.classList.contains("complete-btn") ||
    target.classList.contains("complete-icon")
  ) {
    const button = target.closest("button");

    if (!button.classList.contains("active")) {
      const span = button.nextElementSibling;
      span.classList.add("complete-task");
      button.classList.add("active");
    } else {
      const span = button.nextElementSibling;
      span.classList.remove("complete-task");
      button.classList.remove("active");
    }
    saveTask();
  }

  if (
    target.classList.contains("delete-btn") ||
    target.classList.contains("delete-icon")
  ) {
    const li = target.closest("li");
    li.remove();
    saveTask();
  }
});

addSavedTasks();
