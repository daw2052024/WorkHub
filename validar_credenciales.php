<?php
session_start();
require_once "conexion.php"; // Incluir el archivo de conexión

// Obtener datos del usuario
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

try {
    $select = "SELECT id FROM Usuarios WHERE correo=:email AND pwd=:password";
    $query = $bd->prepare($select);
    $query->bindParam(':email', $email);
    $query->bindParam(':password', $password);
    $query->execute();

    // Comprobar si el usuario existe con los datos proporcionados
    if ($query->rowCount() > 0) {
        $userData = $query->fetch(PDO::FETCH_ASSOC);
        $idUsuario = $userData['id'];
        if (!isset($_SESSION['idUsuario']) && !isset($_SESSION['correoUsuario'])) {
            createSession($idUsuario, $email);
        }
        echo json_encode(array("success" => "Inicio de sesión exitoso"));
    } else {
        // Verificar si el correo electrónico y/o la contraseña son incorrectos
        $selectEmail = "SELECT id FROM Usuarios WHERE correo=:email";
        $queryEmail = $bd->prepare($selectEmail);
        $queryEmail->bindParam(':email', $email);
        $queryEmail->execute();

        $selectPwd = "SELECT id FROM Usuarios WHERE pwd=:password";
        $queryPassword = $bd->prepare($selectPwd);
        $queryPassword->bindParam(':password', $password);
        $queryPassword->execute();

        if ($queryEmail->rowCount() == 0 && $queryPassword->rowCount() == 0) {
            echo json_encode(array("error" => "email and pwd"));
        } elseif ($queryEmail->rowCount() == 0) {
            echo json_encode(array("error" => "email"));
        } else if ($queryPassword->rowCount() == 0) {
            echo json_encode(array("error" => "pwd"));
        }
    }
} catch (\PDOException $e) {
    echo json_encode(array("error" => "Error al realizar la consulta: " . $e->getMessage()));
}

function createSession($id, $emailUser)
{
    $_SESSION['idUsuario'] = $id;
    $_SESSION['correoUsuario'] = $emailUser;
}

