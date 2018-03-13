'use strict';

const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let brush = 5;
let curves = [];
let color = 0;
let increase = true;
let drawing = false;

function circle(e) {
    drawing = true;
    curves.push([e.offsetX, e.offsetY]);
    ctx.beginPath();
    ctx.fillStyle = 'hsl(' + color + ', 100%, 50%)';
    ctx.arc(e.offsetX, e.offsetY, brush / 2, 0, 2 * Math.PI);
    ctx.fill();
}

function draw(e) {
    if (drawing) {
        curves.push([e.offsetX, e.offsetY])
        ctx.beginPath();
        ctx.lineWidth = brush;
        ctx.strokeStyle = 'hsl(' + color + ', 100%, 50%)';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.moveTo(curves[curves.length - 2][0], curves[curves.length - 2][1]);
        ctx.lineTo(curves[curves.length - 1][0], curves[curves.length - 1][1])
        ctx.stroke();
        changingColor(e);
        brushRadius();
    }
}

function changingColor(e) {
    let colorDecrease = e.shiftKey;
    if (colorDecrease) {
        color--;
    } else {
        color++;
    }
}

function brushRadius() {
    if (increase) {
        brush++;
        if (brush > 100) {
            increase = false;
        }
    } else {
        brush--;
        if (brush < 5) {
            increase = true;
        }
    }
}

function stopDrawing() {
    drawing = false;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    clearCanvas();
}

canvas.addEventListener('mousedown', circle);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseleave', stopDrawing);
canvas.addEventListener('dblclick', clearCanvas);
window.addEventListener('resize', resizeCanvas);