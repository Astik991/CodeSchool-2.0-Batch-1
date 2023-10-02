<?php
session_set_cookie_params(300);
session_start();
session_regenerate_id(true);
require_once "./dbConfig.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = ["status" => false, "message" => "", "data" => null];
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

    if (empty($_REQUEST["loginType"])) {
        http_response_code(400);
        echo "*Login type is not configured in your call";
        exit;
    }


    $userEmail = $_POST["userEmail"];
    $userPassword = $_POST["userPassword"];
    $loginType = $_POST["loginType"];

    function getToken()
    {
        return bin2hex(random_bytes(26));
    }

    try {
        $pdo = getPDO();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->beginTransaction();
        $userCheckQuery = "select id,password,role_type_id from users where email=? and role_type_id=?;";
        $statement1 = $pdo->prepare($userCheckQuery);
        $statement1->execute([$userEmail, $loginType]);
        $result1 = $statement1->fetch(PDO::FETCH_ASSOC);

        if (!$result1) {
            $response["message"] = "*User account didn't exist";
            $response["status"] = false;
            $pdo->rollBack();
            echo json_encode($response);
            exit;
        } else if ($result1 && password_verify($userPassword, $result1["password"])) {
            $token = getToken();
            $createUserSession = "insert into sessions(token,users_id)values(?,?);";
            $statement2 = $pdo->prepare($createUserSession);
            $result2 = $statement2->execute([$token, $result1["id"]]);
            $_SESSION['session_token'] = $token;
            $response["message"] = "Logged In Successfully";
            $response["data"] = $result1["role_type_id"];
            $response["status"] = true;
            $pdo->commit();
            echo json_encode($response);
            exit;
        } else {
            $response["message"] = "*Username and password didn't match";
            $response["status"] = false;
            $pdo->rollBack();
            echo json_encode($response);
            exit;
        }
    } catch (PDOException $e) {
        http_response_code(400);
        error_log($e->getMessage());
        echo "*An unexpected error occurred. Please try again later.";
        // echo $e->getMessage();
        exit;
    }
} else {
    http_response_code(400);
    echo "*Sorry for the inconvience we will get back to you";
    exit;
}
