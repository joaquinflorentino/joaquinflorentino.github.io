document.addEventListener('DOMContentLoaded', () => {
    const categoryForm = document.getElementById('category-form');
    const categoryInput = document.getElementById('category-input');
    const categoryList = document.getElementById('category-list');
    const toTaskListButton = document.getElementById('to-task-list')

    toTaskListButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    savedCategories.forEach(category => addCategory(category.name, category.number));

    categoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const categoryName = categoryInput.value;
        const newNumber = 0;
        addCategory(categoryName, newNumber);
        categoryInput.value = '';

        saveCategories();
    });

    function addCategory(name, number) {
        const li = document.createElement('li');
        li.classList.add('category-item');

        const categoryContent = document.createElement('div');
        categoryContent.classList.add('category-content');
        categoryContent.textContent = `${name} (${number})`;

        li.appendChild(categoryContent);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            li.remove();
            saveCategories();
        });
        li.appendChild(deleteButton);

        categoryList.appendChild(li);
    }

    function getNextNumber() {
        const currentCategories = JSON.parse(localStorage.getItem('categories')) || [];
        return currentCategories.length ? Math.max(...currentCategories.map(c => c.number)) + 1 : 1;
    }

    function saveCategories() {
        const items = Array.from(categoryList.querySelectorAll('.category-item')).map((item, index) => {
            return {
                name: item.querySelector('.category-content').textContent.split(' (')[0],
                number: parseInt(item.querySelector('.category-content').textContent.split(' (')[1].split(')')[0])
            };
        });
        localStorage.setItem('categories', JSON.stringify(items));
    }
});