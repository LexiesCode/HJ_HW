'use strict';
const slides = document.querySelector('.slides');

function slider() {
    const nextBtn = document.querySelector('[data-action = next]');
    const prevBtn = document.querySelector('[data-action = prev]');
    const firstBtn = document.querySelector('[data-action = first]');
    const lastBtn = document.querySelector('[data-action = last]');

    let activeSlide = slides.firstElementChild;
    activeSlide.classList.add('slide-current');

    nextBtn.addEventListener('click', (event) => move(event.target, 'next'));
    prevBtn.addEventListener('click', (event) => move(event.target, 'prev'));
    lastBtn.addEventListener('click', (event) => move(event.target, 'last'));
    firstBtn.addEventListener('click', (event) => move(event.target, 'default'));

    updateUI();

    function move(button, direction) {
		if (button === null || button.classList.contains('disabled')) {
			return;
		}
        activeSlide.classList.remove('slide-current');
        let nextSlide;
        switch (direction) {
            case 'next':
                nextSlide = activeSlide.nextElementSibling;
                break;
            case 'prev':
                nextSlide = activeSlide.previousElementSibling;
                break;
            case 'last':
                nextSlide = slides.lastElementChild;
                break;
            default:
                nextSlide = slides.firstElementChild;;
        }
		if (nextSlide !== null) {
			nextSlide.classList.add('slide-current');
			activeSlide = nextSlide;
		}
		updateUI();
    }

    function updateUI() {
        nextBtn.classList.toggle('disabled', activeSlide.nextElementSibling == null);
        prevBtn.classList.toggle('disabled', activeSlide.previousElementSibling == null);
        firstBtn.classList.toggle('disabled', activeSlide.previousElementSibling == null);
        lastBtn.classList.toggle('disabled', activeSlide.nextElementSibling == null);
    }
}
slider();