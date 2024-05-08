//Codigo del calendario
let request_calendar;
document.addEventListener('DOMContentLoaded', function () {

    request_calendar = "./JavaScript/events.json";


    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',

        events: function (info, successCallback, failureCallback) {
            fetch(request_calendar)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    let events = data.events.map(function (event) {
                        return {
                            title: event.eventTitle,
                            start: new Date(event.eventStartDate),
                            end: new Date(event.eventEndDate),
                            url: event.eventUrl,
                            location: event.eventLocation,
                            timeStart: event.eventStartTime,
                            timeEnd: event.eventEndTime,
                        }
                    })
                    successCallback(events)
                })
                .catch(function (error) {
                    failureCallback(error)
                })
        },

        eventContent: function (info) {

            return {
                html: `
                <div style="overflow: hidden; font-size: 12px; positon: relative;  cursor: pointer; font-family: 'Inter', sans-serif;">
                    <div><strong>${info.event.title}</strong></div>
                    <div>Location: ${info.event.extendedProps.location}</div>
                    <div>Date: ${info.event.start.toLocaleDateString(
                    "es-US",
                    {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    }
                )}</div>
                    <div>Time: ${info.event.extendedProps.timeStart} - ${info.event.extendedProps.timeEnd}</div>
                </div>
                `
            }
        },

        eventMouseEnter: function (mouseEnterInfo) {
            let el = mouseEnterInfo.el;
            el.classList.add("relative");

            let newEl = document.createElement("div")
            let newElTitle = mouseEnterInfo.event.title
            let newElLocation = mouseEnterInfo.event.extendedProps.location
            newEl.innerHTML = `
            <div
                class="fc-hoverable-event"
                style="position: absolute; bottom: 100%; left: 0; width: 300px; height: auto; background-color: white; z-index: 50; border: 1px solid #e2e8f0; border-radius: 0.375rem; padding: 0.75rem; font-size: 14px; font-family: 'Inter', sans-serif; cursor: pointer;"
            >
                <strong>${newElTitle}</strong>
                <div>Location: ${newElLocation}</div>

            </div>
        `
            el.after(newEl);
        },
        eventMouseLeave: function () {
            document.querySelector(".fc-hoverable-event").remove()
        }
    });
    calendar.render();
});


let btnEdtarCalendario = document.querySelector("#editarPerfilBtn");
let datosCalendarioContainer = document.querySelector("#datosCalendario");


let nombreEventoErrorContainer = document.querySelector("#name-error-container");
let fechaInicioErrorContainer = document.querySelector("#fechaInicio-error-container");
let horaInicioErrorContainer = document.querySelector("#horaInicio-error-container");
let fechaFinalErrorContainer = document.querySelector("#fechaFinal-error-container");
let horaFinErrorContainer = document.querySelector("#horaFin-error-container");
let ubicacionErrorContainer = document.querySelector("#ubicacion-error-container");

let nombreEventoError = document.createElement("span");
nombreEventoError.className = 'error';
nombreEventoError.id = 'nombreEvento-error';

let fechaInicioError = document.createElement("span");
fechaInicioError.className = 'error';
fechaInicioError.id = 'fechaInicio-error';

let horaInicioError = document.createElement("span");
horaInicioError.className = 'error';
horaInicioError.id = 'horaInicio-error';

let fechaFinalError = document.createElement("span");
fechaFinalError.className = 'error';
fechaFinalError.id = 'fechaFinal-error';

let horaFinError = document.createElement("span");
horaFinError.className = 'error';
horaFinError.id = 'horaFin-error';

let ubicacionError = document.createElement("span");
ubicacionError.className = 'error';
ubicacionError.id = 'ubicacion-error';


btnEdtarCalendario.addEventListener("click", function () {

    if (datosCalendarioContainer.style.display === "block") {
        datosCalendarioContainer.style.display = "none";
    } else {
        datosCalendarioContainer.style.display = "block";
    }
});

let formCalendario = document.querySelector("#insert-data");

