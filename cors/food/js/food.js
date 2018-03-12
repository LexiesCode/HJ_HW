'use strict';
const background = document.querySelector('[data-pic]');
const title = document.querySelector('[data-title]');
const ingredients = document.querySelector('[data-ingredients]');
const rating = document.querySelector('[data-rating]');
const star = document.querySelector('[data-star]');
const votes = document.querySelector('[data-votes]');
const consumers = document.querySelector('[data-consumers]');

function getRandomName() {
    return 'callback' + Math.round(Math.random() * 1000000);
}

function loadData(url) {
    const callbackFunc = getRandomName();
    return new Promise((done, fail) => {
        window[callbackFunc] = done;

        const script = document.createElement('script');
        script.src = `${url}?jsonp=${callbackFunc}`;
        document.body.appendChild(script);
    });
}

function showData(data) {
    background.style.backgroundImage = `url(${data.pic})`;
    title.textContent = data.title;
    ingredients.textContent = data.ingredients.join(', ');
    return new Promise((done, fail) => {
        done(data.rating);
    });
}

function showRating(data) {
    rating.textContent = data.rating.toFixed(2);
    star.style.width = `${data.rating * 10}%`;
    votes.textContent = `${data.votes} оценок`;
    return new Promise((done, fail) => {
        done(data.consumers);
    }); 
}

function showConsumers(data) {
    consumers.innerHTML = '';
    for (let consumer of data.consumers) {
        addUser(consumer);
    }
    function addUser(consumer) {
        let user = document.createElement('img');
        user.src = consumer.pic;
        user.title = consumer.name;
        consumers.appendChild(user);
    }

    let others = document.createElement('span');
    others.textContent = `(+${data.total})`;
    consumers.appendChild(others);
}

loadData('https://neto-api.herokuapp.com/food/42')
    .then(showData)
    .then(rating => loadData(`https://neto-api.herokuapp.com/food/42/rating`))
    .then(showRating)
    .then(consumers => loadData(`https://neto-api.herokuapp.com/food/42/consumers`))
    .then(showConsumers);