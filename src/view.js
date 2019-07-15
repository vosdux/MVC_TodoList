import { createElement, EventEmitter } from "./helpers";

class View extends EventEmitter {
    constructor() {
        super();

        this.form = document.getElementById('todo-form');
        this.input = document.getElementById('add-input');
        this.list = document.getElementById('todo-list');

        this.form.addEventListener('submit', this.handleAdd.bind(this));
    }

    createListItem(todo) {
        const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox', checked: todo.completed ? 'checked' : '' });
        const label = createElement('label', { className: 'title' }, todo.title);
        const editInput = createElement('input', { type: 'text', className: 'textfield' });
        const editButton = createElement('button', { className: 'edit' }, 'Изменить');
        const deleteButton = createElement('button', { className: 'remove' }, 'Удалить');
        const item = createElement('li', { className: `todo-item${todo.completed ? 'completed' : ''}`, 'data-id' : todo.id }, checkbox, label, editInput, editButton, deleteButton);

        return this.addEventListeners(item);
    }

    addEventListeners(listItem) {
        const checkbox = listItem.querySelector('.checkbox');
        const editButton = listItem.querySelector('button.edit');
        const removeButton = listItem.querySelector('button.remove');

        checkbox.addEventListeners('change', this.handleToggle.bind(this));
        editButton.addEventListeners('click', this.handleEdit.bind(this));
        removeButton.addEventListeners('click', this.handleRemove.bind(this));

        return listItem;
    }

    handleAdd(event) {
        event.preventDefault();

        if (!this.input.value) return alert('Необходимо ввести название задачи');

        const value = this.input.value;

        this.emit('add', value);
    }

    handleToggle({ target }) {
        const listItem = target.parentNode;
        const id = listItem.getAttribute('data-id');
        const completed = target.completed;

        this.emit('toggle', { id, completed })
    }

    handleEdit({ target }) {
        const listItem = target.parentNode;
        const id = listItem.getAttribute('data-id');
        const label = listItem.querySelector('.title');
        const input = listItem.querySelector('.textfield');
        const editButton = listItem.querySelector('button.edit');
        const title = input.value;
        const isEditing = listItem.classList.contains('editing');

        if (isEditing) {
            this.emit('edit', { id, title });
        } else {
            input.vatue = label.textContent;
            editButton.textContent = 'Сохранить';
            listItem.classList.add('editing');
        }
    }

    handleRemove({ target }) {
        const listItem = target.parentNode;
        const id = listItem.getAttribute('data-id');

        this.emit('remove', id);
    }

    findListItem (id) {
        return this.list.querySelector(`[data-id="${id}"]`);
    }

    addItem(todo) {
        const listItem = this.createListItem(todo.title);

        this.input.value = '';
        this.list.appendChild(listItem);
    }

    toggleItem(todo) {
        const listItem = this.findListItem(todo.id);
        const checkbox = listItem.querySelector('.checkbox');

        checkbox.checked = todo.complited;

        if (todo.completed) {
            listItem.classList.add('completed');
        } else {
            listItem.classList.remove('complited');
        }
    }

    editItem(todo) {
        const listItem = this.findListItem(todo.id);
        const label = listItem.querySelector('.title');
        const input = listItem.querySelector('.textfield');
        const editButton = listItem.querySelector('button.edit');

        label.textContent = todo.title;
        editButton.textContent = 'Изменить';
        listItem.classList.remove('editing');
    }

    removeItem(id) {
        const listItem = this.findListItem(todo.id);

        this.list.removeChild(listItem);
    }
}

export default View;