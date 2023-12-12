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

    return { printProjects, getProjectList };
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
            projects.textContent = project.name

            //Append to project lists
            const projectsList = document.querySelector(".projects-list");
            projectsList.append(projects);
        });
    }
}


//Create event listeners for adding projects with add project button
const projectsBtn = document.querySelector('.add-project-btn');
projectsBtn.addEventListener('click', createProjectTabs);