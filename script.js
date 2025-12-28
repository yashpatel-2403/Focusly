const inp = document.getElementById("input");
const addtask = document.getElementById("add-task");
const list = document.getElementById("todo-list");

let allTasks = [];

function addTask() {
    let input = inp.value.trim();
    
    // Safety check: Don't add empty tasks
    if(input === "") return; 

    // FIXED: Default 'completed' should be false (boolean), not "true" string
    let taskObj = { text: input, completed: false }; 
    
    allTasks.push(taskObj);
    saveTask();
    
    // FIXED: Call renderTask so it shows up immediately!
    renderTask(); 
    
    inp.value = "";
}

addtask.addEventListener('click', addTask);

// ---------------------------------------------------------
//  FIXED: EVENT LISTENER LOGIC (The most important part)
// ---------------------------------------------------------
list.addEventListener('click', (e) => {
    
    // 1. DELETE LOGIC
    if(e.target.classList.contains('del')) {
        // We use the data-index we stored in the HTML to know WHICH item to delete
        const index = e.target.getAttribute("data-index");
        
        // Remove 1 item at that index from the Array
        allTasks.splice(index, 1);
        
        saveTask();   // Update LocalStorage
        renderTask(); // Update the Screen
    }

    // 2. CHECKBOX LOGIC
    if(e.target.type == 'checkbox') {
        const index = e.target.getAttribute("data-index");
        
        // Update the actual data object
        allTasks[index].completed = e.target.checked;
        
        saveTask(); // Save the new state
        renderTask(); // Re-render to apply strikethrough styles
    }
})

function saveTask() {
    const taskJSON = JSON.stringify(allTasks);
    localStorage.setItem('todoList', taskJSON);
}

function renderTask() {
    list.innerHTML = "";

    if(allTasks.length === 0)
    {
        list.innerHTML = `<div class = "empty-msg"><p> Not any tasks yet</p></div>`
    }

    allTasks.forEach(function(task, index) {
        // FIXED: Added data-index="${index}" to the checkbox too, 
        // so we can easily find it in the event listener above.
        const taskItem = `
            <li class="task-item">
                <input type="checkbox" data-index="${index}" ${task.completed ? "checked" : ""}> 
                <span class="${task.completed ? "completed" : ""}">${task.text}</span>
                <img class="del" data-index="${index}" src="assets/delete.png">
            </li>`;

        list.innerHTML += taskItem;
    });
}

function loadTask() {
    let savedData = localStorage.getItem("todoList");
    if(savedData) {
        allTasks = JSON.parse(savedData);
        renderTask();
    }
}

loadTask();



//----------section change-----------

const todo_btn = document.getElementById("to-do-btn");
const notes_btn = document.getElementById("notes-btn");

const todo_sec = document.getElementById("todo");
const notes_sec = document.getElementById("notes");

todo_btn.addEventListener('click',() => {
    todo_btn.classList.add("active");
    notes_btn.classList.remove("active");

    todo_sec.classList.remove("hidden");
    notes_sec.classList.add("hidden");

})

notes_btn.addEventListener('click',() => {
    notes_btn.classList.add("active");
    todo_btn.classList.remove("active");

    notes_sec.classList.remove("hidden");
    todo_sec.classList.add("hidden");

})