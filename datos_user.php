<?php
session_start();
require_once "conexion.php";
$idUser = $_SESSION['idUsuario'];

try {
    $sql = "SELECT * FROM Usuarios 
    WHERE id=" . $idUser . ";";
    $datos_user = $bd->query($sql);
    $varArray = [];

    foreach ($datos_user as $datos) {
        $varArray[] = array(
            "foto_perfil" => $datos['foto_perfil'],
            "Nombre" => $datos['nombre'],
            "Apellidos" => $datos['apellidos'],
            "Correo" => $datos['correo'],
            "puesto_trabajo" => $datos['puesto_trabajo'],
            "Empresa" => $datos['empresa'],
            "Departamento" => $datos['departamento'],
            "Telefono" => $datos['telefono'],
            "fecha_ingreso" => $datos['fecha_ingreso'],
            "ubicacion" => $datos['ubicacion']
        );

    }
    echo json_encode($varArray);


} catch (\PDOException $e) {
    echo json_encode(array("error" => "Error al realizar la consulta: " . $e->getMessage()));
}
