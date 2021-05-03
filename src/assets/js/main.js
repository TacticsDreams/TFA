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
    const day = new Date(2021, 4, 29);
    const newsBlock = document.querySelector(".news");
    const timelist = document.querySelectorAll(".timelist__el");
    const milliseconds = 1000*60*60*24;

    let localTM = window.localStorage.getItem("MI_TimeMachine");
    if (localTM != undefined) {
        newsBlock.setAttribute("data-day", window.localStorage.getItem("MI_TimeMachine"));
    } else {
        window.localStorage.setItem('MI_TimeMachine', "4");
    }

    for (let i = 0; i<timelist.length; i++) {
        timelist[i].innerHTML = (day.getDate() - (4 - (i + 1)));
    }

    let timestamp = parseInt(document.querySelector(".news").getAttribute("data-day"));
    let currentDay = new Date(day - (4 - timestamp));
    let dayString = currentDay.getDate() + "/" + currentDay.getMonth() + "/" + currentDay.getFullYear();
    document.querySelector(".timestamp").innerHTML = dayString;

    function updateTime() {
        newsBlock.setAttribute("data-day", timestamp);
        window.localStorage.setItem("MI_TimeMachine", timestamp);
        window.localStorage.setItem('MI_TimeMachine', timestamp);
        // Je dois vraiment convertir en millisecondes?
        currentDay = new Date(day - (4 - timestamp) * milliseconds);
        dayString = currentDay.getDate() + "/" + currentDay.getMonth() + "/" + currentDay.getFullYear();
        document.querySelector(".timestamp").innerHTML = dayString;
        /**
        * Dans la time machine, permet d'afficher actif un jour précis.
        */
        for (let i = 0; i<timelist.length; i++) {
            if (i == (timestamp -1)) timelist[i].classList.add('active');
            else timelist[i].classList.remove('active');
        }
    }

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
                        if (data[i].priority == "true") container.classList.add("priority");
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
        if (timestamp != "4") {
            timestamp++;
            updateTime();
            buttonCheck();
            generateArticles();
        }
    });
    const leftButton = document.querySelector(".timebutton--left");
    leftButton.addEventListener("click", (e) => {
        if (timestamp != "1") {
            timestamp--;
            updateTime();
            buttonCheck();
            generateArticles();
        }
    });
    /**
     * Verrouille le bouton de droite si la machine est réglé sur le jour actuel,
     * ou celui de gauche si il est réglé sur avant-avant-hier.
     */
    function buttonCheck() {
        if (timestamp == "4") {
            rightButton.classList.add("disable");
        } else {
            rightButton.classList.remove("disable");
        }

        if (timestamp == "1") {
            leftButton.classList.add("disable");
        } else {
            leftButton.classList.remove("disable");}
    }

    const topButton = document.querySelector(".topBtn");
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    }

    topButton.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    buttonCheck();
    updateTime();
    generateArticles();
}