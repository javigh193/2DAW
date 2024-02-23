window.onload = function() {
    document.getElementById("check-fruits").addEventListener("click", checkFruits);
    document.getElementById("check-color").addEventListener("click", checkColor);
    document.getElementById("check-day").addEventListener("click", checkDay);
    document.getElementById("getResult").addEventListener("click", getResult);
}

function checkFruits(e) {
    if (
        document.getElementById("fruit1").checked === true 
        &&
        document.getElementById("fruit3").checked === true
    ) {
        alert('Respuesta correcta.');
    } else {
        alert('Respuesta incorrecta.');
    }
    e.preventDefault();
}

function checkColor(e) {
    e.preventDefault();
    if (document.getElementById("rojo").checked === true) {
        alert('Respuesta correcta.');
    } else {
        alert('Respuesta incorrecta.');
    }
}

function checkDay(e) {
    e.preventDefault();
    let days = document.getElementById("week-days")
    if (days[days.selectedIndex].value === 'jueves') {
        alert('Respuesta correcta.');
    } else {
        alert('Respuesta incorrecta.');
    }
}

function getResult() {
    let result = 0;
    if (
        document.getElementById("fruit1").checked === true 
        &&
        document.getElementById("fruit3").checked === true
    ) {
        result ++;
    }
    if (document.getElementById("rojo").checked === true) {
        result ++;
    }
    let days = document.getElementById("week-days");
    if (days[days.selectedIndex].value === 'jueves') {
        result ++;
    }
    alert(`Has terminado el test con una nota de ${result} sobre 3.`);
}