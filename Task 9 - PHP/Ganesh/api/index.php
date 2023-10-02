<?php
require_once "./dbConfig.php";

$response = ["status" => false, "message" => "", "data" => ""];

function getAllFeed($pdo){
    $query = "SELECT id,
                product_image,
                name,
                price,
                discount,
                category_id
                FROM products
            ";
    $statment = $pdo->prepare($query);
    $statment->execute();
    $feed = $statment->fetchAll(PDO::FETCH_ASSOC);
    return $feed;
}

if (isset($_GET['type'])) {
    if (($_GET['type']) == 'getfeed') {

        $feed = getAllFeed($pdo);

        // Get the product categories.
        $query = "SELECT id,
                category
                FROM categories
            ";
        $statment = $pdo->prepare($query);
        $statment->execute();
        $categories = $statment->fetchAll(PDO::FETCH_ASSOC);


        if (empty($categories)) {
            $response["message"] = "Error while getting the categories !";
            echo json_encode($response);
            exit;
        }

        $response["status"] = true;
        $response["data"] = [$feed, $categories];
        echo json_encode($response);
        exit;
    }

}

if ($_SERVER["REQUEST_METHOD"] == 'POST') {

    if(empty($_POST["filter_option"])){
        $response["message"] = "No input is select, Something error !";
        echo json_encode($response);
        exit;
    } else {

        // ALL Categories feed.
        if($_POST["filter_option"] == -1){
            // all category with input filter.
            if($_POST['search_keyword']){
                $input = $_POST['search_keyword'];
                $search = "%$input%";
                $query = "SELECT id,
                     product_image,
                     name,
                     price,
                     discount,
                     category_id
                     FROM products
                     WHERE name ILIKE ?
                ";
                $statment = $pdo->prepare($query);
                $statment->execute([$search]);
                $feed = $statment->fetchAll(PDO::FETCH_ASSOC);
    
                if (empty($feed)) {
                    $response["message"] = "<div><h3>No results for \"" . $input . "\".</h3><p>Try checking your spelling or use more general terms</p></div>";
                    echo json_encode($response);
                    exit;
                }
    
                $response["status"] = true;
                $response["data"] = [$feed];
                echo json_encode($response);
                exit;
            }

            $feed = getAllFeed($pdo);

            if (empty($feed)) {
                $response["message"] = "Error while loading products! Please try again.";
                echo json_encode($response);
                exit;
            }

            $response["status"] = true;
            $response["data"] = [$feed];
            echo json_encode($response);
            exit;
        }
        // On successful DB connection.
        // Get the products by input search and category.
        if($_POST['search_keyword']){

            $input = $_POST['search_keyword'];
            $search = "%$input%";
            $query = "SELECT id,
                 product_image,
                 name,
                 price,
                 discount,
                 category_id
                 FROM products
                 WHERE category_id = ? AND name ILIKE ?
            ";
            $statment = $pdo->prepare($query);
            $statment->execute([$_POST['filter_option'], $search]);
            $feed = $statment->fetchAll(PDO::FETCH_ASSOC);

            if (empty($feed)) {
                $response["message"] = "<h3>No results for \"" . $input . "\".</h3><p>Try checking your spelling or use more general terms</p> ";
                echo json_encode($response);
                exit;
            }

            $response["status"] = true;
            $response["data"] = [$feed];
            echo json_encode($response);
            exit;
        }

        // Get feed by selected category.
        $query = "SELECT id,
             product_image,
             name,
             price,
             discount,
             category_id
             FROM products
             WHERE category_id = ?
        ";
        $statment = $pdo->prepare($query);
        $statment->execute([$_POST['filter_option']]);
        $feed = $statment->fetchAll(PDO::FETCH_ASSOC);

        if (empty($feed)) {
            $response["message"] = "ALERT: Error while getting the category products you were looking for !";
            echo json_encode($response);
            exit;
        }

        $response["status"] = true;
        $response["data"] = [$feed];
        echo json_encode($response);
        exit;

       
    }
}

?>