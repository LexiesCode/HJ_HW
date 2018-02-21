'use strict'

const list = document.querySelector('.list-block');
const listItems = Array.from(list.querySelectorAll('li > input[type="checkbox"]'));
const items = Array.from(list.querySelectorAll('li'));
const output = list.getElementsByTagName('output')[0];

function updateData() {
    let checkedItems = listItems.filter((item) => {
        return item.checked;
    });
    if (checkedItems.length < listItems.length) {
        list.classList.remove('complete');
    } else {
        list.classList.add('complete');
    }
    output.value = `${checkedItems.length} из ${listItems.length}`;
}

function itemsSubscribe() {
    items.forEach(item => {
        item.addEventListener('click', updateData);
    });
}

updateData();
itemsSubscribe();