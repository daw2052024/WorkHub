<?php
session_start();
$_SESSION = array(); // Borramos la variable de sesión
session_destroy(); // Eliminar la sesion
setcookie(session_name(), 123, time() - 1000); // Eliminar la cookie
header("Location: login.php");



