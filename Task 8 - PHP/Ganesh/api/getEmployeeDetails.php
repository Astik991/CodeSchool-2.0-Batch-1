<?php

    require_once "./dbConfig.php";

    $response = ["status" => false, "message" => "", "data" => ""];

    // GET the employee code.
    $empcode = $_GET["employeeCode"];

    // Validate the code.
    if(empty($empcode)){
        $response["status"] = false;
        $response["message"] = "Please enter valid employee code.";
        echo json_encode($response);
        exit;
    }

    // DB Connection.
    $pdo = getPDO();

    // DB Connection error handling.
    if(!$pdo){
        $response["status"] = false;
        $response["message"] = "Database is not Connected! Please try Again.";
        echo json_encode($response);
        exit;
    }

    // Query the employee through employee code.
    $query = "SELECT employees.id as emp_id, *
    FROM employees
    INNER JOIN statuses
    ON statuses.id = employees.working_status_id
    INNER JOIN designations
    ON designations.id = employees.designation_id
    INNER JOIN locations
    ON locations.id = employees.location_id
    WHERE employee_code = ?
    ";
    $statement = $pdo->prepare($query);
    $statement->execute([$empcode]);
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Check whether the employee exist by the employee code.
    if(count($result) == 1){
        $response["status"] = true;
        $response["data"] = $result;
        echo json_encode($response);
    } else {
        $response["status"] = false;
        $response["message"] = "Please enter a valid employee code.";
        echo json_encode($response);
        exit;
    }
?>