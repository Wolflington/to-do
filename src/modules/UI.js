import { storeTasks, createToDo } from './tasks';
import { projectProperties, createProjectTabs } from './projects';

//START OF ADDING TO-DOS



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
        localStorage.setItem('tasks', JSON.stringify(getList));
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

//Event listener for adding tasks once the form is submitted
const tasksForm = document.getElementById('tasks-form');
tasksForm.addEventListener('submit', function(e) {
    e.preventDefault(); //Ensures that the default action of the form will not execute
    storeTasks();
});

const getDisplayToDo = displayToDo();
//Prints the to do tasks when loaded
document.addEventListener('DOMContentLoaded', () => {
    getDisplayToDo.printTasks();
})

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



//END OF ADDING TO-DOS



//START OF ADDING PROJECT TABS



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
  
        // Append to project lists
        const projectsList = document.querySelector('.projects-list');
        projectsList.append(projects);
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
  
    return { printProjects, addProj, clearInput };
  }
  
  const displayProjectsObj = Object.create(displayProjects());
  const getProjects = createProjectTabs();
  
  //Ensure the projects are printed when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    displayProjectsObj.printProjects();
  });
  
  const projectForm = document.getElementById('project-form');
  projectForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const projectTitle = document.getElementById('project-title').value;
  
    const project = projectProperties(projectTitle);
    displayProjectsObj.addProj(project);
    displayProjectsObj.printProjects();
    displayProjectsObj.clearInput();
  
    getProjects.addProjects(projectTitle);
  });



//END OF ADDING PROJECT TABS




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
    tabName.textContent = 'Inbox';
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