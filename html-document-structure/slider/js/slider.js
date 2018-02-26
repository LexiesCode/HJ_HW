'use strict';
const slides = document.querySelector('.slides');

function slider() {
    const nextBtn = document.querySelector('[data-action = next]');
    const prevBtn = document.querySelector('[data-action = prev]');
    const firstBtn = document.querySelector('[data-action = first]');
    const lastBtn = document.querySelector('[data-action = last]');

    let activeSlide = slides.firstElementChild;
    activeSlide.classList.add('slide-current');

    nextBtn.addEventListener('click', () => move('next'));
    prevBtn.addEventListener('click', () => move('prev'));
    lastBtn.addEventListener('click', () => move('last'));
    firstBtn.addEventListener('click', () => move('default'));

    updateUI();

    function move(direction) {
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
        nextSlide.classList.add('slide-current');
        activeSlide = nextSlide;

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