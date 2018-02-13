'use strict';
const items = document.getElementsByClassName('box');
const quantity = document.getElementById('cart-count');
const amount = document.getElementById('cart-total-price');
let totalQuantity = quantity.innerHTML;
let totalAmount = amount.innerHTML;

Array.from(items).forEach((item) => {
    item.addEventListener('click', (event) => {
        let curentSum = event.currentTarget.getElementsByClassName('add')[0].dataset.price;
        totalAmount = parseInt(totalAmount) + parseInt(curentSum);
        let totalSum = getPriceFormatted(totalAmount);
        totalQuantity = ++totalQuantity;
        amount.innerHTML = totalSum;
        quantity.innerHTML = totalQuantity;
    });
});