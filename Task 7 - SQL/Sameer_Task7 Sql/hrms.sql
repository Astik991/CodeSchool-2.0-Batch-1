-- Active: 1692272148293@@127.0.0.1@5432@hrms
CREATE TABLE departments (
    departmentid INT PRIMARY KEY Generated AlWAYS AS IDENTITY,
    departmentname VARCHAR(50),
    managerid INT
);

-- Insert Departments
INSERT INTO departments (departmentname, managerid)
VALUES
    ('Sales', 1),
    ('Marketing', 2),
    ('IT', 3),
    ('Human Resources',4);



CREATE TABLE employees (
    employeeid INT PRIMARY KEY Generated AlWAYS AS IDENTITY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    dob DATE,
    gender VARCHAR(10),
    address VARCHAR(150),
    departmentid INT,
    position VARCHAR(50),
    hiredate DATE,
    mobile VARCHAR(150),
    FOREIGN KEY (departmentid) REFERENCES departments(departmentid)
);

INSERT INTO Employees (firstname, lastname, dob, gender, address, departmentid, position, hiredate, mobile)
VALUES 
('Sameer', 'Pradhan', '1995-09-12', 'Male','jamshedpur', 3, 'Sales Manager', '2023-01-15', '9570856322'),
('Amit','Pradhan','1997-05-22','Male','ranchi',5,'UI Developer','2023-06-10','7978626945'),
('Rajib', 'Kisku', '1988-11-10', 'Male','bbsr', 6, 'Hr', '2018-08-01', '8239456454'),
('Emily', 'Williams', '1992-04-05', 'Female','mumbai', 5, 'UI Developer', '2022-02-20', '4561237891'),
('David', 'Brown', '1987-09-18', 'Male', 'Delhi', 3, 'Sales Representative', '2023-04-12', ' 7890123456'),
('Sophia', 'Jones', '1995-01-30', 'Female', 'ctc', 4, 'Marketing Coordinator', '2023-06-25', '6789012345'),
('Matthew', 'Davis', '1989-08-08', 'Male','Patna', 5, 'IT Support Specialist', '2022-09-05', '5678901234'),
('Olivia', 'Miller', '1991-12-03', 'Female','Patna', 6, 'HR Manager', '2021-07-15', '4567890123'),
('Ethan', 'Wilson', '1993-06-25', 'Male','gaya', 3, 'Sales Associate', '2023-03-02', '3456789012'),
('Isabella', 'Taylor', '1994-10-12', 'Female','ctc', 4, 'Marketing Manager', '2022-11-18', '2345678901');

;


CREATE TABLE attendance (
    attendanceid INT PRIMARY KEY Generated AlWAYS AS IDENTITY,
    employeeid INT,
    date DATE,
    timein TIME,
    timeout TIME,
    totalhours DECIMAL(5, 2),
    FOREIGN KEY (employeeid) REFERENCES employees(employeeid)
);
INSERT INTO attendance (employeeid, date, timein, timeout, totalhours)
VALUES
(4, '2023-08-01', '09:00:00', '18:00:00', 9),
(5, '2023-08-01', '09:00:00', '18:00:00', 9),
(6, '2023-08-01', '09:00:00', '18:00:00', 9),
(7, '2023-08-01', '09:00:00', '18:00:00', 9),
(8, '2023-08-01', '09:00:00', '18:00:00', 9),
(9, '2023-08-01', '09:00:00', '18:00:00', 9),
(10, '2023-08-01', '09:00:00', '18:00:00', 9),
(11, '2023-08-01', '09:00:00', '18:00:00', 9),
(12, '2023-08-01', '09:00:00', '18:00:00', 9),
(13, '2023-08-01', '09:00:00', '18:00:00', 9);


INSERT INTO attendance (employeeid, date, timein, timeout, totalhours)
VALUES
(4, '2023-08-02', '09:00:00', '18:00:00', 9),
(5, '2023-08-02', '09:00:00', '18:00:00', 9),
(6, '2023-08-02', '09:00:00', '18:00:00', 9),
(7, '2023-08-02', '09:00:00', '18:00:00', 9),
(8, '2023-08-02', '09:00:00', '18:00:00', 9),
(9, '2023-08-02', '09:00:00', '18:00:00', 9),
(10, '2023-08-02', '09:00:00', '18:00:00', 9),
(12, '2023-08-02', '09:00:00', '18:00:00', 9),
(13, '2023-08-02', '09:00:00', '18:00:00', 9);

