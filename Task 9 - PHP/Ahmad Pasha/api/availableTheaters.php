<?php

require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $response = ["status" => false, "message" => "", "data" => null];
    if (!isset($_GET["movie_id"])) {
        $response["message"] = "Movie ID is missing!";
        echo json_encode($response);
        exit;
    }

    $movieId = $_GET["movie_id"];
    $pdo = getPDO();
    $query = "SELECT m.name,c.address,c.name,c.id cenima_hall_id,string_agg(CAST(s.id AS VARCHAR),',') AS Ids, STRING_AGG(start_time,',') AS show_times FROM movies m
    INNER JOIN movie_theaters mt on m.id = mt.movie_id
    INNER JOIN cinema_hall c on c.id= mt.cinema_hall_id
    INNER JOIN show s on c.id=s.cinema_hall_id WHERE m.id= ?
    GROUP BY c.id,m.name,c.name
ORDER BY c.id;";

    $statment = $pdo->prepare($query);
    $statment->execute([$movieId]);
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);

    if (count($user) >= 1) {
        $response["message"] = "Success";
        $response["status"] = true;
        $response["data"] = $user;
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = false;
        $response["message"] = "No theaters found!";
        echo json_encode($response);
        exit;
    }
}
