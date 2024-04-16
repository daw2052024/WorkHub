//Variables del DOM
const loginForm = document.querySelector("#login-form");
let emailErrorContainer = document.querySelector("#email-error-container");
let pwdErrorContainer = document.querySelector("#pwd-error-container");
let emailError = document.createElement("span");
emailError.className = 'error';
emailError.id = 'email-error';
let passwordError = document.createElement("span");
passwordError.className = 'error';
passwordError.id = 'password-error';

//Formulario de Login
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    if (email === '' || email === null) {
        emailError.innerText = 'Por favor, introduce tu correo para acceder';
        emailError.style.color = 'red';
        emailErrorContainer.appendChild(emailError);
        return false;
    } else {
        emailErrorContainer.innerText = '';
    }
    if (password === '' || password === null) {
        passwordError.innerText = 'Por favor, introduce tu contraseña para acceder';
        passwordError.style.color = 'red';
        pwdErrorContainer.appendChild(passwordError);
        return false;
    } else {
        pwdErrorContainer.innerText = '';
    }

    sendData(email, password);
});

//Enviar datos a PHP
async function sendData(email, password) {
    try {
        const response = await fetch("validar_credenciales.php", {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({ email: email, password: password })
        });

        if (!response.ok) {
            throw new Error(response.status + " - " + response.statusText);
        }

        const data = await response.json();
        console.log(data);

        if (data.error) {
            handleAuthenticationError(data.error);
        } else {
            window.location.href = 'index.php';
        }
    } catch (error) {
        console.log("Error en la solicitud: " + error.message);
    }
}

function handleAuthenticationError(error) {
    if (error === 'email and pwd') {
        emailError.innerText = 'No se ha encontrado ninguna cuenta con ese correo';
        emailError.style.color = 'red';
        passwordError.innerText = 'Contraseña incorrecta';
        passwordError.style.color = 'red';
        emailErrorContainer.appendChild(emailError);
        pwdErrorContainer.appendChild(passwordError);
    } else if (error === 'email') {
        emailError.innerText = 'No se ha encontrado ninguna cuenta con ese correo';
        emailError.style.color = 'red';
        emailErrorContainer.appendChild(emailError);
    } else if (error === 'pwd') {
        passwordError.innerText = 'Contraseña incorrecta';
        passwordError.style.color = 'red';
        pwdErrorContainer.appendChild(passwordError);
    } else {
        emailErrorContainer.innerText = '';
        pwdErrorContainer.innerText = '';
    }
}

// function handleAuthenticationSuccess(success) {
//     // Manejar el éxito de la autenticación, por ejemplo, redirigir a otra página
//     console.log("Autenticación exitosa: " + success);
// }
