// to do eleman ekleme

//eleman seçimi

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;



//load items

loadItems();

eventListeners();

//item ekleme

function eventListeners() {
    //oluşturma eventi
    form.addEventListener("submit", addNewItem);
    //silme eventi
    taskList.addEventListener("click", deleteItem);
    //tüm elemanları silme
    btnDeleteAll.addEventListener("click", deleteAllItems);
}

//item yükleme

function loadItems() {
    todos = getItemsFromLS();
    todos.forEach(function (item) {
        createItem(item);
    })

}

// local storagedan item alma
function getItemsFromLS() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

//set ıtem to local storage
function setItemToLS(newTodo) {
    todos = getItemsFromLS();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function createItem(newTodo) {
    //li oluşturma

    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(newTodo));

    //a oluşturma

    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"> </i>';

    li.appendChild(a);
    taskList.appendChild(li);
}

//item oluşturma

function addNewItem(e) {
    if (input.value === "") {
        alert("lütfen eleman ekleyiniz");
    }

    //create Item

    createItem(input.value);

    setItemToLS(input.value);


    e.preventDefault();
}

//item silme

function deleteItem(e) {
    if (e.target.className === "fas fa-times") {
        if(confirm("silmek istediğinize emin misiniz ?")){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        }
    }

    e.preventDefault();
}

function deleteTodoFromStorage(deletetodo) {

    let todos = getItemsFromLS();

    todos.forEach(function (todo,index){
        if (todo === deletetodo) {
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));

}


//tüm elemanları silme

function deleteAllItems(e) {
    if (confirm("tüm elemanları silmek istediğinize emin misiniz ?")) {
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }

}

