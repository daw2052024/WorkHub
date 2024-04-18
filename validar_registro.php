<?php
$data = json_decode(file_get_contents("php://input"), true);
$nombre = $data['nombre'];
$email = $data['email'];
$password = $data['password'];
$confPwd = $data['confPwd'];


try {
    // Validar campos vacíos
    if (empty($nombre)) {
        echo json_encode(array("error" => "name_vacio"));
        exit();
    }

    if (empty($email)) {
        echo json_encode(array("error" => "email_vacio"));
        exit();
    }

    if (empty($password)) {
        echo json_encode(array("error" => "password_vacio"));
        exit();
    }

    if (empty($confPwd)) {
        echo json_encode(array("error" => "confPassword_vacio"));
        exit();
    }

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

    // Conexión a la base de datos
    $bd = new PDO('mysql:dbname=workhub_bd;host=localhost', 'root', '');
    $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $stmt = $bd->prepare("INSERT INTO Usuarios(nombre, correo, pwd) VALUES (?, ?, ?)");
    $stmt->execute([$nombre, $email, $password]);

    echo json_encode(array("success" => "Registro exitoso"));

} catch (PDOException $e) {
    echo json_encode(array("error" => "Error al conectar a la base de datos: " . $e->getMessage()));
} catch (Exception $e) {
    echo json_encode(array("error" => "Error en el servidor: " . $e->getMessage()));
}
