'use strict';
const signInForm = document.querySelector('.sign-in-htm');
const signUpForm = document.querySelector('.sign-up-htm');
const signInBtn = signInForm.querySelector('.button');
const signUpBtn = signUpForm.querySelector('.button');
const signInMessage = signInForm.querySelector('.error-message');
const signUpMessage = signUpForm.querySelector('.error-message');

const xhr = new XMLHttpRequest();
let prevOnLoad = null;
signInBtn.addEventListener('click', signIn);
signUpBtn.addEventListener('click', signUp);

function parseForm(form) {
	let user = {};
    const formData = new FormData(form);
    for (const [key, value] of formData) {
	     user[key] = value;
    }
	return user;
}

function submitForm(url, user, onLoad) {
	if (prevOnLoad !== null) {
		xhr.removeEventListener('load', prevOnLoad);
	}
	xhr.addEventListener('load', onLoad);
	prevOnLoad = onLoad;
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(user));
}

function signIn(event) {
	let user = parseForm(signInForm);
    event.preventDefault();
	submitForm('https://neto-api.herokuapp.com/signin', user, onLoad);
    function onLoad() {
        if (xhr.status === 200) {
			let response = JSON.parse(xhr.responseText);
			if (response.error) {
                signInMessage.textContent = response.message;
            } else {
                signInMessage.textContent = `Пользователь ${response.name} успешно авторизован`;
            }
        } else {
            console.log(`Error ${xhr.status}: ${xhr.statusText}`);
        }
    }
}

function signUp(event) {
	let user = parseForm(signUpForm);
	event.preventDefault();
	submitForm('https://neto-api.herokuapp.com/signup', user, onLoad);
    function onLoad() {
        if (xhr.status === 200) {
			let response = JSON.parse(xhr.responseText);
			if (response.error) {
                signUpMessage.textContent = response.message;
            } else {
				signUpMessage.textContent = `Пользователь ${response.name} успешно зарегистрирован`;
			}
        } else {
            console.log(`Error ${xhr.status}: ${xhr.statusText}`);
        }
    }
}
