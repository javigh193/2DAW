// Inicialización de variables globales
brush = false;

function colorCell() {
    if (brush) {
        this.classList.remove(...this.classList);
        this.classList.add(...document.querySelector(".seleccionado").classList);
        this.classList.remove("seleccionado");
        this.classList.add("cell");
    }
}

function toggleBrush(){
    if (brush) {
        document.getElementById("pincel").innerHTML = "PINCEL DESACTIVADO";
    } else {
        document.getElementById("pincel").innerHTML = "PINCEL ACTIVADO";
    }
    brush = !brush;
}

// Función para la creación de una celda
function new_cell(){
    cell = document.createElement("div");
    cell.classList.add("cell", "color6");
    cell.addEventListener("click", toggleBrush);
    cell.addEventListener("mouseover", colorCell);
    return cell;
}

// Función para la creación del lienzo
function new_canvas(cols, rows){
    let canvas = document.getElementById("zonadibujo");
    for (let i = 0; i < rows; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < cols; j++) {
            let cell = new_cell();
            row.appendChild(cell);
        }
        canvas.appendChild(row);
    }
}

// Llamada a la construcción del lienzo
new_canvas(30, 30);

// Función que cambia el color seleccionado
function selectColor() {
    let classes = this.classList.value.split(" ");
    if (!classes.includes("seleccionado")) {
        document.querySelector(".seleccionado").classList.remove("seleccionado");
        this.classList.add("seleccionado");
    }
}

document.querySelectorAll("[class^=color]").forEach(element => {element.addEventListener("click", selectColor)});

// Función que "borra" el lienzo
function cleanCanvas() {
    document.querySelectorAll(".cell").forEach( element => {
        element.classList.remove(...this.classList);
        element.classList.add("color6", "cell");
    });
}

document.getElementById("clean-canvas").addEventListener("click", cleanCanvas);
