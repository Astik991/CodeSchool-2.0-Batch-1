<?php

require_once "./dbConfig.php";

$response = ["status" => false, "message" => "", "data" => ""];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get individual values.
    $name = $_POST['username'];
    $password = $_POST['password'];

    if (empty($name)) {
        $response["status"] = false;
        $response["message"] = "Please use Email or Phone number !";
        echo json_encode($response);
        exit;
    }
    if (empty($password)) {
        $response["status"] = false;
        $response["message"] = "Please provide the password !";
        echo json_encode($response);
        exit;
    }

    // If user login by email.
    if(gettype($name) == gettype("string")){
        $query = "SELECT id,
        name,
        email,
        phone,
        password, 
        role_id
        FROM users_master 
        WHERE email = :username AND password = :password ";
    } else { 
        //If user login by phone number.
        $query = "SELECT id,
        name,
        email,
        phone,
        password, 
        role_id
        FROM users_master 
        WHERE phone = :username AND password = :password ";
    }
    
    $statement = $pdo->prepare($query);
    $statement->execute([
        "username" => $name,
        "password" => $password
    ]);
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    $roleID = $result[0]['role_id'];
    $userID = $result[0]['id'];
    $userName = $result[0]['name'];

    // Check whether user already exist in the DB.
    if (count($result) != 1) {
        $response["status"] = false;
        $response["message"] = "Username or password is incorrect! Please try again.";
        echo json_encode($response);
        exit;
    } else {
        // On success.
        // Generate token.
        $TOKEN = hash('sha256', $password);

        // Maintain user token and expiry.
        $query = "INSERT INTO sessions(user_id, token, token_expiry) 
                VALUES
                (?, ?, NOW() + INTERVAL '23 hours 59 minutes 59 seconds')
        ";
        $statement = $pdo->prepare($query);
        $statement->execute([
            $userID,
            $TOKEN
        ]);
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        // Error while inserting data.
        if (!$result) {
            $response["status"] = false;
            $response["message"] = $statement->errorInfo();
            echo json_encode($response);
            exit;
        }

        // On successful insertion of user session.
        $response["status"] = true;
        $response["message"] = "Login Successful. You are redirected to home page in 3 seconds please wait.";
        $response["data"] = [$TOKEN, $userName, $roleID];
        echo json_encode($response);
        exit;

    }
}

?>
