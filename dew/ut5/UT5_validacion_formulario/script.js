/* Aunque se podría llamar a cada función por separado, he optado por asociar todos los escuchadores
al botón 'enviar' para realizar todas las comprobaciones en el momento del envío, ya que al poner el
foco en un campo que está mal cumplimentado se dan comportamientos que no me parecían agradables al
usuario a la hora de interactuar con los inputs */

window.onload = function () {
    document.getElementById('nombre').addEventListener('blur', toUpperOnBlur);
    document.getElementById('apellidos').addEventListener('blur', toUpperOnBlur);
    document.getElementById('enviar').addEventListener('click', validateName);
    document.getElementById('enviar').addEventListener('click', validateSurnames);
    document.getElementById('enviar').addEventListener('click', validateAge);
    document.getElementById('enviar').addEventListener('click', validateNIF);
    document.getElementById('enviar').addEventListener('click', validateEmail);
    document.getElementById('enviar').addEventListener('click', validateProvince);
    document.getElementById('enviar').addEventListener('click', validateDate);
    document.getElementById('enviar').addEventListener('click', validateTelNumber);
    document.getElementById('enviar').addEventListener('click', validateTime);
    document.getElementById('enviar').addEventListener('click', increaseCounter);
    // Se captura el evento de confirmación de formulario para dejar que burbujeen primero las validaciones
    document.getElementById('enviar').addEventListener('click', submitConfirm, true);
}

/* Expresiones regulares compiladas para ser más eficiente en su uso múltiples veces al 
intentar varios envíos de formulario.
*/

regexNIF = /^\d{8}-[A-Za-z]$/;
/* 
^ : indica que se controla cómo debe empezar la cadena de texto
\d{8} : la barra invertida escapa el caracter 'd' para que signifique dígito, '{8}' indica que 
        se esperan 8 elementos del tipo indicado anteriormente, en este caso dígitos
[A-Za-z]: indica que se espera un caracter alfabético comprendido entre la 'a' y la 'z', valiendo
          tanto mayúsculas como minúsculas
$ : el dolar indica que se controla cómo debe terminar la cadena
*/

regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
/*
^ : indica que se controla cómo debe empezar la cadena de texto
[a-zA-Z0-9._-]+ : cualquier combinación de los caracteres entre corchetes aparecerá 1 o más veces,
                  1 o más veces por el uso de '+'
@ : se espera que aparezca una arroba en la posición indicada
\. : se espera un punto, se usa '\' para escapar el caracter ya que tiene un significado especial que 
     que no se está utilizando en este caso
[a-zA-Z]{2,4} : cualquier combinación de entre 2 y 4 caracteres de entre los indicados entre corchetes
$ : el dolar indica que se controla cómo debe terminar la cadena
*/

regexDate = /(^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$)|(^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$)/;
/*
Antes de nada aclarar que esta expresión regular admite fechas erróneas, bien por tener un mes más días de
los que le corresponden, bien por no tener en cuenta los años bisiestos de nuestro calendario.

En un primer nivel, se establecen dos posibles patrones, uno para DD/MM/AAAA y otro para AAAA/MM/DD, siendo
válido el uso de diferentes separadores, no solo '/'.

^ : se controla cómo se inicia la cadena
(0?[1-9]|[12][0-9]|3[01]) : se agrupan tres posibles patrones, con que uno de ellos se cumpla se dará
                            por emparejada esa parte de la cadena evaluada : 
                                0?[1-9] : un o ningún '0' seguido de un dígito del 1 al 9, es decir, será
                                válido 01 a 09 al igual que 1 a 9
                                [12][0-9] : 1 o 2, seguido de un dígito del 0 al 9, es decir, de 10 a 29
                                3[01] : 3 seguido de 0 o 1, es decir, 30 o 31
[\/\-] : cualquiera de los caracteres entre corchetes, 1 vez, a modo de separación entre día y mes
(0?[1-9]|1[012]) : similar al caso ya explicado, valida que el mes esté entre 01 y 12, aceptando 1, 2, ..., 9
\d{4} : 4 dígitos que representan el año entre 0000 y 9999
$ : se controla cómo termina la cadena
*/

regexTelNum = /^\d{9}$/;
/* la cadena debe estar formada por exactamente 9 dígitos */ 

regexTime = /^([01][0-9]|[2][0-3]):[0-5][0-9]$/;
/*
La cadena de texto debe empezar por combinaciones de dos dígitos que formen los números de 
'00' a '23', seguidas de ':' y terminar en combinaciones de dos dígitos que formen los números
'00' a '59'. 
*/

/* Creación de cookie para guardar cuenta de intentos */

document.cookie = "try_num=" + encodeURIComponent(0);

/* Funciones */

function toUpperOnBlur(event) {
    let element = event.target;
    element.value = element.value.toUpperCase();
}

function validateName(event) {
    let element = document.getElementById('nombre');
    if (element.value === '') {
        let err_div = document.getElementById('errores')
        err_div.style.padding = '5px';
        err_div.innerHTML += 'El nombre es un campo obligatorio, por favor, introduzca un nombre.</br>'
        element.focus();
        event.preventDefault();
    } 
}

function validateSurnames(event) {
    let element = document.getElementById('apellidos');
    if (element.value === '') {
        let err_div = document.getElementById('errores');
        err_div.style.padding = '5px';
        err_div.innerHTML += 'Los apellidos son campos obligatorios, por favor, introduzca unos apellidos.</br>';
        element.focus();
        event.preventDefault();
    } 
}

