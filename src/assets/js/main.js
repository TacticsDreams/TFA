'use strict';

function newTab() {
    console.log('Called it, bud.');
    window.open('https://projects.invisionapp.com/prototype/cknribv6h00409o018vsb3ygg/play', '_blank');
}

const discover = document.querySelector("#discovery");
discover.addEventListener("click", (e) => {
    e.preventDefault();
    newTab();
});

const footer = document.querySelector(".footer__link");
let now = new Date();
let year = now.getFullYear();
footer.innerHTML += year;

if (window.localStorage.getItem('dark') === 'true') {
    document.body.classList.toggle('dark');
}

let dark = document.querySelector('.modebutton');
dark.addEventListener('click', (e) => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')){
        window.localStorage.setItem('dark', 'true');
    } else {
        window.localStorage.removeItem('dark');
    }
});
