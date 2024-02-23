// constante para poder hacer referencia a los días de la semana por nombre usando .getDay()
const weekday = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];

// función que abre una nueva ventana (resizable está desactivado por defecto)
function openNewWindow() {
    window.open('ventanaSecundaria.html', 'VentanaSecundaria');
}

// función que accede a las propiedades de la ventana y las muestra
// utilizo onload porque no me deja acceder con una función lanzada desde
// la ventana original a la nueva ventana
function newWindowOnLoad() {
    document.writeln("<h3>Ejemplo de Ventana Nueva</h3>");
    // www.google.es rechaza la conexión solicitada por el iframe
    document.write(`
        <ul>
            <li id="url-li"></li>
            <li id="protocol-li"></li>
            <li id="nav-code"></li>
            <li id="java-en"></li>
        </ul>
        <iframe src="https://www.bing.es/" width="800" height="600" loading="lazy"></iframe>
    `);
    document.getElementById("url-li").innerHTML = "URL Completa: " + window.location.href;
    document.getElementById("protocol-li").innerHTML = "Protocolo utilizado: " + window.location.protocol;
    // appCodeName está en desuso, es posible que no todos los navegadores lo soporten
    document.getElementById("nav-code").innerHTML = "Nombre en código del navegador: " + window.navigator.appCodeName;
    // javaEnabled está en desuso
    if (navigator.javaEnabled()) {
        document.getElementById("java-en").innerHTML = "Java SI disponible";
    } else {
        document.getElementById("java-en").innerHTML = "Java NO disponible";
    }

    // se prepara el texto a enviar a la ventana original
    let data = '<h1>TAREA DWEC03</h1><hr/>'
    //se envía el mensaje con el h1 para la ventana original
    sendData(data);
    let full_name = window.prompt("Introduzca su nombre y apellidos");
    let d = window.prompt("Introduzca el día en que nació, por ejemplo: 3");
    let m = window.prompt("Introduzca el mes en que nació, por ejemplo: 12") - 1;
    let y = window.prompt("Introduzca el año en que nació, por ejemplo 1995");
    let birth_date = new Date(y, m, d);
    data = `<ul>
        <li>Buenos días ${full_name}</li>
        <li>Tu nombre tiene ${full_name.length} caracteres, incluidos espacios.</li>
        <li>La primera letra A de tu nombre está en la posición: ${full_name.indexOf('A') + 1}</li>
        <li>La última letra A de tu nombre está en la posición: ${full_name.lastIndexOf('A') + 1}</li>
        <li>Tu nombre menos las 3 primeras letras es: ${full_name.substring(3)}</li>
        <li>Tu nombre todo en mayúsculas es: ${full_name.toUpperCase()}</li>
        <li>Tu edad es: ${calcAge(birth_date)} años.</li>
        <li>Naciste un feliz ${weekday[birth_date.getDay()]} del año ${birth_date.getFullYear()}.</li>
        <li>El coseno de 180 es: ${Math.cos(180)}</li>
        <li>El número mayor de (34,67,23,75,35,19) es: ${Math.max(34,67,23,75,35,19)}</li>
        <li>Ejemplo de número al azar: ${Math.floor(Math.random()*9999999999)}</li>
    </ul>`;
    sendData(data);
}

// función para recibir los datos de la ventana secundaria
function getData(event) {
    let data = event.data;
    document.getElementById('message-container').innerHTML += data;
}

// función que envía los datos de la ventana secundaria a la principal
function sendData(data) {
    window.opener.postMessage(data, '*');     
}

// función que configura la ventana principal para quedar a la escucha de la secundaria
function setEventListener() {
    window.addEventListener('message', getData);
}

// función que calcula la edad en función de la fecha de naciemiento
function calcAge(birthDate) {
   let today = new Date();
   let age = today.getFullYear() - birthDate.getFullYear();
   // miro si ya paso el día de mi cumpleaños en el año en curso
   // si no es así, resto un año
   let m_diff = today.getMonth() - birthDate.getMonth();
   let d_diff = today.getDay() - birthDate.getDay();
   if (m_diff < 0 || (m_diff === 0 && d_diff < 0)) { 
        age --;
   }
   return age;
}