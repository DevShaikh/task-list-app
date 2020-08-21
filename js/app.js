// UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

// Event Listener Loader
loadEventListeners();

// Load All Event Listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask)
  // Remove task event
  taskList.addEventListener('click', removeTask)
  // Clear tasks event
  clearBtn.addEventListener('click', clearTasks)
  // Filter tasks event
  filter.addEventListener('keyup', filterTask)
  // Dom load event
  document.addEventListener('DOMContentLoaded', getTasks)

}

// Get tasks from local storage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {
    // Create li element
    const li = document.createElement('li')
    // Add class to li
    li.className = "collection-item"
    // Create text node and append to li
    li.appendChild(document.createTextNode(task ))
    // Create new link element
    const link = document.createElement('a')
    // Add class
    link.className = "deleteTask secondary-content"
    // Add icon html
    link.innerHTML = '<i class="fa fa-trash-alt"></i>'
    // Append the link to li
    li.appendChild(link)

    // Append the li to ul
    taskList.appendChild(li)
  })

}

// Add task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Fill the task field')
  } else {
    
    // Create li element
    const li = document.createElement('li')
    // Add class to li
    li.className = "collection-item"
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value))
    // Create new link element
    const link = document.createElement('a')
    // Add class
    link.className = "deleteTask secondary-content"
    // Add icon html
    link.innerHTML = '<i class="fa fa-trash-alt"></i>'
    // Append the link to li
    li.appendChild(link)

    // Append the li to ul
    taskList.appendChild(li)

    // Store task in LS
    storeTaskInLocalStorage(taskInput.value)

    // Clear input
    taskInput.value = '';

  }

  e.preventDefault();
} 

// Store task in Local Storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task)

  localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

// Remove task from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove task from UI
function removeTask(e) {
  if(e.target.parentElement.classList.contains('deleteTask')) {
    if(confirm('Are you sure?')) {
      // Remove from UI
      e.target.parentElement.parentElement.remove();
      // Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

// Clear tasks
function clearTasks() {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
  localStorage.clear();
}

// Filter tasks

function filterTask(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none  ';
    }
    console.log(task.firstChild.textContent)
  })

  console.log(text)
}