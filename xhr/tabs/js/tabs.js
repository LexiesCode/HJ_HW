'use strict';

const content = document.getElementById('content');
const preloader = document.getElementById('preloader');
const tabs = document.querySelectorAll('nav a');
const emailTab = tabs[0];
const xhr = new XMLHttpRequest();
xhr.addEventListener('load', () => {
    content.innerHTML = xhr.responseText;
});
xhr.open('GET', emailTab.getAttribute('href'), true);
xhr.send();

function showTab(event) {
    event.preventDefault();
    if (!this.classList.contains('active')) {
        xhr.addEventListener('load', onLoad);
        xhr.addEventListener('loadstart', onLoadStart);
        xhr.addEventListener('loadend', onLoadEnd);
        xhr.open('GET', this.getAttribute('href'), true);
        xhr.send();
        for (let tab of tabs) {
            tab.classList.remove('active');
        }
        this.classList.add('active');
    }
}

function onLoad() {
    content.innerHTML = xhr.responseText;
}

function onLoadStart() {
    preloader.classList.remove('hidden');
}

function onLoadEnd() {
    preloader.classList.add('hidden');
}

Array.from(tabs).forEach(tab => {
    tab.addEventListener('click', showTab);
});