'use strinct';
const socket = new WebSocket('wss://neto-api.herokuapp.com/mouse');

socket.addEventListener('open', () => {
    console.log('Соединение установлено');
    showBubbles(socket);
});

function sendData(event) {
    socket.send(JSON.stringify({
        x: event.pageX,
        y: event.pageY
    }));
}

document.addEventListener('click', sendData);

/*socket.addEventListener('message', event => {
    console.log('Получены данные' + event.data);
});
*/

socket.addEventListener('close', event => {
    if (event.wasClean) {
        console.log('Соединение закрыто чисто');
    } else {
        console.log('Обрыв соединения');
    }
    console.log('Код ошибки: ' + event.code);
});

socket.addEventListener('error', event => {
    console.log('Ошибка ' + error.message);
});