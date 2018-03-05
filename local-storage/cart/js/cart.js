'use strict';

const cart = document.querySelector('#quick-cart');
const addToCartForm = document.querySelector('#AddToCartForm');
const addToCartButton = document.querySelector('#AddToCart');

// Заполняем варианты цветов
let xhrColor = new XMLHttpRequest();
xhrColor.open('GET', 'https://neto-api.herokuapp.com/cart/colors');
xhrColor.send();
xhrColor.addEventListener('load', () => {
    // Заполняем цвета
	let colorSwatch = document.querySelector('#colorSwatch');
	let content = '';	
    let colors = JSON.parse(xhrColor.response);
    for (const color of colors) {
        let available;
        let disabled;
		let checked;
        if (color.isAvailable) {
            available = 'available';
			// Устанавливаем выбранным первый попавшийся доступный или из лок. хранилища
			if (!localStorage.color) {
				localStorage.color = color.type;
			}
			checked = color.type === localStorage.color ? 'checked' : '';
        }
        else {
            available = 'soldout';
            disabled = 'disabled';
        }
        content += `<div data-value="${color.type}" class="swatch-element color ${color.type} ${available}">
          <div class="tooltip">${color.title}</div>
          <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}" ${checked}>
          <label for="swatch-1-${color.type}" style="border-color: red;">
            <span style="background-color: ${color.code};"></span>
            <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
          </label>
        </div>`;
    }
	colorSwatch.innerHTML = content;

	// Запоминаем выбор цвета в локальное хранилище при клике на доступный цвет
	colorSwatch.addEventListener('click', (event) => {
		let item = event.target;
		if (item.tagName === 'INPUT' && item.parentElement !== null && item.parentElement.classList.contains('available')) {
			item.checked = true;
			localStorage.color = item.value;
		}
	});
});

// Заполняем варианты размеров
let xhrSize = new XMLHttpRequest();
xhrSize.open('GET', 'https://neto-api.herokuapp.com/cart/sizes');
xhrSize.send();
xhrSize.addEventListener('load', () => {
	// Заполняем размеры
	let sizeSwatch = document.querySelector('#sizeSwatch');
    let content = '';
    let sizes = JSON.parse(xhrSize.response);
    for (const size of sizes) {
        let available;
        let disabled;
		let checked;
        if (size.isAvailable) {
            available = 'available';
			// Устанавливаем выбранным первый попавшийся доступный или из лок. хранилища
			if (!localStorage.size) {
				localStorage.size = size.type;
			}
			checked = size.type === localStorage.size ? 'checked' : '';
        }
        else {
            available = 'soldout';
            disabled = 'disabled';
        }
		content += `<div data-value="${size.type}" class="swatch-element plain ${size.type} ${available}">
        <input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}" ${checked}>
        <label for="swatch-0-${size.type}">
          ${size.title}
          <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
        </label>
      </div>`;
    }
    sizeSwatch.innerHTML = content;

	// Запоминаем выбор размера в локальное хранилище при клике на доступный размер	
	sizeSwatch.addEventListener('click', (event) => {
		let item = event.target;
		if (item.tagName === 'INPUT' && item.parentElement !== null && item.parentElement.classList.contains('available')) {
			item.checked = true;
			localStorage.size = item.value;
		}
	});
});

// Заполняем корзину
let xhrCart = new XMLHttpRequest();
xhrCart.open('GET', 'https://neto-api.herokuapp.com/cart');
xhrCart.send();
xhrCart.addEventListener('load', cartOnLoad);
function cartOnLoad() {
    let cartStatus = JSON.parse(xhrCart.response)[0];
    updateCart(cartStatus);	
}

// Обновляем корзину
function updateCart(cartStatus) {
	if (cartStatus === undefined) {
		cart.innerHTML = '';
		return;
	}
	let open = 'open';
	let totalAmount = cartStatus.price * cartStatus.quantity;
	cart.innerHTML = 
		`<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${cartStatus.id}" style="opacity: 1;">
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
				<strong class="quick-cart-text">Оформить заказ<br></strong>
				<span id="quick-cart-price">$${totalAmount}.00</span>
			</span>
		</a>`;
	addCartRemoveHandler();
}

// Обработчик удаления из корзины
function addCartRemoveHandler() {
	let xhrRemove = new XMLHttpRequest();
	const removeBtn = document.querySelector('.remove');
	if (removeBtn !== null) {
		removeBtn.addEventListener('click', removeItem);
	}

	function removeItem() {
		let formData = new FormData();
		formData.append('productId', removeBtn.dataset.id);
		xhrRemove.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
		xhrRemove.send(formData);
		xhrRemove.addEventListener('load', removeOnLoad);
	}

	function removeOnLoad() {
		updateCart(JSON.parse(xhrRemove.response)[0]);
	}
}

// Добавление в корзину
function addToCart(event) {
    event.preventDefault();
    let obj = {};
    let formData = new FormData(addToCartForm);
    formData.append('productId', addToCartForm.dataset.productId);
    xhrCart.open('POST', 'https://neto-api.herokuapp.com/cart');
    xhrCart.send(formData);
}

addToCartButton.addEventListener('click', addToCart);
