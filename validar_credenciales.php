<?php
session_start();
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

try {
    $bd = new PDO('mysql:dbname=workhub_bd;host=localhost', 'root', '');
    $select = "SELECT id FROM Usuarios WHERE correo='" . $email . "' AND pwd='" . $password . "';";
    $user = $bd->query($select);

    //Compruebo que el usuario existe con los datos proporcionados
    if ($user->rowCount() > 0) {
        if (!isset($_SESSION['idUsuario']) && !isset($_SESSION['correoUsuario'])) {
            createSession($idUser, $email);
        }
        echo json_encode(array("success" => "Inicio de sesion exitoso"));
    } else {
        // Verificar si el correo electrónico es incorrecto
        $selectEmail = "SELECT id FROM Usuarios WHERE correo= '" . $email . "'";
        $queryEmail = $bd->prepare($selectEmail);
        $queryEmail->execute();

        // Verificar si la contraseña es incorrecta
        $selectPwd = "SELECT id FROM Usuarios WHERE pwd='" . $password . "';";
        $queryPassword = $bd->prepare($selectPwd);
        $queryPassword->execute();

        if ($queryEmail->rowCount() == 0 && $queryPassword->rowCount() == 0) {
            echo json_encode(array("error" => "email and pwd"));
        } elseif ($queryEmail->rowCount() == 0) {
            echo json_encode(array("error" => "email"));
        } else if ($queryPassword->rowCount() == 0) {
            echo json_encode(array("error" => "pwd"));
        }
    }


} catch (\Throwable $th) {
    echo json_encode(array("error" => "Error al conectar a la base de datos: " . $th->getMessage()));
}


function createSession($id, $emailUser)
{
    $_SESSION['idUsuario'] = $id;
    $_SESSION['correoUsuario'] = $emailUser;
}

