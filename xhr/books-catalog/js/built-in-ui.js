/* Данный JS код */
// Регулируем видимость карточки
function toggleCardVisible() {
    document.getElementById('content').classList.toggle('hidden');
    document.getElementById('card').classList.toggle('hidden');
}


document.getElementById('close').addEventListener('click', toggleCardVisible);

document.getElementById('content').addEventListener('click', (event) => {
    let target = null;
    if (event.target.tagName === 'LI') {
        target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
        target = event.target.parentNode;
    }

    if (target) {
        toggleCardVisible();
        document.getElementById('card-title').innerHTML = target.dataset.title;
        document.getElementById('card-author').innerHTML = target.dataset.author;
        document.getElementById('card-info').innerHTML = target.dataset.info;
        document.getElementById('card-price').innerHTML = target.dataset.price;
    }
});

const xhr = new XMLHttpRequest();
const content = document.getElementById('content');

xhr.addEventListener('load', onLoad);

function onLoad() {
    let result;
    if (xhr.status === 200) {
        const books = JSON.parse(xhr.responseText);
        result = books.map((i) => {
            return `<li data-title = '${i.title}' data-author = '${i.author.name}' data-info = '${i.info}' data-price = '${i.price}'><img src = '${i.cover.small}'></li>`;
        }).join('');
    } else {
        result = `Error ${xhr.status}: ${xhr.statusText}`;
    };
    content.innerHTML = result;
}

xhr.open('GET', 'https://neto-api.herokuapp.com/book/', true);
xhr.send();