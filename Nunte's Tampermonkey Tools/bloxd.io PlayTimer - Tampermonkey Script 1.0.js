// ==UserScript==
// @name         bloxd.io PlayTime
// @namespace    http://tampermonkey
// @version      1
// @description  Muestra el tiempo transcurrido en bloxd.io.
// @match        https://bloxd.io/*
// @author       Nunte Gamer
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    var startTime = localStorage.getItem('bloxdStartTime');
    if (!startTime) {
        startTime = Date.now();
        localStorage.setItem('bloxdStartTime', startTime);
        console.log("bloxd.io PlayTimer loaded successfully!");
    }
    var div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '10px';
    div.style.right = '10px';
    div.style.padding = '10px';
    div.style.backgroundColor = 'white';
    div.style.color = 'black';
    div.style.border = '1px solid black';
    div.style.zIndex = '9999';
    document.body.appendChild(div);

    var intervalId;
    var timeDiff = localStorage.getItem('bloxdTimeDiff');
    if (timeDiff) {
        startTime -= timeDiff;
        intervalId = setInterval(updateTime, 1000);
    } else {
        intervalId = setInterval(updateTime, 1000);
    }

    window.addEventListener('beforeunload', function() {
        clearInterval(intervalId);
        localStorage.setItem('bloxdTimeDiff', Date.now() - startTime);
    });

    window.addEventListener('load', function() {
        startTime = Date.now() - localStorage.getItem('bloxdTimeDiff');
        intervalId = setInterval(updateTime, 1000);
    });

    function updateTime() {
        var timeDiff = Date.now() - startTime;
        var hours = Math.floor(timeDiff / 3600000);
        var minutes = Math.floor((timeDiff % 3600000) / 60000);
        var seconds = Math.floor((timeDiff % 60000) / 1000);
        div.innerText = 'Tiempo en la página: ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
        console.log("updateTime function")
    }
})();






// Guía de comandos --->
// localStorage.removeItem('bloxdTimeDiff');   <--- Elimina los datos 
// Todavía estoy en busca de un arreglo para el NaNh, NaNm, NaNs.



