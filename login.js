//Variables del DOM
const loginForm = document.querySelector("#login-form");
let emailErrorContainer = document.querySelector("#email-error-container");
let pwdErrorContainer = document.querySelector("#pwd-error-container");
let emailError = document.createElement("spam");
emailError.className = 'error';
emailError.id = 'email-error';
let passwordError = document.createElement("spam");
passwordError.className = 'error';
passwordError.id = 'password-error';
// const registerForm=document.querySelector("#register-login");

//Formulario de Login
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let emial = document.querySelector("#email");
    let pwd = document.querySelector("#password");


    if (emial.value === '' || emial.value == null) {
        emailError.innerText = 'Por favor, introduce tu correo para acceder';
        emailError.style.color = 'red';
        emailErrorContainer.appendChild(emailError);
        return false;
    } else {
        emailErrorContainer.innerText = '';
    }
    if (pwd.value === '' || pwd.value == null) {
        passwordError.innerText = 'Por favor, introduce tu contraseña para acceder';
        passwordError.style.color = 'red';
        pwdErrorContainer.appendChild(passwordError);
        return false;
    } else {
        pwdErrorContainer.innerText = '';
    }

    sendData(emial.value, pwd.value);

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
            if (data.error === 'email and pwd') {
                emailError.innerText = 'No se ha encontrado ninguna cuenta con ese correo';
                emailError.style.color = 'red';
                passwordError.innerText = 'Contraseña incorrecta';
                passwordError.style.color = 'red';
                emailErrorContainer.appendChild(emailError);
                pwdErrorContainer.appendChild(passwordError);
            } else if (data.error === 'email') {
                emailError.innerText = 'No se ha encontrado ninguna cuenta con ese correo';
                emailError.style.color = 'red';
                emailErrorContainer.appendChild(emailError);
            } else if (data.error === 'pwd') {
                passwordError.innerText = 'Contraseña incorrecta';
                passwordError.style.color = 'red';
                pwdErrorContainer.appendChild(passwordError);
            } else {
                emailErrorContainer.innerText = '';
                pwdErrorContainer.innerText = '';
            }
        }

    } catch (error) {
        console.log("Error en la solicitud: " + error.message);

    }
}

// registerForm.addEventListener('submit', function(e){
//     e.preventDefault();
//     console.log("REGISTRO");

// });