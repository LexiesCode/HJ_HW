'use strict';

const products = document.querySelector('.items-list');

function addItemToCart(event) {
    event.preventDefault();
    if (!event.target.classList.contains('add-to-cart')) {
        return;
    }
    addToCart({
        title: event.target.dataset.title,
        price: event.target.dataset.price
    });
}

products.addEventListener('click', addItemToCart);