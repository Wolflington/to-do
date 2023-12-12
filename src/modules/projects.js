//Create a factory function similar to a Class constructor for projects
function projectProperties(projectTitle) {
    return { projectTitle }
}

//Create a function that adds project tabs
export function createProjectTabs() {
    //Create <a> elements
    const projects = document.createElement('a');
    projects.classList.add('projects');

    //Append to project lists
    const projectsList = document.querySelector(".projects-list");
    projectsList.append(projects);

    console.log('I am clicked from event listener in projects.js')
}

//Create a function that displays an input (text) to name the project

// //Create a function that changes tab
function changeTabs(currentButton) {

}

//Create event listeners for adding projects with add project button
const projectsBtn = document.querySelector('.add-project-btn');
projectsBtn.addEventListener('click', createProjectTabs);