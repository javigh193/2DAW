//Ejemplo 4
document.addEventListener('DOMContentLoaded',function(){
    let xhr = new XMLHttpRequest();
    // Activamos el indicador Ajax antes de realizar la petición. Fíjate que lo puedes
    // incorporar también como:
    document.getElementById('indicador').innerHTML = '<img src="state.gif"/>';
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            document.getElementById('indicador').innerHTML = "";
            document.getElementById('resultados').innerHTML = xhr.responseText;
        }
    };
    // Al emplear el método GET, los parámetros se pasan en la URL del servidor que maneja
    // la petición después de ? separados como nombre=valor:
    xhr.open('GET', 'procesar.php?nombre=Teresa&apellidos=Blanco Ferreiro', true);
    xhr.send();
});