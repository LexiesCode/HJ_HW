'use strict'
const acSelect = document.querySelector('#acSelect');
const btnSeatMap = document.querySelector('#btnSeatMap');
const btnSetFull = document.querySelector('#btnSetFull');
const btnSetEmpty = document.querySelector('#btnSetEmpty');
const seatMapTitle = document.querySelector('#seatMapTitle');
const seatMap = document.querySelector('#seatMapDiv');
const totalPax = document.querySelector('#totalPax');
const totalAdult = document.querySelector('#totalAdult');
const totalHalf = document.querySelector('#totalHalf');

btnSetFull.setAttribute('disabled', true);
btnSetEmpty.setAttribute('disabled', true);

totalPax.textContent = 0;
totalHalf.textContent = 0;
totalAdult.textContent = 0;

btnSeatMap.addEventListener('click', (e) => {
    e.preventDefault();
    getData(acSelect.value).then(data => showScheme(data));
});

function getData(id) {
    return fetch(`https://neto-api.herokuapp.com/plane/${id}`)
        .then(res => res.json())
        .catch(err => {
            console.log(err);
        });
}

function showScheme(data) {
    btnSetFull.disabled = false;
    btnSetEmpty.disabled = false;
    seatMapTitle.textContent = `${data.title} (${data.passengers} пассажиров)`;
    while (seatMap.hasChildNodes()) {
        seatMap.removeChild(seatMap.firstChild);
    }
    for (let rowNumber = 0; rowNumber < data.scheme.length; rowNumber++) {
        let rowItem = createRow(rowNumber + 1, data.scheme[rowNumber], data);
        seatMap.appendChild(rowItem);
    }
}

function createRow(rowNumber, seatsInRow, data) {
    let result =
        el('div', {
            class: 'row seating-row text-center'
        }, [
            createRowNumber(rowNumber),
            createSeatsPart(['A', 'B', 'C'], seatsInRow, data),
            createSeatsPart(['D', 'E', 'F'], seatsInRow, data),
        ]);
    return result;
}

function createRowNumber(number) {
    return el('div', {class: 'col-xs-1 row-number'}, [
        el('h2', {class : ''}, `${number}`)
    ]);
}

function createSeatsPart(seatLabels, seatsInRow, data) {
    let seatItems = [];
    for (let seatLabel of seatLabels) {
        seatItems.push(createSeat(seatLabel, seatsInRow, data));
    }
    return el('div', {class: 'col-xs-5'}, seatItems);
}

function createSeat(seatLabel, seatsInRow, data) {
    if (seatsInRow !== 0) {
        let letters = data['letters' + seatsInRow];
        if (letters && letters.includes(seatLabel)) {
            let result =
                el('div', {class: 'col-xs-4 seat'}, [
                    el('span', {class: 'seat-label'}, 
                        seatLabel
                    )
                ]);
            return result;
        }
    }
    return el('div', {class: 'col-xs-4 no-seat'}, []);
}

function el(tagName, attributes, children) {
    const element = document.createElement(tagName);
    if (typeof attributes === 'object') {
        Object.keys(attributes).forEach(i => element.setAttribute(i, attributes[i]));
    }
    if (typeof children === 'string') {
        element.textContent = children;
    } else if (children instanceof Array) {
        children.forEach(child => element.appendChild(child));
    }
    return element;
}

seatMap.addEventListener('click', selectSeat);
btnSetFull.addEventListener('click', selectAll);
btnSetEmpty.addEventListener('click', clearAll);


function selectSeat(e) {
    let target = e.target;
    if (target.tagName === 'SPAN')
        target = target.parentElement;
    if (target.tagName === 'DIV' && target.classList.contains('seat')) {
        let total = 0;
        if (e.shiftKey) {
            target.classList.toggle('half');
        } else {
            target.classList.toggle('adult');
        }
    }
    showTotal();
}

function selectAll(e) {
    e.preventDefault();
    if (e.shiftKey) {
        Array.from(document.querySelectorAll('.seat')).forEach(element => element.classList.toggle('adult', 'half'));
        /*Array.from(document.querySelectorAll('.seat')).forEach(element => {
            element.classList.add('half');
            element.classList.remove('adult');
        });*/
    } else {
        Array.from(document.querySelectorAll('.seat')).forEach(element => element.classList.toggle('adult', 'half'));
        /*
        Array.from(document.querySelectorAll('.seat')).forEach(element => {
            element.classList.remove('half');
            element.classList.add('adult');
        });*/
    }
    showTotal();
}

function clearAll(e) {
    e.preventDefault();
    Array.from(document.querySelectorAll('.seat')).forEach(element => element.classList.remove('adult', 'half'));
    showTotal();
}

function showTotal() {
    totalPax.textContent = (document.querySelectorAll('.adult')).length + (document.querySelectorAll('.half')).length;
    totalAdult.textContent = (document.querySelectorAll('.adult')).length;
    totalHalf.textContent = (document.querySelectorAll('.half')).length;
}