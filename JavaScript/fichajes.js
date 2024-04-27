//Variables
let tbody = document.querySelector("#tBody");

async function cargarFichajes() {
    let response = await fetch("datos_fichaje.php");

    if (!response.ok) {
        throw new Error(response.status + " - " + response.statusText);
    }
    let datos = await response.json();
    console.log(datos);

    if (!Array.isArray(datos)) {
        datos = [datos];
    }

    cargarDatosEnTabla(datos);
}

function cargarDatosEnTabla(fichajes) {

    if (!Array.isArray(fichajes)) {
        console.error("Los datos de fichajes no son un array:", fichajes);
        return;
    }

    fichajes.forEach(fichaje => {
        let tr = document.createElement("tr");

        let tdFecha = document.createElement("td");
        tdFecha.appendChild(document.createTextNode(fichaje['fecha']));
        let tdEntrada = document.createElement('td');
        tdEntrada.appendChild(document.createTextNode(fichaje['hora_entrada']));
        let tdSalida = document.createElement('td');
        tdSalida.appendChild(document.createTextNode(fichaje['hora_salida']));
        let tdTempoTrabajo = document.createElement('td');;
        tdTempoTrabajo.appendChild(document.createTextNode(fichaje['tiempo_trabajado']));

        tr.appendChild(tdFecha);
        tr.appendChild(tdEntrada);
        tr.appendChild(tdSalida);
        tr.appendChild(tdTempoTrabajo);

        tbody.appendChild(tr);
    });
}


cargarFichajes();

