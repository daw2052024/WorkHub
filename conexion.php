<?php
// Establecer la conexión a la base de datos
try {
    $bd = new PDO('mysql:dbname=workhub_bd;host=localhost', 'root', '');
} catch (\PDOException $e) {

    echo json_encode(array("error" => "Error al conectar a la base de datos: " . $e->getMessage()));
    exit; // Detener la ejecución del script si hay un error de conexión
}
