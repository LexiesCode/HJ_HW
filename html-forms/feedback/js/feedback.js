'use strict';
const contentForm = document.querySelector('.contentform');
const message = document.getElementById('output');
const sendMessage = document.getElementsByClassName('button-contact')[0];
const editMessage = document.getElementsByClassName('button-contact')[1];
const fields = document.querySelectorAll('input, textarea');

for (let field of fields) {
    field.addEventListener('input', checkFields);
}

function checkFields() {
    sendMessage.disabled = false;
    for (let field of fields) {
        if (this.name === 'zip') {
            this.value = this.value.replace(/\D/g, '');
        }
        if (field.value === '') {
            sendMessage.disabled = true;
        }
    }
}

sendMessage.addEventListener('click', (event) => {
    event.preventDefault();
    for (let field of fields) {
        let item = document.getElementById(field.name);
        if (item !== null) {
            item.value = field.value;
        }
    }
    message.classList.remove('hidden');
    contentForm.classList.add('hidden');
});

editMessage.addEventListener('click', (event) => {
    event.preventDefault();
    message.classList.add('hidden');
    contentForm.classList.remove('hidden');
});