// Function to save tasks to localStorage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll('.task').forEach(function(task) {
        tasks.push({
            name: task.querySelector('#taskname').innerText,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(function(task) {
            document.querySelector('#tasks').innerHTML += `
            <div class="task ${task.completed ? 'completed' : ''}">
                <span id="taskname">${task.name}</span>
                <button class="delete">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            `;
        });
    }

    // Reapply event listeners for delete and toggle completed
    attachEventListeners();
}

// Function to attach event listeners to the delete buttons and task toggle
function attachEventListeners() {
    // Delete button functionality
    var deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(function(deleteButton) {
        deleteButton.onclick = function() {
            this.parentNode.remove();
            saveTasks(); // Save updated tasks to localStorage
        };
    });

    // Mark task as completed
    var tasks = document.querySelectorAll('.task');
    tasks.forEach(function(task) {
        task.onclick = function() {
            this.classList.toggle('completed');
            saveTasks(); // Save updated tasks to localStorage
        };
    });
}


// Add new task
document.querySelector('#push').onclick = function() {
    if (document.querySelector('#newtask input').value.length == 0) {
        alert('Please Enter a task');
    } else {
        document.querySelector('#tasks').innerHTML += `
        <div class="task">
            <span id="taskname">${document.querySelector('#newtask input').value}</span>
            <button class="delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        `;
        document.querySelector('#newtask input').value = ''; // Clear input field

        // Reapply event listeners and save to localStorage
        attachEventListeners();
        saveTasks();
    }
};

// Load tasks when the page is loaded
window.onload = function() {
    loadTasks();
};
