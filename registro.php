<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="Styles/styles.css">
    <script defer src="registro.js"></script>
    <title>Registro</title>
</head>

<body>
    <div id="header" style="text-align: center;">
        <img id="headerImg" src="Recursos/logoWorkHub.png" alt="Imagen Superior">
    </div>
    <div id="form" style="text-align: center; margin-top: 100px;">
        <form id="register-login" method="post">
            <div style="margin-bottom: 20px;">
                <label for="name">Nombre:</label><br>
                <input type="text" id="name" name="name"><br>
                <div id="name-error-container">
                </div>
            </div>
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
            <div style="margin-bottom: 20px;">
                <label for="confirm_password">Confirmar contraseña:</label><br>
                <input type="password" id="confirm_password" name="confirm_password"><br>
                <div id="confpwd-error-container">
                </div>
            </div>
            <div>
                <input type="submit" value="Registrarse">
            </div>
        </form>
        <div style="margin-top: 20px;">
            <button onclick="window.location.href='login.php'">¿Ya tienes una cuenta? Inicia sesión aquí</button>
        </div>
    </div>

</body>

</html>