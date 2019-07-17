!function(t){var c={};function e(n){if(c[n])return c[n].exports;var l=c[n]={i:n,l:!1,exports:{}};return t[n].call(l.exports,l,l.exports,e),l.l=!0,l.exports}e.m=t,e.c=c,e.d=function(t,c,n){e.o(t,c)||Object.defineProperty(t,c,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,c){if(1&c&&(t=e(t)),8&c)return t;if(4&c&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&c&&"string"!=typeof t)for(var l in t)e.d(n,l,function(c){return t[c]}.bind(null,l));return n},e.n=function(t){var c=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(c,"a",c),c},e.o=function(t,c){return Object.prototype.hasOwnProperty.call(t,c)},e.p="/js",e(e.s=0)}([function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n\n// CONCATENATED MODULE: ./src/model.js\nclass Model {\r\n    constructor(state = []) {\r\n        this.state = state;\r\n    }\r\n\r\n    getItem(id) {\r\n        return this.state.find(item => item.id == id);\r\n    }\r\n\r\n    addItem(item) {\r\n        this.state.push(item);\r\n\r\n        return item;\r\n    }\r\n\r\n    updateItem(id, data) {\r\n        const item = this.getItem(id);\r\n\r\n        Object.keys(data).forEach(prop => item[prop] = data[prop]);\r\n\r\n        return item;\r\n    }\r\n\r\n    removeItem(id) {\r\n        const index = this.state.findIndex(item => item.id == id);\r\n\r\n        if (index > -1) {\r\n            this.state.splice(index, 1);\r\n        }\r\n    }\r\n}\r\n\r\n/* harmony default export */ var model = (Model);\n// CONCATENATED MODULE: ./src/helpers.js\nfunction createElement(tag, props, ...children) {\r\n    const element = document.createElement(tag);\r\n\r\n    Object.keys(props).forEach(key => {\r\n        if (key.startsWith('data-')) {\r\n            element.setAttribute(key, props[key]);\r\n        } else {\r\n            element[key] = props[key];\r\n        }\r\n    });\r\n\r\n    children.forEach(child => {\r\n        if (typeof child === 'string') {\r\n            child = document.createTextNode(child);\r\n        }\r\n\r\n        element.appendChild(child);\r\n    });\r\n\r\n    return element;\r\n}\r\n\r\nclass EventEmitter {\r\n    constructor() {\r\n        this.events = {};\r\n    }\r\n\r\n    subscribe(type, callback) {\r\n        this.events[type] = this.events[type] || [];\r\n        this.events[type].push(callback);\r\n    }\r\n\r\n    emit(type, arg) {\r\n        if (this.events[type]) {\r\n            this.events[type].forEach(callback => callback(arg));\r\n        }\r\n    }\r\n}\r\n\r\n\n// CONCATENATED MODULE: ./src/view.js\n\r\n\r\nclass view_View extends EventEmitter {\r\n    constructor() {\r\n        super();\r\n\r\n        this.form = document.getElementById('todo-form');\r\n        this.input = document.getElementById('add-input');\r\n        this.list = document.getElementById('todo-list');\r\n\r\n        this.form.addEventListener('submit', this.handleAdd.bind(this));\r\n    }\r\n\r\n    createListItem(todo) {\r\n        const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox', checked: todo.completed ? 'checked' : '' });\r\n        const label = createElement('label', { className: 'title' }, todo.title);\r\n        const editInput = createElement('input', { type: 'text', className: 'textfield' });\r\n        const editButton = createElement('button', { className: 'edit' }, 'Изменить');\r\n        const deleteButton = createElement('button', { className: 'remove' }, 'Удалить');\r\n        const item = createElement('li', { className: `todo-item${todo.completed ? 'completed' : ''}`, 'data-id' : todo.id }, checkbox, label, editInput, editButton, deleteButton);\r\n\r\n        return this.addEventListeners(item);\r\n    }\r\n\r\n    addEventListeners(listItem) {\r\n        const checkbox = listItem.querySelector('.checkbox');\r\n        const editButton = listItem.querySelector('button.edit');\r\n        const removeButton = listItem.querySelector('button.remove');\r\n\r\n        checkbox.addEventListener('change', this.handleToggle.bind(this));\r\n        editButton.addEventListener('click', this.handleEdit.bind(this));\r\n        removeButton.addEventListener('click', this.handleRemove.bind(this));\r\n\r\n        return listItem;\r\n    }\r\n\r\n    handleAdd(event) {\r\n        event.preventDefault();\r\n\r\n        if (!this.input.value) return alert('Необходимо ввести название задачи');\r\n\r\n        const value = this.input.value;\r\n\r\n        this.emit('add', value);\r\n    }\r\n\r\n    handleToggle({ target }) {\r\n        const listItem = target.parentNode;\r\n        const id = listItem.getAttribute('data-id');\r\n        const completed = target.completed;\r\n\r\n        this.emit('toggle', { id, completed })\r\n    }\r\n\r\n    handleEdit({ target }) {\r\n        const listItem = target.parentNode;\r\n        const id = listItem.getAttribute('data-id');\r\n        const label = listItem.querySelector('.title');\r\n        const input = listItem.querySelector('.textfield');\r\n        const editButton = listItem.querySelector('button.edit');\r\n        const title = input.value;\r\n        const isEditing = listItem.classList.contains('editing');\r\n\r\n        if (isEditing) {\r\n            this.emit('edit', { id, title });\r\n        } else {\r\n            input.vatue = label.textContent;\r\n            editButton.textContent = 'Сохранить';\r\n            listItem.classList.add('editing');\r\n        }\r\n    }\r\n\r\n    handleRemove({ target }) {\r\n        const listItem = target.parentNode;\r\n        const id = listItem.getAttribute('data-id');\r\n\r\n        this.emit('remove', id);\r\n    }\r\n\r\n    findListItem (id) {\r\n        return this.list.querySelector(`[data-id=\"${id}\"]`);\r\n    }\r\n\r\n    addItem(todo) {\r\n        const listItem = this.createListItem(todo);\r\n\r\n        this.input.value = '';\r\n        this.list.appendChild(listItem);\r\n    }\r\n\r\n    toggleItem(todo) {\r\n        const listItem = this.findListItem(todo.id);\r\n        const checkbox = listItem.querySelector('.checkbox');\r\n\r\n        checkbox.checked = todo.complited;\r\n\r\n        if (todo.completed) {\r\n            listItem.classList.add('completed');\r\n        } else {\r\n            listItem.classList.remove('complited');\r\n        }\r\n    }\r\n\r\n    editItem(todo) {\r\n        const listItem = this.findListItem(todo.id);\r\n        const label = listItem.querySelector('.title');\r\n        const input = listItem.querySelector('.textfield');\r\n        const editButton = listItem.querySelector('button.edit');\r\n\r\n        label.textContent = todo.title;\r\n        editButton.textContent = 'Изменить';\r\n        listItem.classList.remove('editing');\r\n    }\r\n\r\n    removeItem(id) {\r\n        const listItem = this.findListItem(id);\r\n\r\n        this.list.removeChild(listItem);\r\n    }\r\n}\r\n\r\n/* harmony default export */ var view = (view_View);\n// CONCATENATED MODULE: ./src/controller.js\nclass Controller {\r\n    constructor(model, view) {\r\n        this.model = model;\r\n        this.view = view;\r\n\r\n        view.subscribe('add', this.addTodo.bind(this));\r\n        view.subscribe('toggle', this.toggleTodo.bind(this));\r\n        view.subscribe('edit', this.editTodo.bind(this));\r\n        view.subscribe('remove', this.removeTodo.bind(this));\r\n    }\r\n\r\n    addTodo(title) {\r\n        const todo = this.model.addItem({\r\n            id: Date.now(),\r\n            title,\r\n            complited: false\r\n        });\r\n\r\n        this.view.addItem(todo);\r\n    }\r\n\r\n    toggleTodo({ id, completed }) {\r\n        const todo = this.model.updateItem(id, { completed });\r\n\r\n        this.view.toggleItem(todo);\r\n    }\r\n\r\n    editTodo({ id, title }) {\r\n        const todo = this.model.updateItem(id, { title });\r\n\r\n        this.view.editItem(todo);\r\n    }\r\n\r\n    removeTodo(id) {\r\n        this.model.removeItem(id);\r\n        this.view.removeItem(id);\r\n    }\r\n}\r\n\r\n/* harmony default export */ var controller = (Controller);\n// CONCATENATED MODULE: ./src/index.js\n\r\n\r\n\r\n\r\nconst src_model = new model();\r\nconst src_view = new view();\r\nconst src_controller = new controller(src_model, src_view);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tb2RlbC5qcz80YWJlIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzLmpzP2Q3YzIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcuanM/ZjA3OCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbGxlci5qcz82MjgzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz9iNjM1Il0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE1vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0YXRlID0gW10pIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbShpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmZpbmQoaXRlbSA9PiBpdGVtLmlkID09IGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRJdGVtKGl0ZW0pIHtcclxuICAgICAgICB0aGlzLnN0YXRlLnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUl0ZW0oaWQsIGRhdGEpIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5nZXRJdGVtKGlkKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaChwcm9wID0+IGl0ZW1bcHJvcF0gPSBkYXRhW3Byb3BdKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlSXRlbShpZCkge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zdGF0ZS5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmlkID09IGlkKTtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9kZWw7IiwiZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIHByb3BzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhwcm9wcykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aCgnZGF0YS0nKSkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHByb3BzW2tleV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRba2V5XSA9IHByb3BzW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgY2hpbGQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBlbGVtZW50O1xyXG59XHJcblxyXG5jbGFzcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBzdWJzY3JpYmUodHlwZSwgY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmV2ZW50c1t0eXBlXSA9IHRoaXMuZXZlbnRzW3R5cGVdIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzW3R5cGVdLnB1c2goY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIGVtaXQodHlwZSwgYXJnKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW3R5cGVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW3R5cGVdLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soYXJnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBjcmVhdGVFbGVtZW50LCBFdmVudEVtaXR0ZXIgfTsiLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XHJcblxyXG5jbGFzcyBWaWV3IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWZvcm0nKTtcclxuICAgICAgICB0aGlzLmlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1pbnB1dCcpO1xyXG4gICAgICAgIHRoaXMubGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWxpc3QnKTtcclxuXHJcbiAgICAgICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuaGFuZGxlQWRkLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUxpc3RJdGVtKHRvZG8pIHtcclxuICAgICAgICBjb25zdCBjaGVja2JveCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyB0eXBlOiAnY2hlY2tib3gnLCBjbGFzc05hbWU6ICdjaGVja2JveCcsIGNoZWNrZWQ6IHRvZG8uY29tcGxldGVkID8gJ2NoZWNrZWQnIDogJycgfSk7XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsgY2xhc3NOYW1lOiAndGl0bGUnIH0sIHRvZG8udGl0bGUpO1xyXG4gICAgICAgIGNvbnN0IGVkaXRJbnB1dCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyB0eXBlOiAndGV4dCcsIGNsYXNzTmFtZTogJ3RleHRmaWVsZCcgfSk7XHJcbiAgICAgICAgY29uc3QgZWRpdEJ1dHRvbiA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHsgY2xhc3NOYW1lOiAnZWRpdCcgfSwgJ9CY0LfQvNC10L3QuNGC0YwnKTtcclxuICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7IGNsYXNzTmFtZTogJ3JlbW92ZScgfSwgJ9Cj0LTQsNC70LjRgtGMJyk7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IGNyZWF0ZUVsZW1lbnQoJ2xpJywgeyBjbGFzc05hbWU6IGB0b2RvLWl0ZW0ke3RvZG8uY29tcGxldGVkID8gJ2NvbXBsZXRlZCcgOiAnJ31gLCAnZGF0YS1pZCcgOiB0b2RvLmlkIH0sIGNoZWNrYm94LCBsYWJlbCwgZWRpdElucHV0LCBlZGl0QnV0dG9uLCBkZWxldGVCdXR0b24pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRFdmVudExpc3RlbmVycyhpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFdmVudExpc3RlbmVycyhsaXN0SXRlbSkge1xyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignLmNoZWNrYm94Jyk7XHJcbiAgICAgICAgY29uc3QgZWRpdEJ1dHRvbiA9IGxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5lZGl0Jyk7XHJcbiAgICAgICAgY29uc3QgcmVtb3ZlQnV0dG9uID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignYnV0dG9uLnJlbW92ZScpO1xyXG5cclxuICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmhhbmRsZVRvZ2dsZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVFZGl0LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJlbW92ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlUmVtb3ZlLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICByZXR1cm4gbGlzdEl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQWRkKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlucHV0LnZhbHVlKSByZXR1cm4gYWxlcnQoJ9Cd0LXQvtCx0YXQvtC00LjQvNC+INCy0LLQtdGB0YLQuCDQvdCw0LfQstCw0L3QuNC1INC30LDQtNCw0YfQuCcpO1xyXG5cclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaW5wdXQudmFsdWU7XHJcblxyXG4gICAgICAgIHRoaXMuZW1pdCgnYWRkJywgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVRvZ2dsZSh7IHRhcmdldCB9KSB7XHJcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICBjb25zdCBpZCA9IGxpc3RJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZCA9IHRhcmdldC5jb21wbGV0ZWQ7XHJcblxyXG4gICAgICAgIHRoaXMuZW1pdCgndG9nZ2xlJywgeyBpZCwgY29tcGxldGVkIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRWRpdCh7IHRhcmdldCB9KSB7XHJcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICBjb25zdCBpZCA9IGxpc3RJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xyXG4gICAgICAgIGNvbnN0IGxhYmVsID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignLnRpdGxlJyk7XHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKCcudGV4dGZpZWxkJyk7XHJcbiAgICAgICAgY29uc3QgZWRpdEJ1dHRvbiA9IGxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5lZGl0Jyk7XHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSBpbnB1dC52YWx1ZTtcclxuICAgICAgICBjb25zdCBpc0VkaXRpbmcgPSBsaXN0SXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXRpbmcnKTtcclxuXHJcbiAgICAgICAgaWYgKGlzRWRpdGluZykge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2VkaXQnLCB7IGlkLCB0aXRsZSB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbnB1dC52YXR1ZSA9IGxhYmVsLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICBlZGl0QnV0dG9uLnRleHRDb250ZW50ID0gJ9Ch0L7RhdGA0LDQvdC40YLRjCc7XHJcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2VkaXRpbmcnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlUmVtb3ZlKHsgdGFyZ2V0IH0pIHtcclxuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgICAgIGNvbnN0IGlkID0gbGlzdEl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XHJcblxyXG4gICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlJywgaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRMaXN0SXRlbSAoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWlkPVwiJHtpZH1cIl1gKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRJdGVtKHRvZG8pIHtcclxuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IHRoaXMuY3JlYXRlTGlzdEl0ZW0odG9kbyk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICB0aGlzLmxpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUl0ZW0odG9kbykge1xyXG4gICAgICAgIGNvbnN0IGxpc3RJdGVtID0gdGhpcy5maW5kTGlzdEl0ZW0odG9kby5pZCk7XHJcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKCcuY2hlY2tib3gnKTtcclxuXHJcbiAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRvZG8uY29tcGxpdGVkO1xyXG5cclxuICAgICAgICBpZiAodG9kby5jb21wbGV0ZWQpIHtcclxuICAgICAgICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgnY29tcGxldGVkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnY29tcGxpdGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVkaXRJdGVtKHRvZG8pIHtcclxuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IHRoaXMuZmluZExpc3RJdGVtKHRvZG8uaWQpO1xyXG4gICAgICAgIGNvbnN0IGxhYmVsID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignLnRpdGxlJyk7XHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKCcudGV4dGZpZWxkJyk7XHJcbiAgICAgICAgY29uc3QgZWRpdEJ1dHRvbiA9IGxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5lZGl0Jyk7XHJcblxyXG4gICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gdG9kby50aXRsZTtcclxuICAgICAgICBlZGl0QnV0dG9uLnRleHRDb250ZW50ID0gJ9CY0LfQvNC10L3QuNGC0YwnO1xyXG4gICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2VkaXRpbmcnKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVJdGVtKGlkKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSB0aGlzLmZpbmRMaXN0SXRlbShpZCk7XHJcblxyXG4gICAgICAgIHRoaXMubGlzdC5yZW1vdmVDaGlsZChsaXN0SXRlbSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZpZXc7IiwiY2xhc3MgQ29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihtb2RlbCwgdmlldykge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB0aGlzLnZpZXcgPSB2aWV3O1xyXG5cclxuICAgICAgICB2aWV3LnN1YnNjcmliZSgnYWRkJywgdGhpcy5hZGRUb2RvLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHZpZXcuc3Vic2NyaWJlKCd0b2dnbGUnLCB0aGlzLnRvZ2dsZVRvZG8uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdmlldy5zdWJzY3JpYmUoJ2VkaXQnLCB0aGlzLmVkaXRUb2RvLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHZpZXcuc3Vic2NyaWJlKCdyZW1vdmUnLCB0aGlzLnJlbW92ZVRvZG8uYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVG9kbyh0aXRsZSkge1xyXG4gICAgICAgIGNvbnN0IHRvZG8gPSB0aGlzLm1vZGVsLmFkZEl0ZW0oe1xyXG4gICAgICAgICAgICBpZDogRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgIGNvbXBsaXRlZDogZmFsc2VcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy52aWV3LmFkZEl0ZW0odG9kbyk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlVG9kbyh7IGlkLCBjb21wbGV0ZWQgfSkge1xyXG4gICAgICAgIGNvbnN0IHRvZG8gPSB0aGlzLm1vZGVsLnVwZGF0ZUl0ZW0oaWQsIHsgY29tcGxldGVkIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnZpZXcudG9nZ2xlSXRlbSh0b2RvKTtcclxuICAgIH1cclxuXHJcbiAgICBlZGl0VG9kbyh7IGlkLCB0aXRsZSB9KSB7XHJcbiAgICAgICAgY29uc3QgdG9kbyA9IHRoaXMubW9kZWwudXBkYXRlSXRlbShpZCwgeyB0aXRsZSB9KTtcclxuXHJcbiAgICAgICAgdGhpcy52aWV3LmVkaXRJdGVtKHRvZG8pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVRvZG8oaWQpIHtcclxuICAgICAgICB0aGlzLm1vZGVsLnJlbW92ZUl0ZW0oaWQpO1xyXG4gICAgICAgIHRoaXMudmlldy5yZW1vdmVJdGVtKGlkKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcjsiLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi9tb2RlbCc7XHJcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XHJcbmltcG9ydCBDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcic7XHJcblxyXG5jb25zdCBtb2RlbCA9IG5ldyBNb2RlbCgpO1xyXG5jb25zdCB2aWV3ID0gbmV3IFZpZXcoKTtcclxuY29uc3QgY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKG1vZGVsLCB2aWV3KTtcclxuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n")}]);