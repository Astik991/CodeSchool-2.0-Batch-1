<?php

require_once "./dbConfig.php";

$response = ["status" => false, "message" => "", "data" => ""];

// Validation function for product name.
function inputNameValidation($name){
    if (empty($name)) {
        $response["status"] = false;
        $response["message"] = "Name is required !";
        echo json_encode($response);
        exit;
    } elseif (strlen($name) < 2 || strlen($name) > 100) {
        $response["status"] = false;
        $response["message"] = "Name should be a valid length !";
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = true;
        $response["data"] = $name;
        return $response;
    }
}

// Validation function for path and input type select.
function inputSelectValidation($input){
    if (empty($input)) {
        $response["status"] = false;
        $response["message"] = "Please select input !";
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = true;
        $response["data"] = $input;
        return $response;
    }
}

// Validation function for discount.
function discountValidation($discount){
    if (empty($discount)) {
        $response["status"] = false;
        $response["message"] = "Enter the discount amount !";
        echo json_encode($response);
        exit;
    } elseif (!(preg_match("/[0-9.]/", $discount))) {
        $response["status"] = false;
        $response["message"] = "Enter discount in numbers without characters and special characters !";
        echo json_encode($response);
        exit;
    } elseif ($discount < 1 || $discount > 100) {
        $response["status"] = false;
        $response["message"] = "Enter discount in percentage 1 - 100 !";
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = true;
        $response["data"] = $discount;
        return $response;
    }
}

// Validation function for price.
function priceValidation($price){
    if (empty($price)) {
        $response["status"] = false;
        $response["message"] = "Enter the price !";
        echo json_encode($response);
        exit;
    } elseif (!(preg_match("/[0-9.]/", $price))) {
        $response["status"] = false;
        $response["message"] = "Enter price in numbers without characters and special characters !";
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = true;
        $response["data"] = $price;
        return $response;
    }
}

// Validate file.
function inputFileValidate($file){
    if (empty($file)) {
        $response["status"] = false;
        $response["message"] = "Please select the file !";
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = true;
        $response["data"] = $file;
        return $response;
    }
}


// On POST request to server.
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get assosiative array of form inputs.
    $productData = $_POST;

    // Check the data.
    if (empty($productData)) {
        $response["status"] = false;
        $response["message"] = "Fill all the input fields !";
        echo json_encode($response);
        exit;
    }
    // then.

    // Get Individual Values.
    $product_name = strval($productData['product_name']);
    $image = $_FILES['image']['name'];
    $product_price = strval($productData['price']);
    $product_discount = strval($productData['discount']);
    $product_category = strval($productData['category']);


    // Validation count verification.
    $validation = array();
    $count = 0;

    array_push($validation, inputNameValidation($product_name));
    array_push($validation, inputFileValidate($image));
    array_push($validation, priceValidation($product_price));
    array_push($validation, discountValidation($product_discount));
    array_push($validation, inputSelectValidation($product_category));

    foreach ($validation as $val) {
        if ($val) {
            $count++;
        }
    }

    // On Unsuccessful validations.
    if ($count != count($validation)) {
        $response["status"] = false;
        $response["message"] = "Fill all the input fields !";
        echo json_encode($response);
        exit;
    }

    // On successful connection.
    $search = "%$image%";
    $query = "SELECT id 
            FROM products 
            WHERE product_image LIKE ?";
    $statement = $pdo->prepare($query);
    $statement->execute([$search]);
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Check for the product image already exist in the DB.
    if (count($result) == 1) {
        $response["status"] = false;
        $response["message"] = "Image already exist.";
        echo json_encode($response);
        exit;
    }

    // Else.
    // Path to store the image.
    $imageLocation = '../assets/images/products/' . $image;
    // On successful storing image to path.
    if (move_uploaded_file($_FILES['image']['tmp_name'], $imageLocation)) {

        // Insert the product data.
        $query = "INSERT INTO
            products( product_image, name, price, discount, category_id )
            VALUES ( :product_image, :product_name, :price, :discount, :category_id )";
        $statement = $pdo->prepare($query);
        $statement->execute([
            'product_image' => $imageLocation,
            'product_name' => $product_name,
            'price' => $product_price,
            'discount' => $product_discount,
            'category_id' => $product_category
        ]);
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        // Error while inserting data.
        if(!$result){
            $response["status"] = false;
            $response["message"] = $statement->errorInfo();
            echo json_encode($response);
            exit;
        }

        // On successful data insertion.
        $response["status"] = true;
        $response["message"] = "Product added successfully.";
        echo json_encode($response);
        exit;

    } else {
        $response["status"] = false;
        $response["message"] = "Error while storing the image.";
        echo json_encode($response);
        exit;
    }
}