
//========= CONSTANTES ========= 

const tablero = document.getElementById("tablero");

const casillasLado = 5;
const targets = 3;
const rondas = 5;
const tiempoEntreRondasMIN = 1;
const tiempoEntreRondasMAX = 3;

//========= GLOBALES ========= 

//Para los Jugadores
let nombreJugador = "Jugador"

//para el tablero
let targetsActivos = 0;
let partidaActiva = false;

//Para el cronometro
let ms = 0;
let s = 0;
let intervalo;

//para las puntuaciones
let rondasJugadas = 0;
let msPorRonda = []; 
let tiemposRecord = [];
let jugadoresRecord = [];

//========= EVENTOS =========

document.addEventListener("DOMContentLoaded", inicio);//Al cargar

document.getElementById("botonStart").addEventListener("click", start);//Al pulsar start
document.getElementById("botonNombre").addEventListener("click", nombre);//Al pulsar sobre nombre

//========= FUNCIONES =========

function inicio() {	//Se llama al cargar la página
  generarCasillas();
}

/*========= NAV =========*/

function start(){
    iniciarPartida();
}

function nombre() {//Funcion para escribir tu propio nombre
    let nombre = prompt("Nuevo Jugador");
    nombreJugador = nombre;

	//document.getElementById("name").innerHTML = nombre;
}

//========= Inicio de la partida =========

function iniciarPartida(){
    if(partidaActiva == false){

        partidaActiva = true;

        //Reseteo todas las variables pertinentes
        targetsActivos = 0;
        ms = 0;
        s = 0;
        rondasJugadas = 0;
        msPorRonda = [];

        //Lanzo la primera ronda en un momento aleatorio
        let tiempoParaSiguiente = tiempoAleatorio()
        setTimeout(lanzarPrimeraRonda, tiempoParaSiguiente);
    } 
}

function lanzarPrimeraRonda(){
    randomizarTargets();
    activarCronometro();
}

//========= GENERACION DEL TABLERO =========

function generarCasillas(){ //Genero las casillas del tablero
    let casillasTotal = casillasLado * casillasLado;

    for(let i = 0; i < casillasLado; i++){
        let filaCasillas = document.createElement("div");
       
        filaCasillas.classList.add("fila"); //Argumento Clase
        filaCasillas.id = `fila${i}`; //Argumento id 

        for(let j = 0; j < casillasLado; j++){
            let casilla = document.createElement("div");

            casilla.classList.add("casilla"); //Argumento Clase
            casilla.id = `casilla${(i * casillasLado) + j}`; //Argumento id
            casilla.addEventListener("click", pulsarCasilla) //Le añado a la casilla generada el evento

            filaCasillas.appendChild(casilla); //meto la casilla en la fila
        } 

        tablero.appendChild(filaCasillas); //meto la fila en el tablero
    }
}

//========= INTERACCION CON LOS TARGETS =========

function randomizarTargets(){
    let numeros = numerosSinRepeticion();

    for(let i = 0; i < targets; i++){
        let casillaElegida = document.getElementById(`casilla${numeros[i]}`);

        casillaElegida.classList.replace("casilla", "target"); //Cambio su clase de casilla a target
    }

    targetsActivos = targets;
    //activarCronometro(); //Reactivo el cronometro una vez definidos los targets
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
    if(this.classList.contains("target")){ //Compruebo si es o no target
        this.classList.replace("target", "casilla"); //Cambio su clase de target a casilla
        targetsActivos--;
        //console.log("Targets Activos: "+targetsActivos);
        //console.log("Rondas: "+rondasJugadas);

        if(targetsActivos === 0 && rondasJugadas < rondas){ //Si pulsamos todos los targets los reroleamos si no ha terminado la partida
            //console.log("LLamando Siguiente Ronda");
            finRonda();
        }
    }
    else{
        console.log("no target");
    }
}

