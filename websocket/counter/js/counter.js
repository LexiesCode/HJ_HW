'use strict';

const counter = document.querySelector('.counter');
const errors = document.querySelector('output.errors');
const socket = new WebSocket('wss://neto-api.herokuapp.com/counter');

socket.addEventListener('message', event => {
    let data = JSON.parse(event.data);
    counter.textContent = data.connections;
    errors.textContent = data.errors;
});

window.addEventListener('beforeunload', () => {
    socket.onclose = () => {
        socket.close(1000);
    };
});