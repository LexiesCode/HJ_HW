'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
const cards = document.querySelector('.websocket');

ws.addEventListener('message', showCard);

function showCard(e) {
    Array.from(cards.children).forEach(el => {
        if (el.textContent === e.data) {
            el.classList.add('flip-it');
        } else {
            el.classList.remove('flip-it');
        }
    });
}