INSERT INTO attendance (employeeid, date, timein, timeout, totalhours)
VALUES
(4, '2023-08-03', '09:00:00', '18:00:00', 9),
(5, '2023-08-03', '09:00:00', '18:00:00', 9),
(6, '2023-08-03', '09:00:00', '18:00:00', 9),
(7, '2023-08-03', '09:00:00', '18:00:00', 9),
(8, '2023-08-03', '09:00:00', '18:00:00', 9),
(9, '2023-08-03', '09:00:00', '18:00:00', 9),
(10, '2023-08-03', '09:00:00', '18:00:00', 9),
(11, '2023-08-03', '09:00:00', '18:00:00', 9);

INSERT INTO attendance (employeeid, date, timein, timeout, totalhours)
VALUES
(4, '2023-08-04', '09:00:00', '18:00:00', 9),
(5, '2023-08-04', '09:00:00', '18:00:00', 9),
(6, '2023-08-04', '09:00:00', '18:00:00', 9),
(7, '2023-08-04', '09:00:00', '18:00:00', 9),
(8, '2023-08-04', '09:00:00', '18:00:00', 9),
(9, '2023-08-04', '09:00:00', '18:00:00', 9),
(10, '2023-08-04', '09:00:00', '18:00:00', 9),
(11, '2023-08-04', '09:00:00', '18:00:00', 9),
(12, '2023-08-04', '09:00:00', '18:00:00', 9),
(13, '2023-08-04', '09:00:00', '18:00:00', 9);

INSERT INTO attendance (employeeid, date, timein, timeout, totalhours)
VALUES
(4, '2023-08-05', '09:00:00', '17:00:00', 8),
(5, '2023-08-05', '09:00:00', '15:00:00', 7),
(6, '2023-08-05', '09:00:00', '18:00:00', 9),
(7, '2023-08-05', '09:00:00', '18:00:00', 9),
(8, '2023-08-05', '09:00:00', '18:00:00', 9),
(9, '2023-08-05', '09:00:00', '18:00:00', 9),
(10, '2023-08-05', '09:00:00', '18:00:00', 9),
(11, '2023-08-05', '09:00:00', '18:00:00', 9),
(12, '2023-08-05', '09:00:00', '18:00:00', 9),
(13, '2023-08-05', '09:00:00', '18:00:00', 9);


CREATE TABLE salaries (
    salaryid INT PRIMARY KEY Generated AlWAYS AS IDENTITY,
    employeeid INT,
    basesalary DECIMAL(10, 2),
    deductions DECIMAL(10, 2),
    FOREIGN KEY (employeeid) REFERENCES employees(employeeid)
);

INSERT INTO salaries (employeeid, basesalary, deductions)
VALUES 
(4, 10000,1000),
(5, 15000,1500),
(6, 12000,1100),
(7, 18000,1200),
(8, 12000,800),
(9, 10000,1000),
(10, 10000,1000),
(11, 10000,1000),
(12, 10000,1000),
(13,8000,500);



CREATE TABLE dailypayouts (
    payoutid INT PRIMARY KEY Generated AlWAYS AS IDENTITY,
    employeeid INT,
    date DATE,
    totalhoursworked DECIMAL(5, 2),
    overtimehours DECIMAL(5, 2),
    grossearnings DECIMAL(10, 2),
    deductions DECIMAL(10, 2),
    netpayout DECIMAL(10, 2),
    FOREIGN KEY (employeeid) REFERENCES employees(employeeid)
);

-- Insert Daily Payouts
INSERT INTO dailypayouts (employeeid, date, totalhoursworked, overtimehours, grossearnings, deductions, netpayout)
VALUES
    (4, '2023-08-01', 9, 1, 450.00, 50.00, 400.00),
    (5, '2023-08-01', 9, 0.5, 320.00, 30.00, 290.00),
    (6, '2023-08-01', 9, 2, 600.00, 60.00, 540.00),
    (7, '2023-08-01', 9, 0, 375.00, 45.00, 330.00),
    (8, '2023-08-01', 9, 1, 420.00, 40.00, 380.00),
    (9, '2023-08-01', 9, 0, 325.00, 35.00, 290.00),
    (10, '2023-08-01', 9, 0.5, 410.00, 50.00, 360.00),
    (11, '2023-08-01', 9, 0, 400.00, 40.00, 360.00),
    (12, '2023-08-01', 9, 1, 440.00, 45.00, 395.00),
    (13, '2023-08-01', 9, 0, 380.00, 40.00, 340.00);

