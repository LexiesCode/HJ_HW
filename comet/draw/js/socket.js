'use strict';
const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');

ws.addEventListener('open', wsOpen);
ws.addEventListener('message', wsMessage);
ws.addEventListener('close', wsClose);
ws.addEventListener('error', wsErr);

function wsOpen() {
    console.log('Соединение установлено');
    sendData();
}

function sendData(e) {
    window.editor.addEventListener('update', e => {
        e.canvas.toBlob(blob => {
            ws.send(blob);
        });
    });
}

function wsMessage(e) {
    console.log('Получены данные' + e.data);
}

function wsClose(e) {
    if (e.wasClean) {
        console.log('Соединение закрыто чисто');
    } else {
        console.log('Обрыв соединения');
    }
    console.log('Код ошибки: ' + e.code);
}

function wsErr(e) {
    console.log('Ошибка ' + error.message);
}