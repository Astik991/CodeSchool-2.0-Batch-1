<?php
$response = ['status' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (empty($_POST['name'])) {
        $response['message'] = "Name is required";
    } elseif (empty($_POST['password'])) {
        $response['message'] = 'Password is required';
    } else {
        // Your database connection and validation logic here

        $dbHost = "localhost";
        $dbPort = "5432";
        $dbName = "flipkart";
        $dbUser = "postgres";
        $dbPassword = "Vineeth@123";

        try {
            $pdo = new PDO("pgsql:host=$dbHost;port=$dbPort;dbname=$dbName;user=$dbUser;password=$dbPassword");
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Check if the user exists in the registrations table
            $registrationQuery = "SELECT * FROM registrations WHERE name = ?";
            $registrationStatement = $pdo->prepare($registrationQuery);
            $registrationStatement->execute([$_POST['name']]);

            if ($registrationStatement->rowCount() == 0) {
                $response["message"] = "User not found in registrations";
            } else {
                // Insert into the users table
                $insertQuery = "INSERT INTO users(name, password) VALUES (?, ?)";
                $insertStatement = $pdo->prepare($insertQuery);
                $result = $insertStatement->execute([$_POST['name'], md5($_POST['password'])]);

                if (!$result) {
                    $response["message"] = $insertStatement->errorInfo();
                } else {
                    $response["status"] = true;
                    $response["message"] = "Successfully Registered!";
                }
            }
        } catch (PDOException $e) {
            $response["message"] = "Username or password is incorrect " ;
        }
    }

    echo json_encode($response);
} else {
    $response['message'] = "Only POST method accepted";
    echo json_encode($response);
}
?>
