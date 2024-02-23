//Ejemplo 1
document.addEventListener('DOMContentLoaded',function(){
    let xhr = new XMLHttpRequest();//Creamos el objeto para manejo AJAX.
    xhr.open('GET','fecha.php',false);//Abrimos el canal con el servidor.
    xhr.send();//Enviamos la petición.
    //Utilizamos los métodos del DOM para añadir el resultado.
    let nodo =document.getElementById('resultados');
    nodo.appendChild(document.createTextNode(xhr.responseText));
    //También se podía haber incluido como:
    //document.getElementById('resultados').innerHTML = xhr.responseText;
})