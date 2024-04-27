<?php
session_start();

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
    <script defer src="JavaScript/fichajes.js"></script>
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
                <li><a href="fichaje.php">Fichajes</a></li>
                <li><a href="#">Calendario</a></li>
                <li><a href="#">Perfil</a></li>
                <li><a href="delete_session.php">Salir</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <div id="background-image">
            <img id="imgFondo" src="Recursos/Otros/pexels-tirachard-kumtanom-112571-733857.jpg">
        </div>


        <div id="fichajes-container">
            <!-- Aquí se cargarán los fichajes del usuario -->
            <table id="fichajes-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Entrada</th>
                        <th>Salida</th>
                        <th>Tiempo</th>
                    </tr>
                </thead>
                <tbody id="tBody">
                    <!-- Los fichajes se agregarán aquí mediante JavaScript -->
                </tbody>
            </table>
        </div>
    </main>

    <footer>
        <p>Derechos de autor © 2024 | WorkHub</p>
        <p>Contacto: marcos.piedrahita.tellez@iesjulianmarias.es</p>
    </footer>
</body>

</html>