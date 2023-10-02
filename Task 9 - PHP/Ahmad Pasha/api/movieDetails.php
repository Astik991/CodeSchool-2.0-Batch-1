<?php

require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $response = ["status" => false, "message" => "", "data" => null];
    if (!isset($_GET["id"])) {
        $response["message"] = "Movie Id is missing!";
        echo json_encode($response);
        exit;
    }

    $movieId = $_GET["id"];
    $pdo = getPDO();
    $query = "SELECT * FROM movies WHERE id = ?";

    $statment = $pdo->prepare($query);
    $statment->execute([$movieId]);
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);


    if (count($user) == 1) {
        $response["message"] = "Success";
        $response["status"] = true;
        $response["data"] = $user[0];
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = false;
        $response["message"] = "Page not found!";
        echo json_encode($response);
        exit;
    }
}
