<?php

require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $response = ["status" => false, "message" => ""];

    if (!isset($_POST["projectName"])) {
        $response["message"] = "Project Name is required!................";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["projectDeadLine"])) {
        $response["message"] = "project DeadLine is required!................";
        echo json_encode($response);
        exit;
    }


    $projectName = $_POST["projectName"];
    $projectDeadLine = $_POST["projectDeadLine"];


    $pdo = new PDO("pgsql:host=localhost;port=5432;dbname=hr_management;user=postgres;password=postgres");
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
        echo json_encode($response);
        exit;
    }


    $query = "INSERT INTO projects (project_name,project_deadline) VALUES (?, ?)";

    $statment = $pdo->prepare($query);
    $result = $statment->execute([$projectName, $projectDeadLine]);

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
} else if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $response = ["status" => false, "message" => "", "data" => null,];

    $pdo = getPDO();
    $query = "SELECT * FROM projects";

    $statment = $pdo->prepare($query);
    $statment->execute();
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);

    $response["message"] = "Success";
    $response["status"] = true;
    $response["data"] = $user;
    echo json_encode($response);
    exit;
}
