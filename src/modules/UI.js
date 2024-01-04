import { toDoProperties, createToDo } from './tasks';
import { createProject, createProjectTabs } from './projects';
import Delete from '../assets/icons8-trash-can.svg';
import { format, compareAsc } from 'date-fns';

//START OF TO-DOS



export function displayToDo() {
    const getToDoFunction = createToDo();
    let getList = getToDoFunction.getToDo();
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

            // const taskDescription = document.createElement('p');
            // taskDescription.textContent = task.description;
            // tasksItem.appendChild(taskDescription);

            const dateAndPriorityDiv = document.createElement('div');
            dateAndPriorityDiv.classList.add('date-priority-div');
            const deleteIcon = new Image();
            deleteIcon.classList.add('delete-icon');
            deleteIcon.setAttribute('data-index', index);
            deleteIcon.src = Delete;

            const taskDueDate = document.createElement('p');
            const dateFormat = format(new Date(task.dueDate), 'MM/dd/yyyy');
            taskDueDate.textContent = dateFormat;
            tasksItem.appendChild(taskDueDate);
            dateAndPriorityDiv.appendChild(taskDueDate);

            const taskPriority = document.createElement('div');
            taskPriority.classList.add('task-priority');
            if (task.priority === 'High') {
                taskPriority.style.backgroundColor = '#E02020';
            } else if (task.priority === 'medium') {
                taskPriority.style.backgroundColor = '#EC801A';
            } else if (task.priority === 'low') {
                taskPriority.style.backgroundColor = '#FFF300';
            }
            
            tasksItem.appendChild(taskPriority);
            dateAndPriorityDiv.appendChild(taskPriority);

            // const taskCompleted = document.createElement('p');
            // taskCompleted.textContent = task.completed;
            // tasksItem.appendChild(taskCompleted);

            //Append tasksInfo to the tasksList
            tasksList.append(tasksItem);
            tasksItem.append(dateAndPriorityDiv);
            dateAndPriorityDiv.append(deleteIcon);
        });
    }
    
    //Create a function that adds (pushes) the tasks into array
    const addTasks = (task) => {
        getList.push(task);
        localStorage.setItem('tasks', JSON.stringify(getList));
        console.log(getList);
    }

    //Clear input after submitting the form
    const clearInput = () => {
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('due-date').value = '';
        document.getElementById('priority').value = '';
    }

    const removeTask = (index) => {
        getList.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(getList));
        printTasks();
        console.log(getList);
    }

    return { printTasks, addTasks, clearInput, removeTask };
}

//Prints the to do tasks when the page loads
const getDisplayToDo = displayToDo();
getDisplayToDo.printTasks();


const openTaskModal = () => {
    modal.classList.remove('hidden');
}

const closeTaskModal = () => {
    modal.classList.add('hidden');
}

const openProjectModal = () => {
    projectModal.classList.remove('hidden');
}

const closeProjectModal = () => {
    projectModal.classList.add('hidden');
}

const modal = document.querySelector('.modal');
const addTaskBtn = document.querySelector('.add-task-btn');
const closeBtn = document.querySelector('.close-btn');
const submitBtn = document.getElementById('submit');

const projectModal = document.querySelector('.project-modal');
const projectsBtn = document.querySelector('.add-project-btn');
const closeProjBtn = document.querySelector('.cancel-project');
const submitProjBtn = document.getElementById('submit-project');

//Event listeners for opening/closing task modal
addTaskBtn.addEventListener('click', openTaskModal);
closeBtn.addEventListener('click', closeTaskModal);
submitBtn.addEventListener('click', closeTaskModal);

//For opening/closing project input
projectsBtn.addEventListener('click', openProjectModal);
closeProjBtn.addEventListener('click', closeProjectModal);
submitProjBtn.addEventListener('click', closeProjectModal);

//Event listener for adding tasks once the form is submitted
const tasksForm = document.getElementById('tasks-form');
tasksForm.addEventListener('submit', function(e) {
    e.preventDefault(); //Ensures that the default action of the form will not execute
        //GET the value received from the form
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('due-date').value;
        const priority = document.getElementById('priority').value;
        const projectTitle = document.getElementById('project-title').value;
    
        //Create new toDoProperties instance (similar to creating a new constructor)
        const task = toDoProperties(title, description, dueDate, priority);
    
        // //Add project title and tasks in localStorage 'toDoList'
        // createProjectTabsObj.addTaskToProj(projectTitle, task)
    
        //Push the new instance into addTasks
        getDisplayToDo.addTasks(task);
        getDisplayToDo.printTasks();
        getDisplayToDo.clearInput();
});

//Event listener for deleting tasks
const tasksListContainer = document.querySelector('.tasks-list');
tasksListContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-icon')) {
        const index = e.target.getAttribute('data-index');
        getDisplayToDo.removeTask(index);
    }
});



//END OF TO-DOS



//START OF PROJECT TABS



