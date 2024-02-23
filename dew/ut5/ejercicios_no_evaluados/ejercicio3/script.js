window.onload = function() {
    document.getElementById("texto").addEventListener("keydown", function (e) {
        alert(`Se ha pulsado la tecla ${e.key}`);
    });
}