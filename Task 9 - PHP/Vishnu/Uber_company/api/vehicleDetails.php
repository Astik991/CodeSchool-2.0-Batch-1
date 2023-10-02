<?php

require_once "./dbConfig.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = ["status" => false, "message" => "", "data" => null];

    if (empty($_REQUEST["userName"])) {
        http_response_code(400);
        echo "*User name is not configured in your call";
        exit;
    }

    if (empty($_REQUEST["userPhone"])) {
        http_response_code(400);
        echo "*User phone number is not configured in your call";
        exit;
    }

    if (empty($_REQUEST["userEmail"])) {
        http_response_code(400);
        echo "*User email is not configured in your call";
        exit;
    }

    if (empty($_REQUEST["userPassword"])) {
        http_response_code(400);
        echo "*User password is not configured in your call";
        exit;
    }

    if (empty($_REQUEST["userGender"])) {
        http_response_code(400);
        echo "*User gender is not configured in your call";
        exit;
    }

    if (empty($_REQUEST["roleId"])) {
        http_response_code(400);
        echo "*User gender is not configured in your call";
        exit;
    }

    if (empty($_REQUEST["driverRideType"])) {
        http_response_code(400);
        echo "*Driver ride type is not configured in your call";
        exit;
    }

    if (empty($_REQUEST["driverVehicleName"])) {
        http_response_code(400);
        echo "*Driver vehicle name is not configured in your call";
        exit;
    }

    if (empty($_REQUEST["driverVehicleNumber"])) {
        http_response_code(400);
        echo "*Driver vehicle number is not configured in your call";
        exit;
    }

    if (empty($_REQUEST["driverVehicleType"])) {
        http_response_code(400);
        echo "*Driver vehicle type is not configured in your call";
        exit;
    }

    $userName = $_POST["userName"];
    $userPhone = $_POST["userPhone"];
    $userEmail = $_POST["userEmail"];
    $userPassword = $_POST["userPassword"];
    $userGender = $_POST["userGender"];
    $userRoleId = $_POST["roleId"];
    $driverRideTypeResult = $_POST["driverRideType"];
    $driverVehicleNameResult = $_POST["driverVehicleName"];
    $driverVehicleNumberResult = $_POST["driverVehicleNumber"];
    $driverVehicleTypeResult = $_POST["driverVehicleType"];

    //password hashing
    $userPassword = password_hash($userPassword, PASSWORD_DEFAULT);

    try {
        $pdo = getPDO();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->beginTransaction();
        //check rider exists in database or not
        $checkUserquery = "select count(*) from users where email=? and role_type_id=?";
        $statement1 = $pdo->prepare($checkUserquery);
        $statement1->execute([$userEmail, $userRoleId]);
        $result1 = $statement1->fetchColumn();

        if ($result1 > 0) {
            $response["message"] = "Driver account already exists";
            $response["status"] = false;
            echo json_encode($response);
            $pdo->rollBack();
            exit;
        }

        //insert user into database
        $insertUserquery = "insert into users(name,phone,email,password,gender,role_type_id) values (?,?,?,?,?,?) returning id;";
        $statement2 = $pdo->prepare($insertUserquery);
        $statement2->execute([$userName, $userPhone, $userEmail, $userPassword, $userGender, $userRoleId]);
        $result2 = $statement2->fetchColumn();

        if (!$result2) {
            $response["message"] = "Driver account creation failed";
            $response["status"] = false;
            echo json_encode($response);
            $pdo->rollBack();
            exit;
        }

        //vehicles insertion
        $vehicleInsertquery = "insert into vehicles(name,type,number,ride_types_id,drivers_id)values(?,?,?,?,?);";
        $statement3 = $pdo->prepare($vehicleInsertquery);
        $result3 = $statement3->execute([$driverVehicleNameResult, $driverVehicleTypeResult, $driverVehicleNumberResult, $driverRideTypeResult, $result2]);

        if (!$result3) {
            $response["message"] = "Driver account creation failed";
            $response["status"] = false;
            echo json_encode($response);
            $pdo->rollBack();
            exit;
        } else {
            $response["message"] = "Driver account created successfully";
            $response["status"] = true;
            echo json_encode($response);
            $pdo->commit();
            exit;
        }
    } catch (PDOException $e) {
        http_response_code(400);
        error_log($e->getMessage());
        // echo $e->getMessage();
        echo "*An unexpected error occurred. Please try again later.";
        exit;
    }
} else {
    http_response_code(400);
    echo "*Sorry for the inconvience we will get back to you";
    exit;
}
