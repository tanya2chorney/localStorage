function loadTasks() {
  const tasks = ["first", "second", "third", "fourth"];
  tasks.forEach((taskId) => {
    const checkbox = document.getElementById(taskId);
    const savedStatus = localStorage.getItem(taskId);
    if (savedStatus === "true") {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
}

function saveTaskStatus(event) {
  const checkbox = event.target;
  localStorage.setItem(checkbox.id, checkbox.checked);
}

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", saveTaskStatus);
  });
});
