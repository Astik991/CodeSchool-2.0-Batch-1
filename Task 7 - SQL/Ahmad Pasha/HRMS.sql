-- Active: 1692271638519@@127.0.0.1@5432@hr_management@public

CREATE TABLE
    Employees(
        employee_id SERIAL PRIMARY KEY NOT NULL,
        emp_name VARCHAR(50) NOT NULL,
        emp_email VARCHAR(100) UNIQUE,
        emp_phone VARCHAR(15) UNIQUE NOT NULL,
        emp_gender VARCHAR(10) NOT NULL,
        hire_date DATE NOT NULL,
        reportingTo INT
    );

INSERT INTO
    Employees(
        emp_name,
        emp_email,
        emp_phone,
        emp_gender,
        hire_date
    )
VALUES (
        'Shoban',
        'shoban123@gmail.com',
        '9201377450',
        'male',
        '10-12-2020'
    ), (
        'Ravi',
        'ravi123@gmail.com',
        '9201677450',
        'male',
        '10-11-2020'
    ), (
        'Jaithri',
        'jaithri123@gmail.com',
        '9201377455',
        'female',
        '15-5-2020'
    );

INSERT INTO
    Employees(
        emp_name,
        emp_email,
        emp_phone,
        emp_gender,
        hire_date,
        reportingTo
    )
VALUES (
        'Jhones',
        'jhones123@gmail.com',
        '9201377400',
        'male',
        '10-6-2022',
        1
    ), (
        'Sai',
        'sai123@gmail.com',
        '9202377450',
        'male',
        '10-2-2022',
        1
    ), (
        'goldy',
        'goldy123@gmail.com',
        '8201377450',
        'female',
        '9-3-2022',
        1
    ), (
        'Sudheer',
        'sudheer123@gmail.com',
        '9231377450',
        'male',
        '10-4-2022',
        2
    ), (
        'Rashmi',
        'rashmi123@gmail.com',
        '9201379450',
        'male',
        '30-5-2022',
        2
    ), (
        'Divya',
        'divya123@gmail.com',
        '9207377450',
        'female',
        '20-6-2022',
        2
    ), (
        'Manjula',
        'manjula123@gmail.com',
        '9207307450',
        'female',
        '10-12-2022',
        3
    ), (
        'Varun',
        'varun123@gmail.com',
        '9201377750',
        'male',
        '10-2-2023',
        3
    ), (
        'Akhila',
        'akhila123@gmail.com',
        '9901377450',
        'female',
        '10-2-2022',
        3
    );

DROP Table employees;

CREATE TABLE
    Department(
        department_id SERIAL NOT NULL PRIMARY KEY,
        job_title VARCHAR(100),
        department_name VARCHAR(100),
        employee_id INT REFERENCES Employees(employee_id)
    );

DROP Table department;

INSERT INTO
    department(
        job_title,
        department_name,
        employee_id
    )
VALUES ('Manager', 'Development', 1), ('Manager', 'Testing', 2), ('Manager', 'Finance', 3), ('Developer', 'Development', 4), ('Developer', 'Development', 5), ('Developer', 'Development', 6), ('Tester', 'Testing', 7), ('Tester', 'Testing', 8), ('Tester', 'Testing', 9), ('Accountant', 'Finance', 10), ('Accountant', 'Finance', 11), ('Accountant', 'Finance', 12);

CREATE TABLE
    Attendance(
        attendance_id SERIAL PRIMARY KEY,
        employee_id INT REFERENCES Employees(employee_id),
        date TIMESTAMPTZ DEFAULT Now() NOT NULL,
        attendance INT NOT NULL
    );

SELECT count(*), employee_id
from attendance
where attendance = 0
GROUP BY employee_id;

SELECT count(*), employee_id
from attendance
where attendance = 0
GROUP BY employee_id;

INSERT INTO
    attendance(employee_id, date, attendance)
