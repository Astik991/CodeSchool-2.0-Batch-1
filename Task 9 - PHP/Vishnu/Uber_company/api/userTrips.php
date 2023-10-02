
<?php
require_once "./sessionTimeOut.php";
require_once "./dbConfig.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $response = ["status" => false, "message" => "", "data" => null];

    try {
        $pdo = getPDO();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->beginTransaction();
        //get email from user id 
        $getUserEmail = "select users_id from sessions where token = ?";
        $statement1 = $pdo->prepare($getUserEmail);
        $statement1->execute([$_SESSION["session_token"]]);
        $result1 = $statement1->fetchColumn();

        if ($result1) {
            $query = "SELECT
        trips.id,a.name as name,users.name as driver,l.area as location,d.area as destination,trips.start_date,trips.end_date,trip_statuses.description as status from users inner join role_types on users.role_type_id=role_types.id 
        inner join trips on users.id=trips.drivers_id inner join users a on trips.users_id=a.id inner join address l
        on trips.location_id=l.id inner join address d on trips.destination_id=d.id inner join trip_statuses on trip_statuses.id=trips.trip_statuses_id where a.id=?;";

            $statement2 = $pdo->prepare($query);
            $statement2->execute([$result1]);
            $result2 = $statement2->fetchAll(PDO::FETCH_ASSOC);
            $response["status"] = true;
            $response["message"] = "Fetched user trip history";
            $response["data"] = $result2;
            $pdo->commit();
            echo json_encode($response);
        } else {
            $response["status"] = false;
            $response["message"] = "*User didn't exist";
            $pdo->rollBack();
            echo json_encode($response);
        }
    } catch (PDOException $e) {
        http_response_code(400);
        error_log($e->getMessage());
        echo "*An unexpected error occurred. Please try again later.";
        // echo $e->getMessage();
        exit;
    }
    exit;
} else {
    http_response_code(400);
    echo "*Sorry for the inconvenience, we will get back to you";
    exit;
}
