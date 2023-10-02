<?php
require_once './dbconfig.php';
$pdo=getPDO();
if($_SERVER['REQUEST_METHOD']=="POST"){
    $response=['data'=>'false','message'=>''];
    if(empty($_POST['id'])){
        $response['message']="id is require";
        echo json_encode($response);
        exit;
    }
    if(empty($_POST['user_id'])){
        $response['message']="user_id is require";
        echo json_encode($response);
        exit;

    }
    $id=$_POST['id'];
    
    $query='SELECT * from products where id = ?';
    $smt=$pdo->prepare($query);
    $smt->execute([$id]);
    $result=$smt->fetchAll(PDO::FETCH_ASSOC);
    foreach($result as $product){
        $id=$product['id'];
        $productname=$product['productname'];
        $price=$product['price'];
        $quantity=1;
        $totalPrice=$price*$quantity;
        $image=$product['image_url'];
        $query="SELECT * from cart where product_id = ?";
        $smt=$pdo->prepare($query);
        $smt->execute([$id]);
        $result=$smt->fetchAll(PDO::FETCH_ASSOC);
        if(count($result)==1){
            foreach($result as $product){
                $quantity=$product['quantity']+1;
                $total=$quantity*$product['price'];
                $query="UPDATE cart SET quantity=?,total=? where product_id=?";
                $smt=$pdo->prepare($query);
                $smt->execute([$quantity,$total,$id]);
                $response['data']=true;
                echo json_encode($response);
                exit;
            }
        }
        else{
            $userId=$_POST['user_id'];
            $query="INSERT INTO cart(user_id,product_id,productname,image,price,quantity,total) values(?,?,?,?,?,?,?)";
            $smt=$pdo->prepare($query);
            $smt->execute([$userId,$id,$productname,$image,$price,$quantity,$totalPrice]);
            $response['data']=true;
            echo json_encode($response);
            exit;
        }
       
    }
}