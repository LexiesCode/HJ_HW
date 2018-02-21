'use strict';
const source = document.querySelector('#source');
const result = document.querySelector('#result');
const selectFrom = document.querySelector('#from');
const selectTo = document.querySelector('#to');
const preloader = document.querySelector('#loader');
const content = document.querySelector('#content');

const xhr = new XMLHttpRequest();

function request() {
    xhr.addEventListener("loadstart", onLoadStart);
    xhr.addEventListener("load", onLoad);
    xhr.open('GET', 'https://neto-api.herokuapp.com/currency');
    xhr.send();
}

function onLoadStart() {
    preloader.classList.remove('hidden');
}

function onLoad() {
    let data = JSON.parse(xhr.responseText);
    data.forEach(currency => {
        selectFrom.innerHTML += `<option value='${currency.value}'>${currency.code}</option>`;
        selectTo.innerHTML += `<option value='${currency.value}'>${currency.code}</option>`;
    });
    dataInput();
    calcResult();
    content.classList.remove('hidden');
    preloader.classList.add('hidden');
}

function dataInput() {
    source.addEventListener('input', () => {
        calcResult();
    });

    selectFrom.addEventListener('input', () => {
        calcResult();
    });

    selectTo.addEventListener('input', () => {
        calcResult();
    });
}

function calcResult() {
    let calculation = (source.value / selectTo.options[selectTo.selectedIndex].value * selectFrom.options[selectFrom.selectedIndex].value).toFixed(2);
    result.value = calculation;
}

request();