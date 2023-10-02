<?php
require_once "./sessionTimeOut.php";
require_once "./dbConfig.php";


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = ["status" => false, "message" => "", "data" => null];

    if (empty($_REQUEST["location"])) {
        http_response_code(400);
        echo "*Location is not configured in your call";
        exit;
    }

    if (empty($_REQUEST["destination"])) {
        http_response_code(400);
        echo "*Destination is not configured in your call";
        exit;
    }

    if (empty($_REQUEST["rideType"])) {
        http_response_code(400);
        echo "*Ride Type is not configured in your call";
        exit;
    }


    $location = $_POST["location"];
    $destination = $_POST["destination"];
    $rideType = $_POST["rideType"];



    try {
        $pdo = getPDO();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $pdo->beginTransaction();
        //get email from user id 
        $getUserEmail = "select users.id,users.email from users where id=(select users_id from sessions where token=?);";
        $statement1 = $pdo->prepare($getUserEmail);
        $statement1->execute([$_SESSION["session_token"]]);
        $result1 = $statement1->fetch(PDO::FETCH_ASSOC);

        // check if user has any active ride

        $userActiveRide = "select * from trips where users_id=? and (trip_statuses_id=? or trip_statuses_id=?)";
        $statement2 = $pdo->prepare($userActiveRide);
        $statement2->execute([$result1["id"], 1, 2]);
        $result2 = $statement2->fetchAll(PDO::FETCH_COLUMN);

        if (count($result2) > 0) {
            $pdo->rollBack();
            $response["status"] = false;
            $response["message"] = "User has active ride";
            echo json_encode($response);
            exit;
        }


        //get Eligible driver
        $getEligibleDrivers = "SELECT id
        FROM (
            SELECT users.id
            FROM users
            INNER JOIN vehicles ON vehicles.drivers_id = users.id
            WHERE vehicles.ride_types_id = ?
            AND users.email != ?
            EXCEPT
            SELECT trips.drivers_id
            FROM trips 
            WHERE trips.ride_types_id = ? AND (trips.trip_statuses_id = ? OR trips.trip_statuses_id = ?)
        ) AS eligible_drivers
        ORDER BY RANDOM()
        LIMIT 1;
        ";
        $statement3 = $pdo->prepare($getEligibleDrivers);
        $statement3->execute([$rideType, $result1["email"], 1, 1, 2]);
        $result3 = $statement3->fetchColumn();

        if (!$result3) {
            $pdo->rollBack();
            $response["status"] = false;
            $response["message"] = "No active drivers";
            echo json_encode($response);
            exit;
        }


        //add location details

        $query = "INSERT INTO address (state, city, area, pincode, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?),(?, ?, ?, ?, ?, ?) RETURNING id;";
        $statement4 = $pdo->prepare($query);
        $statement4->execute([$location["state"], $location["city"], $location["area"], $location["pincode"], $location["latitude"], $location["longitude"], $destination["state"], $destination["city"], $destination["area"], $destination["pincode"], $destination["latitude"], $destination["longitude"]]);
        $generatedIDs = $statement4->fetchAll(PDO::FETCH_COLUMN);
        if (count($generatedIDs) !== 2) {
            $pdo->rollBack();
            $response["status"] = false;
            $response["message"] = "There is a problem adding locations";
            $response["data"] = $generatedIDs;
            echo json_encode($response);
            exit;
        }



        //add trips

        $tripQuery = "INSERT INTO trips (drivers_id, users_id,location_id, destination_id, price, start_date,end_date,trip_statuses_id,ride_types_id) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $tripStartDate = new DateTime();
        $tripEndDate = clone $tripStartDate;
        $tripEndDate->add(new DateInterval('PT1H'));
        $statement5 = $pdo->prepare($tripQuery);
        $trip = $statement5->execute([
            $result3,
            $result1["id"],
            $generatedIDs[0],
            $generatedIDs[1],
            500,
            $tripStartDate->format('Y-m-d H:i:s'),
            $tripEndDate->format('Y-m-d H:i:s'),
            1,
            $rideType
        ]);

        if ($trip) {
            $pdo->commit();
            $response["status"] = true;
            $response["message"] = "trips added";
            echo json_encode($response);
        } else {
            $pdo->rollBack();
            $response["status"] = false;
            $response["message"] = "issue wth trips";
            echo json_encode($response);
        }
    } catch (PDOException $e) {
        http_response_code(400);
        error_log($e->getMessage());
        echo "*An unexpected error occurred. Please try again later.";
        // echo $e->getMessage();
        exit;
    }
} else {
    http_response_code(400);
    echo "*Sorry for the inconvience we will get back to you";
}
