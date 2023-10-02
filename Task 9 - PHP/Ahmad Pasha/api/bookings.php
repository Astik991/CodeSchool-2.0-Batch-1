<?php
require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $response = ["status" => false, "message" => ""];

    if (!isset($_POST["selectedSeats"])) {
        $response["message"] = "selectedSeats is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["showId"])) {
        $response["message"] = "showId is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["cinemaHallId"])) {
        $response["message"] = "cinemaHallId is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["movieId"])) {
        $response["message"] = "movieId is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["userId"])) {
        $response["message"] = "userId is required!";
        echo json_encode($response);
        exit;
    }

    $selectedSeats = $_POST["selectedSeats"];
    $selectedSeats = implode(',', $selectedSeats);
    $showId = $_POST["showId"];
    $cinemaHallId = $_POST['cinemaHallId'];
    $movieId = $_POST['movieId'];
    $userId = $_POST['userId'];

    $pdo = new PDO("pgsql:host=localhost;port=5432;dbname=bookmyshow;user=postgres;password=postgres");
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
        echo json_encode($response);
        exit;
    }

    $query = "INSERT INTO bookings (seats,show_id, cinema_hall_id,movie_id,user_id) VALUES (?, ?, ?, ?,?)";

    $statment = $pdo->prepare($query);
    $result = $statment->execute([$selectedSeats, $showId, $cinemaHallId, $movieId, $userId]);

    if (!$result) {
        $response["message"] = $statment->errorInfo();
        echo json_encode($response);
    }

    $response["status"] = true;
    $response["message"] = "Successfully Booked!";
    echo json_encode($response);
    exit;
    $response["message"] = "ONLY POST method Accepted";
    echo json_encode($response);
} else if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $response = ["status" => false, "message" => "", "data" => null];
    if (!isset($_GET["user_id"])) {
        $response["message"] = "userId is missing!";
        echo json_encode($response);
        exit;
    }

    $userId = $_GET["user_id"];

    $pdo = getPDO();
    $query = "SELECT seats,start_time,cinema_hall.name as cName,movies.name as mName,cinema_hall.address,movies.image_url as img FROM bookings INNER join show on show.id=bookings.show_id
    inner JOIN cinema_hall on cinema_hall.id= bookings.cinema_hall_id
    INNER JOIN movies on movies.id = bookings.movie_id
    INNER JOIN users on users.id = bookings.user_id
    WHERE users.id = ?;";

    $statment = $pdo->prepare($query);
    $statment->execute([$userId]);
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);


    if (count($user) >= 1) {
        $response["message"] = "Success";
        $response["status"] = true;
        $response["data"] = $user;
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = false;
        $response["message"] = "bookings not found!";
        echo json_encode($response);
        exit;
    }
}