function validateAge(event) {
    let element = document.getElementById('edad');
    let edad = element.value;
    if (edad === '') {
        let err_div = document.getElementById('errores');
        err_div.style.padding = '5px';
        err_div.innerHTML += 'La edad es un campo obligatorio, por favor, introduzca una edad.</br>';
        element.focus();
        event.preventDefault();
    } else if ( isNaN(edad) || edad < 0 || edad > 105) {
        let err_div = document.getElementById('errores');
        err_div.style.padding = '5px';
        err_div.innerHTML += 'La edad debe ser un valor numérico comprendido entre 0 y 105, por favor, introduzca una edad válida.</br>';
        element.focus();
        event.preventDefault();
    }
}

function validateNIF(event) {
    let element = document.getElementById('nif');
    let nif = element.value;
    if (nif === '') {
        let err_div = document.getElementById('errores');
        err_div.style.padding = '5px';
        err_div.innerHTML += 'El NIF es un campo obligatorio, por favor, introduzca un NIF.</br>';
        element.focus();
        event.preventDefault();
    } else if ( !regexNIF.test(nif) ) {
        let err_div = document.getElementById('errores');
        err_div.style.padding = '5px';
        err_div.innerHTML += 'El NIF introducido no es válido, por favor, introduzca un NIF válido.</br>';
        element.focus();
        event.preventDefault();
    }
}

function validateEmail(event) {
    let element = document.getElementById('email');
    let email = element.value;
    if (email === '') {
        let err_div = document.getElementById('errores');
        err_div.style.padding = '5px';
        err_div.innerHTML += 'El email es un campo obligatorio, por favor, introduzca un email.</br>';
        element.focus();
        event.preventDefault();
    } else if ( !regexEmail.test(email) ) {
        let err_div = document.getElementById('errores');
        err_div.style.padding = '5px';
        err_div.innerHTML += 'El email introducido no es válido, por favor, introduzca un email válido.</br>';
        element.focus();
        event.preventDefault();
    }
}

function validateProvince(event) {
    let element = document.getElementById('provincia');
    if (element.selectedIndex === 0) {
        let err_div = document.getElementById('errores');
        err_div.style.padding = '5px';
        err_div.innerHTML += 'Debe seleccionar una provincia.</br>';
        element.focus();
        event.preventDefault();
    }
}

function validateDate(event) {
    let element = document.getElementById('fecha');
    let date = element.value;
    if (date === '') {
        let err_div = document.getElementById('errores');
        err_div.style.padding = '5px';
        err_div.innerHTML += 'La fecha es un campo obligatorio, por favor, introduzca una fecha.</br>';
        element.focus();
        event.preventDefault();
    } else if ( !regexDate.test(date) ) {
        let err_div = document.getElementById('errores');
        err_div.style.padding = '5px';
        err_div.innerHTML += 'La fecha introducida no es válida, por favor, introduzca una fecha válida.</br>';
        element.focus();
        event.preventDefault();
    }
}

function validateTelNumber(event) {
    let element = document.getElementById('telefono');
    let tel_number = element.value;
    if (tel_number === '') {
        let err_div = document.getElementById('errores');
        err_div.style.padding = '5px';
        err_div.innerHTML += 'El número de teléfono es un campo obligatorio, por favor, introduzca un número de teléfono.</br>';
        element.focus();
        event.preventDefault();
    } else if ( !regexTelNum.test(tel_number) ) {
        let err_div = document.getElementById('errores');
        err_div.style.padding = '5px';
        err_div.innerHTML += 'El teléfono introducido no es válido, por favor, introduzca un número de teléfono válido.</br>';
        element.focus();
        event.preventDefault();
    }
}

function validateTime(event) {
    let element = document.getElementById('hora');
    let time = element.value;
    if (time === '') {
        let err_div = document.getElementById('errores');
        err_div.style.padding = '5px';
        err_div.innerHTML += 'La hora es un campo obligatorio, por favor, introduzca una hora.</br>';
        element.focus();
        event.preventDefault();
    } else if ( !regexTime.test(time) ) {
        let err_div = document.getElementById('errores');
        err_div.style.padding = '5px';
        err_div.innerHTML += 'La hora introducida no es válida, por favor, introduzca una válida.</br>';
        element.focus();
        event.preventDefault();
    }
}

function increaseCounter() {
    let cookies = document.cookie.split(';');
    console.log(cookies);
    let cookie_key = "try_num=";
    for (let i=0; i<cookies.length; i++) {
        c = cookies[i];
        if (c.indexOf(cookie_key) === 0) {
            let current_count = decodeURIComponent(
                c.substring(cookie_key.length, c.length)
            );
            let new_count = parseInt(current_count) + 1;
            document.cookie = "try_num=" + encodeURIComponent(new_count);
            let count_div = document.getElementById('intentos');
            count_div.style.padding = '5px';
            count_div.innerHTML = `Intentos de envío de formulario: ${new_count}`;
        }
        break;      
    }
}

function submitConfirm(event) {
    let err_div = document.getElementById('errores');
    err_div.style.padding = '0px';
    err_div.innerHTML = '';
    if (!confirm('¿Quiere usted enviar el formulario?')) {
        event.preventDefault();
    } 
}