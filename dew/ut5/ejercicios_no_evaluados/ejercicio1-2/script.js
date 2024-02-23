// el burbujeo/captura no se puede detener en todos los navegadores
window.onload = function() { 
    document.getElementById("principal").addEventListener("click", function (e) { 
        alert("Pulsado el contenedor principal"); e.stopPropagation();}, true); 
        // estamos utilizando burbujeo 
    document.getElementById("secundario").addEventListener("click", function () { 
        alert("Pulsado el contenedor secundario"); }, true); 
        // estamos utilizando burbujeo 
    document.getElementById("miboton").addEventListener("click", function () { 
        alert("Pulsado el botón"); }, true); 
        // estamos utilizando burbujeo 
}