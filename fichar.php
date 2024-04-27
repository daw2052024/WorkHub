<?php
session_start();
require_once "conexion.php";

$data = json_decode(file_get_contents("php://input"), true);
$fecha = $data['fecha'];
$horaEntrada = $data['horaEntrada'];
$horaSalida = $data['horaSalida'];
$tiempo = $data['tiempo'];
$idUser = $_SESSION['idUsuario'];

try {

    // Insertar fichaje en la base de datos
    $stmt = $bd->prepare("INSERT INTO Fichajes (id_usuario, fecha, hora_entrada, hora_salida,
        tiempo_trabajado) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$idUser, $fecha, $horaEntrada, $horaSalida, $tiempo]);

    echo json_encode(array("success" => "Registro de jornada exitoso"));


} catch (PDOException $e) {
    echo json_encode(array("error" => "Error al realizar el insert: " . $e->getMessage()));
} catch (Exception $e) {
    echo json_encode(array("error" => "Error en el servidor: " . $e->getMessage()));
}
