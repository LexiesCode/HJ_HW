'use strict';

const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.background = '#000';

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function selectColor() {
    let colors = ['#ffffff', '#ffe9c4', '#d4fbff'];
    let starColor = Math.floor(Math.random() * colors.length);
    return colors[starColor];
}

function createStar() {
    let x = getRandom(0, canvas.width);
    let y = getRandom(0, canvas.height);
    let radius = getRandom(0, 1.1);
//По идее, max радиус должен быть 0.55, но звезды совсем мелкие получаются. Проверить на другом мониторе! 
    ctx.beginPath();
    ctx.globalAlpha = getRandom(0.8, 1);
    ctx.fillStyle = selectColor();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}

function showSky() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < getRandom(200, 400); i++) {
        createStar();
    }
}

canvas.addEventListener('click', showSky);