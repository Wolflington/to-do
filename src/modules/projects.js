//Create a factory function similar to a Class constructor for projects
function projectProperties(projectTitle) {
    return { projectTitle }
}

//Create a function that adds project tabs
export function createProjectTabs() {
    let projectList = []; //Empty array where projects will be pushed later on

    const getProjectList = () => {
        return projectList;
    }

    const addProjects = (projectTitle) => {
        let newProject = projectProperties(projectTitle);
        projectList.push(newProject);
    }
    console.log('I am clicked from projects.js!');
    return { getProjectList, addProjects };
}

function displayProjects() {
    //Get the array for projects list
    const getProjects = createProjectTabs();
    const getProjList = getProjects.getProjectList();
    const projectsList = document.querySelector('.projects-list');

    const printProjects = () => {
        projectsList.innerHTML = '';

        getProjList.forEach((project, index) => {
            //Create <a> elements
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
    //Get the value of the property
    const projectTitle = document.getElementById('project-title').value;

    //Create a new projectProperties instance
    const newCreateProject = createProjectTabs();
    let getProjList = newCreateProject.getProjectList();
    const project = projectProperties(projectTitle)
    //Push the new instance into addProjects

    displayProjectsObj.addProj(project);
    displayProjectsObj.printProjects();
    displayProjectsObj.clearInput();

});