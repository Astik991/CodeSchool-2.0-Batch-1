<?php

require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $response = ["status" => false, "message" => "", "data" => null,];
    $pdo = getPDO();

    $query = "SELECT
    employees.employee_id,emp_name,employees.emp_email,salary,loan_amount,remaining_amount,deduction_amount,
    ROUND(daily_payout - (
        SELECT
            L.deduction_amount
        from loans L
        WHERE
            employees.employee_id = L.employee_id
    ) / 22,2) daily_payout, salary - (
        SELECT
            deduction_amount
        from loans
        WHERE
            employees.employee_id = loans.employee_id
    ) take_home_salary
  FROM employees
    INNER JOIN payroll ON payroll.employee_id = employees.employee_id
    INNER JOIN loans ON loans.employee_id = employees.employee_id;";


    $statment = $pdo->prepare($query);
    $statment->execute();
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);

    $response["message"] = "Success";
    $response["status"] = true;
    $response["data"] = $user;
    echo json_encode($response);
    exit;
} else if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $response = ["status" => false, "message" => ""];

    if (!isset($_POST["empIdInput"])) {
        $response["message"] = "EmployeeName is required!................";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["empSalMonth"])) {
        $response["message"] = "Employee Monthly Sal  is required!................";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["empPerdaySal"])) {
        $response["message"] = "Employee data is required!................";
        echo json_encode($response);
        exit;
    }

    $empId = $_POST["empIdInput"];
    $empSalMonth = $_POST["empSalMonth"];
    $empPdSal = $_POST["empPerdaySal"];


    $pdo = new PDO("pgsql:host=localhost;port=5432;dbname=hr_management;user=postgres;password=postgres");
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
        echo json_encode($response);
        exit;
    }


    $query = "INSERT INTO payroll (employee_id,salary,daily_payOut) VALUES (?, ?, ?)";

    $statment = $pdo->prepare($query);
    $result = $statment->execute([$empId, $empSalMonth, $empPdSal]);

    if (!$result) {
        $response["message"] = $statment->errorInfo();
        echo json_encode($response);
        exit;
    }

    $response["status"] = true;
    $response["message"] = "Successfully Entered!";
    echo json_encode($response);
    exit;

    $response["message"] = "ONLY POST method Accepted";
    echo json_encode($response);
}
