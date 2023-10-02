<?php

    require_once "./dbConfig.php";

    $response = ["status" => false, "message" => "", "data" => ""];

    // Validation for text input with only alphabets.
    function userNameValidation($name){
        if(empty($name)){
            $response["status"] = false;
            $response["message"] = "* Field is required!";
            echo json_encode($response);
            exit;
        }
        elseif(!(preg_match("/[a-zA-Z]/", $name))){
            $response["status"] = false;
            $response["message"] = "Name should only contain alphabets!";
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
        if(empty($input)){
            $response["status"] = false;
            $response["message"] = "* Field is required!";
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
        if(empty($phone)){
            $response["status"] = false;
            $response["message"] = "* Field is required!";
            echo json_encode($response);
            exit;
        }
        elseif((strlen($phone)) != 10){
            $response["status"] = false;
            $response["message"] = "Phone number must be 10 digits!";
            echo json_encode($response);
            exit;
        } 
        elseif(!(preg_match("/[0-9]/",$phone))){
            $response["status"] = false;
            $response["message"] = "Phone number must be 10 digits!";
            echo json_encode($response);
            exit;
        }
        else {
            $response["status"] = true;
            $response["data"] = $phone;
            return $response;
        }

    }


    if($_SERVER["REQUEST_METHOD"] == "POST"){

        // User Form Validation.
        $firstname = userNameValidation($_POST["first_name"]);
        $lastname = userNameValidation($_POST["last_name"]);
        $joindate = userInputValidation($_POST["date_of_join"]);
        $birthdate = userInputValidation($_POST["date_of_birth"]);
        $gender = userInputValidation($_POST["gender"]);
        $phone = userPhoneValidation($_POST["phone"]);
        $workstatus = userInputValidation($_POST["working_status_id"]);
        $designation = userInputValidation($_POST["designation_id"]);
        $location = userInputValidation($_POST["location_id"]);

        // List of Validations.
        $validation = [$firstname, $lastname, $joindate, $birthdate, $gender, $phone, $workstatus, $designation, $location];
        // Validation count is 9.
        $count = 0; 

        foreach($validation as $variable){
            if($variable["status"]){
                $count++;
            }
        }

        if($count == 9){

            // DB Connection.
            $pdo = getPDO();
            // DB Connection error handling.
            if(!$pdo){
                $response["status"] = false;
                $response["message"] = "Database is not Connected! Please try Again.";
                echo json_encode($response);
                exit;
            }

            // On Successful DB Connection.
            $query = "SELECT id 
            FROM employees 
            WHERE phone = ?";
            $statement = $pdo->prepare($query);
            $statement->execute([$phone["data"]]);
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);

            // Check for the employee already exist in the DB.
            if(count($result) == 1){
                $response["status"] = false;
                $response["message"] = "Employee already exist.";
                echo json_encode($response);
                exit;
            }
            
            // Else Insert the employee details into DB.
            $query = "INSERT INTO 
            employees(employee_code, 
            first_name, 
            last_name, 
            date_of_join, 
            date_of_birth, 
            gender, 
            phone, 
            working_status_id, 
            designation_id, 
            location_id,
            created_at)
            VALUES (nextval('employees_employee_code'),?,?,?,?,?,?,?,?,?,now())";
            $statement = $pdo->prepare($query);
            $result = $statement->execute([
                $firstname['data'], 
                $lastname['data'],
                $joindate['data'],
                $birthdate['data'],
                $gender['data'],
                $phone['data'],
                $workstatus['data'],
                $designation['data'],
                $location['data']
            ]);
            
            // Error while inserting data.
            if(!$result){
                $response["status"] = false;
                $response["message"] = $statement->errorInfo();
                echo json_encode($response);
                exit;
            }

            $response["status"] = true;
            $response["message"] = "Employee is created successfully.";
            echo json_encode($response);
            exit;



        } else {
            $response["status"] = false;
            $response["message"] = "Error: Check the given input.";
            echo json_encode($response);
            exit;
        }


    } else {
        $response["status"] = false;
        $response["message"] = "Only POST request are accepted.";
        echo json_encode($response);
        exit;
    }

?>