<?php
$url="https://fakestoreapi.com/products";
$data=file_get_contents($url);
$data=json_decode($data,true);
if(isset($data)){
    require_once './dbconfig.php';
    $pdo=getPDO();
    foreach($data as $items){
        $title=$items['title'];
        $price=$items['price'];
        $description=$items['description'];
        $category=$items['category'];
        $image_url=$items['image'];
        $rating=$items['rating']['rate'];
        $query="INSERT INTO products(productName,price,description,category,image_url,rating) VALUES(?,?,?,?,?,?)";
        $smt=$pdo->prepare($query);
        $smt->execute([$title,$price, $description,$category,$image_url,$rating]); 
    }
}