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

    if(isset($_POST)){
        $token = $_POST['token'];
        $price = $_POST['price'];
        $discount = $_POST['discount'];
        $final_amount = $_POST['final_amount'];

        $user_session = getUserSession($pdo, $token);

        $user_id = $user_session[0]['user_id'];

        if(isset($user_id)){
            // Insert order price details.
            $query = "INSERT INTO 
            orders(
            user_id,
            price,
            discount,
            final_amount)
            VALUES (
            :user,
            :price,
            :discount,
            :final_amount)";
            $statment = $pdo->prepare($query);
            $statment->execute([
                'user' => $user_id,
                'price' => $price,
                'discount' => $discount,
                'final_amount' => $final_amount
            ]);
            $result = $statment->fetchAll(PDO::FETCH_ASSOC);

            if(!$result){
                $response["message"] = $statment->errorInfo();
                echo json_encode($response);
                exit;
            }

            // Get the order ID.
            $query = "SELECT id
            FROM orders
            WHERE user_id = ?";
            $statment = $pdo->prepare($query);
            $statment->execute([$user_id]);
            $order = $statment->fetchAll(PDO::FETCH_ASSOC);

            // Get the order ID count.
            $query = "SELECT count(*) as new_order
            FROM orders
            WHERE user_id = ?";
            $statment = $pdo->prepare($query);
            $statment->execute([$user_id]);
            $order_count = $statment->fetchAll(PDO::FETCH_ASSOC);

            $new_order = ($order_count[0]['new_order'] - 1);

            if(!$order){
                $response["message"] = "ERROR: while getting order ID.";
                echo json_encode($response);
                exit;
            }

            // Get the user cart details.
            $query = "SELECT product_id,
            quantity
            FROM carts
            WHERE user_id = ?";
            $statment = $pdo->prepare($query);
            $statment->execute([$user_id]);
            $user_cart = $statment->fetchAll(PDO::FETCH_ASSOC);

            if (!$user_cart) {
                $response["message"] = "ERROR: while getting cart details.";
                echo json_encode($response);
                exit;
            }

            $count = 0;
            // Insert each product detail into order details.
            foreach($user_cart as $cart_id){  
                $query= "INSERT INTO
                order_details(
                order_id,
                product_id,
                quantity)
                VALUES (
                :order_id,
                :product_id,
                :quantity)";
                $orderStatment = $pdo->prepare($query);
                $orderStatment->execute([
                    'order_id' => $order[$new_order]['id'],
                    'product_id' => $user_cart[$count]['product_id'],
                    'quantity' => $user_cart[$count]['quantity']
                ]);
                $count++;
            }
            $result = $orderStatment->fetchAll(PDO::FETCH_ASSOC);

            // Error while inserting data.
            if (!$result) {
                $response["message"] = $statement->errorInfo();
                echo json_encode($response);
                exit;
            }

            // Query empty cart.
            $query="DELETE FROM carts
            WHERE user_id = ?";
            $statment = $pdo->prepare($query);
            $statment->execute([$user_id]);
            $user_cart = $statment->fetchAll(PDO::FETCH_ASSOC);

            if (!$user_cart) {
                $response["message"] = "ERROR: while making cart empty.";
                echo json_encode($response);
                exit;
            }

            // Get cart.
            $query = "SELECT count(*) as cart_count
            FROM carts
            WHERE user_id = ?";
            $statment = $pdo->prepare($query);
            $statment->execute([$user_id]);
            $cart_count = $statment->fetchAll(PDO::FETCH_ASSOC);

            $response["status"] = true;
            $response["message"] = "Order Successful !";
            $response['data'] = $order[0]['id'];
            $response['count'] = $cart_count[0]['cart_count'];
            echo json_encode($response);
            exit;

        }

        
        

    }



?>