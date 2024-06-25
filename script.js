const taskContainer = document.querySelector('.task_container');
const inputElement = document.querySelector('input[type="text"]');
const addTaskButton = document.querySelector('#addTask')
let inputElementValue, taskDiv, taskTextElement, editButton, deleteButton;

// Retrieve existing movies or initialize an empty array
let taskArray = JSON.parse(localStorage.getItem("items")) || [];

if (taskArray) {
    taskArray.forEach((item, index) => {
        displayTask(taskText = taskArray[index]);

        //  Function to edit task
        editButton.addEventListener('click', function () {
            if (this.classList.contains('edit')) {
                inputElement.value = this.parentElement.parentElement.children[0].textContent;
                this.classList.remove('edit');
                this.classList.add('update');
                this.textContent = 'Update';
                inputElement.focus()
                disabled(deleteButton);
                disabled(addTaskButton);
            } else if (this.classList.contains('update')) {
                let updateElem = this.parentElement.parentElement.children[0];

                let index = taskArray.indexOf(updateElem.textContent);
                taskArray[index] = inputElementValue;
                let updatedText = taskArray[index]

                // update the text
                updateElem.textContent = updatedText;

                // Save the updated text inside the taskArray
                localStorage.setItem('items', JSON.stringify(taskArray))

                this.classList.remove('update')
                this.classList.add('edit');
                this.textContent = 'Edit';


                inputElement.value = '';
                enabled(deleteButton);
                enabled(addTaskButton);
            }
        })
        // Function to delete task
        deleteButton.addEventListener('click', function () {

            this.parentElement.parentElement.remove();

            let itemText = this.parentElement.parentElement.children[0].textContent

            let deltedTask = taskArray.filter((task) => task !== itemText)

            taskArray = deltedTask

            localStorage.setItem('items', JSON.stringify(taskArray))

        })
    })


}

// event listener to get typed input value 
inputElement.addEventListener('input', function () {
    inputElementValue = this.value;
    enabled(addTaskButton);

    if (editButton) {
        if (editButton.classList.contains('update')) {
            disabled(addTaskButton);
            return;
        }
    }
});


function displayTask(taskText = inputElementValue) {
    taskDiv = document.createElement('div');
    taskDiv.classList.add('task_box');

    // Create task text element 
    taskTextElement = document.createElement('p');
    taskTextElement.classList.add('task');
    taskTextElement.textContent = taskText;

    // Create icon div
    let iconsDiv = document.createElement('div');
    iconsDiv.classList.add('icons');

    // Create  edit button 
    editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.textContent = 'Edit'

    // Create  delete button 
    deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete'

    // Append all elements
    taskDiv.append(taskTextElement)
    taskDiv.append(iconsDiv)
    iconsDiv.append(editButton)
    iconsDiv.append(deleteButton)
    taskContainer.append(taskDiv)
}


// Function to the delete task
function handelDeleteBtn() {

    taskDiv.remove();
    let taskText = this.parentElement.previousSibling.textContent;

    // remove the task from taskArray
    let deletedTask = taskArray.filter(item => item !== taskText)
    taskArray = deletedTask;

    // save the updated task
    localStorage.setItem('items', JSON.stringify(taskArray))
}

// Function to handel edit and update button 
function handelEditBtn() {

    if (this.classList.contains('edit')) {
        inputElement.value = this.parentElement.parentElement.children[0].textContent;
        this.classList.remove('edit');
        this.classList.add('update');
        this.textContent = 'Update';
        inputElement.focus()
        disabled(deleteButton);
        disabled(addTaskButton);
    } else {
        let updateElem = this.parentElement.parentElement.children[0];

        let index = taskArray.indexOf(updateElem.textContent);
        taskArray[index] = inputElementValue;
        let updatedText = taskArray[index]

        // update the text
        updateElem.textContent = updatedText;

        // Save the updated text inside the taskArray
        localStorage.setItem('items', JSON.stringify(taskArray))
        this.classList.remove('update')
        this.classList.add('edit');
        this.textContent = 'Edit';

        inputElement.value = '';
        enabled(deleteButton);
        enabled(addTaskButton);
    }

}

// Function to disable button
function disabled(elem) {
    elem.disabled = true;
}

// Function to enable button
function enabled(elem) {
    elem.disabled = false;
}

// Function to add the task 
function addTheTask() {

    if (inputElement.value === '') {
        alert('enter the task')
        return
    } else {
        displayTask();

        // Add new task to the taskArray
        taskArray.push(inputElementValue);

        // Save the updated taskArray
        localStorage.setItem("items", JSON.stringify(taskArray));

        editButton.addEventListener('click', handelEditBtn)
        deleteButton.addEventListener('click', handelDeleteBtn)
        // Clear input field
        inputElement.value = ''
    }
}

// Event listener to add task
addTaskButton.addEventListener('click', addTheTask);