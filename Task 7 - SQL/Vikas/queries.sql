--Query 1
SELECT empcode,firstname,lastname,dob,doj,gender,phone,workingstatus,designation,areaoflocation from workingdetails join employeebasicdetails on employeebasicdetails.id=workingdetails.workingstatus_id join jobroles on employeebasicdetails.id=jobroles.designation_id join locationdetails on employeebasicdetails.id=locationdetails.areaoflocation_id;
--Query 2
SELECT areaoflocation, count(*) as EmployeeCount from locationdetails GROUP BY areaoflocation;
--Query 3
SELECT designation,count(*) as EmployeeCount from jobroles GROUP BY designation;
--Query 4
SELECT workingstatus,count(*) as EmployeeCount from workingdetails GROUP BY workingstatus;
--Query 5
SELECT empcode, firstname, dob, doj, (dob + interval '60 years') as retirement_date FROM employeebasicdetails;
--Query 6
SELECT empcode,firstname,salarycomponents,salaryamount FROM salarydetails join employeesalaryamount on salarydetails.id=employeesalaryamount.salary_id JOIN employeebasicdetails on employeesalaryamount.emp_id=employeebasicdetails.id WHERE type=1 ;
--Query 7
SELECT emp_id,SUM(salaryamount) FROM employeesalaryamount  GROUP BY emp_id ORDER BY emp_id;
 
 
