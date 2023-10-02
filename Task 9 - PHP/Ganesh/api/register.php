<?php

require_once "./dbConfig.php";

$response = ["status" => false, "message" => "", "data" => ""];

// Validation for text input with only alphabets.
function userNameValidation($name){
    if (empty($name)) {
        $response["status"] = false;
        $response["message"] = "Name is required !";
        echo json_encode($response);
        exit;
    } elseif (!(preg_match("/[a-zA-Z ]/", $name))) {
        $response["status"] = false;
        $response["message"] = "Name should only contain alphabets !";
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = true;
        $response["data"] = $name;
        return $response;
    }
}

// Validation for the manditory user input.
function userInputValidation($input){
    if (empty($input)) {
        $response["status"] = false;
        $response["message"] = "Please select the input !";
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = true;
        $response["data"] = $input;
        return $response;
    }
}

// Validation for the phone number.
function userPhoneValidation($phone){
    if (empty($phone)) {
        $response["status"] = false;
        $response["message"] = "Phone number is required !";
        echo json_encode($response);
        exit;
    } elseif ((strlen($phone)) != 10) {
        $response["status"] = false;
        $response["message"] = "Phone number must be 10 digits !";
        echo json_encode($response);
        exit;
    } elseif (!(preg_match("/[0-9]/", $phone))) {
        $response["status"] = false;
        $response["message"] = "Phone number must be 10 digit number !";
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = true;
        $response["data"] = $phone;
        return $response;
    }
}

// Validation for the email.
function userEmailVaildation($email){
    if (empty($email)) {
        $response["status"] = false;
        $response["message"] = "Email is required !";
        echo json_encode($response);
        exit;
    } elseif (!(preg_match("/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]{2,})\.([a-zA-Z]{2,5})$/", $email))) {
        $response["status"] = false;
        $response["message"] = "Email domain is invalid !";
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = true;
        $response["data"] = $email;
        return $response;
    }
}

// Validation for the strong password.
function userPasswordVaildation($password){
    $strongPassRegex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/';
    if (empty($password)) {
        $response["status"] = false;
        $response["message"] = "Password is required !";
        echo json_encode($response);
        exit;
    } elseif (!(preg_match($strongPassRegex, $password))) {
        $response["status"] = false;
        $response["message"] = "Email domain is invalid !";
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = true;
        $response["data"] = $password;
        return $response;
    }
}

// Confirm user password.
function userConfirmPassword($password, $confirmPassword){
    if (empty($confirmPassword)) {
        $response["status"] = false;
        $response["message"] = "Please confirm the password !";
        echo json_encode($response);
        exit;
    } else if ($password !== $confirmPassword) {
        $response["status"] = false;
        $response["message"] = "Password does not match !";
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = true;
        $response["data"] = $confirmPassword;
        return $response;
    }
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Validation count.
    $validation = array();
    $count = 0;

    // Get individual values.
    $name = userNameValidation($_POST['name']);
    $email = userEmailVaildation($_POST['email']);
    $phone = userPhoneValidation($_POST['phone']);
    $password = userPasswordVaildation($_POST['password']);
    $confirmedPassword = userConfirmPassword($_POST['password'], $_POST['confirm_password']);
    $role = userInputValidation($_POST['user_role_id']);

    array_push($validation, $name);
    array_push($validation, $email);
    array_push($validation, $phone);
    array_push($validation, $password);
    array_push($validation, $confirmedPassword);
    array_push($validation, $role);

    foreach ($validation as $val) {
        if ($val) {
            $count++;
        }
    }

    // On Unsuccessful validations.
    if ($count != count($validation)) {
        $response["status"] = false;
        $response["message"] = "Fill all the input fields correctly !";
        echo json_encode($response);
        exit;
    }

    // On success.
    $query = "SELECT id 
             FROM users_master 
             WHERE email = :email_id or phone = :phone_no";
    $statement = $pdo->prepare($query);
    $statement->execute([
        "email_id" => $email['data'],
        "phone_no" => $phone['data']
    ]);
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Check whether user already exist in the DB.
    if (count($result) == 1) {
        $response["status"] = false;
        $response["message"] = "User already exist! Simply login to website <a href='./login.html'>here.</a>";
        echo json_encode($response);
        exit;
    }

    // Insert the user data.
    $query = "INSERT INTO
    users_master( name, email, phone, password, role_id )
    VALUES ( :user_name, :user_email, :user_phone, :user_password, :user_role_id )";
    $statement = $pdo->prepare($query);
    $statement->execute([
        'user_name' => $name['data'],
        'user_email' => $email['data'],
        'user_phone' => $phone['data'],
        'user_password' => $password['data'],
        'user_role_id' => $role['data']
    ]);
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Error while inserting data.
    if (!$result) {
        $response["status"] = false;
        $response["message"] = $statement->errorInfo();
        echo json_encode($response);
        exit;
    }

    // On successful data insertion.
    $response["status"] = true;
    $response["message"] = "Registration Successful. You are redirected to login page in 3 seconds please wait.";
    echo json_encode($response);
    exit;

} else {
    $response["status"] = false;
    $response["message"] = "Only POST request are accepted.";
    echo json_encode($response);
    exit;
}
