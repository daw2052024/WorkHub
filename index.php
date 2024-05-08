<?php
session_start();

//Verificar si hay session activa

if (!isset($_SESSION['correoUsuario'])) {
    header("Location: login.php");
    exit();
}


?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="Styles/indexStyles.css">
    <script defer src="JavaScript/index.js"></script>
    <title>WorkHub</title>
</head>

<body>
    <header>
        <div class="logo">
            <img id="logo_app" src="Recursos/logoWorkHub.png" alt="Logo app">
        </div>
        <nav>
            <ul>
                <li><a href="index.php">Inicio</a></li>
                <li><a href="fichajes.php">Fichajes</a></li>
                <li><a href="calendario.php">Calendario</a></li>
                <li><a href="perfil.php">Perfil</a></li>
                <li><a href="delete_session.php">Salir</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <div id="carousel">
            <div class="slide">
                <img id="imgSlider" src="Recursos/Carrusel/pexels-vojtech-okenka-127162-392018.jpg">
            </div>
        </div>

        <h1>WorkHub</h1>
        <h2>Registra tu jornada y gestiona eventos con facilidad. ¡WorkHub, tu aliado laboral!</h2>

        <div class="botones">
            <button id="entradaBtn">Entrada</button>
            <button id="salidaBtn">Salida</button>
        </div>
    </main>

    <footer>
        <p>Derechos de autor © 2024 | WorkHub</p>
        <p>Contacto: marcos.piedrahita.tellez@iesjulianmarias.es</p>
    </footer>
</body>

</html>