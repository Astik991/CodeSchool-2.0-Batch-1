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

    if (empty($_REQUEST["userConfirmPassword"])) {
        http_response_code(400);
        echo "*Confirm password is not configured in your call";
        exit;
    }

    if (empty($_REQUEST["roleId"])) {
        http_response_code(400);
        echo "*User gender is not configured in your call";
        exit;
    }



    $userName = $_POST["userName"];
    $userPhone = $_POST["userPhone"];
    $userEmail = $_POST["userEmail"];
    $userPassword = $_POST["userPassword"];
    $userGender = $_POST["userGender"];
    $userConfirmPassword = $_POST["userConfirmPassword"];
    $userRoleId = $_POST["roleId"];

    function validateInput($input, $pattern, $errorMessage)
    {
        if (!preg_match($pattern, $input)) {
            http_response_code(400);
            echo $errorMessage;
            exit;
        }
    }

    validateInput($userName, '/^[A-Z][a-z\s]{1,20}$/', "*User name validation failed");
    validateInput($userPhone, '/^[0-9]{10}$/', "*Phone number validation failed");
    validateInput($userEmail, '/^[a-zA-Z0-9]+(?:[._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/', "*Email validation failed");
    validateInput($userPassword, '/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$%#@!~&^()])[a-zA-Z0-9$%#@!~&^()]+$/', "*Password validation failed");

    if ($userPassword !== $userConfirmPassword) {
        http_response_code(400);
        echo "*Incorrect password match with entered password";
        exit;
    }



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
            $response["message"] = "Rider account already existed";
            $response["status"] = false;
            echo json_encode($response);
            $pdo->rollBack();
            exit;
        }

        //insert user into database
        $insertUserquery = "insert into users(name,phone,email,password,gender,role_type_id) values (?,?,?,?,?,?);";
        $statement2 = $pdo->prepare($insertUserquery);
        $result2 = $statement2->execute([$userName, $userPhone, $userEmail, $userPassword, $userGender, $userRoleId]);

        if (!$result2) {
            $response["message"] = "Rider creation failed";
            $response["status"] = false;
            echo json_encode($response);
            $pdo->rollBack();
            exit;
        } else {
            $response["message"] = "Rider account created successfully";
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
