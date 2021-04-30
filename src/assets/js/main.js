'use strict';
var fileName = location.href.split("/").slice(-1); 


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


const navUL = document.querySelector(".topheader__navlist");
let burger = document.querySelector('.burger');
burger.addEventListener('click', (e) => {
    navUL.classList.toggle("show");
    burger.classList.toggle("show");
});

if (fileName[0].includes("main.html")) {
    fetch('assets/data/data.json').then(function (response) {
        return response.json();
    }).then(function (data) {
        document.querySelector('.article__header').innerHTML = data[0].title;
        document.querySelector('.article__sub').innerHTML = data[0].sub;
        document.querySelector('.article__link').innerHTML = data[0].website.split("/").slice(2, 3);
    });
}