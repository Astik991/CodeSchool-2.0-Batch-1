<?php

require("./dbConfig.php");

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    if (!isset($_POST["username"])) {
        echo "Username is required!";
        exit;
    }
    if (!isset($_POST["password"])) {
        echo "Password is required!";
        exit;
    }

    $login_id = $_POST["username"];
    $password = $_POST["password"];
    $response = ["status" => true, "message" => "", "data" => null, "type" => ""];

    if ($login_id == '' || $password == '') {
        $response["status"] = false;
        $response["message"] = "Username & Password shouldn't be empty";
        echo json_encode($response);
        exit;
    }

    $pdo = getPDO();
    if (!$pdo) {
        $response["status"] = false;
        $response["message"] = "Database Not Connected!";
        echo json_encode($response);
        exit;
    }

    $query = "SELECT * FROM employees WHERE login_id = ? AND password = ?";

    $statment = $pdo->prepare($query);
    $statment->execute([$login_id, $password]);
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);

    if (count($user) == 1) {
        $response["message"] = "LoggedIn Successfully!";
        $response["data"] = $user[0]["employee_id"];
        $response["type"] = $user[0]["type"];
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = false;
        $response["message"] = "Username & Password shouldn't match";
        echo json_encode($response);
        exit;
    }
}
echo "Only POST request is accepted!";
