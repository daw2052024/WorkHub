//Variables/DOM
let editarPerfilBtn = document.getElementById("editarPerfilBtn");
let editarPerfilContainer = document.getElementById("editarPerfilContainer");
let divDatosPersonales = document.querySelector(".datos-personales");
let form = document.querySelector("#insert-data");

//Errores
let errors;
let nombreContainer = document.getElementById("name-error-container");
let apellidosContainer = document.getElementById("apellidos-error-container");
let puestoContainer = document.getElementById("puesto-error-container");
let empresaContainer = document.getElementById("empresa-error-container");
let departamentoContainer = document.getElementById("departamento-error-container");
let telefonoContainer = document.getElementById("telefono-error-container");
let fechaIngresoContainer = document.getElementById("fecha-error-container");
let ubicacionContainer = document.getElementById("ubicacion-error-container");

let nombreError = document.createElement("span");
nombreError.className = 'error';
nombreError.id = 'nombre-error';
let apellidosError = document.createElement("span");
apellidosError.className = 'error';
apellidosError.id = 'apellidos-error';
let puestoError = document.createElement("span");
puestoError.className = 'error';
puestoError.id = 'puesto-error';
let empresaError = document.createElement("span");
empresaError.className = 'error';
empresaError.id = 'empresa-error';
let departamentoError = document.createElement("span");
departamentoError.className = 'error';
departamentoError.id = 'departamento-error';
let telefonoError = document.createElement("span");
telefonoError.className = 'error';
telefonoError.id = 'telefono-error';
let fechaIngresoError = document.createElement("span");
fechaIngresoError.className = 'error';
fechaIngresoError.id = 'fecha-ingreso-error';
let ubicacionError = document.createElement("span");
ubicacionError.className = 'error';
ubicacionError.id = 'ubicacion-error';



editarPerfilBtn.addEventListener("click", function () {

    if (editarPerfilContainer.style.display === "block") {
        editarPerfilContainer.style.display = "none";
    } else {
        editarPerfilContainer.style.display = "block";
    }
});
trareInforUsuario()

async function trareInforUsuario(cargarPerfil = true) {

    let response = await fetch("datos_user.php");

    if (!response.ok) {
        throw new Error(response.status + " - " + response.statusText);
    }
    let datos_user = await response.json();

    if (!Array.isArray(datos_user)) {
        datos_user = [datos_user];
    }

    if (cargarPerfil) {
        cargarDatosPerfil(datos_user);
    }

    return datos_user;


}

function cargarDatosPerfil(datos) {

    const nombresMostrados = {
        "Nombre": "Nombre",
        "Apellidos": "Apellidos",
        "Correo": "Correo",
        "puesto_trabajo": "Puesto de trabajo",
        "Empresa": "Empresa",
        "departamento": "Departamento",
        "telefono": "Teléfono",
        "fecha_ingreso": "Fecha de ingreso",
        "ubicacion": "Domicilio"
    };

    datos.forEach(dato => {
        Object.keys(dato).forEach(key => {
            const valor = dato[key];
            if (valor !== null && valor !== "") {
                let nombreMostrado=nombresMostrados[key] || key;
                console.log(nombresMostrados[key]);
                let strongTag = document.createElement('strong');
                strongTag.textContent = nombreMostrado + ": ";
                let campoDato = document.createElement("p");
                campoDato.appendChild(strongTag);
                campoDato.innerHTML += valor;
                divDatosPersonales.appendChild(campoDato);
            }
        });
    });
}

// Función para guardar los cambios en el perfil
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    let name = document.querySelector("#nombre").value;
    let apellidos = document.querySelector("#apellidos").value;
    let puesto = document.querySelector("#puesto").value;
    let empresa = document.querySelector("#empresa").value;
    let departamento = document.querySelector("#departamento").value;
    let telefono = document.querySelector("#telefono").value;
    let fechaIngreso = document.querySelector("#fecha-ingreso").value;
    let ubicacion = document.querySelector("#ubicacion").value;

    let datosFormulario = {
        nombre: name,
        apellidos: apellidos,
        puesto_trabajo: puesto,
        empresa: empresa,
        departamento: departamento,
        telefono: telefono,
        fecha_ingreso: fechaIngreso,
        ubicacion: ubicacion
    }


    errors = [];

    //Validar campos

    if (name !== '' && validarDatoTexto(name)) {
        errors.push("nombre_invalido");
    }
    if (apellidos !== '' && validarDatoTexto(apellidos)) {
        errors.push("apellido_invalido");
    }
    if (puesto !== '' && validarDatoTexto(puesto)) {
        errors.push("puesto_invalido");
    }
    if (empresa !== '' && validarDatoTexto(empresa)) {
        errors.push("empresa_invalido");
    }
    if (departamento !== '' && validarDatoTexto(departamento)) {
        errors.push("departamento_invalido");
    }
    if (telefono !== '' && validarTelefono(telefono)) {
        errors.push("telefono_invalido");
    }

    handleProfileErrors(errors);

    if (errors.length > 0) {
        return;
    } else {
        try {

            let datosBD = await trareInforUsuario(false);
            let datosPerfil = datosBD[0];

            let datosActuales = {};
            for (let propiedad in datosPerfil) {
                datosActuales[propiedad.toLowerCase()] = datosPerfil[propiedad];
            }


            let cambios = compararDatosPerfil(datosActuales, datosFormulario);

            for (let campo in cambios) {
                updateDatoPerfil(campo, cambios[campo]);
            }

        } catch (error) {
            console.error("Error al obtener datos de usuario:", error);
        }
    }

})

