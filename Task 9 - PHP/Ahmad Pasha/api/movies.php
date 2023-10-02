<?php

require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $response = ["status" => false, "message" => "", "data" => null];

    $pdo = getPDO();
    $query = "SELECT * FROM movies";

    $statment = $pdo->prepare($query);
    $statment->execute();
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);


    $response["message"] = "Success";
    $response["status"] = true;
    $response["data"] = $user;
    echo json_encode($response);
    exit;
} else if ($_SERVER["REQUEST_METHOD"] == 'POST') {

    $movieData = $_POST;

    $movieName = strval($movieData['movie_name']);
    $image = $_FILES['image_url']['name'];
    $description = strval($movieData['description']);
    $duration = strval($movieData['duration']);
    $language = strval($movieData['language']);
    $releaseDate = strval($movieData['releaseDate']);
    $genre = strval($movieData['genre']);
    $cinemaHallId = $movieData['cinemaHallId'];

    $inputString = $cinemaHallId;
    $explodedArray = explode(",", $inputString);

    // Convert string elements to integers if needed
    $integerArray = array_map('intval', $explodedArray);

    if (!isset($movieName)) {
        echo "movieName is required!";
        exit;
    }
    if (!isset($description)) {
        echo "description is required!";
        exit;
    }
    if (!isset($duration)) {
        echo "duration is required!";
        exit;
    }
    if (!isset($language)) {
        echo "language is required!";
        exit;
    }
    if (!isset($releaseDate)) {
        echo "releaseDate is required!";
        exit;
    }
    if (!isset($genre)) {
        echo "genre is required!";
        exit;
    }
    if (!isset($image)) {
        echo "imageUrl is required!";
        exit;
    }
    if (!isset($cinemaHallId)) {
        echo "cinemaHallId is required!";
        exit;
    }



    $response = ["status" => true, "message" => "", "data" => null];

    $pdo = getPDO();
    if (!$pdo) {
        $response["status"] = false;
        $response["message"] = "Database Not Connected!";
        echo json_encode($response);
        exit;
    }


    $query = "SELECT * FROM  movies WHERE name= ?";

    $statment = $pdo->prepare($query);
    $statment->execute([
        $movieName
    ]);
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);
    if (count($user) == 1) {
        $response["message"] = "Movie Already Present!";
        $response["data"] = $user[0]["id"];
        echo json_encode($response);
        exit;
    }

    $imageLocation = '../assets/images/' . $image;
    // On successful storing image to path.
    if (move_uploaded_file($_FILES['image_url']['tmp_name'], $imageLocation)) {

        $query = "INSERT INTO movies (name,description, duration,language,release_date,genre,image_url) VALUES (?, ?, ?, ?, ?, ?, ?)";

        $statement = $pdo->prepare($query);
        $statement->execute([
            $movieName,
            $description,
            $duration,
            $language,
            $releaseDate,
            $genre,
            $imageLocation
        ]);
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        $query2 = "SELECT id FROM movies WHERE name = ?";
        $statement2 = $pdo->prepare($query2);
        $statement2->execute([
            $movieName
        ]);
        $selectResult = $statement2->fetch(PDO::FETCH_ASSOC);
        $movieId = $selectResult['id'];
        foreach ($integerArray as $hall => $val) {
            $status = 0;
            $query3 = "INSERT INTO movie_theaters(movie_id,cinema_hall_id) VALUES (?, ?)";

            $statement3 = $pdo->prepare($query3);
            $result3 = $statement3->execute([
                $movieId,
                $val
            ]);

            for ($shows = 1; $shows <= 4; $shows++) {

                $seatNumbers = ['A_01', 'A_02', 'A_03', 'A_04', 'A_05', 'A_06', 'B_01', 'B_02', 'B_03', 'B_04', 'B_05', 'B_06', 'C_01', 'C_02', 'C_03', 'C_04', 'C_05', 'C_06', 'D_01', 'D_02', 'D_03', 'D_04', 'D_05', 'D_06', 'E_01', 'E_02', 'E_03', 'E_04', 'E_05', 'E_06'];

                for ($x = 0; $x < 30; $x++) {
                    $query4 = "INSERT INTO cinema_seat(seat_number,status,show_id,movie_id,cinema_hall_id) VALUES (?, ?, ?, ?, ?)";

                    $statement4 = $pdo->prepare($query4);
                    $result4 = $statement4->execute([
                        $seatNumbers[$x], $status, $shows, $movieId, $val
                    ]);
                }
            }
        }


        if (!$result) {
            $response["message"] = $statment->errorInfo();
            echo json_encode($response);
        }

        $response["status"] = true;
        $response["message"] = "Successfully Entered!";
        $response["data"] = $result;
        echo json_encode($response);
        exit;
    }
    echo "Only POST request is accepted!";
}
