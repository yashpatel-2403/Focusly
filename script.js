// -------------todo---------------

const inp = document.getElementById("input");
const addtask = document.getElementById("add-task");
const list = document.getElementById("todo-list");



function addTask() {
    let input = inp.value.trim();


    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox">${input}<img class="del" src="assets/delete.png">`

    list.appendChild(li);
    inp.value = "";

}

addtask.addEventListener('click', addTask);

list.addEventListener('click', (e) => {
    if(e.target.classList.contains('del'))
    {
        e.target.closest('li').remove();
    }

    if(e.target.type == 'checkbox')
    {
        const li = e.target.closest('li');
        li.classList.toggle('completed',e.target.checked);
    }
})