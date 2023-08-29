CREATE TABLE EmployeeBasicDetails(  
    id SERIAL PRIMARY KEY,
    empcode VARCHAR(5) DEFAULT nextval('empcode_sequence') NOT NULL,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    dob DATE,
    doj DATE,
    gender VARCHAR(100),
    phone BIGINT,
    workingStatus_id INTEGER,
    designation_id INTEGER,
    AreaofLocation_id INTEGER,
    created_at TIMESTAMP,
    FOREIGN KEY (workingStatus_id) REFERENCES WorkingDetails(workingStatus_id),
    FOREIGN KEY (designation_id) REFERENCES Jobroles(designation_id),
    FOREIGN KEY (AreaofLocation_id) REFERENCES locationDetails(AreaofLocation_id)
);
CREATE TABLE WorkingDetails(
    workingStatus_id integer PRIMARY KEY,
    workingStatus VARCHAR(100)
);

CREATE TABLE Jobroles(
    designation_id SERIAL PRIMARY KEY,
    designation VARCHAR(100)
);

CREATE TABLE locationDetails(
    AreaofLocation_id SERIAL PRIMARY KEY,
    AreaofLocation VARCHAR(100)
);
CREATE SEQUENCE empcode_sequence START 20001;
CREATE TABLE SalaryDetails(
    id SERIAL PRIMARY KEY,
    SalaryComponents varchar(100),
    type integer
    
);
CREATE TABLE EmployeeSalaryAmount(
    id SERIAL PRIMARY KEY,
    Emp_id integer,
    Salary_id  integer,
    SalaryAmount BIGINT
);
CREATE table EmployeeTransactionDetails(
    id SERIAL PRIMARY KEY,
    Emp_id integer,
    AmountRecieved BIGINT,
    dateofTransaction date
    
 );