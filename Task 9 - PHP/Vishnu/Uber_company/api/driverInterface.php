<?php
require_once "./sessionTimeOut.php";
require_once "./dbConfig.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $response = ["status" => false, "message" => "", "data" => null];

    try {
        $pdo = getPDO();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->beginTransaction();
        $query = "select users_id from sessions where token=?;";
        $statement1 = $pdo->prepare($query);
        $statement1->execute([$_SESSION["session_token"]]);
        $result1 = $statement1->fetchColumn();
        if (!$result1) {
            $pdo->rollBack();
            $response["status"] = false;
            $response["message"] = "Token authentication failed";
            echo json_encode($response);
            exit;
        }

        $tripIdQuery = "select trips.id,users.name,l.area as location,d.area as destination,trips.start_date,trips.end_date,trip_statuses.description as status from trips inner join address l on trips.location_id=l.id inner join address d on trips.destination_id=d.id
        inner join users ON trips.users_id=users.id inner join trip_statuses on trips.trip_statuses_id=trip_statuses.id where trips.drivers_id=? and (trip_statuses_id=? or trip_statuses_id=?);";
        $statement2 = $pdo->prepare($tripIdQuery);
        $statement2->execute([$result1, 1, 2]);
        $result2 = $statement2->fetchAll(PDO::FETCH_ASSOC);

        if (!count($result2) === 1) {
            $pdo->rollBack();
            $response["status"] = false;
            $response["message"] = "*There are no current rides";
            echo json_encode($response);
            exit;
        } else {
            $pdo->commit();
            $response["status"] = true;
            $response["message"] = "Fetched assigned ride";
            $response["data"] = $result2;
            echo json_encode($response);
            exit;
        }
    } catch (PDOException $p) {
        http_response_code(400);
        error_log($e->getMessage());
        echo "*An unexpected error occurred. Please try again later.";
        // echo $e->getMessage();
        // echo "only post call accepted";
        exit;
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = ["status" => false, "message" => "", "data" => null];

    if (empty($_REQUEST["tripStatusId"])) {
        http_response_code(400);
        echo "*Trip status id is not defined";
        exit;
    }

    $tripStatusId = $_REQUEST['tripStatusId'];

    try {
        $pdo = getPDO();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->beginTransaction();

        $query = "select users_id from sessions where token=?;";
        $statement1 = $pdo->prepare($query);
        $statement1->execute([$_SESSION["session_token"]]);
        $result1 = $statement1->fetchColumn();
        if (!$result1) {
            $pdo->rollBack();
            $response["status"] = false;
            $response["message"] = "Token authentication failed";
            echo json_encode($response);
            exit;
        }



        $tripIdQuery = "select id,trip_statuses_id from trips where drivers_id=? and (trip_statuses_id=? or trip_statuses_id=?);";
        $statement2 = $pdo->prepare($tripIdQuery);
        $statement2->execute([$result1, 1, 2]);
        $result1 = $statement2->fetch(PDO::FETCH_ASSOC);
        if ($result2 && !count($result2) === 1) {
            $pdo->rollBack();
            $response["status"] = false;
            $response["message"] = "*User has no rides currently";
            echo json_encode($response);
            exit;
        }

        $updateTripStatusQuery = "";
        if (($tripStatusId == 2 || $tripStatusId == 3) && $result1["trip_statuses_id"] === 1) {
            $updateTripStatusQuery = "update trips set trip_statuses_id=? where id=?;";
        } else if (($tripStatusId == 4 || $tripStatusId == 3) && $result1["trip_statuses_id"] === 2) {
            $updateTripStatusQuery = "update trips set trip_statuses_id=? where id=?;";
        } else {
            $pdo->rollBack();
            $response["status"] = false;
            $response["message"] = "*Status not updated";
            $response["data"] = $result2["trip_statuses_id"];
            echo json_encode($response);
            exit;
        }
        $statement2 = $pdo->prepare($updateTripStatusQuery);
        $result2 = $statement2->execute([$tripStatusId, $result1["id"]]);

        if (!$result2) {
            $pdo->rollBack();
            $response["status"] = false;
            $response["message"] = "*Status not updated";
            echo json_encode($response);
            exit;
        } else {
            $pdo->commit();
            $response["status"] = true;
            $response["message"] = "*updated the trip";
            $response["data"] = $tripStatusId;
            echo json_encode($response);
            exit;
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
    echo "*Sorry for the inconvenience, we will get back to you post";
    exit;
}