VALUES (1, '2023-08-01', 1), (2, '2023-08-01', 1), (3, '2023-08-01', 1), (4, '2023-08-01', 1), (5, '2023-08-01', 0), (6, '2023-08-01', 1), (7, '2023-08-01', 0), (8, '2023-08-01', 1), (9, '2023-08-01', 1), (10, '2023-08-01', 1), (11, '2023-08-01', 0), (12, '2023-08-01', 1), (1, '2023-08-02', 1), (2, '2023-08-02', 1), (3, '2023-08-02', 1), (4, '2023-08-02', 0), (5, '2023-08-02', 1), (6, '2023-08-02', 1), (7, '2023-08-02', 0), (8, '2023-08-02', 1), (9, '2023-08-02', 0), (10, '2023-08-02', 1), (11, '2023-08-02', 1), (12, '2023-08-02', 0), (1, '2023-08-03', 1), (2, '2023-08-03', 1), (3, '2023-08-03', 1), (4, '2023-08-03', 0), (5, '2023-08-03', 1), (6, '2023-08-03', 0), (7, '2023-08-03', 1), (8, '2023-08-03', 1), (9, '2023-08-03', 0), (10, '2023-08-03', 1), (11, '2023-08-03', 1), (12, '2023-08-03', 0), (1, '2023-08-04', 1), (2, '2023-08-04', 1), (3, '2023-08-04', 1), (4, '2023-08-04', 1), (5, '2023-08-04', 0), (6, '2023-08-04', 1), (7, '2023-08-04', 1), (8, '2023-08-04', 0), (9, '2023-08-04', 1), (10, '2023-08-04', 1), (11, '2023-08-04', 0), (12, '2023-08-04', 1), (1, '2023-08-05', 1), (2, '2023-08-05', 1), (3, '2023-08-05', 1), (4, '2023-08-05', 1), (5, '2023-08-05', 0), (6, '2023-08-05', 1), (7, '2023-08-05', 1), (8, '2023-08-05', 0), (9, '2023-08-05', 1), (10, '2023-08-05', 1), (11, '2023-08-05', 1), (12, '2023-08-05', 1), (1, '2023-08-06', 1), (2, '2023-08-06', 1), (3, '2023-08-06', 1), (4, '2023-08-06', 0), (5, '2023-08-06', 1), (6, '2023-08-06', 1), (7, '2023-08-06', 0), (8, '2023-08-06', 1), (9, '2023-08-06', 1), (10, '2023-08-06', 1), (11, '2023-08-06', 1), (12, '2023-08-06', 1), (1, '2023-08-07', 1), (2, '2023-08-07', 1), (3, '2023-08-07', 1), (4, '2023-08-07', 0), (5, '2023-08-07', 1), (6, '2023-08-07', 1), (7, '2023-08-07', 1), (8, '2023-08-07', 1), (9, '2023-08-07', 1), (10, '2023-08-07', 1), (11, '2023-08-07', 1), (12, '2023-08-07', 1), (1, '2023-08-08', 1), (2, '2023-08-08', 1), (3, '2023-08-08', 1), (4, '2023-08-08', 0), (5, '2023-08-08', 1), (6, '2023-08-08', 1), (7, '2023-08-08', 1), (8, '2023-08-08', 0), (9, '2023-08-08', 1), (10, '2023-08-08', 1), (11, '2023-08-08', 0), (12, '2023-08-08', 1), (1, '2023-08-09', 1), (2, '2023-08-09', 1), (3, '2023-08-09', 1), (4, '2023-08-09', 1), (5, '2023-08-09', 1), (6, '2023-08-09', 1), (7, '2023-08-09', 0), (8, '2023-08-09', 1), (9, '2023-08-09', 1), (10, '2023-08-09', 1), (11, '2023-08-09', 1), (12, '2023-08-09', 1), (1, '2023-08-10', 1), (2, '2023-08-10', 1), (3, '2023-08-10', 1), (4, '2023-08-10', 1), (5, '2023-08-10', 1), (6, '2023-08-10', 1), (7, '2023-08-10', 0), (8, '2023-08-10', 1), (9, '2023-08-10', 1), (10, '2023-08-10', 1), (11, '2023-08-10', 1), (12, '2023-08-10', 1), (1, '2023-08-11', 1), (2, '2023-08-11', 1), (3, '2023-08-11', 1), (4, '2023-08-11', 1), (5, '2023-08-11', 1), (6, '2023-08-11', 1), (7, '2023-08-11', 1), (8, '2023-08-11', 0), (9, '2023-08-11', 1), (10, '2023-08-11', 1), (11, '2023-08-11', 1), (12, '2023-08-11', 1), (1, '2023-08-12', 1), (2, '2023-08-12', 1), (3, '2023-08-12', 1), (4, '2023-08-12', 1), (5, '2023-08-12', 1), (6, '2023-08-12', 0), (7, '2023-08-12', 1), (8, '2023-08-12', 1), (9, '2023-08-12', 1), (10, '2023-08-12', 1), (11, '2023-08-12', 1), (12, '2023-08-12', 1), (1, '2023-08-13', 0), (2, '2023-08-13', 1), (3, '2023-08-13', 1), (4, '2023-08-13', 1), (5, '2023-08-13', 1), (6, '2023-08-13', 1), (7, '2023-08-13', 1), (8, '2023-08-13', 1), (9, '2023-08-13', 0), (10, '2023-08-13', 1), (11, '2023-08-13', 1), (12, '2023-08-13', 1), (1, '2023-08-14', 1), (2, '2023-08-14', 1), (3, '2023-08-14', 1), (4, '2023-08-14', 0), (5, '2023-08-14', 1), (6, '2023-08-14', 1), (7, '2023-08-14', 1), (8, '2023-08-14', 1), (9, '2023-08-14', 1), (10, '2023-08-14', 1), (11, '2023-08-14', 1), (12, '2023-08-14', 0), (1, '2023-08-15', 1), (2, '2023-08-15', 1), (3, '2023-08-15', 1), (4, '2023-08-15', 1), (5, '2023-08-15', 1), (6, '2023-08-15', 0), (7, '2023-08-15', 1), (8, '2023-08-15', 1), (9, '2023-08-15', 1), (10, '2023-08-15', 1), (11, '2023-08-15', 1), (12, '2023-08-15', 1), (1, '2023-08-16', 1), (2, '2023-08-16', 1), (3, '2023-08-16', 1), (4, '2023-08-16', 1), (5, '2023-08-16', 0), (6, '2023-08-16', 1), (7, '2023-08-16', 1), (8, '2023-08-16', 1), (9, '2023-08-16', 1), (10, '2023-08-16', 1), (11, '2023-08-16', 1), (12, '2023-08-16', 1), (1, '2023-08-17', 1), (2, '2023-08-17', 1), (3, '2023-08-17', 1), (4, '2023-08-17', 1), (5, '2023-08-17', 1), (6, '2023-08-17', 1), (7, '2023-08-17', 1), (8, '2023-08-17', 1), (9, '2023-08-17', 1), (10, '2023-08-17', 1), (11, '2023-08-17', 0), (12, '2023-08-17', 1), (1, '2023-08-18', 0), (2, '2023-08-18', 1), (3, '2023-08-18', 1), (4, '2023-08-18', 1), (5, '2023-08-18', 1), (6, '2023-08-18', 1), (7, '2023-08-18', 1), (8, '2023-08-18', 1), (9, '2023-08-18', 1), (10, '2023-08-18', 0), (11, '2023-08-18', 1), (12, '2023-08-18', 1), (1, '2023-08-19', 0), (2, '2023-08-19', 1), (3, '2023-08-19', 1), (4, '2023-08-19', 1), (5, '2023-08-19', 1), (6, '2023-08-19', 0), (7, '2023-08-19', 1), (8, '2023-08-19', 1), (9, '2023-08-19', 1), (10, '2023-08-19', 1), (11, '2023-08-19', 0), (12, '2023-08-19', 1), (1, '2023-08-20', 1), (2, '2023-08-20', 1), (3, '2023-08-20', 1), (4, '2023-08-20', 1), (5, '2023-08-20', 1), (6, '2023-08-20', 0), (7, '2023-08-20', 1), (8, '2023-08-20', 1), (9, '2023-08-20', 0), (10, '2023-08-20', 1), (11, '2023-08-20', 1), (12, '2023-08-20', 1);

