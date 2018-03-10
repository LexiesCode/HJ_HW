'use strict';
const background = document.querySelector('.bio img');
const userName = document.querySelector('.desc h3');
const description = document.querySelector('.desc p');
const pic = document.querySelector('.avatarcontainer img');
const tweets = document.querySelector('output[data-tweets]');
const followers = document.querySelector('output[data-followers]');
const following = document.querySelector('output[data-following]');

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

function showWidget(widget) {
    background.src = widget.wallpaper;
    userName.textContent = widget.username;
    description.textContent = widget.description;
    pic.src = widget.pic;
    tweets.textContent = widget.tweets;
    followers.textContent = widget.followers;
    following.textContent = widget.following;
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp')
    .then(showWidget);