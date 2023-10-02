<?php 

    require_once "./dbConfig.php";

    $response = ["status" => false, "message" => "", "data" => ""];

    // Check the request for GET method.
    if($_SERVER["REQUEST_METHOD"] == "GET"){
        $salaryType = $_GET["type"];
        
        // Validate the Input.
        if(empty($salaryType)){
            $response["status"] = false;
            $response["message"] = "Please check the input.";
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

        // Query the salary components list through type of salary.
        $query = "SELECT *
        FROM earnings
        WHERE type = ?
        ";
        $statement = $pdo->prepare($query);
        $statement->execute([$salaryType]);
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        // Validate result.
        if(empty($result)){
            $response["status"] = false;
            $response["message"] = "Please check the input.";
            echo json_encode($response);
            exit;
        }

        // send response.
        $response["status"] = true;
        $response["data"] = $result;
        echo json_encode($response);
        
    }

    // Check the request for POST method.
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $empId = $_POST["empId"];
        $componentType = $_POST["component"];
        $componentAmount = $_POST["amount"];

        $validate = [$empId, $componentType, $componentAmount];
        $count = 0;

        foreach($validate as $input){
            if(empty($input)){
                $response["status"] = false;
                $response["message"] = "Please type the input.";
                echo json_encode($response);
                exit;
            } 
            elseif(!(preg_match("/[0-9]/",$input))){
                $response["status"] = false;
                $response["message"] = "Please check the input.";
                echo json_encode($response);
                exit;
            }
            else{
                $count++;
            }
        }

        // Check for all the validations to be true.
        if($count != 3){
            $response["status"] = false;
            $response["message"] = "Please check all the input.";
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

        // Check whether the employee with that salary_id exist.
        $query = "SELECT *
        FROM 
        salary_details
        WHERE employee_id = ? AND earnings_id = ?";
        $statement = $pdo->prepare($query);
        $result = $statement->execute([
            $empId, 
            $componentType
        ]);

        // Check for the employee already exist in the DB.
        if($result){
            $query = "UPDATE salary_details
            SET amount = ?
            WHERE employee_id = ? AND earnings_id = ?";
            $statement = $pdo->prepare($query);
            $result = $statement->execute([
                $componentAmount,
                $empId, 
                $componentType
            ]);

            // Error while updating data.
            if(!$result){
                $response["status"] = false;
                $response["message"] = $statement->errorInfo();
                echo json_encode($response);
                exit;
            }

            // On successful updating the value.
            $response["status"] = true;
            $response["message"] = "Amount updated successfully.";
            $response["data"] = $result;
            echo json_encode($response);
            exit;
            
        } else {
            // Insertion query.
            $query = "INSERT INTO 
            salary_details( 
                employee_id,
                earnings_id,
                amount
            )
            VALUES ( ?, ?, ? )";
            $statement = $pdo->prepare($query);
            $result = $statement->execute([
                $empId, 
                $componentType, 
                $componentAmount
            ]);


            // Error while inserting data.
            if(!$result){
                $response["status"] = false;
                $response["message"] = $statement->errorInfo();
                echo json_encode($response);
                exit;
            }

            // On successful insertion.
            $response["status"] = true;
            $response["message"] = "Amount added successfully.";
            echo json_encode($response);
            exit;
        }

    }

?>