// selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// functions
function addTodo(event) {
  // prevent form from submitting
  event.preventDefault();
  // todo DIV
  const todoDiv = document.createElement('div'); // <div class="todo"></div>
  todoDiv.classList.add('todo');
  // create LI
  const newTodo = document.createElement('li'); // <li class="todo-item">hey</li>
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.append(newTodo); // <div> .. <li>
  // add todo to local storage
  saveLocalTodo(todoInput.value);
  // CHECK MARK BUTTON
  const completedButton = document.createElement('button'); // <button class="complete-btn"><i class="fas fa-check"></i></button>
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add('complete-btn');
  todoDiv.append(completedButton); // <div> .. <li><button>
  // CHECK TRASH BUTTON
  const trashButton = document.createElement('button'); // <button class="complete-btn"><i class="fas fa-check"></i></button>
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add('trash-btn');
  todoDiv.append(trashButton); // <div> .. <li><button><button>
  // append to list
  todoList.append(todoDiv); // <ul> .. <div> .. <li><button><button>
  // clear todo input value
  todoInput.value = '';
}

function deleteCheck(e) {
  // delete todo
  const item = e.target;
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    // animaton
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    })
  }
  // check mark
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(todo => {
    switch (e.target.value) {
      case "all":
        todo.style.display = 'flex';
        break;
      case "completed":
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  })
}

function saveLocalTodo(todo) {
  // check -- do i already have thing in there?
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    // todo DIV
    const todoDiv = document.createElement('div'); // <div class="todo"></div>
    todoDiv.classList.add('todo');
    // create LI
    const newTodo = document.createElement('li'); // <li class="todo-item">hey</li>
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.append(newTodo); // <div> .. <li>
    // CHECK MARK BUTTON
    const completedButton = document.createElement('button'); // <button class="complete-btn"><i class="fas fa-check"></i></button>
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add('complete-btn');
    todoDiv.append(completedButton); // <div> .. <li><button>
    // CHECK TRASH BUTTON
    const trashButton = document.createElement('button'); // <button class="complete-btn"><i class="fas fa-check"></i></button>
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add('trash-btn');
    todoDiv.append(trashButton); // <div> .. <li><button><button>
    // append to list
    todoList.append(todoDiv); // <ul> .. <div> .. <li><button><button>   
  })
}

function removeLocalTodos(todo) {
  // check -- do i already have thing in there?
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}