SELECT * from attendance;

DROP Table attendance;

CREATE TABLE
    Payroll(
        payroll_id SERIAL PRIMARY KEY,
        employee_id INT REFERENCES Employees(employee_id) NOT NULL,
        salary INT NOT NULL,
        daily_payOut DECIMAL(10, 2)
    );

INSERT INTO
    Payroll(
        employee_id,
        salary,
        daily_payOut
    )
VALUES (1, 80000, 3636.36), (2, 60000, 2727.27), (3, 70000, 3181.81), (4, 40000, 1818.18), (5, 40000, 1818.18), (6, 40000, 1818.18), (7, 25000, 1136.36), (8, 25000, 1136.36), (9, 25000, 1136.36), (10, 20000, 909.09), (11, 20000, 909.09), (12, 20000, 909.09);

DROP Table payroll;

SELECT *
from employees
    left JOIN payroll on employees.employee_id = payroll.employee_id;

CREATE TABLE
    Loans(
        loan_id SERIAL PRIMARY KEY,
        employee_id INT REFERENCES Employees(employee_id),
        loan_amount DECIMAL(10, 2) NOT NULL,
        remaining_amount DECIMAL(10, 2) NOT NULL,
        deduction_amount DECIMAL(10, 2),
        start_date DATE,
        end_date DATE
    );

INSERT INTO
    loans(
        employee_id,
        loan_amount,
        remaining_amount,
        deduction_amount,
        start_date,
        end_date
    )
