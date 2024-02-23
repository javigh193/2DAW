window.onload = function() {
    document.getElementById("btn1").addEventListener('click', reaction);
}

function reaction(e) {
    alert('¡Se ha pulsado el botón!');
    e.target.removeEventListener('click', reaction);
}