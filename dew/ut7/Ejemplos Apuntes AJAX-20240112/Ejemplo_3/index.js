//Ejemplo 3
document.addEventListener('DOMContentLoaded', function () {
    let xhr = new XMLHttpRequest();
    // Añadimos un indicador de proceso asíncrono:
    let indicador = document.createElement('img');
    indicador.setAttribute('src', 'state.gif');
    document.getElementById('indicador').appendChild(indicador);
    // Utilizaremos onreadystatechange para ejecutar una función cada vez que haya un
    //cambio en el estado de la petición asíncrona:
    xhr.onreadystatechange = function () {
        // Una vez finalizada la solicitud mostramos los resultados:
        if (xhr.readyState === 4 && xhr.status === 200) {
        // Desactivamos el indicador AJAX:
        document.getElementById("indicador").innerHTML = "";
        // Metemos en el contenedor resultados las respuestas de la petición AJAX:
        document.getElementById('resultados').innerHTML = xhr.responseText;
        }
    }
    xhr.open('GET', 'fecha.php', true); // true = petición asíncrona.
    xhr.send();
});