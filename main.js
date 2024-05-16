//Inicializacion de Variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerinicial = 30
let tiempoRegresivoId = null;

//Apuntando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostraAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante')

// Generación de números aleatorios:
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
// numeros = numeros.sort(() => { return Math.random()-0.5 });
console.log(numeros);

mezclarArreglo(numeros)  // ← Aquí llamo a la función  
// Funciones secundarias:
function mezclarArreglo (arreglo) {
    for (let i = arreglo.length - 1; i > 0; i--) {
        let indiceAleatorio = Math.floor(Math.random() * (i + 1));
        let temporal = arreglo[i];
        arreglo[i] = arreglo[indiceAleatorio];
        arreglo[indiceAleatorio] = temporal;
    }
}

function contarTiempo(){
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            alert('¡Se acabó el tiempo mi chav@!');
        }
    }, 1000);
    
}

function bloquearTarjetas(){
    for(let i = 0; i <= 15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
}

function resetear(){

    // Parar el timer 
    clearInterval(tiempoRegresivoId); 

    tarjetasDestapadas = 0;
    tarjeta1 = null;
    tarjeta2 = null;
    primerResultado = null;
    segundoResultado = null;
    movimientos = 0;
    aciertos = 0;
    temporizador = false;
    timer = 30;
    timerinicial = 30
    tiempoRegresivoId = null;

    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    mostraAciertos.innerHTML = `Aciertos: ${aciertos}`;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`

    for(let i = 0; i <= 15; i++){
        let tarjetaDesBloqueada = document.getElementById(i);
        tarjetaDesBloqueada.innerHTML = '';
        tarjetaDesBloqueada.disabled = false;
    }

    mezclarArreglo(numeros)

}

//Funcion principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas)

    if(tarjetasDestapadas == 1){
        //Mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = primerResultado;
        
        //Deshabilitar primer boton
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas == 2){
        //Mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;

        //Deshabilitar segundo boton
        tarjeta2.disabled = true;

        //Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            //Encerra contado tarjetas destapadas
            tarjetasDestapadas = 0

            //Aumentar aciertos
            aciertos++;
            mostraAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(tiempoRegresivoId);
                mostraAciertos.innerHTML = `Aciertos: ${aciertos} BUH!!!` ;
                mostrarTiempo.innerHTML = `yey! Solo demoraste ${timerinicial - timer} segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} Yay`;
            }
        }else{
            // Mostrar moemntaneamente valores y volver  a tapar
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }

    }
}