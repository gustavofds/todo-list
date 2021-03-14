const createTaskBtn = document.getElementById('criar-tarefa');
const eraseBtn = document.getElementById('remover-selecionado');
const eraseAllBtn = document.getElementById('apaga-tudo');
const removeCompletedBtn = document.getElementById('remover-finalizados');
const saveBtn = document.getElementById('salvar-tarefas');
const moveUpBtn = document.getElementById('mover-cima');
const moveDownBtn = document.getElementById('mover-baixo');
const inputTask = document.getElementById('texto-tarefa');
const taskList = document.getElementById('lista-tarefas');
// let tasks = [];

function addTask(e) {
  e.preventDefault();
  const newTaskItem = document.createElement('li');
  newTaskItem.classList.add('task');
  const newTask = inputTask.value;
  newTaskItem.innerText = newTask;
  taskList.appendChild(newTaskItem);
  inputTask.value = '';
}

function selectItem(e) {
  const allTasks = document.querySelectorAll('.task');
  for (let index = 0; index < allTasks.length; index += 1) {
    if (allTasks[index] !== e.target) {
      allTasks[index].classList.remove('selected');
    }
  }
  e.target.classList.toggle('selected'); 
  
}

// .toggle retirado da documentação do MDN inspirado pela dica do Johnatas no Plantão
function markCompleted(e) {
  e.target.classList.toggle('completed');
}

function eraseItem() {
  const selectedItem = document.querySelector('.selected');
  selectedItem.remove();
}

function eraseAll() {
  taskList.innerHTML = '';
}

// .contains() retirado da doc do MDN - https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains
function removeCompleted() {
  const allTasks = document.querySelectorAll('.task');
  for (let index = allTasks.length - 1; index >= 0; index -= 1) {
    if (allTasks[index].classList.contains('completed')) {
      allTasks[index].remove();
    }
  }
}

// function setTasks() {
//   const allTasks = document.querySelectorAll('.task');
//   tasks = [];
//   allTasks.forEach((li) => tasks.push({
//     name: li.innerText,
//     classes: li.classList,
//   }));
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// // Object.entries relembrado consultando documentação do MDN
// function getTasks() {
//   if (localStorage.tasks) {
//     const recoveredTasks = JSON.parse(localStorage.getItem('tasks'));
//     recoveredTasks.forEach((task) => {
//       const newTaskItem = document.createElement('li');
//       const classEntries = Object.entries(task.classes);
//       for (let index = 0; index < classEntries.length; index += 1) {
//         newTaskItem.classList.add(classEntries[index][1]);
//       }
//       newTaskItem.innerText = task.name;
//       taskList.appendChild(newTaskItem);
//     });
//   }
// }

function setTasks() {
  const allTasks = taskList.innerHTML;
  localStorage.setItem('tasks', allTasks);
}

function getTasks() {
  if (localStorage.tasks) {
    taskList.innerHTML = localStorage.getItem('tasks');
  }
}

// .insertBefore retirado da documentação do MDN
// https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
function moveItemUp() {
  const selectedItem = document.querySelector('.selected');
  const allTasks = document.querySelectorAll('.task');
  for (let index = 0; index < allTasks.length; index += 1) {
    if (allTasks[index] === selectedItem && index !== 0) {
      taskList.insertBefore(selectedItem, allTasks[index - 1]);
    }
  }
}

function moveItemDown() {
  const selectedItem = document.querySelector('.selected');
  const allTasks = document.querySelectorAll('.task');
  for (let index = 0; index < allTasks.length; index += 1) {
    if (allTasks[index] === selectedItem && index !== allTasks.length - 1) {
      taskList.insertBefore(selectedItem, allTasks[index + 2]);
    }
  }
}

createTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', selectItem);
taskList.addEventListener('dblclick', markCompleted);
eraseBtn.addEventListener('click', eraseItem);
eraseAllBtn.addEventListener('click', eraseAll);
removeCompletedBtn.addEventListener('click', removeCompleted);
saveBtn.addEventListener('click', setTasks);
moveUpBtn.addEventListener('click', moveItemUp);
moveDownBtn.addEventListener('click', moveItemDown);
window.addEventListener('load', getTasks);
