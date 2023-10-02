<?php

    require_once "./dbConfig.php";

    $response = ["status" => false, "message" => "", "data" => "", "end_session" => 0];

    if(isset($_GET['userToken'])){
        $token = $_GET['userToken'];

        // Query for user session.
        $query = "SELECT user_id,
        token,
        token_expiry
        FROM sessions
        WHERE token = ?";
        $statment = $pdo->prepare($query);
        $statment->execute([$token]);
        $user_session = $statment->fetchAll(PDO::FETCH_ASSOC);

        // Query to get the current timestamp.
        $query = "SELECT now() as present_time;";
        $statment = $pdo->prepare($query);
        $statment->execute();
        $present_time = $statment->fetch(PDO::FETCH_ASSOC);

        if(!$user_session){
            $response["message"] = "User is not present!";
            echo json_encode($response);
            exit;
        }
        elseif($user_session[0]["token_expiry"] < $present_time["present_time"]){
            
            $query = "DELETE FROM
            sessions
            WHERE user_id = ?";
            $statment = $pdo->prepare($query);
            $statment->execute([$user_session[0]["user_id"]]);
            $user_session = $statment->fetchAll(PDO::FETCH_ASSOC);

            $response["end_session"] = $user_session;
            $response["message"] = "Session expired, login again to website !";
            echo json_encode($response);
            exit;

        } else {

            // Query to get the user role.
            $query= "SELECT auth_role
            FROM roles as rol
            INNER JOIN users_master as usr
            ON rol.id = usr.role_id
            WHERE usr.id = ?
            ";
            $statment = $pdo->prepare($query);
            $statment->execute([$user_session[0]['user_id']]);
            $user_role = $statment->fetchAll(PDO::FETCH_ASSOC);

            if($user_role[0]['auth_role'] == 'admin'){
                $response["message"] = "Admins are not allowed to add to cart!";
                echo json_encode($response);
                exit;
            }

            $response["status"] = true;
            $response["message"] = "Valid user!";
            echo json_encode($response);
            exit;

        }

    } else {
        $response["message"] = "REQUEST ERROR !";
        echo json_encode($response);
        exit;
    }

?>