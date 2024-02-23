window.onload = function() {
    document.body.addEventListener("mousemove", function (e) {
        [x, y] = [e.clientX, e.clientY]
        document.getElementById('coordinates').innerHTML = `x:${x}, y:${y}`;
    });
}