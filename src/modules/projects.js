import { createToDo } from './tasks';

// Create a factory function similar to a Class constructor for projects
function projectProperties(projectTitle) {
  return { title: projectTitle, tasks: [] }; // Modified: Added tasks property to store tasks for each project
}

// Create a function that adds project tabs
export function createProjectTabs() {
  let projectList = localStorage.getItem('toDoList') ? JSON.parse(localStorage.getItem('toDoList')) : [];

  const getProjectList = () => {
    return projectList;
  };

  const getCreateToDo = createToDo();
  const getList = getCreateToDo.getToDo();

  function addProjects(projectTitle) {
    // Store project's title and array of tasks
    let newProject = {
      title: projectTitle,
      tasks: [], // Initialize an empty tasks array for the new project
    };
    projectList.push(newProject);
    
  }

  return { projectList, getProjectList, addProjects };
}

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

// Ensure the projects are printed when the page loads
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