function finRonda(){
    //Detengo el contador
    desactivarCronometro();

    //Guardo el tiempo que se ha tardado
    console.log(tiempoAMs());
    msPorRonda.push(tiempoAMs());

    //Sumo una ronda
    rondasJugadas++;
    console.log(rondasJugadas);

    //Reinicio el contador
    s = 0;
    ms = 0;

    prepararSiguienteRonda(); //Define si se pasa o no a la siguiente ronda
}

function prepararSiguienteRonda(){
    if(rondasJugadas < rondas){ //Solo creo nuevos targets aun quedan rondas

        let tiempoParaSiguiente = tiempoAleatorio()
 
        setTimeout(randomizarTargets, tiempoParaSiguiente);
        setTimeout(activarCronometro, tiempoParaSiguiente);
    } 
    else{ //Si se acabaron las rondas, gestiono el record
        gestionarRecord();
    }
}

function tiempoAleatorio() {
    return ((Math.random() * (tiempoEntreRondasMAX - tiempoEntreRondasMIN)) + tiempoEntreRondasMIN)*1000;
}

////========= CRONOMETROS =========

function activarCronometro(){
	intervalo = setInterval(sumar,10);
}

function desactivarCronometro(){
	clearInterval(intervalo);
}

function sumar(){
	if(ms < 9){
		ms++;
		document.getElementById("mili").textContent = "0" + ms;
	}
	else if(ms >= 9){
		ms++;
		document.getElementById("mili").textContent = "" + ms;
	}
	
	if(ms === 99){
		s++;
		ms = 0;
	}
	
	if(s < 10){
		document.getElementById("seg").textContent = "0" + s;
	}
	else if(s >= 10){
		document.getElementById("seg").textContent = s;
	}
}

function tiempoAMs(){ //Transforma el tiempo en ms puros
    return ((s*1000)+(ms*10));
}

function msASegundos(ms) {
    let segundos = Math.floor(ms / 1000);
    let milisegundos = ms % 1000;

    return segundos + ":" + milisegundos.toString().padStart(3, "0");;
}

////========= PUNTACIONES =========

function gestionarRecord(){
    //TODO añadirlo al records

    let record = calcularMedia();

    console.log("Record: "+record+" Tambien "+msASegundos(record));

    registrarRecord(record);

    partidaActiva = false; //Se acabó la partida
}

function calcularMedia() {
    let suma = 0;

    for (let i = 0; i < msPorRonda.length; i++) {
        suma += msPorRonda[i];
    }

    return suma / msPorRonda.length;
}

function registrarRecord(record){
    tiemposRecord.push(record);
    jugadoresRecord.push(nombreJugador);

    imprimirLeaderboard();
}

function imprimirLeaderboard(){
    //lo añado
    let leaderList = document.getElementById("leaderList");
    leaderList.textContent = "";//Borro todo

    ordenarLeaderboard();//La ordeno antes

    for(let i = 0; i < tiemposRecord.length; i++){
        //Creo el mensaje del top 1
        let nombre = jugadoresRecord[i];
        let tiempo = msASegundos(tiemposRecord[i]);

        let mensaje = `${nombre} ${tiempo}`;
    
        //Creo el elemento
        let leader = document.createElement("li");
        leader.classList.add("leader");
        leader.textContent = mensaje;
        
        //Lo añado
        leaderList.appendChild(leader);
    }
}

function ordenarLeaderboard() { //Usando el algoritmo de burbuja

    for (let i = 0; i < tiemposRecord.length - 1; i++) {

        for (let j = 0; j < tiemposRecord.length - 1 - i; j++) {

            // Si el de la izquierda es peor que el de la derecha
            if (tiemposRecord[j] > tiemposRecord[j + 1]) {

                // Intercambio los tiempos
                let auxTiempo = tiemposRecord[j];
                tiemposRecord[j] = tiemposRecord[j + 1];
                tiemposRecord[j + 1] = auxTiempo;

                // Intercambio también los jugadores
                let auxJugador = jugadoresRecord[j];
                jugadoresRecord[j] = jugadoresRecord[j + 1];
                jugadoresRecord[j + 1] = auxJugador;
            }
        }
    }
}