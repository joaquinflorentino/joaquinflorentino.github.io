document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const noteInput = document.getElementById('note-input');
    const categorySelect = document.getElementById('category-select');
    const taskList = document.getElementById('task-list');
    const toCategoriesButton = document.getElementById('to-categories');

    toCategoriesButton.addEventListener('click', () => {
        window.location.href = 'categories.html';
    });

    const categories = getCategories();
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = `${category.name} (${category.number})`;
        categorySelect.appendChild(option);
    });

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value, noteInput.value, categorySelect.value);
        taskInput.value = '';
        noteInput.value = '';
        categorySelect.value = '';
    });

    function addTask(task, note, categoryName) {
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
            noteElement.style.display = 'none'
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
            if (categoryName) {
                incrementCategoryNumber(categoryName);
            }
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

    function incrementCategoryNumber(categoryNumber) {
        const categories = getCategories();
        const category = categories.find(cat => cat.name == categoryNumber);
        if (category) {
            category.number += 1;
            saveCategories(categories);
            updateCategoryDropdown();
        }
    }

    function saveCategories(categories) {
        localStorage.setItem('categories', JSON.stringify(categories));
    }

    function updateCategoryDropdown() {
        categorySelect.innerHTML = '<option value="">Select Category (None)</option>';
        const categories = getCategories();
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = `${category.name} (${category.number})`;
            categorySelect.appendChild(option);
        });
    }

    function getCategories() {
        return JSON.parse(localStorage.getItem('categories')) || [];
    }
});