VALUES (
        1,
        1000000,
        300000,
        10000,
        '21-10-2017',
        '12-6-2025'
    ), (
        2,
        500000,
        100000,
        5000,
        '21-10-2017',
        '12-6-2026'
    ), (
        3,
        500000,
        100000,
        10000,
        '21-10-2018',
        '12-6-2024'
    ), (
        4,
        500000,
        100000,
        5000,
        '21-8-2018',
        '12-6-2025'
    ), (
        5,
        500000,
        100000,
        5000,
        '21-10-2016',
        '12-6-2024'
    ), (
        6,
        500000,
        100000,
        5000,
        '21-10-2019',
        '12-6-2027'
    ), (
        7,
        500000,
        100000,
        5000,
        '21-10-2017',
        '12-6-2026'
    ), (
        8,
        500000,
        100000,
        5000,
        '21-10-2017',
        '12-6-2026'
    ), (
        9,
        700000,
        100000,
        7000,
        '21-10-2017',
        '12-6-2026'
    ), (
        10,
        400000,
        100000,
        4000,
        '21-10-2017',
        '12-6-2026'
    ), (
        11,
        300000,
        200000,
        2500,
        '21-10-2017',
        '12-6-2026'
    ), (
        12,
        300000,
        100000,
        3000,
        '21-10-2017',
        '12-6-2026'
    );

DROP TABLE loans;

SELECT * FROM loans;

-- get employee table

SELECT * FROM employees;

-- get department table

SELECT * from department;

-- get employee name ,employee email, manager name, manager email, employee salary, manager salary

SELECT
    E.emp_name AS "Employee Name",
    E.emp_email AS "Employee Email",
    M.emp_name AS "Manager Name",
    M.emp_email AS "Manager Email",
    P_emp.salary AS "Employee Salary",
    P_mgr.salary AS "Manager Salary"
FROM employees E
    JOIN employees M ON E.reportingTo = M.employee_id
    LEFT JOIN payroll P_emp ON E.employee_id = P_emp.employee_id
    LEFT JOIN payroll P_mgr ON M.employee_id = P_mgr.employee_id;

-- get employee name and employee loan amount

SELECT emp_name, loan_amount
from employees e
    INNER JOIN loans l on e.employee_id = l.employee_id;

-- get highest paid employee name

SELECT emp_name
from employees e
    INNER JOIN payroll p on e.employee_id = p.employee_id
ORDER BY salary DESC
LIMIT 1;

-- get employee name, employee email, manager name, manager email

SELECT
    E.emp_name as "Employee Name",
    E.emp_email AS "Employee Mail",
    M.emp_name AS "Manager Name",
    M.emp_email AS "Manager Mail"
FROM employees E
    JOIN employees M on E.reportingto = M.employee_id;

-- get employee name, employee email, manager name, manager email,employee department, manager department

SELECT
    E.emp_name as "Employee Name",
    E.emp_email AS "Employee Mail",
    dEmp.job_title as "Employee Role",
    dEmp.department_name as "Employee Department",
    M.emp_name AS "Manager Name",
    M.emp_email AS "Manager Mail",
    dMrg.job_title AS "Manager Role",
    dMrg.department_name AS "Manager Department"
FROM employees E
    JOIN employees M on E.reportingto = M.employee_id
    LEFT JOIN Department dEmp on dEmp.employee_id = e.employee_id
    JOIN department dMrg on dMrg.employee_id = e.reportingto;

--   on d.employee_id = e.employee_id;

-- get emp salary and manager salary as output.

SELECT
    P_emp.salary AS "Employee Salary",
    P_mgr.salary AS "Manager Salary"
FROM employees E
    JOIN employees M ON E.reportingTo = M.employee_id
    LEFT JOIN payroll P_emp ON E.employee_id = P_emp.employee_id
    LEFT JOIN payroll P_mgr ON M.employee_id = P_mgr.employee_id;

--  get employess with their daily payout

SELECT
    emp_name,
    daily_payout - (
        SELECT
            deduction_amount
        from loans
        WHERE
            employees.employee_id = loans.employee_id
    ) / 22 AS "Daily Payout"
FROM employees
    INNER JOIN payroll ON payroll.employee_id = employees.employee_id;

-- get employee name and take home salary including loan deduction amount

SELECT emp_name, salary - (
        SELECT
            deduction_amount
        from loans
        WHERE
            employees.employee_id = loans.employee_id
    ) AS "Take Home Salary"
FROM employees
    INNER JOIN payroll ON payroll.employee_id = employees.employee_id;