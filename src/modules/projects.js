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

    const printProjects = () => {
        const projectsList = document.querySelector('.projects-list');
        projectsList.innerHTML = '';

        getProjList.forEach((project, index) => {
            //Create <a> elements
            const projects = document.createElement('a');
            projects.classList.add('projects');
            projects.textContent = project.projectTitle

            //Append to project lists
            const projectsList = document.querySelector(".projects-list");
            projectsList.append(projects);
        });
    }

    //Create a method that pushes project into array
    const addProj = (project) => {
        getProjList.push(project);
    }

    return { printProjects, addProj }
}

const openProjectModal = () => {
    projectModal.classList.remove('hidden');
}

const closeProjectModal = () => {
    projectModal.classList.add('hidden');
}

const projectModal = document.querySelector('.project-modal');
const projectsBtn = document.querySelector('.add-project-btn');
const closeProjBtn = document.querySelector('.cancel-project');
const submitProjBtn = document.getElementById('submit-project');

//Create an event listener to make the form to get project names appear under Projects
projectsBtn.addEventListener('click', openProjectModal);
closeProjBtn.addEventListener('click', closeProjectModal);
submitProjBtn.addEventListener('click', closeProjectModal);