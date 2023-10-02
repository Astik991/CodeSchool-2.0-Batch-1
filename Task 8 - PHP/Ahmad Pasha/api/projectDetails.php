<?php

require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $response = ["status" => false, "message" => "", "data" => null,];

    $pdo = getPDO();
    $query = "SELECT
    project_name,
    emp_name,
    employees.employee_id emp_id
FROM assignProject
    INNER JOIN employees ON assignProject.employee_id = employees.employee_id
GROUP BY employees.employee_id,emp_name,project_name;";

    $statment = $pdo->prepare($query);
    $statment->execute();
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);

    $response["message"] = "Success";
    $response["status"] = true;
    $response["data"] = $user;
    echo json_encode($response);
    exit;
}
