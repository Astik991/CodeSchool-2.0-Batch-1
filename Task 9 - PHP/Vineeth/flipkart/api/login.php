<?php

require_once './dbconfig.php';

$pdo=getPDO();
$response=["status"=>false,"message"=>"login failed"];

if($_SERVER["REQUEST_METHOD"]=="POST"){


    if(empty($_POST['name'])){
       $response['message']="Name is required";
       echo json_encode($response);
       exit;
    }
    if(empty($_POST['password'])){
        $response['message']="Password is required";
        echo json_encode($response);
        exit;
    }
    $name=$_POST['name'];
    $password=md5($_POST['password']);
    if($name=='' || $password == ""){
        $response['message']="Name and Password is required";
        echo json_encode($response);
        exit;
    }
    $query='SELECT * from users where Register_name = ? and password = ?';
    $smt=$pdo->prepare($query);
    $smt->execute([$name,$password]);
    $result = $smt->fetchAll(PDO::FETCH_ASSOC);
    if(count($result) == 1){
        $response["status"] = true;
        $response["message"] = " login Successfully ";
        echo json_encode($result);
        exit; 
    }
    $response["message"] = " User name or password is incorrect ";
    echo json_encode($response);
    exit;
}