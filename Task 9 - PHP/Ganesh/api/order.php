<?php

    require_once "./dbConfig.php";

    $response = ["status" => false, "message" => "", "data" => "", "count" => 1];

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

    if(isset($_GET)){

        if(isset($_GET['order_id'])){
            
            $user_session = getUserSession($pdo, $_GET['token']);

            $user_id = $user_session[0]['user_id'];

            if(isset($user_id)){

                $query="SELECT ord.id AS order_id,
                prod.product_image AS product_image,
                prod.name AS product_name,
                prod.price AS product_price,
                prod.discount AS product_discount,
                ord_det.quantity AS product_quantity
                FROM users_master AS usr 
                INNER JOIN orders AS ord 
                ON usr.id = ord.user_id
                INNER JOIN order_details AS ord_det 
                ON ord_det.order_id = ord.id
                INNER JOIN products AS prod
                ON prod.id = ord_det.product_id
                WHERE usr.id = ? AND ord.id = ?;";
                $statment = $pdo->prepare($query);
                $statment->execute([$user_id, $_GET['order_id']]);
                $product_list = $statment->fetchAll(PDO::FETCH_ASSOC);

                if(!$product_list){
                    $response["message"] = "No products.";
                    $response["count"] = 0;
                    echo json_encode($response);
                    exit;
                }

                $response["status"] = true;
                $response["message"] = "Products list !";
                $response['data'] = $product_list;
                echo json_encode($response);
                exit;

            }

        }

        $user_session = getUserSession($pdo, $_GET['token']);

        $user_id = $user_session[0]['user_id'];

        if(isset($user_id)){
            $query="SELECT ord.order_date AS order_date,
            ord.final_amount AS total_price,
            ord.id AS order_id,
            usr.name AS user_name
            FROM users_master as usr 
            INNER JOIN orders as ord 
            ON usr.id = ord.user_id
            WHERE usr.id = ?";
            $statment = $pdo->prepare($query);
            $statment->execute([$user_id]);
            $order_list = $statment->fetchAll(PDO::FETCH_ASSOC);

            if(!$order_list){
                $response["message"] = "No Orders yet.";
                $response["count"] = 0;
                echo json_encode($response);
                exit;
            }

            $response["status"] = true;
            $response["message"] = "Order list !";
            $response['data'] = $order_list;
            echo json_encode($response);
            exit;

        }

    }

    


?>