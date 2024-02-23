window.onload = function() {
    document.addEventListener("mousemove", reaction); 
    document.addEventListener("keydown", reaction); 
    document.addEventListener("click", reaction);         
}

function reaction(e) {
    switch (e.type) {
        case 'click':
            document.getElementById('mouse-clicked').innerHTML = '¡Se ha pulsado el ratón!';
            break;
        case 'keydown':
            document.getElementById('last-key').innerHTML = `Se ha pulsado la tecla ${e.key}`;
            break;
        case 'mousemove':
            [x, y] = [e.clientX, e.clientY];
            document.getElementById('coordinates').innerHTML = `x:${x}, y:${y}`;
            break;
    }
}