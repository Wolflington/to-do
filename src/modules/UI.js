import { toDoProperties, createToDo } from './tasks';

export function displayToDo() {
    const getToDoFunction = createToDo();
    const getList = getToDoFunction.getToDo();

    let tasksList = document.querySelector('.tasks-list');

    //Factory function to print the properties on the page
    const printTasks = () => {
        tasksList.innerHTML = ''; //Ensures that the previously added 
        //task is not duplicated for the 
        //next tasks that will be added

        //FOR EACH getToDo's parameter (book and index)
        getList.forEach((task, index) => {
            //CREATE ELEMENT div 
            const tasksItem = document.createElement('div');
            //ADD CLASS to the created div
            tasksItem.classList.add('tasks-item');

            // Create paragraphs for each task property
            const taskTitle = document.createElement('p');
            taskTitle.textContent = task.title;
            tasksItem.appendChild(taskTitle);

            const taskDescription = document.createElement('p');
            taskDescription.textContent = task.description;
            tasksItem.appendChild(taskDescription);

            const taskDueDate = document.createElement('p');
            taskDueDate.textContent = task.dueDate;
            tasksItem.appendChild(taskDueDate);

            const taskPriority = document.createElement('p');
            taskPriority.textContent = task.priority;
            tasksItem.appendChild(taskPriority);

            const taskCompleted = document.createElement('p');
            taskCompleted.textContent = task.completed;
            tasksItem.appendChild(taskCompleted);

            //Append tasksInfo to the tasksList
            tasksList.append(tasksItem);
        });
    }

    //Create a function that adds (pushes) the tasks into array
    const addTasks = (task) => {
        getList.push(task);
    }

    //Clear input after submitting the form
    const clearInput = () => {
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('due-date').value = '';
        document.getElementById('priority').value = '';
    }

    return { printTasks, addTasks, clearInput };
}

const displayToDoObj = Object.create(displayToDo());

//Event listener for adding tasks
//Get the form DOM
const tasksForm = document.getElementById('tasks-form');
//Attach the form to an event listener
tasksForm.addEventListener('submit', function(e) {
    e.preventDefault();
    //GET the value received from the form
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;

    //Create new addToDo instance (similar to creating a new constructor)
    const getToDoFunction = createToDo();
    let getList = getToDoFunction.getToDo();
    const task = toDoProperties(title, description, dueDate, priority);
    
    //Push the new instance into addTasks
    displayToDoObj.addTasks(task);
    displayToDoObj.printTasks();
    displayToDoObj.clearInput();

});

const openModal = () => {
    modal.classList.remove('hidden');
}

const closeModal = () => {
    modal.classList.add('hidden');
}

const modal = document.querySelector('.modal');
const addTaskBtn = document.querySelector('.add-task-btn');
const closeBtn = document.querySelector('.close-btn');
const submitBtn = document.getElementById('submit');

//Event listeners
addTaskBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
submitBtn.addEventListener('click', closeModal);