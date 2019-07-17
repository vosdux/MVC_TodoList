!function(t){var c={};function n(e){if(c[e])return c[e].exports;var l=c[e]={i:e,l:!1,exports:{}};return t[e].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=t,n.c=c,n.d=function(t,c,e){n.o(t,c)||Object.defineProperty(t,c,{enumerable:!0,get:e})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,c){if(1&c&&(t=n(t)),8&c)return t;if(4&c&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(n.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&c&&"string"!=typeof t)for(var l in t)n.d(e,l,function(c){return t[c]}.bind(null,l));return e},n.n=function(t){var c=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(c,"a",c),c},n.o=function(t,c){return Object.prototype.hasOwnProperty.call(t,c)},n.p="/js",n(n.s=0)}([function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n\n// CONCATENATED MODULE: ./src/helpers.js\nfunction createElement(tag, props, ...children) {\r\n    const element = document.createElement(tag);\r\n\r\n    Object.keys(props).forEach(key => {\r\n        if (key.startsWith('data-')) {\r\n            element.setAttribute(key, props[key]);\r\n        } else {\r\n            element[key] = props[key];\r\n        }\r\n    });\r\n\r\n    children.forEach(child => {\r\n        if (typeof child === 'string') {\r\n            child = document.createTextNode(child);\r\n        }\r\n\r\n        element.appendChild(child);\r\n    });\r\n\r\n    return element;\r\n}\r\n\r\nclass EventEmitter {\r\n    constructor() {\r\n        this.events = {};\r\n    }\r\n\r\n    subscribe(type, callback) {\r\n        this.events[type] = this.events[type] || [];\r\n        this.events[type].push(callback);\r\n    }\r\n\r\n    emit(type, arg) {\r\n        if (this.events[type]) {\r\n            this.events[type].forEach(callback => callback(arg));\r\n        }\r\n    }\r\n}\r\n\r\nfunction save(data) {\r\n    const string = JSON.stringify(data);\r\n\r\n    localStorage.setItem('todos', string);\r\n}\r\n\r\nfunction load() {\r\n    const string = localStorage.getItem('todos');\r\n    const data = JSON.parse(string);\r\n\r\n    return data;\r\n}\r\n\r\n\n// CONCATENATED MODULE: ./src/model.js\n\r\n\r\nclass model_Model extends EventEmitter{\r\n    constructor(state = []) {\r\n        super();\r\n\r\n        this.state = state;\r\n    }\r\n\r\n    getItem(id) {\r\n        return this.state.find(item => item.id == id);\r\n    }\r\n\r\n    addItem(item) {\r\n        this.state.push(item);\r\n        this.emit('change', this.state);\r\n        return item;\r\n    }\r\n\r\n    updateItem(id, data) {\r\n        const item = this.getItem(id);\r\n        this.emit('change', this.state);\r\n        Object.keys(data).forEach(prop => item[prop] = data[prop]);\r\n\r\n        return item;\r\n    }\r\n\r\n    removeItem(id) {\r\n        const index = this.state.findIndex(item => item.id == id);\r\n\r\n        if (index > -1) {\r\n            this.state.splice(index, 1);\r\n            this.emit('change', this.state);\r\n        }\r\n    }\r\n}\r\n\r\n/* harmony default export */ var model = (model_Model);\n// CONCATENATED MODULE: ./src/view.js\n\r\n\r\nclass view_View extends EventEmitter {\r\n    constructor() {\r\n        super();\r\n\r\n        this.form = document.getElementById('todo-form');\r\n        this.input = document.getElementById('add-input');\r\n        this.list = document.getElementById('todo-list');\r\n\r\n        this.form.addEventListener('submit', this.handleAdd.bind(this));\r\n    }\r\n\r\n    createListItem(todo) {\r\n        const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox', checked: todo.completed ? 'checked' : '' });\r\n        const label = createElement('label', { className: 'title' }, todo.title);\r\n        const editInput = createElement('input', { type: 'text', className: 'textfield' });\r\n        const editButton = createElement('button', { className: 'edit' }, 'Изменить');\r\n        const deleteButton = createElement('button', { className: 'remove' }, 'Удалить');\r\n        const item = createElement('li', { className: `todo-item${todo.completed ? 'completed' : ''}`, 'data-id' : todo.id }, checkbox, label, editInput, editButton, deleteButton);\r\n\r\n        return this.addEventListeners(item);\r\n    }\r\n\r\n    addEventListeners(listItem) {\r\n        const checkbox = listItem.querySelector('.checkbox');\r\n        const editButton = listItem.querySelector('button.edit');\r\n        const removeButton = listItem.querySelector('button.remove');\r\n\r\n        checkbox.addEventListener('change', this.handleToggle.bind(this));\r\n        editButton.addEventListener('click', this.handleEdit.bind(this));\r\n        removeButton.addEventListener('click', this.handleRemove.bind(this));\r\n\r\n        return listItem;\r\n    }\r\n\r\n    handleAdd(event) {\r\n        event.preventDefault();\r\n\r\n        if (!this.input.value) return alert('Необходимо ввести название задачи');\r\n\r\n        const value = this.input.value;\r\n\r\n        this.emit('add', value);\r\n    }\r\n\r\n    handleToggle({ target }) {\r\n        const listItem = target.parentNode;\r\n        const id = listItem.getAttribute('data-id');\r\n        const completed = target.checked;\r\n\r\n        this.emit('toggle', { id, completed })\r\n    }\r\n\r\n    handleEdit({ target }) {\r\n        const listItem = target.parentNode;\r\n        const id = listItem.getAttribute('data-id');\r\n        const label = listItem.querySelector('.title');\r\n        const input = listItem.querySelector('.textfield');\r\n        const editButton = listItem.querySelector('button.edit');\r\n        const title = input.value;\r\n        const isEditing = listItem.classList.contains('editing');\r\n\r\n        if (isEditing) {\r\n            this.emit('edit', { id, title });\r\n        } else {\r\n            input.vatue = label.textContent;\r\n            editButton.textContent = 'Сохранить';\r\n            listItem.classList.add('editing');\r\n        }\r\n    }\r\n\r\n    handleRemove({ target }) {\r\n        const listItem = target.parentNode;\r\n        const id = listItem.getAttribute('data-id');\r\n\r\n        this.emit('remove', id);\r\n    }\r\n\r\n    show(todos) {\r\n        todos.forEach(todo => {\r\n            const listItem = this.createListItem(todo);\r\n\r\n            this.list.appendChild(listItem);\r\n        });\r\n    }\r\n\r\n    findListItem (id) {\r\n        return this.list.querySelector(`[data-id=\"${id}\"]`);\r\n    }\r\n\r\n    addItem(todo) {\r\n        const listItem = this.createListItem(todo);\r\n\r\n        this.input.value = '';\r\n        this.list.appendChild(listItem);\r\n    }\r\n\r\n    toggleItem(todo) {\r\n        const listItem = this.findListItem(todo.id);\r\n        const checkbox = listItem.querySelector('.checkbox');\r\n\r\n        checkbox.checked = todo.complited;\r\n\r\n        if (todo.completed) {\r\n            listItem.classList.add('completed');\r\n        } else {\r\n            listItem.classList.remove('complited');\r\n        }\r\n    }\r\n\r\n    editItem(todo) {\r\n        const listItem = this.findListItem(todo.id);\r\n        const label = listItem.querySelector('.title');\r\n        const input = listItem.querySelector('.textfield');\r\n        const editButton = listItem.querySelector('button.edit');\r\n\r\n        label.textContent = todo.title;\r\n        editButton.textContent = 'Изменить';\r\n        listItem.classList.remove('editing');\r\n    }\r\n\r\n    removeItem(id) {\r\n        const listItem = this.findListItem(id);\r\n\r\n        this.list.removeChild(listItem);\r\n    }\r\n}\r\n\r\n/* harmony default export */ var view = (view_View);\n// CONCATENATED MODULE: ./src/controller.js\nclass Controller {\r\n    constructor(model, view) {\r\n        this.model = model;\r\n        this.view = view;\r\n\r\n        view.subscribe('add', this.addTodo.bind(this));\r\n        view.subscribe('toggle', this.toggleTodo.bind(this));\r\n        view.subscribe('edit', this.editTodo.bind(this));\r\n        view.subscribe('remove', this.removeTodo.bind(this));\r\n\r\n        view.show(model.state);\r\n    }\r\n\r\n    addTodo(title) {\r\n        const todo = this.model.addItem({\r\n            id: Date.now(),\r\n            title,\r\n            complited: false\r\n        });\r\n\r\n        this.view.addItem(todo);\r\n    }\r\n\r\n    toggleTodo({ id, completed }) {\r\n        const todo = this.model.updateItem(id, { completed });\r\n\r\n        this.view.toggleItem(todo);\r\n    }\r\n\r\n    editTodo({ id, title }) {\r\n        const todo = this.model.updateItem(id, { title });\r\n\r\n        this.view.editItem(todo);\r\n    }\r\n\r\n    removeTodo(id) {\r\n        this.model.removeItem(id);\r\n        this.view.removeItem(id);\r\n    }\r\n}\r\n\r\n/* harmony default export */ var controller = (Controller);\n// CONCATENATED MODULE: ./src/index.js\n\r\n\r\n\r\n\r\n\r\nconst src_state = load();\r\n\r\nconst src_model = new model(src_state || undefined);\r\nsrc_model.subscribe('change', state => save(state));\r\n\r\nconst src_view = new view();\r\nconst src_controller = new controller(src_model, src_view);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9oZWxwZXJzLmpzP2Q3YzIiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsLmpzPzRhYmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXcuanM/ZjA3OCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbGxlci5qcz82MjgzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz9iNjM1Il0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnLCBwcm9wcywgLi4uY2hpbGRyZW4pIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gICAgT2JqZWN0LmtleXMocHJvcHMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoJ2RhdGEtJykpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBwcm9wc1trZXldKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlbGVtZW50W2tleV0gPSBwcm9wc1trZXldO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuY2xhc3MgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRzID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgc3Vic2NyaWJlKHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudHNbdHlwZV0gPSB0aGlzLmV2ZW50c1t0eXBlXSB8fCBbXTtcclxuICAgICAgICB0aGlzLmV2ZW50c1t0eXBlXS5wdXNoKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBlbWl0KHR5cGUsIGFyZykge1xyXG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1t0eXBlXSkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50c1t0eXBlXS5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKGFyZykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZShkYXRhKSB7XHJcbiAgICBjb25zdCBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBzdHJpbmcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkKCkge1xyXG4gICAgY29uc3Qgc3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9zJyk7XHJcbiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShzdHJpbmcpO1xyXG5cclxuICAgIHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5leHBvcnQgeyBjcmVhdGVFbGVtZW50LCBFdmVudEVtaXR0ZXIsIHNhdmUsIGxvYWQgfTsiLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XHJcblxyXG5jbGFzcyBNb2RlbCBleHRlbmRzIEV2ZW50RW1pdHRlcntcclxuICAgIGNvbnN0cnVjdG9yKHN0YXRlID0gW10pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbShpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmZpbmQoaXRlbSA9PiBpdGVtLmlkID09IGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRJdGVtKGl0ZW0pIHtcclxuICAgICAgICB0aGlzLnN0YXRlLnB1c2goaXRlbSk7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLnN0YXRlKTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVJdGVtKGlkLCBkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0SXRlbShpZCk7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLnN0YXRlKTtcclxuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKHByb3AgPT4gaXRlbVtwcm9wXSA9IGRhdGFbcHJvcF0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVJdGVtKGlkKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnN0YXRlLmZpbmRJbmRleChpdGVtID0+IGl0ZW0uaWQgPT0gaWQpO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgdGhpcy5zdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RlbDsiLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XHJcblxyXG5jbGFzcyBWaWV3IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWZvcm0nKTtcclxuICAgICAgICB0aGlzLmlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1pbnB1dCcpO1xyXG4gICAgICAgIHRoaXMubGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWxpc3QnKTtcclxuXHJcbiAgICAgICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuaGFuZGxlQWRkLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUxpc3RJdGVtKHRvZG8pIHtcclxuICAgICAgICBjb25zdCBjaGVja2JveCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyB0eXBlOiAnY2hlY2tib3gnLCBjbGFzc05hbWU6ICdjaGVja2JveCcsIGNoZWNrZWQ6IHRvZG8uY29tcGxldGVkID8gJ2NoZWNrZWQnIDogJycgfSk7XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsgY2xhc3NOYW1lOiAndGl0bGUnIH0sIHRvZG8udGl0bGUpO1xyXG4gICAgICAgIGNvbnN0IGVkaXRJbnB1dCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyB0eXBlOiAndGV4dCcsIGNsYXNzTmFtZTogJ3RleHRmaWVsZCcgfSk7XHJcbiAgICAgICAgY29uc3QgZWRpdEJ1dHRvbiA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHsgY2xhc3NOYW1lOiAnZWRpdCcgfSwgJ9CY0LfQvNC10L3QuNGC0YwnKTtcclxuICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7IGNsYXNzTmFtZTogJ3JlbW92ZScgfSwgJ9Cj0LTQsNC70LjRgtGMJyk7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IGNyZWF0ZUVsZW1lbnQoJ2xpJywgeyBjbGFzc05hbWU6IGB0b2RvLWl0ZW0ke3RvZG8uY29tcGxldGVkID8gJ2NvbXBsZXRlZCcgOiAnJ31gLCAnZGF0YS1pZCcgOiB0b2RvLmlkIH0sIGNoZWNrYm94LCBsYWJlbCwgZWRpdElucHV0LCBlZGl0QnV0dG9uLCBkZWxldGVCdXR0b24pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRFdmVudExpc3RlbmVycyhpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFdmVudExpc3RlbmVycyhsaXN0SXRlbSkge1xyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignLmNoZWNrYm94Jyk7XHJcbiAgICAgICAgY29uc3QgZWRpdEJ1dHRvbiA9IGxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5lZGl0Jyk7XHJcbiAgICAgICAgY29uc3QgcmVtb3ZlQnV0dG9uID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignYnV0dG9uLnJlbW92ZScpO1xyXG5cclxuICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmhhbmRsZVRvZ2dsZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVFZGl0LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJlbW92ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlUmVtb3ZlLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICByZXR1cm4gbGlzdEl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQWRkKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlucHV0LnZhbHVlKSByZXR1cm4gYWxlcnQoJ9Cd0LXQvtCx0YXQvtC00LjQvNC+INCy0LLQtdGB0YLQuCDQvdCw0LfQstCw0L3QuNC1INC30LDQtNCw0YfQuCcpO1xyXG5cclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaW5wdXQudmFsdWU7XHJcblxyXG4gICAgICAgIHRoaXMuZW1pdCgnYWRkJywgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVRvZ2dsZSh7IHRhcmdldCB9KSB7XHJcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICBjb25zdCBpZCA9IGxpc3RJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZCA9IHRhcmdldC5jaGVja2VkO1xyXG5cclxuICAgICAgICB0aGlzLmVtaXQoJ3RvZ2dsZScsIHsgaWQsIGNvbXBsZXRlZCB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUVkaXQoeyB0YXJnZXQgfSkge1xyXG4gICAgICAgIGNvbnN0IGxpc3RJdGVtID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICAgICAgY29uc3QgaWQgPSBsaXN0SXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IGxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZScpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignLnRleHRmaWVsZCcpO1xyXG4gICAgICAgIGNvbnN0IGVkaXRCdXR0b24gPSBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKCdidXR0b24uZWRpdCcpO1xyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gaW5wdXQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgaXNFZGl0aW5nID0gbGlzdEl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0aW5nJyk7XHJcblxyXG4gICAgICAgIGlmIChpc0VkaXRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdlZGl0JywgeyBpZCwgdGl0bGUgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5wdXQudmF0dWUgPSBsYWJlbC50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgZWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9ICfQodC+0YXRgNCw0L3QuNGC0YwnO1xyXG4gICAgICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCdlZGl0aW5nJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVJlbW92ZSh7IHRhcmdldCB9KSB7XHJcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICBjb25zdCBpZCA9IGxpc3RJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xyXG5cclxuICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZScsIGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93KHRvZG9zKSB7XHJcbiAgICAgICAgdG9kb3MuZm9yRWFjaCh0b2RvID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSB0aGlzLmNyZWF0ZUxpc3RJdGVtKHRvZG8pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5saXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kTGlzdEl0ZW0gKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD1cIiR7aWR9XCJdYCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkSXRlbSh0b2RvKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSB0aGlzLmNyZWF0ZUxpc3RJdGVtKHRvZG8pO1xyXG5cclxuICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgdGhpcy5saXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVJdGVtKHRvZG8pIHtcclxuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IHRoaXMuZmluZExpc3RJdGVtKHRvZG8uaWQpO1xyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignLmNoZWNrYm94Jyk7XHJcblxyXG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0b2RvLmNvbXBsaXRlZDtcclxuXHJcbiAgICAgICAgaWYgKHRvZG8uY29tcGxldGVkKSB7XHJcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsaXRlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlZGl0SXRlbSh0b2RvKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSB0aGlzLmZpbmRMaXN0SXRlbSh0b2RvLmlkKTtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IGxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZScpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignLnRleHRmaWVsZCcpO1xyXG4gICAgICAgIGNvbnN0IGVkaXRCdXR0b24gPSBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKCdidXR0b24uZWRpdCcpO1xyXG5cclxuICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9IHRvZG8udGl0bGU7XHJcbiAgICAgICAgZWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9ICfQmNC30LzQtdC90LjRgtGMJztcclxuICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdlZGl0aW5nJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlSXRlbShpZCkge1xyXG4gICAgICAgIGNvbnN0IGxpc3RJdGVtID0gdGhpcy5maW5kTGlzdEl0ZW0oaWQpO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3QucmVtb3ZlQ2hpbGQobGlzdEl0ZW0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWaWV3OyIsImNsYXNzIENvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IobW9kZWwsIHZpZXcpIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgdGhpcy52aWV3ID0gdmlldztcclxuXHJcbiAgICAgICAgdmlldy5zdWJzY3JpYmUoJ2FkZCcsIHRoaXMuYWRkVG9kby5iaW5kKHRoaXMpKTtcclxuICAgICAgICB2aWV3LnN1YnNjcmliZSgndG9nZ2xlJywgdGhpcy50b2dnbGVUb2RvLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHZpZXcuc3Vic2NyaWJlKCdlZGl0JywgdGhpcy5lZGl0VG9kby5iaW5kKHRoaXMpKTtcclxuICAgICAgICB2aWV3LnN1YnNjcmliZSgncmVtb3ZlJywgdGhpcy5yZW1vdmVUb2RvLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICB2aWV3LnNob3cobW9kZWwuc3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRvZG8odGl0bGUpIHtcclxuICAgICAgICBjb25zdCB0b2RvID0gdGhpcy5tb2RlbC5hZGRJdGVtKHtcclxuICAgICAgICAgICAgaWQ6IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICBjb21wbGl0ZWQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudmlldy5hZGRJdGVtKHRvZG8pO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZVRvZG8oeyBpZCwgY29tcGxldGVkIH0pIHtcclxuICAgICAgICBjb25zdCB0b2RvID0gdGhpcy5tb2RlbC51cGRhdGVJdGVtKGlkLCB7IGNvbXBsZXRlZCB9KTtcclxuXHJcbiAgICAgICAgdGhpcy52aWV3LnRvZ2dsZUl0ZW0odG9kbyk7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdFRvZG8oeyBpZCwgdGl0bGUgfSkge1xyXG4gICAgICAgIGNvbnN0IHRvZG8gPSB0aGlzLm1vZGVsLnVwZGF0ZUl0ZW0oaWQsIHsgdGl0bGUgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudmlldy5lZGl0SXRlbSh0b2RvKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVUb2RvKGlkKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZW1vdmVJdGVtKGlkKTtcclxuICAgICAgICB0aGlzLnZpZXcucmVtb3ZlSXRlbShpZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7IiwiaW1wb3J0IE1vZGVsIGZyb20gJy4vbW9kZWwnO1xyXG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xyXG5pbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXInO1xyXG5pbXBvcnQgeyBzYXZlLCBsb2FkIH0gZnJvbSAnLi9oZWxwZXJzJztcclxuXHJcbmNvbnN0IHN0YXRlID0gbG9hZCgpO1xyXG5cclxuY29uc3QgbW9kZWwgPSBuZXcgTW9kZWwoc3RhdGUgfHwgdW5kZWZpbmVkKTtcclxubW9kZWwuc3Vic2NyaWJlKCdjaGFuZ2UnLCBzdGF0ZSA9PiBzYXZlKHN0YXRlKSk7XHJcblxyXG5jb25zdCB2aWV3ID0gbmV3IFZpZXcoKTtcclxuY29uc3QgY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKG1vZGVsLCB2aWV3KTtcclxuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n")}]);