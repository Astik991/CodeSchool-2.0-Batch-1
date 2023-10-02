<?php

require_once "./dbConfig.php";


if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $response = ["status" => false, "message" => ""];

    if (!isset($_POST["empId"])) {
        $response["message"] = "empId is required!................";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["loginTime"])) {
        $response["message"] = "loginTime is required!................";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["logoutTime"])) {
        $response["message"] = "logoutTime is required!................";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["date"])) {
        $response["message"] = "date is required!................";
        echo json_encode($response);
        exit;
    }
    
    $empId = $_POST["empId"];
    $loginTime = $_POST["loginTime"];
    $logoutTime = $_POST["logoutTime"];
    $date = $_POST["date"];
  

    $pdo = new PDO("pgsql:host=localhost;port=5432;dbname=hr_management;user=postgres;password=postgres");
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
        echo json_encode($response);
        exit;
    }


    $query = "INSERT INTO Attendance(employee_id,login_time,logout_time,date) VALUES (?, ?, ?, ?)";

    $statment = $pdo->prepare($query);
    $result = $statment->execute([$empId, $loginTime,$logoutTime,$date]);

    if (!$result) {
        $response["message"] = $statment->errorInfo();
        echo json_encode($response);
        exit;
    }

    $response["status"] = true;
    $response["message"] = "Successfully Entered!";
    echo json_encode($response);
    exit;

    $response["message"] = "ONLY POST method Accepted";
echo json_encode($response);
}
