$(document).ready(function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    $("#taskList").empty();
    tasks.forEach((task, index) => {
      $("#taskList").append(`
        <li class="list-group-item task-item">
          <span class="task-text" contenteditable="false" data-index="${index}">${task}</span>
          <div>
            <button class="btn btn-sm btn-success edit-btn me-2" data-index="${index}">Edit</button>
            <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
          </div>
        </li>
      `);
    });
  }

  function addTask(task) {
    tasks.push(task);
    saveTasks();
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  function updateTask(index, newTask) {
    tasks[index] = newTask;
    saveTasks();
    renderTasks();
  }

  renderTasks();

  $("#addTaskBtn").click(function () {
    const taskVal = $("#taskInput").val().trim();
    if (taskVal !== "") {
      addTask(taskVal);
      $("#taskInput").val("");
    }
  });

  $("#taskList").on("click", ".delete-btn", function () {
    const index = $(this).data("index");
    deleteTask(index);
  });

  
  $("#taskList").on("click", ".edit-btn", function () {
    const index = $(this).data("index");
    const taskText = $(`.task-text[data-index="${index}"]`);

    if ($(this).text() === "Edit") {
      taskText.attr("contenteditable", true).focus();
      $(this).text("Save").removeClass("btn-success").addClass("btn-warning");
    } else {
      const newVal = taskText.text().trim();
      if (newVal !== "") {
        updateTask(index, newVal);
      }
    }
  });
});
