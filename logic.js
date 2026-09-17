
// *** CONSTANTES ***

const tablero = document.getElementById("tablero");

const casillasLado = 5;
const targets = 3;

let targetsActivos = 0;

// *** FUNCIONES ***

function inicio() {	//Se llama al cargar la página
  generarCasillas();
  randomizarTargets();
}

function generarCasillas(){ //Genero las casillas del tablero
    let casillasTotal = casillasLado * casillasLado;

    for(let i = 0; i < casillasLado; i++){
        let filaCasillas = document.createElement("div");
       
        filaCasillas.classList.add("fila"); //Argumento Clase
        filaCasillas.id = "fila" + i; //Argumento id 

        for(let j = 0; j < casillasLado; j++){
            let casilla = document.createElement("div");

            casilla.classList.add("casilla"); //Argumento Clase
            casilla.id = "casilla" + ((i*casillasLado)+j); //Argumento id
            casilla.onclick = pulsarCasilla;

            filaCasillas.appendChild(casilla); //meto la casilla en la fila
        } 

        tablero.appendChild(filaCasillas); //meto la fila en el tablero
    }
}

function randomizarTargets(){
    let numeros = numerosSinRepeticion();

    for(let i = 0; i < targets; i++){
        casillaElegida = document.getElementById("casilla"+numeros[i]);

        casillaElegida.classList.replace("casilla", "target"); //Cambio su clase de casilla a target
    }

    targetsActivos = targets;
}

function numerosSinRepeticion() {
    let numeros = [];
    let casillas = casillasLado*casillasLado

    while (numeros.length < targets) {
        let numero = Math.floor(Math.random() * casillas);

        if (!numeros.includes(numero)) {
            numeros.push(numero);
        }
    }

    return numeros;
}

function pulsarCasilla(){
    if(this.className == "target"){ //Compruebo si es o no target
        this.classList.replace("target", "casilla"); //Cambio su clase de target a casilla
        targetsActivos--;
        console.log(targetsActivos);

        if(targetsActivos === 0){ //Si pulsamos todos los targets los reroleamos
            rerolearTargets();
        }
    }
    else{
        console.log("no target");
    }
}

function rerolearTargets(){
    randomizarTargets();
}