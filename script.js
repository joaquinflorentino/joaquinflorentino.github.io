document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const noteInput = document.getElementById('note-input');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value, noteInput.value);
        taskInput.value = '';
        noteInput.value = '';
    });

    function addTask(task, note) {
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
    }
});