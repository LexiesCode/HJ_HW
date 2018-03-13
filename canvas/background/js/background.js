'use strict';

const canvas = document.querySelector('#wall');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const PI = Math.PI;
let figures = [];
let frameInterval = 1000 / 20;

class Figure {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = getRandom(0.1, 0.6);
        this.outline = 5 * this.size;
        this.nextPoint = Math.random() < 0.5 ? nextPoint1 : nextPoint2;
    }

    draw() {
        ctx.beginPath();
        ctx.lineWidth = this.outline;
        ctx.strokeStyle = '#ffffff';
        return this.nextPoint(this.x, this.y, Date.now());
    }
}

class Circle extends Figure {
    constructor(x, y) {
        super(x, y);
        this.radius = 12 * this.size;
    }
    draw() {
        let {
            x,
            y
        } = super.draw();

        ctx.arc(x, y, this.radius, 0, 2 * PI);
        ctx.stroke();
    }
}

class Cross extends Figure {
    constructor(x, y) {
        super(x, y);
        this.side = 20 * this.size;
        this.angle = getRandom(0, 360) * PI / 180;
        this.speed = getRandom(-0.2, 0.2);
    }
    draw() {
        let {
            x,
            y
        } = super.draw();

        this.angle += this.speed;

        ctx.translate(x, y);
        ctx.rotate(this.angle);

        ctx.moveTo(0, this.side / 2);
        ctx.lineTo(0, -this.side / 2);
        ctx.stroke();

        ctx.moveTo(this.side / 2, 0);
        ctx.lineTo(-this.side / 2, 0);
        ctx.stroke();

        ctx.rotate(-this.angle);
        ctx.translate(-x, -y);
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
    return Math.round(getRandom(min, max));
}

function nextPoint1(x, y, time) {
    return {
        x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
        y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    };
}

function nextPoint2(x, y, time) {
    return {
        x: x + Math.sin((x + (time / 10)) / 100) * 5,
        y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
    }
}

function createFigures(amount) {
    for (let i = 0; i < amount / 2; i++) {
        figures.push(
            new Cross(
                randomInt(0, canvas.width),
                randomInt(0, canvas.height))
        );
        figures.push(
            new Circle(
                randomInt(0, canvas.width),
                randomInt(0, canvas.height)
            )
        );
    }
}

function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    figures.forEach(figure => {
        figure.draw();
    });
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    figures = [];
    createFigures(randomInt(50, 200));
}

createFigures(randomInt(50, 200));
setInterval(tick, frameInterval);
window.addEventListener('resize', resizeCanvas);