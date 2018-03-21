const eye = document.querySelector('.big-book__eye');
const pupil = eye.querySelector('.big-book__pupil');
const pupilX = pupil.getBoundingClientRect().x;
const pupilY = pupil.getBoundingClientRect().y;

document.addEventListener('mousemove', e => {
    goggle(e.pageX, e.pageY);
});

function goggle(x, y) {
    let alpha = Math.atan((y - pupilY) / (x - pupilX));
    const r = 30;
    let s = Math.sign(x - pupilX);
    let offsetX = r * Math.cos(alpha) * s;
    let offsetY = r * Math.sin(alpha) * s;

    let distance = Math.sqrt(Math.pow(x - pupilX, 2) + Math.pow(y - pupilY, 2));
    let maxDistance = Math.sqrt(pupilX * pupilX + pupilY * pupilY);
    let size = 1 + 2 * Math.abs(maxDistance - distance)/maxDistance;

    pupil.style.setProperty('--pupil-x', offsetX + 'px');
    pupil.style.setProperty('--pupil-y', offsetY + 'px');
    pupil.style.setProperty('--pupil-size', size);
}