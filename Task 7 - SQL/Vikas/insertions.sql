-- Insert data into WorkingDetails, Jobroles, and locationDetails tables
INSERT INTO WorkingDetails (workingStatus_id, workingStatus)
VALUES
    (1, 'expired'),
    (2, 'working'),
    (3, 'retired'),
    (4, 'working'),
    (5, 'retired'),
    (6, 'expired'),
    (7, 'working'),
    (8, 'retired'),
    (9, 'working'),
    (10, 'expired');

INSERT INTO Jobroles (designation)
VALUES
    ('DataAnalyst'),
    ('Developer'),
    ('HR'),
    ('Intern'),
    ('Tester'),
    ('DataAnalyst'),
    ('Developer'),
    ('HR'),
    ('Intern'),
    ('Tester');

INSERT INTO locationDetails (AreaofLocation)
VALUES
    ('Suryapet'),
    ('Hyderabad'),
    ('khammam'),
    ('Adilabad'),
    ('Medak'),
    ('Suryapet'),
    ('Hyderabad'),
    ('khammam'),
    ('Adilabad'),
    ('Medak');

INSERT INTO EmployeeBasicDetails (firstname, lastname, dob, doj, gender, phone, workingStatus_id, designation_id, AreaofLocation_id, created_at)
VALUES
    ('John', 'Doe', '1990-05-15', '2020-02-10', 'Male', 1234567890, 1, 1, 1, NOW()),
    ('Jane', 'Smith', '1985-08-20', '2019-03-25', 'Female', 9876543210, 2, 2, 2, NOW()),
    ('Michael', 'Johnson', '1992-11-03', '2022-01-05', 'Male', 5551234567, 3, 3, 3, NOW()),
    ('Emily', 'Davis', '1988-04-10', '2021-07-12', 'Female', 1231231234, 4, 4, 4, NOW()),
    ('William', 'Wilson', '1995-09-28', '2023-04-15', 'Male', 9879879876, 5, 5, 5, NOW()),
    ('Olivia', 'Brown', '1998-02-18', '2018-12-30', 'Female', 9990001111, 6, 6, 6, NOW()),
    ('David', 'Martinez', '1987-07-07', '2022-10-22', 'Male', 4445556666, 7, 7, 7, NOW()),
    ('Sophia', 'Garcia', '1993-06-12', '2020-11-28', 'Female', 7778889999, 8, 8, 8, NOW()),
    ('James', 'Anderson', '1997-03-30', '2023-01-02', 'Male', 3336669999, 9, 9, 9, NOW()),
    ('Emma', 'Lee', '1991-12-25', '2021-06-07', 'Female', 1112223333, 10, 10, 10, NOW());
INSERT INTO SalaryDetails(SalaryComponents,type)
VALUES 
 ('Basicpay', 1),
 ('HRA', 1),
 ('CCA', 1),
 ('DDA', 1),
 ('IncomeTax',2),
 ('ProfessionalTax',2);
 INSERT INTO employeesalaryamount(Emp_id,Salary_id,SalaryAmount) VALUES 
 (1, 1, 45000),
 (1, 2, 18000),
 (1, 3, 2500),
 (1, 4, 5000),
 (1, 5, 2000),
 (1, 6, 50),
 
 (2, 1, 52000),
 (2, 2, 21000),
 (2, 3, 2800),
 (2, 4, 5500),
 (2, 5, 2200),
 (2, 6, 40),
 
 (3, 1, 38000),
 (3, 2, 15000),
 (3, 3, 2000),
 (3, 4, 4000),
 (3, 5, 1600),
 (3, 6, 35),
 
 (4, 1, 60000),
 (4,2, 23000),
 (4, 3, 3500),
 (4, 4, 6000),
 (4,5, 2400),
 (4, 6, 60),
 
 (5,1, 43000),
 (5, 2, 17000),
 (5, 3, 2750),
 (5,4, 5500),
 (5,5, 2200),
 (5, 6, 45 ),
 
 (6,1, 57000),
 (6, 2, 21000),
 (6,3, 2250),
 (6, 4, 4500),
 (6, 5, 1800),
 (6, 6, 30),
 
 (7, 1, 49000),
 (7,2, 19000),
 (7, 3, 2750),
 (7, 4, 5500),
 (7, 5, 2200),
 (7, 6, 45),
 
 (8, 1, 56000),
 (8, 2, 22000),
 (8,3, 3000),
 (8, 4, 6000),
 (8, 5, 2400),
 (8,6, 60),
 
 (9, 1, 41000),
 (9,2, 16000),
 (9, 3, 2500),
 (9,4, 5000),
 (9, 5, 2000),
 (9,6, 50),
 
 (10, 1, 63000),
 (10,2, 25000),
 (10, 3, 3250 ),
 (10, 4, 6500),
 (10,5, 2600),
 (10, 6, 65);
INSERT INTO employeetransactiondetails(Emp_id,AmountRecieved,dateofTransaction)
VALUES
 (1,70000,'2023-08-01'),
 (2,90000,'2023-08-02'),
 (3,80000,'2023-08-03'),
 (4,90000,'2023-08-04'),
 (5,100000,'2023-08-01'),
 (6,75000,'2023-08-02'),
 (7,80000,'2023-08-03'),
 (8,90000,'2023-08-02'),
 (9,100000,'2023-08-01'),
 (10,120000,'2023-08-5');