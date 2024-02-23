window.onload = function() {
    for (let i = 0; i < document.links.length; i++) {
        document.links.item(i).addEventListener('click', reaction);
    }
}

function reaction(e) {
    e.preventDefault();
    for (let i = 0; i < document.links.length; i++) {
        if (e.target === document.links.item(i)) {
            alert(`Se ha hecho click en ${this.textContent}`);
        }
    }
}