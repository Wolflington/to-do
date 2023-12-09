import { createToDo } from './tasks';

//Create a function that when 'Add task' button 
//is clicked, a form will appear and get that value. 
//The value taken should become the respective 
//properties of a to-do task..

export function displayToDo() {
    const getToDoFunction = createToDo();
    getToDoFunction.addToDo('Title from UI', 'Description from UI', 'Due Date from UI', 'Priority from UI', false);
    const getList = getToDoFunction.getToDo();
    console.log(getList);

    let tasksList = document.querySelector('.tasks-list');

    //Factory function to print the properties on the page
    const printTasks = () => {

        //FOR EACH getToDo's parameter (book and index)
        getList.forEach((task, index) => {
            //Create VAR tasksInfo and set the value to print the text with HTML tags inside `` quotes
            let tasksInfo = 
            `
            <p>${task.title}</p>
            <p>${task.description}</p>
            <p>${task.dueDate}</p>
            <p>${task.priority}</p>
            `;

            //CREATE ELEMENT div 
            const tasksItem = document.createElement('div');
            //ADD CLASS to the created div
            tasksItem.classList.add('tasks-item')
            //Set innerHTML of created div to tasksInfo
            tasksItem.innerHTML = tasksInfo;
            //Append tasksInfo to the tasksList
            tasksList.append(tasksItem);
        });
    }

    return { printTasks };
}