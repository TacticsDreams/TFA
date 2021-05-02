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
    let baseDay =  new Date(2021, 4, 29);
    let day = new Date(2021, 4, 29);
    const newsBlock = document.querySelector(".news");
    let localTM = window.localStorage.getItem("MI_TimeMachine");
    if (window.localStorage.getItem('MI_TimeMachine') != undefined) {
        newsBlock.setAttribute("data-day", window.localStorage.getItem("MI_TimeMachine"));
    } else {
        window.localStorage.setItem('MI_TimeMachine', "4");
    }
    let timestamp = parseInt(document.querySelector(".news").getAttribute("data-day"));
    day.setDate(day.getDate() - (4 - timestamp));
    let dayString = day.getDate() + "/" + day.getMonth() + "/" + day.getFullYear();
    document.querySelector(".timestamp").innerHTML = dayString;

    /**
     * Génère les articles du jour sélectionné.
     * Ne fait que chercher les articles du JSON et les imprime dans la page.
     */
    function generateArticles() {
            fetch('assets/data/data.json').then(function (response) {
                return response.json();
            }).then(function (data) {
                // Factory reset.
                let clippings = document.querySelectorAll(".article");
                clippings.forEach(function (clip) {
                    document.querySelector(".news").removeChild(clip);
                });
                for(let i = 0; i<data.length; i++) {
                    
                    if (data[i].date == dayString) {
                        let container = document.createElement("article");
                        let header = document.createElement("h2");
                        let subheader = document.createElement("p");
                        let link = document.createElement("p");
    
                        container.classList.add("article");
                        container.addEventListener("click", (e) => {
                            location.href = data[i].website;
                        });
    
                        header.classList.add("article__header");
                        header.innerHTML = data[i].title;
                        container.appendChild(header);
    
                        subheader.classList.add("article__sub");
                        subheader.innerHTML = data[i].sub;
                        container.appendChild(subheader);
    
                        link.classList.add("article__link");
                        link.innerHTML = data[i].website.split("/").slice(2, 3);
                        container.appendChild(link);
    
                        newsBlock.appendChild(container);
                    }
                }
            });
    }

    
    const rightButton = document.querySelector(".timebutton--right");
    rightButton.addEventListener("click", (e) => {
        if (localTM != "4") {
            console.log("Hey, you clicked on the right one!");
        }
    });
    const leftButton = document.querySelector(".timebutton--left");
    leftButton.addEventListener("click", (e) => {
        if (localTM != "1") {
            console.log("Hey, you clicked on the wrong one!");
        }
    });
    /**
     * Verrouille le bouton de droite si la machine est réglé sur le jour actuel,
     * ou celui de gauche si il est réglé sur avant-avant-hier.
     */
    if (localTM == "4") {
        rightButton.classList.add("disable");
    }
    if (localTM == "1") {
        leftButton.classList.add("disable");
    }

    /**
     * Dans la time machine, permet d'afficher actif un jour précis.
     */
    const timelist = document.querySelectorAll(".timelist__el");
    for (let i = 0; i<timelist.length; i++) {
        if (i == (timestamp -1)) timelist[i].classList.add('active');
        else timelist[i].classList.remove('active');
    }
    generateArticles();
}