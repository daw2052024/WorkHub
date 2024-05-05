//Variables de DOM
let registerForm = document.querySelector("#register-login");
let nameErrorContainer = document.querySelector("#name-error-container");
let emailErrorContainer = document.querySelector("#email-error-container");
let pwdErrorContainer = document.querySelector("#pwd-error-container");
let confpwdErrorContainer = document.querySelector("#confpwd-error-container");
let nameError = document.createElement("span");
nameError.className = 'error';
nameError.id = 'name-error';
let emailError = document.createElement("span");
emailError.className = 'error';
emailError.id = 'email-error';
let passwordError = document.createElement("span");
passwordError.className = 'error';
passwordError.id = 'password-error';
let confpasswordError = document.createElement("span");
confpasswordError.className = 'error';
confpasswordError.id = 'password-error';

//Formulario de registro

registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let confpassword = document.querySelector("#confirm_password").value;

    let errors = [];

    //Validar que los campos no estén vacios 
    if (name === '' || name === null) {
        errors.push("name_vacio");
    }
    if (email === '' || email === null) {
        errors.push("email_vacio");
    }
    if (password === '' || password === null) {
        errors.push("password_vacio");
    }
    if (confpassword === '' || confpassword === null) {
        errors.push("confPassword_vacio");
    }


    //Validar campos
    if (name !== '' && validarNombre(name)) {
        errors.push("nombre_invalido");
    }

    if (email !== '' && validarEmail(email)) {
        errors.push("email_invalido");
    }


    if (password !== '' && confpassword !== '' && !validarContraseña(password, confpassword)) {
        errors.push("contraseña_no_coincide");
    }

    handleRegistrationErrors(errors);

    if (errors.length > 0) {
        return;
    } else {
        sendDataToRegister(name, email, password, confpassword);
    }
});

async function sendDataToRegister(nombre, email, pwd, confPwd) {
    try {
        const response = await fetch("validar_registro.php", {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({ nombre: nombre, email: email, password: pwd, confPwd: confPwd })
        });

        if (!response.ok) {
            throw new Error(response.status + " - " + response.statusText);
        }

        const data = await response.json();
        console.log(data);
        let errors = [];
        if (data.error) {
            errors.push(data.error);
            handleRegistrationErrors(errors);
        } else {
            window.location.href = 'login.php';
        }
    } catch (error) {
        console.log("Error en la solicitud: " + error.message); 

    }
}



function validarNombre(nombre) {
    const patronNombre = /^[a-zA-Z\s-]+$/;
    return !patronNombre.test(nombre);
}

function validarEmail(email) {
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !patronEmail.test(email);
};

function validarContraseña(contraseña, confContraseña) {
    return contraseña.trim() === confContraseña.trim();
}

function handleRegistrationErrors(errors) {
    clearRegistrationErrors();


    errors.forEach(error => {
        if (error === "name_vacio") {
            nameError.innerText = 'Por favor, introduce tu nombre para el registro';
            nameError.style.color = 'red';
            nameErrorContainer.appendChild(nameError);
        } else if (error === "email_vacio") {
            emailError.innerText = 'Por favor, introduce tu correo para el registro';
            emailError.style.color = 'red';
            emailErrorContainer.appendChild(emailError);
        } else if (error === 'password_vacio') {
            passwordError.innerText = 'Por favor, introduce una contraseña para el registro';
            passwordError.style.color = 'red';
            pwdErrorContainer.appendChild(passwordError);
        } else if (error === "confPassword_vacio") {
            confpasswordError.innerText = 'Por favor, introduce la contraseña nuevamente para el registro';
            confpasswordError.style.color = 'red';
            confpwdErrorContainer.appendChild(confpasswordError);
        } else if (error === "nombre_invalido") {
            nameError.innerText = 'Formato de nombre incorrecto';
            nameError.style.color = 'red';
            nameErrorContainer.appendChild(nameError);
        } else if (error === "email_invalido") {
            emailError.innerText = 'Formato de email incorrecto';
            emailError.style.color = 'red';
            emailErrorContainer.appendChild(emailError);
        } else if (error === "usuario_existe") {
            emailError.innerText = 'Email ya en uso, introudizca otro para crear al usuario';
            emailError.style.color = 'red';
            emailErrorContainer.appendChild(emailError);
        } else if (error === 'contraseña_no_coincide') {
            passwordError.innerText = 'Las contraseñas no coinciden, por favor introducelas de nuevo';
            passwordError.style.color = 'red';
            pwdErrorContainer.appendChild(passwordError);
            document.getElementById("confirm_password").value = "";
        }
    });
}

function clearRegistrationErrors() {
    nameErrorContainer.innerText = '';
    emailErrorContainer.innerText = '';
    pwdErrorContainer.innerText = '';
    confpwdErrorContainer.innerText = '';
}

