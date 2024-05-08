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
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js'></script>
    <link rel="stylesheet" type="text/css" href="Styles/indexStyles.css">
    <script defer src="JavaScript/calendario.js"></script>
    <title>Calendario</title>
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
        <div id='calendar'></div>

        <button id="editarPerfilBtn">Intoducir evento</button>

        <div id="datosCalendario" style="max-width: 1000px; margin: auto; display: none;">

            <div class="editar-perfil">
                <form id="insert-data" action="add_event.php" method="post" enctype="multipart/form-data">

                    <label for="nombreEvento">Nombre del evento</label>
                    <input type="text" id="nombreEvento" name="nombreEvento">
                    <div id="name-error-container">
                    </div>

                    <label for="fecha-comienzo">Fecha de inicio:</label>
                    <input type="date" id="fecha-comienzo" name="fecha-comienzo">
                    <div id="fechaInicio-error-container">
                    </div>

                    <label for="hora-comienzo">Hora de comienzo:</label>
                    <input type="time" id="hora-comienzo" name="hora-comienzo">
                    <div id="horaInicio-error-container">
                    </div>

                    <label for="fecha-final">Fecha de fin:</label>
                    <input type="date" id="fecha-final" name="fecha-final">
                    <div id="fechaFinal-error-container">
                    </div>

                    <label for="hora-fin">Fecha de fin:</label>
                    <input type="time" id="hora-fin" name="hora-fin">
                    <div id="horaFin-error-container">
                    </div>

                    <label for="ubicacion">Donde ocurre:</label>
                    <input type="text" id="ubicacion" name="ubicacion">
                    <div id="ubicacion-error-container">
                    </div>

                    <button type="submit">Guardar evento</button>

                </form>
            </div>
        </div>
    </main>

    <footer>
        <p>Derechos de autor © 2024 | WorkHub</p>
        <p>Contacto: marcos.piedrahita.tellez@iesjulianmarias.es</p>
    </footer>
</body>

</html>