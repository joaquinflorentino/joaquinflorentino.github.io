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

        if (note) {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.textContent = note;
            li.appendChild(noteElement);
        }

        li.addEventListener('click', () => {
            const noteElement = li.querySelector('.note');
            if (noteElement) {
                noteElement.style.display = noteElement.style.display === 'none' ? 'block' : 'none';
            }
        });
        taskList.appendChild(li);
    }
});