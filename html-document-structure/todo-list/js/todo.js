'use strict';

const undoneItems = document.querySelector('.undone');
const doneItems = document.querySelector('.done');

// Вариант 1
const todoList = document.querySelector('.todo-list');
todoList.addEventListener('click', (event) => {
	if (event.target === null || event.target.tagName !== 'INPUT') {
		return;
	}
	let input = event.target;
    if (input.hasAttribute('checked')) {
        input.removeAttribute('checked');
        undoneItems.appendChild(input.parentElement);
    } else {
        input.setAttribute('checked', '');
        doneItems.appendChild(input.parentElement);
    }
});

/*
// Вариант 2
const items = document.querySelectorAll('input');

for (const item of items) {
	item.addEventListener('click', (event) => onClick(event.target));
}

function onClick(input) {
	if (input.hasAttribute('checked')) {
        input.removeAttribute('checked');
        undoneItems.appendChild(input.parentElement);
    } else {
        input.setAttribute('checked', '');
        doneItems.appendChild(input.parentElement);
    }
}
*/

// P.S. Какой метод предпочтительнее использовать?