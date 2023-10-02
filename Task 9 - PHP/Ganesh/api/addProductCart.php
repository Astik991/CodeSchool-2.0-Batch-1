<?php

    require_once "./dbConfig.php";

    $response = ["status" => false, "message" => "", "data" => ""];

    if(isset($_GET['product']) && isset($_GET['token'])){

        $product_id = $_GET['product'];
        $token = $_GET['token'];
        
        // Query for user session.
        $query = "SELECT user_id,
        token,
        token_expiry
        FROM sessions
        WHERE token = ?";
        $statment = $pdo->prepare($query);
        $statment->execute([$token]);
        $user_session = $statment->fetchAll(PDO::FETCH_ASSOC);

        if(isset($user_session[0]['user_id'])){
            $user_id = $user_session[0]['user_id'];
            $quantity = 1;

            $query = "INSERT INTO 
            carts(user_id, product_id, quantity)
            VALUES (:user, :product, :quantity)";
            $statment = $pdo->prepare($query);
            $statment->execute([
                'user' => $user_id,
                'product' => $product_id,
                'quantity' => $quantity
            ]);
            $result = $statment->fetchAll(PDO::FETCH_ASSOC);

            if(!$result){
                $response["message"] = $statment->errorInfo();
                echo json_encode($response);
                exit;
            }

            $query = "SELECT count(*)
            FROM carts
            WHERE user_id = :user";
            $statment = $pdo->prepare($query);
            $statment->execute([
                'user' => $user_id
            ]);
            $result = $statment->fetchAll(PDO::FETCH_ASSOC);


            $response["status"] = true;
            $response["message"] = "1 item added to cart!";
            $response["data"] = $result;
            echo json_encode($response);
            exit;

        }

    } else {
        $response["message"] = "REQUEST ERROR !";
        echo json_encode($response);
        exit;
    }

?>