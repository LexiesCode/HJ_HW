'use strict';
const counter = document.getElementById('counter');
const increment = document.getElementById('increment');
const decrement = document.getElementById('decrement');
const reset = document.getElementById('reset');

let result = localStorage.result;
if (!localStorage.result) {
    result = 0;
}

counter.textContent = result;

function getNumber(event) {
    if (event.target.id === 'increment') {
        result++;
    } else if (event.target.id === 'decrement') {
        if (result > 0) {
            result--;
        }
    } else if (event.target.id === 'reset') {
        result = 0;
    }
    counter.textContent = result;
    localStorage.result = result;
}

increment.addEventListener('click', getNumber);
decrement.addEventListener('click', getNumber);
reset.addEventListener('click', getNumber);