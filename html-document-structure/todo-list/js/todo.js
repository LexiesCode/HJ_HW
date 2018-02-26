'use strict';
const items = document.getElementsByTagName('label');
const undoneItems = document.querySelector('.undone');
const doneItems = document.querySelector('.done');

for (const item of items) {
    item.querySelector('input').addEventListener('click', () => {
        let input = item.querySelector('input');
        if (input.hasAttribute('checked')) {
            input.removeAttribute('checked');
            undoneItems.appendChild(item);
        } else {
            input.setAttribute('checked', '');
            doneItems.appendChild(item);
        }
    })
}