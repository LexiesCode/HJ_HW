'use strict';

const cardsP = document.querySelector('.pooling');

setInterval(showCardPolling, 5000);

function showCardPolling() {
    fetch('https://neto-api.herokuapp.com/comet/pooling')
        .then(response => response.json())
        .then(result => {
            Array.from(cardsP.children).forEach(el => {
                let number = +el.textContent;
                if (number === result) {
                    el.classList.add('flip-it');
                } else {
                    el.classList.remove('flip-it');
                }
            })
        })
        .catch(err => console.error(err));
}