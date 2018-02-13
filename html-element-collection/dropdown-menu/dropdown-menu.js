'use strict';

const menu = document.getElementsByClassName('wrapper-dropdown')[0];
 
menu.onclick = () => {  
  menu.classList.toggle('active');
}