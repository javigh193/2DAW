//Ejemplo 2
document.addEventListener('DOMContentLoaded',function(){
    let xhr = new XMLHttpRequest();
    document.getElementById('estado').innerHTML += `${xhr.readyState} - Estado inicial, sin iniciar solicitud. <br/>`;
    //Utilizaremos onreadystatechange para ejecutar una función cada vez que haya un
    // cambio en el estado de la petición asíncrona:
    xhr.onreadystatechange = function(){
    switch(xhr.readyState){
    // Evaluamos el estado de la petición AJAX y vamos mostrando el valor actual de
    // readyState en cada llamada:
        case 1:
            document.getElementById('estado').innerHTML += "1 - Cargando.<br/>";
            break;
        case 2:
            document.getElementById('estado').innerHTML += "2 - Cargado.<br/>";
            break;
        case 3:
            document.getElementById('estado').innerHTML += "3 - Interactivo.<br/>";
            break;
        case 4:
            document.getElementById('estado').innerHTML += "4 - Completado.";
            if(xhr.status === 200){
                document.getElementById('resultados').innerHTML = xhr.responseText;
            };
            break;
        }
    }
    xhr.open('GET','fecha.php',true);//true = petición asíncrona.
    xhr.send();
})