<?php

require './dbconfig.php';
$pdo=getPDO();
if($_SERVER['REQUEST_METHOD']=='POST'){
    $id=$_POST['id'];
    $query="SELECT * from cart where user_id=?";
    $smt=$pdo->prepare($query);
    $smt->execute([$id]);
    $result=$smt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    exit;
}