<?php
session_start();
require_once "conexion.php";

$data = json_decode(file_get_contents("php://input"), true);
$campo = $data['campo'];
$valor = $data['valor'];
$idUser = $_SESSION['idUsuario'];



$camposPermitidos = ['nombre', 'apellidos', 'puesto_trabajo', 'empresa', 'departamento', 'telefono', 'fecha_ingreso', 'ubicacion'];


try {

    if (!in_array($campo, $camposPermitidos)) {
        throw new Exception("Campo no permitido");
    }

    if (empty($valor)) {
        throw new Exception("El valor no puede estar vacío");
    }

    $sql = "UPDATE Usuarios SET $campo = ? WHERE id = ?";
    $update = $bd->prepare($sql);
    $update->execute([$valor, $idUser]);

    echo json_encode(array("success" => "Registro exitoso"));

} catch (PDOException $e) {
    echo json_encode(array("error" => "Error al realizar la consulta: " . $e->getMessage()));
} catch (Exception $e) {
    echo json_encode(array("error" => "Error en el servidor: " . $e->getMessage()));
}
