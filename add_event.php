<?php

$file_path = 'JavaScript/events.json';


$event_data = $_POST['event_data'];

// $event_data = array(
//     'eventTitle' => 'Nuevo Evento',
//     'eventStartDate' => '2024-05-07',
//     'eventEndDate' => '2024-05-07',
//     'eventStartTime' => '10:00 AM',
//     'eventEndTime' => '12:00 PM',
//     'eventLocation' => 'Ubicación del Nuevo Evento',
//     'eventUrl' => 'https://ejemplo.com'
// );


if (!isset($event_data)) {
    $response = array('success' => false, 'message' => 'No se recibieron datos del evento');
    echo json_encode($response);
    exit(); 
}

$current_data = file_get_contents($file_path);

if ($current_data === false) {
    $response = array('success' => false, 'message' => 'No se pudo leer el archivo JSON');
    echo json_encode($response);
    exit(); 
}

$data_array = json_decode($current_data, true);

if ($data_array === null) {
    $response = array('success' => false, 'message' => 'No se pudo decodificar el JSON');
    echo json_encode($response);
    exit();
}

$data_array['events'][] = $event_data;

$new_data_json = json_encode($data_array);

$result = file_put_contents($file_path, $new_data_json);

if ($result === false) {
    $response = array('success' => false, 'message' => 'No se pudo escribir en el archivo JSON');
    echo json_encode($response);
    exit(); 
}

$response = array('success' => true, 'message' => 'Evento insertado correctamente');
echo json_encode($response);
