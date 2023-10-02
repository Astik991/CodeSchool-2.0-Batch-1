<?php

require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $response = ["status" => false, "message" => ""];

    if (!isset($_POST["projectName"])) {
        $response["message"] = "Project Name is required!................";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["empId"])) {
        $response["message"] = "Employee Name is required!................";
        echo json_encode($response);
        exit;
    }


    $projectName = $_POST["projectName"];
    $empId = $_POST["empId"];


    $pdo = new PDO("pgsql:host=localhost;port=5432;dbname=hr_management;user=postgres;password=postgres");
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
        echo json_encode($response);
        exit;
    }


    $query = "INSERT INTO assignProject (project_name,employee_id) VALUES (?, ?)";

    $statment = $pdo->prepare($query);
    $result = $statment->execute([$projectName, $empId]);

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
