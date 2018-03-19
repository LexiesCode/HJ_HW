'use strict';

const cardsLp = document.querySelector('.long-pooling');

function subcribe(url) {
    fetch(url)
        .then(response => response.json())
        .then(result => {
            Array.from(cardsLp.children).forEach(el => {
                let number = +el.textContent;
                if (number === result) {
                    el.classList.add('flip-it');
                } else {
                    el.classList.remove('flip-it');
                }
            });
            subcribe(url);
        })
        .catch(err => console.error(err));
}

subcribe('https://neto-api.herokuapp.com/comet/long-pooling');