function displayProjects() {
    const getProjects = createProjectTabs();
    const getProjList = getProjects.getProjectList();
    const projectsList = document.querySelector('.projects-list');
  
    const printProjects = () => {
      projectsList.innerHTML = '';
  
      getProjList.forEach((project, index) => {
        const projects = document.createElement('p');
        projects.classList.add('projects');
        projects.textContent = project.title;

        const deleteIcon = new Image();
        deleteIcon.classList.add('delete-icon');
        deleteIcon.setAttribute('data-index', index);
        deleteIcon.src = Delete;
  
        // Append to project lists
        projectsList.append(projects);
        projects.append(deleteIcon);
      });
    };
  
    const addProj = (projectTitle) => {
      getProjList.push(projectTitle);
      localStorage.setItem('toDoList', JSON.stringify(getProjList)); // Converts the object into strings
      console.log(getProjList);
    };
  
    const clearInput = () => {
      document.getElementById('project-title').value = '';
    };

    const removeProject = (index) => {
        getProjList.splice(index, 1);
        localStorage.setItem('toDoList', JSON.stringify(getProjList));
        printProjects();
        console.log(getProjList);
      };
  
    return { printProjects, addProj, clearInput, removeProject };
  }

//Prints the project when the page loads
const displayProjectsObj = displayProjects();
displayProjectsObj.printProjects();

//Event listener for adding projects
const projectForm = document.getElementById('project-form');
projectForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const projectTitle = document.getElementById('project-title').value;

    const project = createProject(projectTitle);
    displayProjectsObj.addProj(project);
    displayProjectsObj.printProjects();
    displayProjectsObj.clearInput();
});

//Event Listener for deleting projects
const projectListContainer = document.querySelector('.projects-list');
projectListContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-icon')) {
        const index = e.target.getAttribute('data-index');
        displayProjectsObj.removeProject(index);
    }
});




//END OF PROJECT TABS



//START OF CHANGING TABS AND TAB CONTENT



function changeTabs(currentButton) {
    const section = document.querySelector('section');
    const paraBtns = section.querySelectorAll('p'); //Paragraph buttons
    
    //Removes 'active' class to every paragraph buttons
    paraBtns.forEach((btn) => {
        btn.classList.remove('active');
    }); 

    //If currentButton is passed down to an existing DOM element, 
    //then class name "active" will be added to that element
    if (currentButton) {
        currentButton.classList.add('active');
    } 
}

export function changeTabContent() {
    //DOM elements
    const allTasks = document.querySelector('.link-all-tasks');
    const today = document.querySelector('.link-today');
    const thisWeek = document.querySelector('.link-week');
    const completed = document.querySelector('.link-completed');

    //Call changeTab with 'All Tasks' as parameter to initially load 'All Tasks' upon loading the website
    changeTabs(allTasks);

    //Create event listener for 'All Tasks' tab
    allTasks.addEventListener('click', () => {
        //Call changeTabs and pass 'All Tasks' DOM element
        changeTabs(allTasks);
        //Load the content of 'All Tasks' tab
        allTasksContent();
    });

    //Create event listener for 'Today' tab
    today.addEventListener('click', () => {
        //Call changeTabs and pass 'Today' DOM element
        changeTabs(today);
        //Load the content of 'Today' tab
        todayContent();
    });

    //Create event listener for 'This Week' tab
    thisWeek.addEventListener('click', () => {
        //Call changeTabs and pass 'This Week' DOM element
        changeTabs(thisWeek);
        //Load the content of 'This Week' tab
        thisWeekContent();
    })
        
    //Create event listener for 'Completed' tab
    completed.addEventListener('click', () => {
        //Call changeTabs and pass 'Completed' DOM element
        changeTabs(completed);
        //Load the content of 'Completed' tab
        completedContent();
    });
        
    //Create event listener for 'Projects' tab
        //Call changeTabs and pass 'project' (individual projects) DOM element
        //Load the content of (individual) 'project' tab
}

export function allTasksContent() {
    const tasksList = document.querySelector('.tasks-list');
    const tabName = document.querySelector('.tab-name');
    tabName.textContent = 'All Tasks';
    // tasksList.textContent = 'I am from all tasks function!';
}

function todayContent() {
    const tasksList = document.querySelector('.tasks-list');
    const tabName = document.querySelector('.tab-name');
    tabName.textContent = 'Today';
    // tasksList.textContent = 'I am from today content function!';
}

function thisWeekContent() {
    const tasksList = document.querySelector('.tasks-list');
    const tabName = document.querySelector('.tab-name');
    tabName.textContent = 'This Week';
    // tasksList.textContent = 'I am from this week content function!';
}

function completedContent() {
    const tasksList = document.querySelector('.tasks-list');
    const tabName = document.querySelector('.tab-name');
    tabName.textContent = 'Completed';
    // tasksList.textContent = 'I am from completed content function!';
}