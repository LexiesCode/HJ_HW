'use strict';
const app = document.querySelector('.app');
const controls =  document.querySelector('.controls');
const takePhotoBtn = document.querySelector('#take-photo');
const errMessage = document.querySelector('#error-message');
const photoList = document.querySelector('.list');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const sound = document.createElement('audio');
sound.src = './audio/click.mp3';
const video = document.createElement('video');
app.appendChild(video);

function takePhoto() {
    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: false
        })
        .then(stream => {
            video.src = URL.createObjectURL(stream);
            app.style.display = 'block';
            controls.style.display = 'block';
             video.addEventListener('canplay', (e) => {
                takePhotoBtn.addEventListener('click', () => {
                    setTimeout(() => {
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        ctx.drawImage(video, 0, 0);
                        sound.play();

                        const image = canvas.toDataURL();
                        createPhotoCard();
                        const photoCard = document.querySelector('figure');
                        photoList.appendChild(photoCard);
                        updateControls(photoCard, image);
                    }, 100);
                });
            });
        })

        .catch(err => {
            errMessage.style.display = 'block';
            errMessage.textContent = err;
        });
}

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

function createPhotoCard() {
    return el('figure', {class: ''}, [
        el('img', {
            src: `${image}`
        }),
        el('figcaption', {class: ''}, [
            el('a', {href: `${image}`, download: 'snapshot.png'}, [
                el('i', {class: 'material-icons'}, 'file_download')
            ]),
            el('a', {class: ''}, [
                el('i', {class: 'material-icons'}, 'file_upload')
            ]),
            el('a', {class: ''}, [
                el('i', {class: 'material-icons'}, 'delete')
            ])
        ])
    ]);
}

function updateControls(photoCard, image) {
    const download = photoCard.querySelectorAll('a')[0];
    const upload = photoCard.querySelectorAll('a')[1];
    const deletePhoto = photoCard.querySelectorAll('a')[2];

    download.addEventListener('click', (e) => {
        hide(download);
    });

    upload.addEventListener('click', (e) => {
        hide(upload);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://neto-api.herokuapp.com/photo-booth');
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        let formData = new FormData();
        formData.append('image', image);
        xhr.send(formData);
    });

    deletePhoto.addEventListener('click', (e) => {
        photoList.removeChild(photoCard);
    });
}

function hide(btn) {
    btn.style.visibility = 'hidden';
}