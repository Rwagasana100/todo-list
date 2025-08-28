let myArray = [];

// Load saved todos
function loadTodos(){
  const stored = JSON.parse(localStorage.getItem('todos'));
  if(stored) myArray = stored;
}
loadTodos();

function saveTodos(){
  localStorage.setItem('todos', JSON.stringify(myArray));
}

// Render tasks
function renderAddtodo(tasks = myArray){
  let addToHTML = '';
  tasks.forEach((todoObject, i) => {
    const {name, date, priority, completed} = todoObject;
    const completedClass = completed ? "completed" : "";
    const priorityClass = `priority-${priority}`;

    const html = `
      <div class="todo-card ${priorityClass}">
        <div>
          <div class="${completedClass}">${name}</div>
          <small>${date} | Priority: ${priority}</small>
        </div>
        <div>
          <button class="complete-button" onclick="toggleComplete(${i})">✔</button>
          <button class="delete-button" onclick="deleteTodo(${i})">🗑</button>
        </div>
      </div>`;
    addToHTML += html;
  });
  document.querySelector('.js-display').innerHTML = addToHTML;
  updateProgress();
}

// Add task
function addTodo(){
  const inputTask = document.querySelector('.js-task');
  const taskTobedone = inputTask.value.trim();
  const inputDate = document.querySelector('.js-date');
  const dueDate = inputDate.value;
  const priority = document.querySelector('.js-priority').value;

  if(taskTobedone === "") return;

  myArray.push({
    name: taskTobedone,
    date: dueDate || "No date",
    priority: priority,
    completed: false
  });

  inputTask.value = '';
  inputDate.value = '';
  saveTodos();
  renderAddtodo();
}

// Delete task
function deleteTodo(i){
  myArray.splice(i,1);
  saveTodos();
  renderAddtodo();
}

// Toggle completed
function toggleComplete(i){
  myArray[i].completed = !myArray[i].completed;
  saveTodos();
  renderAddtodo();
}

// Progress bar
function updateProgress(){
  const total = myArray.length;
  const completed = myArray.filter(todo => todo.completed).length;
  const percent = total > 0 ? (completed / total) * 100 : 0;
  document.querySelector('.progress').style.width = percent + "%";
}

// Search/filter
function searchTodo(){
  const query = document.querySelector('.search-input').value.toLowerCase();
  const filtered = myArray.filter(todo => todo.name.toLowerCase().includes(query));
  renderAddtodo(filtered);
}

// Initial render
renderAddtodo();