DROP  dailypayouts (employeeid, date, totalhoursworked, overtimehours, grossearnings, deductions, netpayout)
VALUES
    (4, '2023-08-02', 9, 1, 450.00, 50.00, 400.00),
    (5, '2023-08-02', 9, 0.5, 320.00, 30.00, 290.00),
    (6, '2023-08-02', 9, 2, 600.00, 60.00, 540.00),
    (7, '2023-08-02', 9, 0, 375.00, 45.00, 330.00),
    (8, '2023-08-02', 9, 1, 420.00, 40.00, 380.00),
    (9, '2023-08-02', 9, 0, 325.00, 35.00, 290.00),
    (10, '2023-08-02', 9, 0.5, 410.00, 50.00, 360.00),
    (12, '2023-08-02', 9, 1, 440.00, 45.00, 395.00),
    (13, '2023-08-02', 9, 0, 380.00, 40.00, 340.00);

INSERT INTO dailypayouts (employeeid, date, totalhoursworked, overtimehours, grossearnings, deductions, netpayout)
VALUES
    (4, '2023-08-03', 9, 1, 450.00, 50.00, 400.00),
    (5, '2023-08-03', 9, 0.5, 320.00, 30.00, 290.00),
    (6, '2023-08-03', 9, 2, 600.00, 60.00, 540.00),
    (7, '2023-08-03', 9, 0, 375.00, 45.00, 330.00),
    (8, '2023-08-03', 9, 1, 420.00, 40.00, 380.00),
    (9, '2023-08-03', 9, 0, 325.00, 35.00, 290.00),
    (10, '2023-08-03', 9, 0.5, 410.00, 50.00, 360.00),
    (11, '2023-08-03', 9, 0, 400.00, 40.00, 360.00),
    (12, '2023-08-03', 9, 1, 440.00, 45.00, 395.00);

    INSERT INTO dailypayouts (employeeid, date, totalhoursworked, overtimehours, grossearnings, deductions, netpayout)
VALUES
    (4, '2023-08-04', 9, 1, 450.00, 50.00, 400.00),
    (5, '2023-08-04', 9, 0.5, 320.00, 30.00, 290.00),
    (6, '2023-08-04', 9, 2, 600.00, 60.00, 540.00),
    (7, '2023-08-04', 9, 0, 375.00, 45.00, 330.00),
    (8, '2023-08-04', 9, 1, 420.00, 40.00, 380.00),
    (9, '2023-08-04', 9, 0, 325.00, 35.00, 290.00),
    (10, '2023-08-04', 9, 0.5, 410.00, 50.00, 360.00),
    (11, '2023-08-04', 9, 0, 400.00, 40.00, 360.00),
    (12, '2023-08-04', 9, 1, 440.00, 45.00, 395.00),
    (13, '2023-08-04', 9, 0, 380.00, 40.00, 340.00);

--Query to get Employee details from employee and department details from department  
SELECT e.employeeid, CONCAT(e.firstname, ' ', e.lastname) AS employeename, d.departmentname
FROM employees e
INNER JOIN departments d ON e.departmentid = d.departmentid;

--Query to get all Employee details from Employees table
SELECT * FROM Employees;

SELECT e.*, d.DepartmentName
FROM Employees e
INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID;

--Query to get all Employees Present on Date
SELECT * FROM Attendance
WHERE Date = '2023-08-01';

--Query to get Totalhours Worked from Attendence
SELECT EmployeeID, SUM(TotalHours) AS TotalHoursWorked
FROM Attendance
WHERE EmployeeID = 4
GROUP BY EmployeeID;

--Query to payroll details for single date
SELECT a.EmployeeID, a.Date, a.TotalHours,
       (a.TotalHours * s.BaseSalary) AS GrossEarnings,
       s.Deductions,
       (a.TotalHours * s.BaseSalary) AS NetPayout
FROM Attendance a
JOIN Salaries s ON a.EmployeeID = s.EmployeeID
WHERE a.Date = '2023-08-02';

--Query to get Employess details and payroll for 3 days
SELECT
    e.FirstName,
    e.LastName,
    dp.Date,
    dp.TotalHoursWorked,
    dp.OvertimeHours,
    dp.GrossEarnings,
    dp.Deductions,
    dp.NetPayout
FROM
    Employees e
JOIN
    DailyPayouts dp ON e.EmployeeID = dp.EmployeeID
WHERE
    dp.Date IN ('2023-08-01', '2023-08-02', '2023-08-04')
ORDER BY
    dp.Date;