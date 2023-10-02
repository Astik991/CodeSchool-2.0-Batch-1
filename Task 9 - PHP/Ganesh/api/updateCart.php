<?php

    require_once "./dbConfig.php";

    $response = ["status" => false, "message" => "", "data" => "", "count" => 0];

    function getUserSession($pdo, $token){
        // Query for user session.
        $query = "SELECT user_id,
        token,
        token_expiry
        FROM sessions
        WHERE token = ?";
        $statment = $pdo->prepare($query);
        $statment->execute([$token]);
        $user_session = $statment->fetchAll(PDO::FETCH_ASSOC);
        return $user_session;
    }


    if(isset($_POST['quantity'])){

        $token = $_POST['token'];
        $product_id = $_POST['prodID'];
        $quantity = $_POST['quantity'];
    
        $user_session = getUserSession($pdo, $token);
    
        $user_id = $user_session[0]['user_id'];
    
        // Query for user cart.
        $query = "UPDATE carts 
        SET quantity = :quantity
        WHERE user_id = :usr_id AND product_id = :prod_id";
        $statment = $pdo->prepare($query);
        $statment->execute([
            'usr_id' => $user_id, 
            'prod_id' => $product_id,
            'quantity' => $quantity
        ]);
        $user_cart = $statment->fetchAll(PDO::FETCH_ASSOC);

        $response["status"] = true;
        $response["message"] = "Updated Cart !";
        echo json_encode($response);
        exit;

    }



?>