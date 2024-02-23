window.onload = function() {
    document.getElementById("square").addEventListener("click", function (e) {
        e.currentTarget.style.backgroundColor = "blue";
    });
    document.getElementById("square").addEventListener("mouseleave", function (e) {
        alert('¡El ratón sale del cuadrado!');
    });
}