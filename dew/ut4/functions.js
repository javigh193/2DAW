class Edificio {
    constructor(calle, numero, cp) {
       this.calle = calle;
       this.numero = numero;
       this.codigo_postal = cp;
       this.plantas = [];
       document.writeln(`<p>Construido nuevo edificio en calle: ${calle}, nº: ${numero}, CP: ${this.codigo_postal}</p>`);
    }
    agregarPlantasYPuertas(numplantas, puertas) {
        for (let i=0; i < numplantas; i++) {
            let planta = []
            for (let j=0; j < puertas; j++) {
                planta.push(''); 
            }
            this.plantas.push(planta);
        }
    }
    agregarPropietario(nombre, planta, puerta) {
        this.plantas[planta - 1][puerta - 1] = nombre;
        document.writeln(`<p>${nombre} es ahora el propietario de la puerta ${puerta} de la planta ${planta}</p>`);
    }
    modificarNumero(numero) {
        this.numero = numero;
    }
    modificarCalle(calle) {
        this.calle = calle;
    }
    modificarCodigoPostal(codigo) {
        this.codigo_postal = codigo;
    }
    imprimeCalle() {
        return `La calle del edificio es: ${this.calle}`;
    }
    imprimeNumero() {
       return `El número del edificio es: ${this.numero}`;
    }
    imprimeCodigoPostal() {
        return `El código postal del edificio es: ${this.codigo_postal}`;
    }
    imprimePlantas() {
        for (let i = 0; i < this.plantas.length; i++) {
            for (let j = 0; j < this.plantas[i].length; j++) {
                document.write(`<p>Propietario del piso ${j + 1} de la planta ${i + 1}: ${this.plantas[i][j]}</p>`);
            }
        }
    }
}

function imprimirEjemplo() {
    document.open();
    /* Aquí se muestra un ejemplo de lo que tendría que mostrar la aplicación:
    Trabajando con objetos Javascript:

    Instanciamos 3 objetos edificioA, edificioB y edificioC con estos datos: */

    let edificio_A = new Edificio('Garcia Prieto', 58, 15706);
    /* Construido nuevo edificio en calle: Garcia Prieto, nº: 58, CP: 15706. */

    let edificio_B = new Edificio('Camino Caneiro', 29, 32004);
    /* Construido nuevo edificio en calle: Camino Caneiro, nº: 29, CP: 32004. */

    let edificio_C = new Edificio('San Clemente', 's/n', 15705);
    /* Construido nuevo edificio en calle: San Clemente, nº: s/n, CP: 15705. */

    document.write(`<p>${edificio_A.imprimeCodigoPostal()}</p>`);
    //El código postal del edificio A es: 15706.
    document.write(`<p>${edificio_C.imprimeCalle()}</p>`);
    //La calle del edificio C es: San Clemente.
    document.write(`El edificio está situado en la calle ${edificio_B.calle} número ${edificio_B.numero}</p>`);
    //El edificio B está situado en la calle Camino Caneiro número 29.
    
    //Agregamos 2 plantas y 3 puertas por planta al edificio A
    edificio_A.agregarPlantasYPuertas(2, 3);

    //Agregamos 4 propietarios al edificio A
    edificio_A.agregarPropietario('Jose Antonio Lopez', 1, 1);
    //Jose Antonio Lopez es ahora el propietario de la puerta 1 de la planta 1.
    edificio_A.agregarPropietario('Luisa Martinez', 1, 2);
    //Luisa Martinez es ahora el propietario de la puerta 2 de la planta 1.
    edificio_A.agregarPropietario('Marta Castellón', 1, 3);
    //Marta Castellón es ahora el propietario de la puerta 3 de la planta 1.
    edificio_A.agregarPropietario('Antonio Pereira', 2, 2);
    //Antonio Pereira es ahora el propietario de la puerta 2 de la planta 2.
    

    //Listado de propietarios del edificio calle García Prieto número 58
    edificio_A.imprimePlantas();
    /*
    Propietario del piso 1 de la planta 1: Jose Antonio Lopez.
    Propietario del piso 2 de la planta 1: Luisa Martinez.
    Propietario del piso 3 de la planta 1: Marta Castellón.
    Propietario del piso 1 de la planta 2:
    Propietario del piso 2 de la planta 2: Antonio Pereira.
    Propietario del piso 3 de la planta 2:
    */

    //Agregamos 1 planta más al edificio A...!!!!(ENTIENDO QUE CON 3 PUERTAS TAMBIÉN)!!!!
    edificio_A.agregarPlantasYPuertas(1, 3);
    //Agregamos 1 propietario más al edificio A planta 3, puerta 2...
    edificio_A.agregarPropietario('Pedro Meijide', 3, 2);
    //Pedro Meijide es ahora el propietario de la puerta 2 de la planta 3.
    
    //Listado de propietarios del edificio calle García Prieto número 58
    edificio_A.imprimePlantas();
    /*
    Propietario del piso 1 de la planta 1: Jose Antonio Lopez.
    Propietario del piso 2 de la planta 1: Luisa Martinez.
    Propietario del piso 3 de la planta 1: Marta Castellón.
    Propietario del piso 1 de la planta 2:
    Propietario del piso 2 de la planta 2:
    Propietario del piso 1 de la planta 3:
    Propietario del piso 2 de la planta 3: Pedro Meijide.
    */
    document.close();
}