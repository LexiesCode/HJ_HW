'use strict';

const userName = document.querySelector('[data-name]');
const description = document.querySelector('[data-description]');
const pic = document.querySelector('[data-pic]');
const position = document.querySelector('[data-position]');
const technologies = document.querySelector('[data-technologies]');
const content = document.querySelector('.content');

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
    userName.textContent = data.name;
    description.textContent = data.description;
    pic.src = data.pic;
    position.textContent = data.position;
    return new Promise((done, fail) => {
        done(data.id);
    });
}

function showTech(techs) {
    technologies.innerHTML = '';
    for (let techItem of techs) {
        addTech(techItem);
    }

    function addTech(tech) {
        const technology = document.createElement('span');
        technology.classList.add('devicons', `devicons-${tech}`);
        technologies.appendChild(technology);
    }
    content.style.display = 'initial';
}


loadData('https://neto-api.herokuapp.com/profile/me')
    .then(showData)
    .then(id => loadData(`https://neto-api.herokuapp.com/profile/${id}/technologies`))
    .then(showTech);