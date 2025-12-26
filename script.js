const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filters button");

let tasks = [];
addBtn.addEventListener("click", () => {
  if (taskInput.value === "") return;

  tasks.push({
    text: taskInput.value,
    completed: false
  });

  taskInput.value = "";
  renderTasks("all");
});
addBtn.animate(
  [
    { transform: "scale(1)" },
    { transform: "scale(1.1)" },
    { transform: "scale(1)" }
  ],
  { duration: 300 }
);

function renderTasks(filter) {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      filter === "completed" && !task.completed ||
      filter === "pending" && task.completed
    ) return;

    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">❌</button>
    `;

    taskList.appendChild(li);
  });
}
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks("all");
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks("all");
}
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTasks(btn.dataset.filter);
  });
});
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
window.onload = () => {
  const saved = localStorage.getItem("tasks");
  if (saved) tasks = JSON.parse(saved);
  renderTasks("all");
};
