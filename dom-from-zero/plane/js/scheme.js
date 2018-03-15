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
 let id = acSelect.value;
 let num = 0;


 btnSetFull.setAttribute('disabled', true);
 btnSetEmpty.setAttribute('disabled', true);

 totalPax.textContent = 0;
 totalHalf.textContent = 0;
 totalAdult.textContent = 0;

// рендерим схему самолета по клику на кнопку "Показать схему"
 btnSeatMap.addEventListener('click', (e) => {
    getData(id)
        .then(data => showScheme(data))
});
 

 // получаем данные о количестве мест
 function getData(id) {
     return fetch(`https://neto-api.herokuapp.com/plane/${id}`)
        .then(res => res.json())
        .catch(err => {
             console.log(err);
        });
 }

// показываем схему смамолета
  function showScheme(data) {
    btnSetFull.disabled = false;
    btnSetEmpty.disabled = false;
    seatMapTitle.textContent = `${data.title} (${data.passengers} пассажиров)`;
    while (seatMap.hasChildNodes()) {
        seatMap.removeChild(seatMap.firstChild);
    }
    createRow(seats, num)
    const row = document.querySelector('.seating-row')
    seatMap.appendChild(row);
}

//создание новых элементов
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

 // создаем ряды в схеме
 function createRow(seats, num) {
    num++;
    return el('div', {
        class: 'row seating-row text-center'
    }, [el('div', {
        class: 'col-xs-1 row-number'
    }, [el('h2', [`${num}`])]), [el('div', {
        class: 'col-xs-5'
    }, [el('div', {
        class: 'col-xs-4'
    }, [el('span', {
        class: 'seat-label'
    }, ['A'])])])]])
}

//отображаем метки
//реализуем функцию выбора мест по клику
//реализуем функцию выбора / отмены выбора мест кнопками
//отображаем информацию о выбранных местах
