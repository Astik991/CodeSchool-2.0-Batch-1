<?php

require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $response = ["status" => false, "message" => "", "data" => null];

    if (!isset($_GET['cinema_hall_id'])) {
        $response["message"] = "cinema hall id is missing!";
        echo json_encode($response);
        exit;
    }

    $cinemaHallId = $_GET['cinema_hall_id'];
    $pdo = getPDO();

    $query = "SELECT * FROM cinema_hall where id= ?";

    $statment = $pdo->prepare($query);
    $statment->execute([$cinemaHallId]);
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);

    $response["message"] = "Success";
    $response["status"] = true;
    $response["data"] = $user;
    echo json_encode($response);
    exit;
}
