<?php

require_once './dbconfig.php';
$pdo=getPDO();

if($_SERVER["REQUEST_METHOD"]=="POST"){
    $response=['status'=>'true','message'=>''];
    if(empty($_POST['id'])){
       $response['message']='id is empty!';
       echo json_encode($response);
       exit;
    }
    $id=$_POST['id'];
    $query="DELETE from  cart where id=?";
    $smt=$pdo->prepare($query);
    $smt->execute([$id]);
    $query1="SELECT * from cart";
    $smt=$pdo->prepare($query1);
    $smt->execute();
    $result=$smt->fetchAll(PDO::FETCH_ASSOC);
    if(count($result)>=1){
        $response['status']=true;
        echo json_encode($result);
        exit;
    }
    else{
        $response['message']='no result';
        echo json_encode($response);
        exit;
    }
}