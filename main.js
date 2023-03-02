let input = document.querySelector(".input");
let add = document.querySelector(".add");
let showArea = document.querySelector(".tasks");
let deleteBtn = document.querySelector(".delete");
let tasksCounter = document.querySelector(".footer p span");
let clearAll = document.querySelector(".clearAll");

if (localStorage.getItem(`localItem`) !== null) {
  showTasks();
}

add.addEventListener("click", () => {
  let localItems = JSON.parse(localStorage.getItem(`localItem`));
  let taskList = [];
  if (localItems === null) {
    taskList = [];
  } else {
    taskList = localItems;
  }

  if (input.value !== "") {
    taskList.push({
      id: parseInt(Math.random() * 1000000000000),
      title: input.value,
    });

    window.localStorage.setItem("localItem", JSON.stringify(taskList));
    input.value = "";
  }
  showTasks();
});

function showTasks() {
  let obj = JSON.parse(localStorage.getItem(`localItem`));
  let outPut = ``;
  if (obj !== null) {
    for (let i = 0; i < obj.length; i++) {
      outPut += `<div class="task">
                  <div class="taskText">${obj[i]["title"]}</div>
                    <button onclick="editTask(${i})" class="edit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"
                          fill="rgba(155,89,182,1)"
                        />
                      </svg>
                    </button>
                  <button onclick="deleteTask(${i})" class="delete">
                    <svg
                      class="delete"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
                        fill="rgba(231,76,60,1)"
                      />
                    </svg>
                  </button>
                </div>`;
    }
  }

  if (obj.length == 0) {
    outPut += `<p>You have no tasks yet</p>`;
  }

  showArea.innerHTML = outPut;

  if (JSON.parse(localStorage.getItem(`localItem`)) === null) {
    tasksCounter.textContent = "0";
  } else {
    tasksCounter.textContent = JSON.parse(
      localStorage.getItem(`localItem`)
    ).length;
  }
}

function deleteTask(index) {
  let taskList = JSON.parse(localStorage.getItem(`localItem`));
  taskList.splice(index, 1);
  localStorage.setItem("localItem", JSON.stringify(taskList));
  showTasks();
}

function editTask(index) {
  const task = document.querySelectorAll(".taskText");
  let localItemToEdit = JSON.parse(localStorage.getItem(`localItem`));

  const editInput = document.createElement("input");
  editInput.setAttribute("type", "text");
  editInput.classList.add("editInp");
  editInput.value = task[index].textContent;

  task[index].parentNode.replaceChild(editInput, task[index]);

  editInput.addEventListener("blur", (event) => {
    const newTaskContent = event.target.value;

    const newTask = document.createElement("div");
    newTask.classList.add("taskText");
    newTask.textContent = newTaskContent;
    localItemToEdit[index].title = newTaskContent;

    editInput.parentNode.replaceChild(newTask, editInput);

    localStorage.setItem("localItem", JSON.stringify(localItemToEdit));
    showTasks();
  });
}

clearAll.onclick = function () {
  window.localStorage.setItem("localItem", JSON.stringify([]));
  tasksCounter.textContent = "0";
  showTasks();
};
