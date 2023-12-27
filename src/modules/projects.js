import { createToDo } from './tasks';

// Create a factory function similar to a Class constructor for projects
export function projectProperties(projectTitle) {
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

