<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: Thu, 01 Jan 1970 00:00:00 GMT");

require_once "./sessionTimeOut.php";
require_once "./dbConfig.php";


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $response = ["status" => false, "message" => "", "data" => null];


    try {
        $pdo = getPDO();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $query = "select users.name from users where id=(select users_id from sessions where token=?);";
        $statement = $pdo->prepare($query);
        $statement->execute([$_SESSION["session_token"]]);
        $result = $statement->fetchColumn();
        if ($result) {
            $response["status"] = true;
            $response["message"] = "Fetched user details successfully";
            $response["data"] = $result;
            $response["gh"] = $_SESSION["session_token"];
            echo json_encode($response);
        } else {
            $response["status"] = false;
            $response["message"] = "*User didn't exist";
            echo json_encode($response);
        }
        exit;
    } catch (PDOException $e) {
        http_response_code(400);
        error_log($e->getMessage());
        echo "*An unexpected error occurred. Please try again later.";
        exit;
    }
} else {
    http_response_code(400);
    echo "*Sorry for the inconvenience, we will get back to you";
    exit;
}
