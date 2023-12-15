import _ from 'lodash';
import './style.css';
import {toDoProperties, createToDo} from './modules/tasks';
import { displayToDo, changeTabContent, allTasksContent } from './modules/UI';
import { createProjectTabs } from './modules/projects';

const todoManager = createToDo();
todoManager.addToDo('Go to the gym', 'Workout session', '12/6/2023', 'Medium', true);

function initializeWebsite() {
    allTasksContent(); //Load All Tasks content upon initialization
    changeTabContent();
}

initializeWebsite();