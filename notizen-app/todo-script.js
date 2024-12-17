const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskText = input.value.trim();
    if (taskText === '') return;

    const todo = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    todos.push(todo);
    input.value = '';
    renderTodos();
});

function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => {
            todo.completed = !todo.completed;
            renderTodos();
        });

        const span = document.createElement('span');
        span.textContent = todo.text;
        if (todo.completed) {
            span.style.textDecoration = 'line-through';
        }

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Löschen';
        deleteButton.addEventListener('click', () => {
            todos = todos.filter(t => t.id !== todo.id);
            renderTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton)
        todoList.appendChild(li);
    });
}