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

  function getUserCart($pdo, $user_id){
    // Query for user cart.
    $query = "SELECT product_id,
    product_image,
    name,
    price,
    discount,
    quantity
    FROM carts
    INNER JOIN products
    ON products.id = carts.product_id
    WHERE user_id = ?";
    $statment = $pdo->prepare($query);
    $statment->execute([$user_id]);
    $user_cart = $statment->fetchAll(PDO::FETCH_ASSOC);
    return $user_cart;
  }

  if(!empty($_GET['token'])){

    $token = $_GET['token'];

    $user_session = getUserSession($pdo, $token);

    if(isset($user_session[0]['user_id'])){

      $user_id = $user_session[0]['user_id'];

      $user_cart = getUserCart($pdo, $user_id);

      if(empty($user_cart)){
        $response["message"] = "No cart is empty !";
        echo json_encode($response);
        exit;
      }

      $response["status"] = true;
      $response["message"] = "Items in cart !";
      $response["data"] = $user_cart;
      echo json_encode($response);
      exit;


    } else {
      $response["message"] = "No such user is present !";
      echo json_encode($response);
      exit;
    }

  } 

  if(!empty($_POST['prodID'])){

    $token = $_POST['token'];
    $product_id = $_POST['prodID'];

    $user_session = getUserSession($pdo, $token);

    $user_id = $user_session[0]['user_id'];

    // Query for user cart.
    $query = "DELETE FROM carts
    WHERE user_id = ? AND product_id = ?";
    $statment = $pdo->prepare($query);
    $statment->execute([$user_id, $product_id]);
    $user_cart = $statment->fetchAll(PDO::FETCH_ASSOC);

    $updated_cart = getUserCart($pdo, $user_id);

    $query = "SELECT count(*)
    FROM carts
    WHERE user_id = :user";
    $statment = $pdo->prepare($query);
    $statment->execute([
        'user' => $user_id
    ]);
    $result = $statment->fetchAll(PDO::FETCH_ASSOC);

    $response["status"] = true;
    $response["message"] = "Updated Cart !";
    $response["data"] = $updated_cart;
    $response["count"] = $result;
    echo json_encode($response);
    exit;


  }




?>