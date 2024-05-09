<?php
session_start();
require_once "conexion.php";

// Verificar si hay una sesión activa
if (!isset($_SESSION['correoUsuario'])) {
    header("Location: login.php");
    exit();
}

// Verificar si se ha enviado un archivo de foto de perfil
if (isset($_FILES['foto'])) {
    $foto = $_FILES['foto'];
    $directorio = 'Recursos/FotosUser/';

    $rutaFoto = $directorio . $foto['name'];

    if (move_uploaded_file($foto['tmp_name'], $rutaFoto)) {
        $idUser = $_SESSION['idUsuario'];

        $update = $bd->prepare("UPDATE Usuarios SET foto_perfil = ? WHERE id = ?");
        if ($update->execute([$rutaFoto, $idUser])) {
            header("Location: perfil.php");
            exit();
        } else {
            echo "Error al actualizar la foto de perfil.";
        }
    } else {
        echo "Error al mover la foto de perfil al directorio.";
    }
}

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="Styles/indexStyles.css">
    <script defer src="JavaScript/perfil.js"></script>
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
    <div id="background-image">
        <img id="imgFondo" src="Recursos/Otros/pexels-tirachard-kumtanom-112571-733852.jpg">
    </div>
    <section id="perfil">
        <h2 id="titulo_perfil">Mi Perfil</h2>
        <div class="perfil-info">
            <div class="foto-perfil">
                <img id="foto-user" alt="Foto de perfil">
            </div>
            <div class="datos-personales">
                <h3>Datos Personales</h3>
            </div>
        </div>
        <button id="editarPerfilBtn">Editar perfil</button>
        <div id="editarPerfilContainer" style="display: none;">
            <div class="editar-perfil">
                <h3>Editar Perfil</h3>
                <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" enctype="multipart/form-data">
                    <label for="foto">Foto de perfil:</label>
                    <input type="file" id="foto" name="foto">
                    <br></br>
                    <button type="submit">Cambiar foto de perfil</button>
                </form>


                <form id="insert-data" action="#" method="post" enctype="multipart/form-data">


                    <label for="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre">
                    <div id="name-error-container">
                    </div>

                    <label for="apellidos">Apellidos</label>
                    <input type="text" id="apellidos" name="apellidos">
                    <div id="apellidos-error-container">
                    </div>

                    <label for="puesto">Puesto de trabajo:</label>
                    <input type="text" id="puesto" name="puesto">
                    <div id="puesto-error-container">
                    </div>

                    <label for="empresa">Empresa:</label>
                    <input type="text" id="empresa" name="empresa">
                    <div id="empresa-error-container">
                    </div>

                    <label for="departamento">Departamento:</label>
                    <input type="text" id="departamento" name="departamento">
                    <div id="departamento-error-container">
                    </div>

                    <label for="telefono">Teléfono:</label>
                    <input type="tel" id="telefono" name="telefono">
                    <div id="telefono-error-container">
                    </div>

                    <label for="fecha-ingreso">Fecha de ingreso:</label>
                    <input type="date" id="fecha-ingreso" name="fecha-ingreso">
                    <div id="fecha-error-container">
                    </div>

                    <label for="ubicacion">Ubicación:</label>
                    <input type="text" id="ubicacion" name="ubicacion">
                    <div id="ubicacion-error-container">
                    </div>

                    <button type="submit">Guardar cambios</button>
                </form>
            </div>
        </div>
    </section>

    <footer>
        <p>Derechos de autor © 2024 | WorkHub</p>
        <p>Contacto: marcos.piedrahita.tellez@iesjulianmarias.es</p>
    </footer>
</body>

</html>