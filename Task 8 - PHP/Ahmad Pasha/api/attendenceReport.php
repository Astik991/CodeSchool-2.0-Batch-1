<?php

require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $response = ["status" => false, "message" => "", "data" => null,];

    if (!isset($_POST["fromDate"])) {
        $response["message"] = "From Date is required!................";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["toDate"])) {
        $response["message"] = "To Date is required!................";
        echo json_encode($response);
        exit;
    }

    $fromDate = $_POST["fromDate"];
    settype($fromDate, "string");
    $toDate = $_POST["toDate"];
    settype($toDate, "string");

    $pdo = getPDO();
    $query = "SELECT employees.employee_id,emp_name,login_time,logout_time,date FROM Attendance INNER JOIN employees on employees.employee_id=attendance.employee_id
    WHERE date BETWEEN 
    ? AND ?;";

    $statment = $pdo->prepare($query);
    $statment->execute([$fromDate, $toDate]);
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);
    if ($user == "") {
        $response["message"] = "data not found";
        $response["status"] = true;
        $response["data"] = "no data found";
        exit;
    }

    $response["message"] = "Success";
    $response["status"] = true;
    $response["data"] = $user;
    echo json_encode($response);
    exit;
}
