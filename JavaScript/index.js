//Variables
let arrCarrusel = [
    'Recursos/Carrusel/pexels-fauxels-3184418.jpg',
    'Recursos/Carrusel/pexels-picjumbo-com-55570-196650.jpg',
    'Recursos/Carrusel/pexels-vojtech-okenka-127162-392018.jpg'
];

let entradaPresionada;
let salidaPresionada
let fechaEntrada;
let horaEntrada;

if (!sessionStorage.getItem("entradaPresionada")) {
    entradaPresionada = false;
    sessionStorage.setItem("entradaPresionada", entradaPresionada);
} else {
    entradaPresionada = sessionStorage.getItem("entradaPresionada") === "true";

}
if (!sessionStorage.getItem("salidaPresionada")) {
    salidaPresionada = false;
    sessionStorage.setItem("salidaPresionada", salidaPresionada);
} else {
    salidaPresionada = sessionStorage.getItem("salidaPresionada") === "true";

}
if (sessionStorage.getItem("fechaEntrada")) {
    fechaEntrada = sessionStorage.getItem("fechaEntrada");
}

if (sessionStorage.getItem("horaEntrada")) {
    horaEntrada = sessionStorage.getItem("horaEntrada");
}

const entradaBtn = document.getElementById('entradaBtn');
const salidaBtn = document.getElementById('salidaBtn');


//Sliser
function Slider() {
    let cont = 0;
    let imgSlider = document.getElementById("imgSlider");

    function nextSlide() {
        cont = (cont + 1) % arrCarrusel.length;
        let imageUrl = arrCarrusel[cont];
        imgSlider.src = imageUrl;
    }

    setInterval(nextSlide, 3000);
}

Slider();


entradaBtn.addEventListener('click', async function () {
    console.log(entradaPresionada + " " + salidaPresionada);
    if (entradaPresionada === false && salidaPresionada === false) {
        entradaPresionada = true;
        sessionStorage.setItem("entradaPresionada", entradaPresionada);
        fechaEntrada = obtenerFecha();
        horaEntrada = obtenerHora();
        sessionStorage.setItem("fechaEntrada", fechaEntrada);
        sessionStorage.setItem("horaEntrada", horaEntrada);

    } else {
        alert("No puedes pulsar entrada otra vez sin pulsar salida primero.");
    }
});

salidaBtn.addEventListener('click', async function () {
    console.log(entradaPresionada + " " + salidaPresionada);
    if (entradaPresionada === true && salidaPresionada === false) {
        //salidaPresionada = true;
        entradaPresionada = false;
        sessionStorage.setItem("entradaPresionada", entradaPresionada);
        fechaSalida = obtenerFecha();
        horaSalida = obtenerHora();
        sessionStorage.setItem("fechaSalida", fechaSalida);
        sessionStorage.setItem("horaSalida", horaSalida);

        console.log("Salida pulsada");

        let diferencia = calcularDiferenciaTiempo(horaEntrada, horaSalida);

        try {
            const response = await fetch("fichar.php", {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                body: JSON.stringify({
                    fecha: fechaEntrada, horaEntrada: horaEntrada,
                    horaSalida: horaSalida, tiempo: diferencia
                })
            });
            if (!response.ok) {
                throw new Error(response.status + " - " + response.statusText);
            }
            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.log("Error en la solicitud: " + error.message);

        }
    } else {
        alert("No puedes pulsar salida sin haber pulsado entrada primero, o ya has pulsado salida.");
    }
});


function obtenerFecha() {
    const fechaActual = new Date();

    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const fechaFormateada = `${año}-${mes}-${dia}`;

    return fechaFormateada;
}

function obtenerHora() {
    const horaActual = new Date();
    const hora = String(horaActual.getHours()).padStart(2, '0');
    const minutos = String(horaActual.getMinutes()).padStart(2, '0');
    const segundos = String(horaActual.getSeconds()).padStart(2, '0');

    const horaFormateada = `${hora}:${minutos}:${segundos}`;

    return horaFormateada;
}

function calcularDiferenciaTiempo(horaInicioStr, horaFinStr) {
    const horaInicio = new Date(`2000-01-01T${horaInicioStr}`);
    const horaFin = new Date(`2000-01-01T${horaFinStr}`);

    const diferenciaMilisegundos = horaFin - horaInicio;

    const segundosTotal = Math.floor(diferenciaMilisegundos / 1000);
    const horas = Math.floor(segundosTotal / 3600);
    const minutos = Math.floor((segundosTotal % 3600) / 60);
    const segundos = segundosTotal % 60;

    const diferenciaFormateada = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

    return diferenciaFormateada;
}