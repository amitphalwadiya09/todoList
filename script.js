document.addEventListener('DOMContentLoaded', function() {
    displayTasks();
});

const addItemBtn = document.getElementById('addItemBtn');
const todaysTasks = document.getElementById('todaysTasks');
const futureTasks = document.getElementById('futureTasks');
const completedTasks = document.getElementById('completedTasks');

addItemBtn.addEventListener('click', () => {
    const itemName = document.getElementById('itemName').value;
    const itemDate = document.getElementById('itemDate').value;
    const priority = document.getElementById('priority').value;

    const todoItem = {
        id: Date.now(),
        name: itemName,
        date: itemDate,
        priority: priority,
        completed: false
    };

    addItemToLocalStorage(todoItem);
    displayTasks();
});

function addItemToLocalStorage(item) {
    let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    todoList.push(item);
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function displayTasks() {
    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

    const todayDate = new Date().toISOString().split('T')[0];
    const todayTasks = [];
    const futureTasksList = [];
    const completedTasksList = [];

    todoList.forEach(item => {
         if (item.completed) {
            completedTasksList.push(item);

        } 
        else  if (item.date=== todayDate) {
            todayTasks.push(item);
        }else {
            futureTasksList.push(item);
        }
    });

    displayTasksInSection(todayTasks, todaysTasks);
    displayTasksInSection(futureTasksList, futureTasks);
    displayTasksInSection(completedTasksList, completedTasks);
}

function displayTasksInSection(tasks, section) {
    section.innerHTML = '';
    tasks.forEach(item => {
        const taskElement = createTaskElement(item);
        section.appendChild(taskElement);
    });
}

function createTaskElement(item) {
    const element = document.createElement('div');
    element.className = 'container';

    // const id = document.createElement('div');
    // id.innerHTML = item.id;

    const elementName = document.createElement('div');
    elementName.innerHTML = item.name;
    // elementName.appendChild(id);

    const elementDate = document.createElement('div');
    elementDate.innerHTML = item.date;

    const priority = document.createElement('div');
    priority.innerHTML = item.priority;

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'butt';

    const completedButton = document.createElement('button');
    completedButton.setAttribute('id', `taskcomplete-${item.id}`);
    completedButton.addEventListener('click', () => completeTask(item.id));
    completedButton.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
    completedButton.style.border = 'none';
    completedButton.style.backgroundColor='transparent'
    completedButton.style.color='white'

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('id', 'deletetask');
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteButton.style.backgroundColor='transparent'
    deleteButton.style.color='white'
    deleteButton.style.border = 'none';

    deleteButton.addEventListener('click', () => deleteTask(item.id));

    element.appendChild(elementName);
    element.appendChild(elementDate);
    element.appendChild(priority);
    buttonContainer.appendChild(completedButton);
    buttonContainer.appendChild(deleteButton);
    element.appendChild(buttonContainer);

    if (item.completed) {
        deleteButton.style.color = 'black';
        element.classList.add('completed-task');
        
    }

    return element;
}

function deleteTask(id) {
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    todoList = todoList.filter(item => item.id !== id);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    displayTasks();
}

function completeTask(id) {
    let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    const index = todoList.findIndex(item => item.id === id);
    if (index !== -1) {
        todoList[index].completed = true;
        localStorage.setItem('todoList', JSON.stringify(todoList));
        displayTasks();
        
    }
}



