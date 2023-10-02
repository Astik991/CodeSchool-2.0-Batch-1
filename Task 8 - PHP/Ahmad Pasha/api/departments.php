<?php

require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $response = ["status" => false, "message" => "", "data" => null,];

    $pdo = getPDO();
    $query = "SELECT *
    FROM departments;";


    $statment = $pdo->prepare($query);
    $statment->execute();
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);

    $response["message"] = "Success";
    $response["status"] = true;
    $response["data"] = $user;
    echo json_encode($response);
    exit;
} else if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $response = ["status" => false, "message" => ""];

    if (!isset($_POST["depNameInput"])) {
        $response["message"] = "Department Name is required!................";
        echo json_encode($response);
        exit;
    }

    $departmentName = $_POST["depNameInput"];
    echo $departmentName;

    $pdo = new PDO("pgsql:host=localhost;port=5432;dbname=hr_management;user=postgres;password=postgres");
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
        echo json_encode($response);
        exit;
    }


    $query = "INSERT INTO departments(department_name) VALUES (?)";

    $statment = $pdo->prepare($query);
    $result = $statment->execute([$departmentName]);

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
