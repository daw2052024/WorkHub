<?php
require_once "conexion.php";

$data = json_decode(file_get_contents("php://input"), true);
$nombre = $data['nombre'];
$email = $data['email'];
$password = $data['password'];
$confPwd = $data['confPwd'];

try {

    // Validar campos
    if (!preg_match("/^[a-zA-Z\s-]+$/", $nombre)) {
        echo json_encode(array("error" => "nombre_invalido"));
        exit();
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(array("error" => "email_invalido"));
        exit();
    }

    if (trim($password) !== trim($confPwd)) {
        echo json_encode(array("error" => "contraseña_no_coincide"));
        exit();
    }
    // Verificar si el correo electrónico ya está registrado
    $stmt = $bd->prepare("SELECT correo FROM Usuarios WHERE correo = ?");
    $stmt->execute([$email]);
    $existingEmail = $stmt->fetchColumn();

    if ($existingEmail) {
        echo json_encode(array("error" => "usuario_existe"));
        exit();
    }


    // Insertar usuario en la base de datos
    $stmt = $bd->prepare("INSERT INTO Usuarios(nombre, correo, pwd) VALUES (?, ?, ?)");
    $stmt->execute([$nombre, $email, $password]);

    echo json_encode(array("success" => "Registro exitoso"));

} catch (PDOException $e) {
    echo json_encode(array("error" => "Error al realizar la consulta: " . $e->getMessage()));
} catch (Exception $e) {
    echo json_encode(array("error" => "Error en el servidor: " . $e->getMessage()));
}

