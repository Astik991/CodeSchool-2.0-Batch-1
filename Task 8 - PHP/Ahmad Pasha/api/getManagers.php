<?php

require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $response = ["status" => false, "message" => "", "data" => null,];

    $pdo = getPDO();
    $query = "SELECT
    M.employee_id emp_id,
    M.emp_name manager_name
FROM employees E
    JOIN employees M on E.reportingto = M.employee_id
    GROUP BY M.employee_id;";

    $statment = $pdo->prepare($query);
    $statment->execute();
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);

    $response["message"] = "Success";
    $response["status"] = true;
    $response["data"] = $user;
    echo json_encode($response);
    exit;
}