function compararDatosPerfil(datosActuales, datosFormulario) {

    let cambios = {};
    for (let campo in datosFormulario) {
        // Verificar si el campo está presente en los datos actuales y si su valor ha cambiado
        if (datosActuales.hasOwnProperty(campo) && datosActuales[campo] !== datosFormulario[campo] && datosFormulario[campo] !== "") {
            cambios[campo] = datosFormulario[campo];
        }
    }
    return cambios;

}

async function updateDatoPerfil(campo, valor) {

    try {
        const response = await fetch("insert_user_data.php", {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({ campo: campo, valor: valor })
        });

        if (!response.ok) {
            throw new Error(response.status + " - " + response.statusText);
        }

        const data = await response.json();
        console.log(data);
        errors = [];
        if (data.error) {
            errors.push(data.error);
            handleProfileErrors(errors);
        } else {
            window.location.reload();

        }

    } catch (error) {
        console.log("Error en la solicitud: " + error.message);

    }


}


function validarDatoTexto(dato) {
    const patronTexto = /^[a-zA-Z\s-]+$/;
    return !patronTexto.test(dato);
}

function validarTelefono(telf) {
    const patronTelefono = /^\+?[0-9\s-]+$/;
    return !patronTelefono.test(telf);
}


function handleProfileErrors(errors) {
    clearProfileErrors();

    errors.forEach(error => {
        if (error === "name_vacio") {
            nombreError.innerText = 'Por favor, introduce tu nombre en el perfil';
            nombreError.style.color = 'red';
            nombreContainer.appendChild(nombreError);
        } else if (error === "apellidos_vacio") {
            apellidosError.innerText = 'Por favor, introduce tus apellidos en el perfil';
            apellidosError.style.color = 'red';
            apellidosContainer.appendChild(apellidosError);
        } else if (error === 'puesto_vacio') {
            puestoError.innerText = 'Por favor, introduce tu puesto de trabajo en el perfil';
            puestoError.style.color = 'red';
            puestoContainer.appendChild(puestoError);
        } else if (error === "empresa_vacio") {
            empresaError.innerText = 'Por favor, introduce el nombre de tu empresa en el perfil';
            empresaError.style.color = 'red';
            empresaContainer.appendChild(empresaError);
        } else if (error === "departamento_vacio") {
            departamentoError.innerText = 'Por favor, introduce tu departamento en el perfil';
            departamentoError.style.color = 'red';
            departamentoContainer.appendChild(departamentoError);
        } else if (error === "telefono_vacio") {
            telefonoError.innerText = 'Por favor, introduce tu número de teléfono en el perfil';
            telefonoError.style.color = 'red';
            telefonoContainer.appendChild(telefonoError);
        } else if (error === "fechaIngreso_vacio") {
            fechaIngresoError.innerText = 'Por favor, introduce tu fecha de ingreso en la empresa en el perfil';
            fechaIngresoError.style.color = 'red';
            fechaIngresoContainer.appendChild(fechaIngresoError);
        } else if (error === "ubicacion_vacia") {
            ubicacionError.innerText = 'Por favor, introduce tu ubicación en el perfil';
            ubicacionError.style.color = 'red';
            ubicacionContainer.appendChild(ubicacionError);
        } else if (error === "nombre_invalido") {
            nombreError.innerText = 'Formato de nombre incorrecto';
            nombreError.style.color = 'red';
            nombreContainer.appendChild(nombreError);
        } else if (error === "apellido_invalido") {
            apellidosError.innerText = 'Formato de apellidos incorrecto';
            apellidosError.style.color = 'red';
            apellidosContainer.appendChild(apellidosError);
        } else if (error === "puesto_invalido") {
            puestoError.innerText = 'Formato de puesto de trabajo incorrecto';
            puestoError.style.color = 'red';
            puestoContainer.appendChild(puestoError);
        } else if (error === "empresa_invalido") {
            empresaError.innerText = 'Formato de empresa incorrecto';
            empresaError.style.color = 'red';
            empresaContainer.appendChild(empresaError);
        } else if (error === "departamento_invalido") {
            departamentoError.innerText = 'Formato de departamento incorrecto';
            departamentoError.style.color = 'red';
            departamentoContainer.appendChild(departamentoError);
        } else if (error === "telefono_invalido") {
            telefonoError.innerText = 'Formato de teléfono incorrecto';
            telefonoError.style.color = 'red';
            telefonoContainer.appendChild(telefonoError);
        }
    });
}

function clearProfileErrors() {
    nombreContainer.innerText = '';
    apellidosContainer.innerText = '';
    puestoContainer.innerText = '';
    empresaContainer.innerText = '';
    departamentoContainer.innerText = '';
    telefonoContainer.innerText = '';
    fechaIngresoContainer.innerText = '';
    ubicacionContainer.innerText = '';
}

