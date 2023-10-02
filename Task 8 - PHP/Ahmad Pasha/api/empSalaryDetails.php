<?php

require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $response = ["status" => false, "message" => "", "data" => null,];
    $user_id = $_GET['userid'];
    $pdo = getPDO();


    $query = "SELECT
        employees.employee_id,emp_name,employees.emp_email,salary,loan_amount,deduction_amount,remaining_amount,
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
        INNER JOIN loans ON loans.employee_id = employees.employee_id
        WHERE employees.employee_id= ?;";


    $statment = $pdo->prepare($query);
    $statment->execute([$user_id]);
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);

    $response["message"] = "Success";
    $response["status"] = true;
    $response["data"] = $user;
    echo json_encode($response);
    exit;
}
