import{ displayToDo } from './UI';

export function toDoProperties (
    title, 
    description, 
    dueDate, 
    priority, 
    completed = false) 
    {
    return { title, description, dueDate, priority, completed }
} //Factory function for properties

export function createToDo() {
    let toDoList = []; //Empty array where every tasks will be added

    //Set the respective info into an object then 
    //push it into the array
    const addToDo = (title, description, dueDate, priority, completed) => {
        let newToDo = toDoProperties(title, description, dueDate, priority, completed);
        toDoList.push(newToDo);
    }

    //Checks every index of toDoList array to see if it's completed
    const toggleComplete = (index) => {
        toDoList[index].completed = !toDoList[index].completed;
    }

    const getToDo = () => {
        return toDoList;
    }

    return { addToDo, toggleComplete, getToDo };
}

const displayToDoObj = Object.create(displayToDo());

export function storeTasks() {
    //GET the value received from the form
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;

    //Create new toDoProperties instance (similar to creating a new constructor)
    const getToDoFunction = createToDo();
    let getList = getToDoFunction.getToDo();
    const task = toDoProperties(title, description, dueDate, priority);

    //Push the new instance into addTasks
    displayToDoObj.addTasks(task);
    displayToDoObj.printTasks();
    displayToDoObj.clearInput();
}