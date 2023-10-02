<?php
    $response=['status'=>'false','message'=>''];
    require_once './dbconfig.php';
    $pdo=getPDO();
    $sql='select * from products';
    $smt=$pdo->prepare($sql);
    $smt->execute();
    $result=$smt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    

