export function toDoProperties (title, description, dueDate, priority, completed = false) {
    return { title, description, dueDate, priority, completed }
} //Factory function for properties

export function createToDo() {
    let toDoList = []; //Empty array where every tasks will be added

    //Create a function to pass the title and push it into the array
    const addToDo = (title, description, dueDate, priority, completed) => {
        let newToDo = toDoProperties(title, description, dueDate, priority, completed);
        let testNewToDo = toDoProperties('Buy This', 'Description here', '12/5/2023', 'High');
        toDoList.push(newToDo);
        toDoList.push(testNewToDo);

    }

    //Checks every index of toDoList array if it's completed
    const toggleComplete = (index) => {
        toDoList[index].completed = !toDoList[index].completed;
    }

    const getToDo = () => {
        return toDoList;
    }

    return { addToDo, toggleComplete, getToDo };
}