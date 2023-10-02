<?php

    require_once "./dbConfig.php";

    $response = ["status" => false, "message" => ""];

    if(empty($_POST['userToken'])){
        $response["message"] = "Token is empty.";
        echo json_encode($response);
        exit;
    }

    $query = "DELETE FROM sessions WHERE token = ?";
    $statement = $pdo->prepare($query);
    $statement->execute([$_POST['userToken']]);
    $session_update = $statement->fetchAll(PDO::FETCH_ASSOC);

    if(!$session_update){
        $response["status"] = false;
        $response["message"] = $statement->errorInfo();
        echo json_encode($response);
        exit;
    }

    // Successful Logout.
    $response["status"] = true;
    $response["message"] = "Logout Successful.";
    echo json_encode($response);
    exit;

?>