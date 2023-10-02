<?php

if($_SERVER["REQUEST_METHOD"]=='POST'){
    header('Content-Type: application/json');
    $response=["status"=>false,"message"=>""];
    if(!isset($_POST["name"])){
        $response['message']="Name is required";
        echo json_encode($response);
        exit;
    }
    if(!isset($_POST["password"])){
       $response["message"]="password is required";
       echo json_encode($response);
       exit;
    }
    if(!isset($_POST["email"])){
        $response["message"]="email is required";
        echo json_encode($response);
        exit;
    }
    if(!isset($_POST["phone"])){
        $response["message"]="phone is required";
        echo json_encode($response);
        exit;
    }
    $name=$_POST["name"];
    $password=md5($_POST["password"]);
    $email=$_POST["email"];
    $phone=$_POST["phone"];
    if ($name == '' || $password == '' || $email == '' || $phone == '' ) {
        $response["message"] = "Username , Password ,email and phone shouldn't be empty";
        echo json_encode($response);
        exit;
    }

    $pdo = new PDO("pgsql:host=localhost;port=5432;dbname=flipkart;user=postgres;password=Vineeth@123");
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
        echo json_encode($response);
        exit;
    }
    $query = "SELECT id FROM Registrations WHERE name = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$name]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($result) == 1) {
        $response["message"] = "Username already Taken!";
        echo json_encode($response);
        exit;
    }
    $query = "INSERT INTO Registrations (name, email, password, phone) VALUES (?, ?, ?, ?)";

    $statement =$pdo->prepare($query);
    $result=$statement->execute([$name, $email, $password, $phone]);

    if(!$result){
        $response["message"]=$statement->errorInfo();
        echo json_encode($response);
    }
    $response["status"] = true;
    $response["message"] = "Successfully Registered!";
    echo json_encode($response);
    exit;
}
$response["message"] = "ONLY POST method Accepted";
echo json_encode($response);