function formatDate(dateString) {
    let [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
}

// Función para formatear la hora de entrada a HH:MM AM/PM
function formatTime(timeString) {
    let [hours, minutes] = timeString.split(':');
    let period = 'AM';
    if (parseInt(hours) >= 12) {
        period = 'PM';
        if (hours !== '12') {
            hours = String(parseInt(hours) - 12);
        }
    }
    if (hours === '0') {
        hours = '12';
    }
    return `${hours}:${minutes} ${period}`;
}


formCalendario.addEventListener('submit', function (e) {
    e.preventDefault();

    let nombreEvento = document.getElementById('nombreEvento').value;
    let fechaComienzo = formatDate(document.getElementById('fecha-comienzo').value);
    let horaComienzo = formatTime(document.getElementById('hora-comienzo').value);
    let fechaFinal = formatDate(document.getElementById('fecha-final').value);
    let horaFin = formatTime(document.getElementById('hora-fin').value);
    let ubicacion = document.getElementById('ubicacion').value;


    console.log(fechaComienzo);
    console.log(horaFin);
    errors = [];

    //Validar campos


    if (nombreEvento === '' || nombreEvento === null) {
        errors.push("nombreEvento_vacio");
    }
    if (fechaComienzo === '' || fechaComienzo === null) {
        errors.push("fechaComienzo_vacio");
    }
    if (horaComienzo === '' || horaComienzo === null) {
        errors.push("horaComienzo_vacio");
    }
    if (fechaFinal === '' || fechaFinal === null) {
        errors.push("fechaFinal_vacio");
    }
    if (horaFin === '' || horaFin === null) {
        errors.push("horaFin_vacio");
    }
    if (ubicacion === '' || ubicacion === null) {
        errors.push("ubicacion_vacio");
    }

    if (fechaComienzo !== "" && fechaFinal !== "" && horaFin !== "" && horaComienzo !== "") {
        // Validar fechas
        if (fechaComienzo > fechaFinal) {
            errors.push("fechaComienzo_posterior");
        } else if (fechaFinal < fechaComienzo) {
            errors.push("fechaFinal_anterior");
        }

        // Validar horas
        if (fechaComienzo === fechaFinal && horaComienzo > horaFin) {
            errors.push("horaComienzo_posterior");
        }
    }

    handleCalendarErrors(errors);

    if (errors.length > 0) {
        return;
    } else {

        let nuevoEvento = {
            eventTitle: nombreEvento,
            eventStartDate: fechaComienzo,
            eventStartTime: horaComienzo,
            eventEndDate: fechaFinal,
            eventEndTime: horaFin,
            eventLocation: ubicacion,
            eventUrl: 'https://fullcalendar.io/'
        };
        //addCalendarEvent(nuevoEvento);
    }

})


// function addCalendarEvent(nuevoEvento) {

//     fetch('add_event.php', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ event_data: nuevoEvento })
//     })
//         .then(function (response) {
//             if (!response.ok) {
//                 throw new Error('Failed to update calendar data');
//             }
//             return response.json(); 
//         })
//         .then(function (data) {
//             if (data.success) {
//                 console.log(data.message); 

//             } else {
               
//                 console.error(data.message); 
//                 alert('Hubo un error al insertar el evento');
//             }
//         })
//         .catch(function (error) {
//             console.error('Error:', error);
//             alert('Hubo un error al insertar el evento');
//         });
// }



function handleCalendarErrors(errors) {
    clearCalendarErrors();

    errors.forEach(error => {
        if (error === "nombreEvento_vacio") {
            nombreEventoError.innerText = 'Por favor, introduce el nombre del evento para el calendario';
            nombreEventoError.style.color = 'red';
            nombreEventoErrorContainer.appendChild(nombreEventoError);
        } else if (error === "fechaComienzo_vacio") {
            fechaInicioError.innerText = 'Por favor, introduce la fecha de inicio del evento';
            fechaInicioError.style.color = 'red';
            fechaInicioErrorContainer.appendChild(fechaInicioError);
        } else if (error === "horaComienzo_vacio") {
            horaInicioError.innerText = 'Por favor, introduce la hora de inicio del evento';
            horaInicioError.style.color = 'red';
            horaInicioErrorContainer.appendChild(horaInicioError);
        } else if (error === "fechaFinal_vacio") {
            fechaFinalError.innerText = 'Por favor, introduce la fecha final del evento';
            fechaFinalError.style.color = 'red';
            fechaFinalErrorContainer.appendChild(fechaFinalError);
        } else if (error === "horaFin_vacio") {
            horaFinError.innerText = 'Por favor, introduce la hora final del evento';
            horaFinError.style.color = 'red';
            horaFinErrorContainer.appendChild(horaFinError);
        } else if (error === "ubicacion_vacio") {
            ubicacionError.innerText = 'Por favor, introduce la ubicación del evento';
            ubicacionError.style.color = 'red';
            ubicacionErrorContainer.appendChild(ubicacionError);
        } else if (error === "fechaComienzo_posterior") {
            fechaInicioError.innerText = 'La fecha de inicio no puede ser posterior a la fecha final';
            fechaInicioError.style.color = 'red';
            fechaInicioErrorContainer.appendChild(fechaInicioError);
        } else if (error === "fechaFinal_anterior") {
            fechaFinalError.innerText = 'La fecha final no puede ser anterior a la fecha de inicio';
            fechaFinalError.style.color = 'red';
            fechaFinalErrorContainer.appendChild(fechaFinalError);
        } else if (error === "horaComienzo_posterior") {
            horaInicioError.innerText = 'La hora de inicio no puede ser posterior a la hora final en el mismo día';
            horaInicioError.style.color = 'red';
            horaInicioErrorContainer.appendChild(horaInicioError);
        }
    });
}

function clearCalendarErrors() {
    nombreEventoError.innerText = '';
    fechaInicioError.innerText = '';
    horaInicioError.innerText = '';
    fechaFinalError.innerText = '';
    horaFinError.innerText = '';
    ubicacionError.innerText = '';

    nombreEventoErrorContainer.innerHTML = '';
    fechaInicioErrorContainer.innerHTML = '';
    horaInicioErrorContainer.innerHTML = '';
    fechaFinalErrorContainer.innerHTML = '';
    horaFinErrorContainer.innerHTML = '';
    ubicacionErrorContainer.innerHTML = '';
}


