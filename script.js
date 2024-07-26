// script.js

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
        li.setAttribute('draggable', 'true');
        li.classList.add('task-item');

        const taskContent = document.createElement('div');
        taskContent.classList.add('task-content');
        taskContent.textContent = task;

        if (note) {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.textContent = note;
            taskContent.appendChild(noteElement);
        }

        taskContent.addEventListener('click', () => {
            const noteElement = taskContent.querySelector('.note');
            if (noteElement) {
                noteElement.style.display = noteElement.style.display === 'none' ? 'block' : 'none';
            }
        });

        li.appendChild(taskContent);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            li.remove();
        });

        li.appendChild(deleteButton);

        taskList.appendChild(li);

        li.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', null);
            setTimeout(() => {
                li.classList.add('dragging');
            }, 0);
        });

        li.addEventListener('dragend', () => {
            li.classList.remove('dragging');
        });

        li.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingElement = taskList.querySelector('.dragging');
            if (draggingElement !== li) {
                const bounding = li.getBoundingClientRect();
                const offset = bounding.y + bounding.height / 2;
                if (e.clientY - offset > 0) {
                    taskList.insertBefore(draggingElement, li.nextSibling);
                } else {
                    taskList.insertBefore(draggingElement, li);
                }
            }
        });
    }
});