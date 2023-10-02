<?php
require_once './dbconfig.php';
$pdo=getPDO();
if($_SERVER['REQUEST_METHOD']=='POST'){
    $response=['status'=>'false','message'=>''];
    if(empty($_POST['amount'])){
        $response['message']='amount is empty';
        echo json_encode($response);
    }
    else{
        $total=$_POST['amount'];
        $query='INSERT INTO orders(total_price) VALUES(?)';
        $smt=$pdo->prepare($query);
        $smt->execute([$total]);
        $response['status']=true;
        echo json_encode($response);
        exit;
    }
}