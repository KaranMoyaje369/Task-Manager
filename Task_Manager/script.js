let deletedTasks = []; // Array to store deleted tasks

// Function to update current date and time
function updateCurrentDateTime() {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    document.getElementById('current-date-time').textContent = `Current Date & Time: ${currentDate} ${currentTime}`;
}

// Update current date and time initially and then every second
updateCurrentDateTime();
setInterval(updateCurrentDateTime, 1000);

document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskInput = document.getElementById('task');
    const datetimeInput = document.getElementById('datetime');
    const task = taskInput.value;
    const creationTime = new Date().toLocaleTimeString();

    if (task.trim() === '') {
        alert('Please enter a valid task.');
        return;
    }

    const taskList = document.getElementById('daily-task-list');
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
        <label>
            <input type="checkbox">
            ${task} - Created at ${creationTime}
        </label>
        <button class="delete-task">Delete</button>
    `;
    taskList.appendChild(taskItem);

    taskInput.value = '';
    datetimeInput.value = '';
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-task')) {
        const taskItem = event.target.parentElement;
        const taskText = taskItem.querySelector('label').innerText;
        deletedTasks.push(taskText); // Store deleted task in the array
        taskItem.remove();
    }
});

document.getElementById('daily-task-list').addEventListener('change', function(event) {
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
        const taskItem = event.target.closest('.task-item');
        if (event.target.checked) {
            const completedTaskList = document.getElementById('completed-task-list');
            completedTaskList.appendChild(taskItem);
        } else {
            const dailyTaskList = document.getElementById('daily-task-list');
            dailyTaskList.appendChild(taskItem);
        }
    }
});

document.getElementById('completed-task-list').addEventListener('change', function(event) {
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
        const taskItem = event.target.closest('.task-item');
        if (event.target.checked) {
            taskItem.classList.add('completed');
        } else {
            taskItem.classList.remove('completed');
        }
    }
});
