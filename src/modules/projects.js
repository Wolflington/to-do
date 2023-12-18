//Create a factory function similar to a Class constructor for projects
function projectProperties(projectTitle) {
    return { projectTitle }
}

//Create a function that adds project tabs
export function createProjectTabs() {
    let projectList = JSON.parse(localStorage.getItem('toDoList')) || []; //Retrieves 'toDoList' key then parses it from JSON array into JavaScript array. 

    const getProjectList = () => {
        return projectList;
    }

    function addProjects(projectTitle) {
        let newProject = { projectTitle };
        projectList.push(newProject);
        localStorage.setItem('toDoList', JSON.stringify(projectList));
    }
    
    console.log(projectList);
    return { getProjectList, addProjects };
}

const test = createProjectTabs();
test.addProjects('Inbox');

function displayProjects() {
    //Get the array for projects list
    const getProjects = createProjectTabs();
    const getProjList = getProjects.getProjectList();
    const projectsList = document.querySelector('.projects-list');

    const printProjects = () => {
        projectsList.innerHTML = '';

        getProjList.forEach((project, index) => {
            const projects = document.createElement('p');
            projects.classList.add('projects');
            projects.textContent = project.projectTitle

            //Append to project lists
            const projectsList = document.querySelector(".projects-list");
            projectsList.append(projects);
        });
    }

    //Create a method that pushes project into array
    const addProj = (projectTitle) => {
        getProjList.push(projectTitle);
    }

    const clearInput = () => {
        document.getElementById('project-title').value = '';
    }

    return { printProjects, addProj, clearInput }
}

const displayProjectsObj = Object.create(displayProjects());

//Event listener for adding projects
const projectForm = document.getElementById('project-form');
//Attach the form to an event listener
projectForm.addEventListener('submit', function(e) {
    //Default action should not be taken if the event is not explicitly handled
    e.preventDefault();
    //Get the value of the property from input
    const projectTitle = document.getElementById('project-title').value;

    //Create a new projectProperties instance
    // const newCreateProject = createProjectTabs();
    // let getProjList = newCreateProject.getProjectList();
    const project = projectProperties(projectTitle)
    //Push the new instance into addProjects

    displayProjectsObj.addProj(project);
    displayProjectsObj.printProjects();
    displayProjectsObj.clearInput();

});