<?php
session_start();
require_once "conexion.php";
$idUser = $_SESSION['idUsuario'];

try {
    $sql = "SELECT fecha, hora_entrada, hora_salida, tiempo_trabajado FROM Fichajes 
    WHERE id_usuario=" . $idUser . ";";
    $fichajes = $bd->query($sql);
    $varArray = [];

    foreach ($fichajes as $fichaje) {
        $varArray[] = array(
            "fecha" => $fichaje['fecha'],
            "hora_entrada" => $fichaje['hora_entrada'],
            "hora_salida" => $fichaje['hora_salida'],
            "tiempo_trabajado" => $fichaje['tiempo_trabajado']
        );

    }
    echo json_encode($varArray);


} catch (\PDOException $e) {
    echo json_encode(array("error" => "Error al realizar la consulta: " . $e->getMessage()));
}


