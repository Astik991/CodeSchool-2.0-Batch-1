<?php

require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $response = ["status" => false, "message" => "", "data" => null,];

    $pdo = getPDO();
    $query = "SELECT * FROM employees";

    $statment = $pdo->prepare($query);
    $statment->execute();
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);

    $response["message"] = "Success";
    $response["status"] = true;
    $response["data"] = $user;
    echo json_encode($response);
    exit;
} else if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $response = ["status" => false, "message" => "", "data" => null];

    if (!isset($_POST["newEmpName"])) {
        $response["message"] = "EmployeeName is required!................";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["newEmpMail"])) {
        $response["message"] = "Employee Mail is required!................";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["newEmpPhone"])) {
        $response["message"] = "Employee Phone is required!................";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["newEmpDep"])) {
        $response["message"] = "Employee department is required!................";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["newJobTitle"])) {
        $response["message"] = "Employee job title is required!................";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["newEmpGender"])) {
        $response["message"] = "Employee gender is required!................";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["newEmpHire"])) {
        $response["message"] = "Employee hire date is required!................";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["newEmpId"])) {
        $response["message"] = "Employee Id is required!................";
        echo json_encode($response);
        exit;
    }

    $newEmpName = $_POST['newEmpName'];
    $newEmpMail = $_POST['newEmpMail'];
    $newEmpPhone = $_POST['newEmpPhone'];
    $newEmpDep = $_POST['newEmpDep'];
    $newJobTitle = $_POST['newJobTitle'];
    $newEmpGender = $_POST['newEmpGender'];
    $newEmpRep = $_POST['newEmpRep'];
    $newEmpHire = $_POST['newEmpHire'];
    $newEmpId = $_POST['newEmpId'];
    $newEmpHr = $_POST['newEmpHr'];



    $pdo = new PDO("pgsql:host=localhost;port=5432;dbname=hr_management;user=postgres;password=postgres");
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
        echo json_encode($response);
        exit;
    }


    $query = "INSERT INTO employees (emp_name,emp_email,emp_phone,emp_department,emp_jobTitle,emp_gender,hire_date,reportingTo,login_id,type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $statment = $pdo->prepare($query);
    $result = $statment->execute([$newEmpName, $newEmpMail, $newEmpPhone, $newEmpDep, $newJobTitle, $newEmpGender, $newEmpHire, $newEmpRep, $newEmpId, $newEmpHr]);

    if (!$result) {
        $response["message"] = $statment->errorInfo();
        echo json_encode($response);
        exit;
    }

    $response["status"] = true;
    $response["data"] = $result;
    $response["message"] = "Successfully Entered!";
    echo json_encode($response);
    exit;

    $response["message"] = "ONLY POST method Accepted";
    echo json_encode($response);
}
