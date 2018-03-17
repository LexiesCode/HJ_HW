'use strict'

const chat = document.querySelector('.chat');
const messages = chat.querySelector('.messages-content');
const status = chat.querySelector('.chat-status');
const notification = chat.querySelector('.message-status');
const submitBtn = chat.querySelector('.message-submit');
const messageInput = chat.querySelector('.message-input');
const socket = new WebSocket('wss://neto-api.herokuapp.com/chat');

socket.addEventListener('open', onOpen);
socket.addEventListener('error', onErr);
socket.addEventListener('message', onMessage);
socket.addEventListener('close', onClose);

submitBtn.addEventListener('click', submitMessage);


function onOpen(event) {
    status.textContent = status.dataset.online;
    submitBtn.removeAttribute('disabled');
    let statusReport = notification.cloneNode(true);
    statusReport.firstElementChild.textContent = 'Пользователь появился в сети';
    messages.appendChild(statusReport);
}

function onErr(error) {
    let statusReport = notification.cloneNode(true);
    statusReport.firstElementChild.textContent = 'Ошибка соединения';
    messages.appendChild(statusReport);
}

function onMessage(event) {
    if (event.data === '...') {
        let loading = chat.querySelector('.loading').cloneNode(true);
        messages.appendChild(loading);
        loading.lastChild.textContent = 'Печатает сообщение...'
    } else {
        let messageTemp = chat.querySelector('.messages-templates').children[1].cloneNode(true);
        messageTemp.querySelector('.message-text').textContent = event.data;
        let time = new Date();
        messageTemp.querySelector('.timestamp').textContent = time.toLocaleTimeString('ru-RU', {
            hour: "2-digit",
            minute: "2-digit"
        });
        messages.appendChild(messageTemp);
        messageTemp.scrollIntoView(true);
    }
}

function onClose(event) {
    status.textContent = status.dataset.offline;
    submitBtn.setAttribute('disabled', true);
    let statusReport = notification.cloneNode(true);
    statusReport.firstElementChild.textContent = 'Пользователь не в сети';
    messages.appendChild(statusReport);
}

function submitMessage() {
    event.preventDefault();
    let messageText = messageInput.value;
    if (messageText === '') {
        return;
    }
    socket.send(messageText);
    let message = chat.querySelector('.message-personal').cloneNode(true);
    message.querySelector('.message-text').textContent = messageText;
    let time = new Date();
    message.querySelector('.timestamp').textContent = time.toLocaleTimeString('ru-RU', {
        hour: "2-digit",
        minute: "2-digit"
    });
    messages.appendChild(message);
    message.scrollIntoView(true);
    messageInput.value = '';
}

//Попытка добавить скролл
messages.style.cssText = "overflow: auto";



let scrollableStyle = `
	.scrollable {
		overflow: auto; 
	}
	.scrollable::-webkit-scrollbar-track
	{
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
		background-color: #F5F5F5;
	};
	.scrollable::-webkit-scrollbar
	{
		width: 10px;
		background-color: #F5F5F5;
	};
	.scrollable::-webkit-scrollbar-thumb
	{
		background-color: #000000;
		border: 2px solid #555555;
	}`;

document.styleSheets[0].insertRule(scrollableStyle, 0);
messages.classList.add('scrollable');
