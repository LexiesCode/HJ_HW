'use strict';

const keys = document.getElementsByTagName('li');
const piano = document.getElementsByClassName('set')[0];

const middle = [
    'sounds/middle/first.mp3',
    'sounds/middle/second.mp3',
    'sounds/middle/third.mp3',
    'sounds/middle/fourth.mp3',
    'sounds/middle/fifth.mp3'
];

const lower = [
    'sounds/lower/first.mp3',
    'sounds/lower/second.mp3',
    'sounds/lower/third.mp3',
    'sounds/lower/fourth.mp3',
    'sounds/lower/fifth.mp3'
];

const higher = [
    'sounds/higher/first.mp3',
    'sounds/higher/second.mp3',
    'sounds/higher/third.mp3',
    'sounds/higher/fourth.mp3',
    'sounds/higher/fifth.mp3'
];

function pianoPlay(event) {
    let sound = event.currentTarget.getElementsByTagName('audio')[0];
    sound.play();
	sound.currentTime = 0;
}

function selectMode(defaultMode = middle, selectedMode) {
    Array.from(keys).forEach((key, i) => {
        let sound = key.getElementsByTagName('audio')[0];
        sound.src = defaultMode[i];
    });
	piano.classList.remove('middle', 'lower', 'higher');
    piano.classList.add(selectedMode);
}

function checkMode(event) {
    if (event instanceof KeyboardEvent) {
        if (!event.repeat) {
			if (event.shiftKey) {
			    selectMode(lower, 'lower');
			} else if (event.altKey) {
			    selectMode(higher, 'higher');
			} else {
			    selectMode(middle, 'middle');
            }
        }
    }
}

Array.from(keys).forEach((key, i) => {
    key.addEventListener('click', pianoPlay);
});

selectMode(middle, 'middle');

document.addEventListener('keydown', checkMode);
document.addEventListener('keyup', checkMode);