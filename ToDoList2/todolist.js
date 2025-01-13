const addTaskButton = document.getElementById("addtask");
let todo = JSON.parse(localStorage.getItem("task")) || [];

loadtask();

function addtask() {
    const inputTask = document.getElementById("inputtask");
    const task = inputTask.value.trim();
    if (task) {
        todo.push(task);
        inputTask.value = "";
        newlist();
        saveTasks();
    }
}

function deleteTask(index) {
    todo.splice(index, 1);
    newlist();
    saveTasks();
}

function edittask(index) {
    const taskList = document.getElementById("tasklist");
    const listItem = taskList.children[index];


    const currentTask = todo[index];
    listItem.innerHTML = `   
        <input type="text" id="editInput${index}" value="${currentTask}" class="edit-input" />
        <button onclick="saveTask(${index})" class="save">Save</button>
        <button onclick="cancelEdit(${index})" class="cancel">Cancel</button>
    `;
}

function saveTask(index) {
    const editInput = document.getElementById(`editInput${index}`);
    const updatedTask = editInput.value.trim();

    if (updatedTask) {
        todo[index] = updatedTask;
        saveTasks();
    }
    newlist();
}

function saveTasks() {
    localStorage.setItem("task", JSON.stringify(todo));
}

function loadtask() {
    console.log("loadtask")
    const tasks = JSON.parse(localStorage.getItem("task")) || [];
    todo = tasks;
    newlist();

}

function cancelEdit(index) {
    newlist();
}

function newlist() {
    console.log("task List" ,todo);
    
    const taskList = document.getElementById("tasklist");
    taskList.innerHTML = todo
        .map((task, index) => `
            <li>
                ${task}                
                <button onclick="deleteTask(${index})" class="delete"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg></button>
                <button onclick="edittask(${index})" class="Edit"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg></button>
            </li>
        `)
        .join("");
}

addTaskButton.addEventListener("click", addtask);
