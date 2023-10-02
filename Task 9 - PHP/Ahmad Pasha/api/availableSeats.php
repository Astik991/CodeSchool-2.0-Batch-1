<?php

require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $response = ["status" => false, "message" => "", "data" => null];

    if (!isset($_GET['cinema_hall_id'])) {
        $response["message"] = "cinema hall id is missing!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_GET['movie_id'])) {
        $response["message"] = "movieId is missing!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_GET["show_id"])) {
        $response["message"] = "Show ID is missing!";
        echo json_encode($response);
        exit;
    }

    $cinemaHallId = $_GET['cinema_hall_id'];
    settype($cinemaHallId, "integer");
    $movieId = $_GET['movie_id'];
    settype($movieId, "integer");
    $showId = $_GET["show_id"];
    settype($showId, "integer");
    $pdo = getPDO();
    $query = "SELECT * FROM cinema_seat where cinema_hall_id = ? AND movie_id= ? AND show_id= ? ORDER BY seat_number;";

    $statment = $pdo->prepare($query);
    $statment->execute([$cinemaHallId, $movieId, $showId]);
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);
    $response["message"] = "Success";
    $response["status"] = true;
    $response["data"] = $user;
    echo json_encode($user);
    exit;
    echo json_encode($response);
    exit;

    if (count($user) >= 1) {
        $response["message"] = "Success";
        $response["status"] = true;
        $response["data"] = $user;
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = false;
        $response["message"] = "House Full found!";
        echo json_encode($response);
        exit;
    }
} else if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $response = ["status" => false, "message" => ""];

    if (!isset($_POST["selectedSeats"])) {
        $response["message"] = "selectedSeats is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST['showId'])) {
        $response["message"] = "showId is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["cinemaHallId"])) {
        $response["message"] = "cinemaHallId is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST['movieId'])) {
        $response["message"] = "movieId is required!";
        echo json_encode($response);
        exit;
    }

    $selectedSeats = $_POST["selectedSeats"];
    $showId = $_POST['showId'];
    $cinemaHallId = $_POST["cinemaHallId"];
    $movieId = $_POST['movieId'];
    $status = 1;

    $pdo = new PDO("pgsql:host=localhost;port=5432;dbname=bookmyshow;user=postgres;password=postgres");
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
        echo json_encode($response);
        exit;
    }

    foreach ($selectedSeats as $property => $value) {

        $query = "UPDATE cinema_seat
        SET status= 1
        where  seat_number = ? AND show_id = ? AND  movie_id = ? AND cinema_hall_id = ?;";
        $statment = $pdo->prepare($query);
        $result = $statment->execute([$value, $showId, $movieId, $cinemaHallId]);


        $response["status"] = true;
        $response["message"] = "Successfully Registered!";
        echo json_encode($response);
    }

    exit;
}

$response["message"] = "ONLY POST method Accepted";
echo json_encode($response);
