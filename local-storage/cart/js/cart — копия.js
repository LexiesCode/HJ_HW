'use strict';
/*
const cart = document.querySelector('#quick-cart');
const removeBtn = document.querySelector('.remove');
const addToCartForm = document.querySelector('#AddToCartForm');
let xhrColor = new XMLHttpRequest();
xhrColor.open('GET', 'https://neto-api.herokuapp.com/cart/colors');
xhrColor.send();

xhrColor.addEventListener('load', () => {
    let content = '';
    let colors = JSON.parse(xhrColor.response);
    for (const color of colors) {
        let available;
        let disabled;
        if (color.isAvailable) {
            available = 'available';
        }
        else {
            available = 'soldout';
            disabled = 'disabled';
        }
        content += `<div data-value="${color.type}" class="swatch-element color ${color.type} ${available}">
          <div class="tooltip">${color.title}</div>
          <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}"  ${disabled}>
          <label for="swatch-1-${color.type}" style="border-color: red;">
            <span style="background-color: ${color.code};"></span>
            <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
          </label>
        </div>`;
    }
    document.getElementById('colorSwatch').innerHTML += content;
});

let xhrSize = new XMLHttpRequest();
xhrSize.open('GET', 'https://neto-api.herokuapp.com/cart/sizes');
xhrSize.send();
xhrSize.addEventListener('load', () => {
    let content = '';
    let sizes = JSON.parse(xhrSize.response);
    for (const size of sizes) {
        let available;
        let disabled;
        if (size.isAvailable) {
            available = 'available';
        }
        else {
            available = 'soldout';
            disabled = 'disabled';
        }
        content += `<div data-value="${size.type}" class="swatch-element plain ${size.type} ${available}">
        <input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}" ${disabled}>
        <label for="swatch-0-${size.type}">
          ${size.title}
          <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
        </label>
      </div>`
    }
    document.getElementById('sizeSwatch').innerHTML += content;
});




let xhrCart = new XMLHttpRequest();
xhrCart.open('GET', 'https://neto-api.herokuapp.com/cart');
xhrCart.send();

function checkCart(cartStatus) {
	let open = 'open';
	if (cartStatus === undefined) {
		cart.innerHTML = '';
	}
	let totalAmount = cartStatus.price * cartStatus.quantity;
	cart.innerHTML = `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${cartStatus.id}" style="opacity: 1;">
    <div class="quick-cart-product-wrap">
      <img src="${cartStatus.pic}" title="${cartStatus.title}">
      <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
      <span class="s2"></span>
    </div>
    <span class="count hide fadeUp" id="quick-cart-product-count-${cartStatus.id}">${cartStatus.quantity}</span>
    <span class="quick-cart-product-remove remove" data-id="${cartStatus.id}"></span>
    </div>
    <a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${open}">
    <span>
    <strong class="quick-cart-text">ќформить заказ<br></strong>
    <span id="quick-cart-price">$${totalAmount}.00</span>
    </span>
    </a>`
}
let xhrRemove = new XMLHttpRequest();

function cartOnLoad() {
    let cartStatus = JSON.parse(xhrCart.response)[0];
    if (cartStatus === undefined) {
        return;
    }
    checkCart(cartStatus);
}

function removeOnLoad() {
    checkCart(JSON.parse(xhrRemove.response)[0]);
    removeItem();
}

function removeItem() {
    if (removeBtn == null) {
        return;
    }
    removeBtn.addEventListener('click', () => {
    let formData = new FormData;
    formData.append('productId', removeBtn.dataset.id);
    xhrRemove.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
    xhrRemove.send(formData);
    xhrRemove.addEventListener('load', removeOnLoad);
	});
}

function addToCart(event) {
    event.preventDefault();
    let obj = {};
    let formData = new FormData(addToCartForm);
    formData.append('productId', addToCartForm.dataset.productId);
    xhrCart.open('POST', 'https://neto-api.herokuapp.com/cart');
    xhrCart.send(formData);
}


xhrCart.addEventListener('load', cartOnLoad);
xhrCart.addEventListener('load', removeItem);
addToCartForm.addEventListener('click', addToCart);

*/