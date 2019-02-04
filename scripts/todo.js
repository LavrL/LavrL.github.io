function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}
 
function add() {
    var task = document.getElementById('task').value;
    
    var todos = get_todos();
    
    console.log('todos ' + todos);
    todos.push(task);
    
    console.log('Added value - '+ task);
    localStorage.setItem('todo', JSON.stringify(todos));
    
    console.log(todos);
    show();
 
    return false;
}
 
function remove() {
    var id = this.getAttribute('id');
    console.log('Item ' + id + ' is going to be removed');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
 
    return false;
}
function edit() {
    var id = this.getAttribute('id');
    console.log('Edit ' + ++id + ' in process ...');
}
 
function show() {
    var todos = get_todos();
 
    var html = '<ul>';
    for(var i=0; i<todos.length; i++) {
        html += '<li>' + todos[i] + '<button class="edit" id="' + i  + '">E</button>' + 
        '<button class="remove" id="' + i  + '">R</button></li>';
    };
    html += '</ul>';
 
    document.getElementById('todos').innerHTML = html;
 
    var buttonsRemove = document.getElementsByClassName('remove');
    for (var i=0; i < buttonsRemove.length; i++) {
        buttonsRemove[i].addEventListener('click', remove);
    };
    var buttonsEdit = document.getElementsByClassName('edit');
    for (var i=0; i < buttonsEdit.length; i++) {
        buttonsEdit[i].addEventListener('click', edit);
    };

}
 
document.getElementById('add').addEventListener('click', add);
show();