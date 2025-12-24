// -------------todo---------------

const inp = document.getElementById("input");
const addtask = document.getElementById("add-task");
const list = document.getElementById("todo-list");


function addTask() {
    let input = inp.value.trim();


    const li = document.createElement("li");
    // const li = document.querySelector("li");
    li.innerHTML = `<input type="checkbox">${input}<img src="assets/delete.png">`

    list.appendChild(li);
    inp.value = "";

}

addtask.addEventListener('click', addTask);
