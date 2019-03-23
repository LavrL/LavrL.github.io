function createElement(tag, properties, ...children) {
    const element = document.createElement(tag);
    
    Object.keys(properties).forEach(key => {
        element[key] = properties[key]
    });

    if (children.length > 0) {
        children.forEach(child => {
            if (typeof child === 'string') {
                child = document.createTextNode(child);
            }
            element.appendChild(child);
        });
    }

    return element;
}

function createTodoItem(title) {
    const label = createElement('label', { className: 'title' }, title);
    const editInput = createElement('input', { type: 'text', className: 'textfield' });
    const editButton = createElement('button', { className: 'edit' }, 'Edit');
    const deleteButton = createElement('button', { className: 'delete' }, 'Delete');
    const listItem = createElement('li', { className: 'todo-item' }, label, editInput, editButton, deleteButton);

    bindEvents(listItem);

    return listItem;
}

function bindEvents(todoItem) {
    const editButton = todoItem.querySelector('.edit');
    const deleteButton = todoItem.querySelector('.delete');

    editButton.addEventListener('click', editTodoItem);
    deleteButton.addEventListener('click', deleteTodoItem);
}

function addTodoItem(event) {
    event.preventDefault();

    if (addInput.value === '') return alert('Nothing was entered');

    const todoItem = createTodoItem(addInput.value);

    todoList.appendChild(todoItem);
    addInput.value = '';
}

function toggleTodoItem() {
    const listItem = this.parentNode;
    listItem.classList.toggle('completed');
}

function editTodoItem() {
    const listItem = this.parentNode;
    const title = listItem.querySelector('.title');
    const editInput = listItem.querySelector('.textfield');
    const isEditing = listItem.classList.contains('editing');

    if (isEditing) {
        title.innerText = editInput.value;
        console.log('Savin in DB - ' + editUserAddress(oldAddress, title.innerText)) //do NOT delete
        this.innerText = 'Edit';
    }
    else {
        editInput.value = title.innerText;
        oldAddress = editInput.value;
        console.log('Editing text - ' + oldAddress)
        this.innerText = 'Save';
    }

    listItem.classList.toggle('editing');
}

function deleteTodoItem() {
    const listItem = this.parentNode;
    //console.log(listItem.getElementsByClassName("title")[0].innerHTML);
    todoList.removeChild(listItem);
    console.log('Deleted address - ' + deleteUserAddress(listItem.getElementsByClassName("title")[0].innerHTML))
}

const todoForm = document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');
var oldAddress = '';

function main() {
    todoForm.addEventListener('submit', addTodoItem);
    todoItems.forEach(item => bindEvents(item));
}

main();
