<?php
session_start();
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="Styles/styles.css">
    <script defer src="login.js"></script>
    <title>Iniciar sesión</title>
</head>

<body>
    <div id="header" style="text-align: center;">
        <img id="headerImg" src="Recursos/logoWorkHub.png" alt="Imagen Superior">
    </div>
    <div id="form" style="text-align: center; margin-top: 100px;">
        <form id="login-form" method="post">
            <div style="margin-bottom: 20px;">
                <label for="email">Correo electrónico:</label><br>
                <input type="text" id="email" name="email"><br>
                <div id="email-error-container">
                </div>
            </div>
            <div style="margin-bottom: 20px;">
                <label for="password">Contraseña:</label><br>
                <input type="password" id="password" name="password"><br>
                <div id="pwd-error-container">
                </div>
            </div>
            <div>
                <input type="submit" value="Entrar">
            </div>
        </form>
        <div style="margin-top: 20px;">
            <button onclick="window.location.href='registro.php'">Registrarse</button>
        </div>
    </div>

</body>

</html>