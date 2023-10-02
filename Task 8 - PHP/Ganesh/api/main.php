<?php

    require_once "./dbConfig.php";

    $response = ["status" => false, "message" => ""];

    // DB Connection.
    $pdo = getPDO();
    // Error Handling for DB Connection.
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
        echo json_encode($response);
        exit;
    }

    // Query the working statuses.
    $query = "SELECT id,status_description FROM statuses";
    $statment = $pdo->prepare($query);
    $statment->execute();
    $statuses = $statment->fetchAll(PDO::FETCH_ASSOC);

    // Query the employee designations.
    $query = "SELECT id,employee_designation FROM designations";
    $statment = $pdo->prepare($query);
    $statment->execute();
    $designations = $statment->fetchAll(PDO::FETCH_ASSOC);

    // Query the locations.
    $query = "SELECT id, address FROM locations";
    $statment = $pdo->prepare($query);
    $statment->execute();
    $locations = $statment->fetchAll(PDO::FETCH_ASSOC);

    // Send the statuses, designations, locations list.
    echo json_encode([$statuses, $designations, $locations]);

?>