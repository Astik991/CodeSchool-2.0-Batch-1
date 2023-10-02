// user id storing on local storage

let userId = window.localStorage.getItem("user_id");
if (!userId) {
  window.location.replace("./../login.html");
}

$('#departmentCount').text('Departments ' + localStorage.getItem('depcountLen'));
$('#employeecount').text('Employees ' + localStorage.getItem('employeeCount'));


$(document).ready(function () {

// canvas menu
 
 $offcanvas = new bootstrap.Offcanvas($("#offcanvasWithBothOptions"), {
  backdrop: true,
  scroll: true,
});

$("#offcanvasToggleButton").click(function () {
  $("body").toggleClass("offcanvas-show");
  $offcanvas.toggle();
});

$("#offcanvasWithBothOptions").on("hidden.bs.offcanvas", function () {
  $("body").removeClass("offcanvas-show");
});

$(".navbar-toggler").click(function () {
  $(".left_section").toggle(50);
});

  // department section

  $("#department").change(function () {
    $("#projects").val("");
    $("#staf").val("");
    $("#salary").val("");
    $('#attendence').val('');
    let departmentInput = $("#department").val();
    if (departmentInput == 1) {
      let content = `
    <div class="m-3 p-3">
    <h1>Add Department</h1>
    
  <div class="mb-3 col-8">
    <label for="exampleInputEmail1" class="form-label">Department Name</label>
    <input type="text" class="form-control" id="depName">
  </div>
  <p id="depNameErr" class="text-danger"></p>
  <button class="btn btn-primary" id="onDep">Submit</button>
    </div>`;
      $(".details_section").html(content);

      $("#onDep").click(function () {
        let depNameInput = $("#depName").val();
        if (depNameInput !== "") {
          $.ajax({
            method: "POST",
            url: "./../api/departments.php",
            data: { depNameInput },
            success: (response) => {
              console.log("success full entered dep");
            },
            error: (response) => { },
          });
          $('#depNameErr').text('');
        } else {
          $('#depNameErr').text('Department name should not be empty');
          
        }
      });
    } else if (departmentInput == 2) {
      let content = `
      <div class="table-responsive mt-5">
      <table id="depTable" class="table">
      <thead>
      <tr>
      <th scope="col">department Id</th> 
      <th scope="col">department Name</th> 
      </tr>
      </thead>
      </table>
      </div>
      `;
      $.ajax({
        method: "GET",
        url: "./../api/departments.php",
        success: (response) => {
          let data = JSON.parse(response);
          if (data.status) {
            let departmentData = data.data;
            let depcountLen = departmentData.length;
            localStorage.setItem("depcountLen", depcountLen);
            let depContainerElements = "";
            let depTabeHeadingPart = `
            <thead>
            <tr class="text-center">
            <th scope="col">department Id</th> 
            <th scope="col">department Name</th> 
            </tr>
            </thead>
            `;
            depContainerElements += depTabeHeadingPart;
            for (let i of departmentData) {
              let item = `
              <tbody>
              <tr class="text-center">
              <td>${i.department_id}</td>
              <td>${i.department_name}</td>
              </tr>
              </tbody>`;
              depContainerElements += item;
            }
            $("#depTable").html(depContainerElements);
          }
        },
        error: (response) => { },
      });
      $(".details_section").html(content);
    }
  });

  // employee section

  $("#staf").change(function () {
    $("#department").val("");
    $("#projects").val("");
    $("#salary").val("");
    $('#attendence').val('');
    let stafInput = $("#staf").val();
    if (stafInput == 1) {
      let content = `
    <div class="m-3 p-3 col-10">
    <h1 class="col-12"> Employee</h1>
    <div>
    <p>Add New Employee</p>
    <div class="row">
  <div class="mb-3 col-lg-4 col-12">
    <label for="newEmpName" class="form-label">Name</label>
    <input type="text" class="form-control" id="newEmpName"  placeholder="">
    <p id="newEmpNameErr" class="text-danger"></p>
  </div>
  
  <div class="mb-3 col-lg-4 col-12">
    <label for="newEmpMail" class="form-label">Mail</label>
    <input type="mail" class="form-control" id="newEmpMail" placeholder="">
    <p id="newEmpMailErr" class="text-danger"></p>
  </div>
  
  <div class="mb-3 col-lg-4 col-12">
    <label for="newEmpPhone" class="form-label">Phone Number</label>
    <input type="number" class="form-control" id="newEmpPhone" placeholder="">
    <p id="newEmpPhoneErr" class="text-danger"></p>
  </div>
  <div class="mb-3 col-lg-4 col-12">
  <label for="newEmpDep" class="form-label">Department</label>
  <select class="form-select" aria-label="Default select example" id="newEmpDep">
    <option value="" selected>SELECT</option>
  </select>
  <p id="newEmpDepErr" class="text-danger"></p>
</div>
<div class="mb-3 col-lg-4 col-12">
  <label for="newJobTitle" class="form-label">Job Title</label>
  <select class="form-select" aria-label="Default select example" id="newJobTitle" >
    <option value="" selected>SELECT</option>
    <option value="Manager">Manager</option>
    <option value="Developer">Developer</option>
    <option value="Tester">Tester</option>
    <option value="Accountant">Accountant</option>
    <option value="Hr">Hr</option>
  </select>
  <p id="newJobTitleErr" class="text-danger"></p>
</div>
<div class="mb-3 col-lg-4 col-12">
  <label for="exampleInputPassword1" class="form-label">Gender</label>
  <select class="form-select" aria-label="Default select example" id="newEmpGender">
    <option value="" selected>SELECT</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
  <p id="newEmpGenderErr" class="text-danger"></p>
</div>
  <div class="mb-3 col-lg-4 col-12">
    <label for="newEmpHire" class="form-label">Hire Date</label>
    <input type="date" class="form-control"  placeholder="" id="newEmpHire">
    <p id="newEmpHireErr" class="text-danger"></p>
  </div>
  <div class="mb-3 col-lg-4 col-12">
    <label for="newEmpRep" class="form-label">Reporting To</label>
    <select class="form-select" aria-label="Default select example" id="newEmpRep">
    <option value="" selected>SELECT</option>
    </select>
  </div>
  <div class="mb-3 col-lg-4 col-12">
    <label for="exampleInputPassword1" class="form-label">Employee Id</label>
    <input type="password" class="form-control" id="newEmpId" placeholder="">
    <p id="newEmpIdErr" class="text-danger"></p>
  </div>

  <div class="mb-3 col-lg-4 col-12">
    <label for="newEmpHr" class="form-label">Type Of Employee</label>
    <select class="form-select" aria-label="Default select example" id="newEmpHr">
  <option value="" selected>SELECT</option>
  <option value="hr">HR</option>
</select>
<div  class="form-text text-danger">Note Please select if employee is hr other wise dont select</div>
  </div>
  
  <button id="addNewEmp" class="btn btn-primary">Submit</button>

    </div>
    </div>
    </div>
    `;

      $.ajax({
        method: "GET",
        url: "./../api/departments.php",
        success: (response) => {
          let data = JSON.parse(response);
          if (data.status) {
            let departmentData = data.data;
            let depcountLen = departmentData.length;
            localStorage.setItem("depcountLen", depcountLen);
            let depContainerElements = "";
            let depTabeHeadingPart = `
            <option value=""> SELECT</option>
          </tr>`;
            depContainerElements += depTabeHeadingPart;
            for (let i of departmentData) {
              let item = `
              <option value=${i.department_id}>${i.department_name}</option>
              `;
              depContainerElements += item;
            }
            $("#newEmpDep").html(depContainerElements);
          }
        },
        error: (response) => { },
      });
      $.ajax({
        method: "GET",
        url: "./../api/getManagers.php",
        success: (response) => {
          let data = JSON.parse(response);

          if (data.status) {
            let employeesData = data.data;
            let empContainerElements = "";
            let empTabeHeadingPart = `<option value="">SELECT</option>`
              ;
            empContainerElements += empTabeHeadingPart;
            for (let i of employeesData) {
              let item = `<option value="${i.emp_id}">${i.manager_name}</option>`;
              empContainerElements += item;
            }
            $("#newEmpRep").html(empContainerElements);
          }
        },
        error: (response) => { },
      });


      $(".details_section").html(content);

      $('#addNewEmp').click(function () {
        if ($('#newEmpName').val() == "") {
          $('#newEmpNameErr').text('Name should not be empty');
        }
        else {
          $('#newEmpNameErr').text('');
        }
        if ($('#newEmpMail').val() == "") {
          $('#newEmpMailErr').text('Mail should not be empty');
        }
        else {
          $('#newEmpMailErr').text('');
        }
        if ($('#newEmpPhone').val() == "") {
          $('#newEmpPhoneErr').text('Phone number should not be empty');
        }
        else {
          $('#newEmpPhoneErr').text('');
        }
        if ($('#newEmpDep').val() == "") {
          $('#newEmpDepErr').text('Department should not be empty');
        }
        else {
          $('#newEmpDepErr').text('');
        }
        if ($('#newJobTitle').val() == "") {
          $('#newJobTitleErr').text('Job title should not be empty');
        } else {
          $('#newJobTitleErr').text('');
        }
        if ($('#newEmpGender').val() == "") {
          $('#newEmpGenderErr').text('Gender should not be empty');
        } else {
          $('#newEmpGenderErr').text('');
        }
        if ($('#newEmpHire').val() == "") {
          $('#newEmpHireErr').text('Hire date should not be empty')
        }
        else {
          $('#newEmpHireErr').text('');
        }
        if ($('#newEmpId').val() == "") {
          $('#newEmpIdErr').text('Employee Id should not be empty')
        }
        else {
          $('#newEmpIdErr').text('');
        }

        if ($('#newEmpName').val() !== "" && $('#newEmpMail').val() !== "" && $('#newEmpPhone').val() !== "" && $('#newEmpDep').val() !== "" && $('#newJobTitle').val() !== "" && $('#newEmpGender').val() !== "" && $('newEmpHire').val() !== "" && $('#newEmpId').val() !== "") {


          $.ajax({
            method: "POST",
            url: "./../api/employeeDetails.php",
            data: {
              newEmpName: $('#newEmpName').val(),
              newEmpMail: $('#newEmpMail').val(),
              newEmpPhone: $('#newEmpPhone').val(),
              newEmpDep: $('#newEmpDep').val(),
              newJobTitle: $('#newJobTitle').val(),
              newEmpGender: $('#newEmpGender').val(),
              newEmpRep: $('#newEmpRep').val(),
              newEmpHire: $('newEmpHire').val(),
              newEmpId: $('#newEmpId').val(),
              newEmpHr: $('#newEmpHr').val()

            },
            success: (response) => {
              console.log(response);

            },
            error: (response) => { },
          });

        }


      });


    }
    else if (stafInput == 2) {
      let content = `
      <div class="table-responsive mt-5">
    <table id='empTable' class="table">
    <thead>
    <tr>
      <th  scope="col">Employee Id</th>
      <th  scope="col">Name</th>
      <th  scope="col">Phone</th>
      <th  scope="col">Mail</th>
      <th  scope="col">Gender</th>
      <th  scope="col">Hire Date</th>
      <th  scope="col">Department</th>
      <th  scope="col">Job Title</th>
      <th  scope="col">Reporting Manager</th>
    </tr>
    </thead>
    </table>

      </div>`;

      $.ajax({
        method: "GET",
        url: "./../api/employeeDetails.php",
        success: (response) => {
          let data = JSON.parse(response);

          if (data.status) {
            let employeesData = data.data;
            let employeeCount = employeesData.length;
            localStorage.setItem('employeeCount', employeeCount)
            let empContainerElements = "";
            let empTabeHeadingPart = `
            <thead>
            <tr>
              <th  scope="col">Employee Id</th>
              <th  scope="col">Name</th>
              <th  scope="col">Phone</th>
              <th  scope="col">Mail</th>
              <th  scope="col">Gender</th>
              <th  scope="col">Hire Date</th>
              <th  scope="col">Department</th>
              <th  scope="col">Job Title</th>
              <th  scope="col">Reporting Manager</th>
            </tr>
            </thead>`;
            empContainerElements += empTabeHeadingPart;
            for (let i of employeesData) {
              let item = `
              <tbody>
              <tr class="text-center">
              <td>${i.employee_id}</td>
              <td>${i.emp_name}</td>
              <td>${i.emp_phone}</td>
              <td>${i.emp_email}</td>
              <td>${i.emp_gender}</td>
              <td>${i.hire_date}</td>
              <td>${i.emp_department}</td>
              <td>${i.emp_jobtitle}</td>
              <td>${i.reportingto}</td>
              </tr>
              </tbody>`;
              empContainerElements += item;
            }
            $("#empTable").html(empContainerElements);
          }
        },
        error: (response) => { },
      });
      $(".details_section").html(content);
    }
  });

  // salary section

  $("#salary").change(function () {
    $("#department").val("");
    $("#projects").val("");
    $("#staf").val("");
    $('#attendence').val('');

    let salaryInput = $("#salary").val();
    if (salaryInput == 1) {
      let content = `
  <div class="m-3 p-3 col-10">
    <h1>Add Employee Salary</h1>
  
      <div class="mb-3 row">
        <label for="exampleInputEmail1" class="form-label col-12">Employee Salary</label>
        <div class="col-lg-5 mb-3">
          <select class="form-select" aria-label="Default select example" id="empNames">
            <option value="" selected>Select Employee</option>
          </select>
          <p id="empNamesErr" class="text-danger"></p>
        </div>
        <div class="col-lg-5 mb-3">
          <input type="number" class="form-control" placeholder="Monthly Salary ex:70000" id="empSalary">
          <p id="empSalaryErr" class="text-danger"></p>
        </div>
        <div class="col-lg-5 mb-3">
          <input type="number" class="form-control" placeholder="Perday Salary ex:3000" id="empPerdaySalary">
          <p id="empPerdaySalaryErr" class="text-danger"></p>
        </div>

      </div>
 
      <button id="onSal" class="btn btn-primary">Submit</button>
  
  </div>`;
      $.ajax({
        method: "GET",
        url: "./../api/employeeSalaryDetails.php",
        success: (response) => {
        let data = JSON.parse(response);
          if (data.status) {
            let empdetails = data.data;
            let employeeNamesContainer = "";
            let empOptionItem = `
            <option value="" selected>Select Employee</option>
            `;
            employeeNamesContainer += empOptionItem;

            for (let i of empdetails) {
              let empOptionItem = `
            <option value="${i.employee_id}">${i.emp_name} id ${i.employee_id}</option>
            `;
              employeeNamesContainer += empOptionItem;
            }

            $("#empNames").html(employeeNamesContainer);
          }
        },
        error: (response) => { },
      });
      $(".details_section").html(content);

      $("#onSal").click(function () {
        let empIdInput = $("#empNames").val();
        let empSalMonth = $("#empSalary").val();
        let empPerdaySal = $("#empPerdaySalary").val();
 
        if(empIdInput==""){
            $('#empNamesErr').text('Select Employee')
        }
        else{
          ('#empNamesErr').text('');
        }
        if(empSalMonth ==""){
          $('#empSalaryErr').text('Employee salary should not be empty');
        }else{
          $('#empSalaryErr').text('');
        }
        if(empPerdaySal ==""){
          $('#empPerdaySalaryErr').text('Employee perday salary should not be empty')
        }
        else{
          $('#empPerdaySalaryErr').text('');
        }

        if (empIdInput !== "" && empSalMonth !== "" && empPerdaySal !== "") {
          $.ajax({
            method: "POST",
            url: "./../api/employeeSalaryDetails.php",
            data: {
              empIdInput,
              empSalMonth,
              empPerdaySal,
            },
            success: (response) => {
              console.log(response);
              console.log("success full entered dep");
            },
            error: (response) => { },
          });
        } else {
          console.log("should not be empty");
        }
      });
    }
    else if (salaryInput == 2) {
      let content = `
      <div class="table-responsive">
          <table id='payrollTable' class="table">
          <thead>
          <tr>
            <th scope="col">Employee Id</th>
            <th scope="col">Employee Name</th>
            <th scope="col">Employee Mail</th>
            <th scope="col">Employee Salary</th>
            <th scope="col">Loan Amount</th>
            <th scope="col">Remaing Amount</th>
            <th scope="col">Deduction Amount</th>
            <th scope="col">Daily Payout</th>
            <th scope="col">Take Home Salary</th>
          </tr>
          </thead>
          </table>
          </div>`;
      $(".details_section").html(content);

      $.ajax({
        method: "GET",
        url: "./../api/employeeSalaryDetails.php",
        success: (response) => {
          let data = JSON.parse(response);

          if (data.status) {
            let payrollDetails = data.data;
            let employeePayrollContainer = "";
            let payRollTableHeadings = `
            <thead>
            <tr>
              <th scope="col-1">Employee Id</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Employee Mail</th>
              <th scope="col">Employee Salary</th>
              <th scope="col">Loan Amount</th>
              <th scope="col">Remaing Amount</th>
              <th scope="col">Deduction Amount</th>
              <th scope="col">Daily Payout</th>
              <th scope="col">Take Home Salary</th>
            </tr>
            </thead>`;
            employeePayrollContainer += payRollTableHeadings;

            for (let i of payrollDetails) {
              let payItem = `
              <tbody>
              <tr class="text-center">
                <td>${i.employee_id}</td>
                <td>${i.emp_name}</td>
                <td>${i.emp_email}</td>
                <td>${i.salary}</td>
                <td>${i.loan_amount}</td>
                <td>${i.remaining_amount}</td>
                <td>${i.deduction_amount}</td>
                <td>${i.daily_payout}</td>
                <td>${i.take_home_salary}</td>
              </tr>
              </tbody>
              `;
              employeePayrollContainer += payItem;
            }

            $("#payrollTable").html(employeePayrollContainer);
          }
        },
        error: (response) => { },
      });
      $(".details_section").html(content);
    }
  });

  // projects section

  $("#projects").change(function (e) {
    $("#department").val("");
    $("#staf").val("");
    $("#salary").val("");
    $('#attendence').val('');
    let projectsInput = $("#projects").val();
    if (projectsInput == 1) {
      let content = `
      <div>
      <h1>Add New Project</h1>
    
        <div class="mb-3 row">
          <label for="exampleInputEmail1" class="form-label col-12">Project Name</label>
          <div class="col-lg-5 mb-3">
          <input type="text" class="form-control" placeholder="ex:IFMIS" id="projectName">
          <p id="projectNameErr" class="text-danger"></p>
          </div>
          <label for="exampleInputEmail1" class="form-label col-12">dead line</label>
          <div class="col-lg-5 mb-3">
            <input type="date" class="form-control" placeholder="ex: 12-01-2023" id="projectDeadLine">
            <p id="projectDeadLineErr" class="text-danger"></p>
          </div>
         
        </div>
   
        <button id="onPro" class="btn btn-primary">Submit</button>
    
    </div>`;
      $(".details_section").html(content);

      $("#onPro").click(function () {
        let projectName = $("#projectName").val();
        let projectDeadLine = $("#projectDeadLine").val();

        if(projectName==""){
          $('#projectNameErr').text('Project name should not be empty');
        }else{
          $('#projectNameErr').text('');
        }
        if(projectDeadLine ==""){
          $("#projectDeadLineErr").text('Project deadline should not be empty');
        }else{
          $("#projectDeadLineErr").text('');
        }


        if (projectName !== "" && projectDeadLine !== "") {
          $.ajax({
            method: "POST",
            url: "./../api/projects.php",
            data: {
              projectName,
              projectDeadLine,
            },
            success: (response) => {
              console.log(response);
              console.log("success full entered project");
            },
            error: (response) => { },
          });
        } else {
          console.log("should not be empty");
        }
      });
    } else if (projectsInput == 2) {
      let content = `
      <div>
        <h1>Assign Project</h1>
        <div class="mb-3 row">
          <label for="exampleInputEmail1" class="form-label col-12">Project Name</label>
          <div class="col-lg-5 mb-3">
            <select class="form-select" aria-label="Default select example" id="projNames">
              <option value="" selected>Select Project</option>
            </select>
            <p id="projNamesErr" class="text-danger"></p>
          </div>
          <label for="exampleInputEmail1" class="form-label col-12">Employee Name</label>
          <div class="col-lg-5 mb-3">
            <select class="form-select" aria-label="Default select example" id="empNames">
              <option value="" selected>Select Employee</option>
            </select>
            <p id="empNamesErr" class="text-danger"></p>
          </div>
         
        </div>
   
        <button id="onProAssign" class="btn btn-primary">Submit</button>
    
      </div>`;

      $.ajax({
        method: "GET",
        url: "./../api/employeeDetails.php",
        success: (response) => {
          let data = JSON.parse(response);
          if (data.status) {
            let empdetails = data.data;

            let employeeNamesContainer = "";
            let empOptionItem = `
            <option value="" selected>Select Employee</option>
            `;
            employeeNamesContainer += empOptionItem;

            for (let i of empdetails) {
              let empOptionItem = `
            <option value="${i.employee_id}">${i.emp_name} id ${i.employee_id}</option>
            `;
              employeeNamesContainer += empOptionItem;
            }

            $("#empNames").html(employeeNamesContainer);
          }
        },
        error: (response) => { },
      });
      $.ajax({
        method: "GET",
        url: "./../api/projects.php",
        success: (response) => {
          let data = JSON.parse(response);
          if (data.status) {
            let projectDetails = data.data;
            let projectNamesContainer = "";
            let projOptionItem = `
            <option value="" selected>Select project name</option>
            `;
            projectNamesContainer += projOptionItem;

            for (let i of projectDetails) {
              let projOptionItem = `
            <option value="${i.project_name}">${i.project_name}</option>
            `;
              projectNamesContainer += projOptionItem;
            }

            $("#projNames").html(projectNamesContainer);
          }
        },
        error: (response) => { },
      });
      $(".details_section").html(content);

      $("#onProAssign").click(function () {
        let projectName = $("#projNames").val();
        let empId = $("#empNames").val();

        if(projectName ==""){
          $("#projNamesErr").text('Select project name');
        }else{
          $("#projNamesErr").text('');
        }
        if(empId ==""){
          $("#empNamesErr").text('Select employee name')
        }else{
          $("#empNamesErr").text('')
        }

        if (projectName !== "" && empId !== "") {
          $.ajax({
            method: "POST",
            url: "./../api/assignProjects.php",
            data: {
              projectName,
              empId,
            },
            success: (response) => {
              console.log(response);
              console.log("success full entered dep");
            },
            error: (response) => { },
          });
        } else {
          console.log("should not be empty");
        }
      });
    } else if (projectsInput == 3) {
      let content = `
      <div class="d-flex justify-content-center mt-5">
      <table id="projectDetailsTb">
      <tr>
      <th>Project Name</th>
      <th>Assigned Employee Names</th>
      <th>Employee Id</th>
      </tr>
      </table>
      </div>
     `;
      $(".details_section").html(content);
      $.ajax({
        method: "GET",
        url: "./../api/projectDetails.php",
        success: (response) => {
          let data = JSON.parse(response);
          if (data.status) {
            let projectdetails = data.data;
            let projectDetailsContainer = "";
            let projectDetailsTbHeadings = `
            <tr>
            <th>Project Name</th>
            <th>Assigned Employee Names</th>
            <th>Employee Id</th>
            </tr>
            `;
            projectDetailsContainer += projectDetailsTbHeadings;

            for (let i of projectdetails) {
              let projectDetailsTbRow = `
            <tr class="text-center">
            <td>${i.project_name}</td>
            <td>${i.emp_name}</td>
            <td>${i.emp_id}</td>
            </tr>
            `;
              projectDetailsContainer += projectDetailsTbRow;
            }

            $("#projectDetailsTb").html(projectDetailsContainer);
          }
        },
        error: (response) => { },
      });
    }
  });

  // attendence section

  $("#attendence").change(function (e) {
    $("#department").val("");
    $("#staf").val("");
    $("#salary").val("");
    $("#projects").val("");
    let attendenceInput = $("#attendence").val();
    if (attendenceInput == 1) {
      let AttendenceContent = `
      <div class="m-3 p-3">
        <h1>Add Attendence</h1>
        <div class="mb-3 row">
          <label for="exampleInputEmail1" class="form-label col-12">Employee Name</label>
          <div class="col-lg-5 mb-3">
            <select class="form-select" aria-label="Default select example" id="empNames">
              <option value="" selected>Select Employee</option>
            </select>
            <p id="empNamesErr" class="text-danger"></p>
          </div>
          <label for="exampleInputEmail1" class="form-label">Date</label>
          <div class="col-lg-5 mb-3">
          <input type="date" class="form-control" id="date" >
          <p id="dateErr" class="text-danger"></p>
          </div>
          <label for="loginTime" class="form-label col-12">Login Time</label>
          <div class="col-lg-5 mb-3">
          <input type="text" class="form-control" id="loginTime">
          </div>
          <label for="logoutTime" class="form-label col-12">Logout Time</label>
          <div class="col-lg-5 mb-3">
          <input type="text" class="form-control" id="logoutTime">
          </div>   
        </div>  
        <button class="btn btn-primary" id="addAttendence">Submit</button>   
      </div>`;

      $.ajax({
        method: "GET",
        url: "./../api/employeeDetails.php",
        success: (response) => {
          let data = JSON.parse(response);
          if (data.status) {
            let empdetails = data.data;
            let employeeNamesContainer = "";
            let empOptionItem = `
            <option value="" selected>Select Employee</option>
            `;
            employeeNamesContainer += empOptionItem;

            for (let i of empdetails) {
              let empOptionItem = `
            <option value="${i.employee_id}">${i.emp_name} id ${i.employee_id}</option>
            `;
              employeeNamesContainer += empOptionItem;
            }

            $("#empNames").html(employeeNamesContainer);
          }
        },
        error: (response) => { },
      });

      $(".details_section").html(AttendenceContent);

      $("#addAttendence").click(function () {
        let empId = $("#empNames").val();
        let date = $('#date').val();
        let loginTime = $('#loginTime').val();
        let logoutTime = $('#logoutTime').val();

        if(empId==""){
          $("#empNamesErr").text('Select employee')
        }
        else{
          $("#empNamesErr").text('');
        }
        if(date==""){
          $('#dateErr').text('Enter date')
        }else{
          $('#dateErr').text('');
        }


        if (empId !== "" && date !== "" && loginTime !== "" && logoutTime !== "") {
          $.ajax({
            method: "POST",
            url: "./../api/attendence.php",
            data: {
              empId,
              loginTime,
              logoutTime,
              date
            },
            success: (response) => {
              console.log(response);
              console.log("success full entered dep");
            },
            error: (response) => { },
          });
        } else {
          console.log("should not be empty");
        }
      });

    } else if (attendenceInput == 2) {
      let content = `
      <div class="mt-5">
      <label for="exampleInputEmail1" class="form-label col-12">Attendence From</label>
      <div class="col-lg-5 mb-3">
      <input type="date" class="form-control"  id="fromDate">
      </div>
      <label for="exampleInputEmail1" class="form-label col-12">Attendence To</label>
      <div class="col-lg-5 mb-3">
      <input type="date" class="form-control"  id="toDate">
      </div>
      <button class="btn btn-success text-center mb-2" id="attendenceDetails">Get Details</button>
      <div class="table-responsive">
      <table class="table" id="attendenceTable">
      <thead>
      <tr>
      <th scope="col">Employee Id</th>
      <th scope="col">Employee Name</th> 
      <th scope="col">Login Time</th> 
      <th scope="col">Logout Time</th> 
      <th scope="col">Date</th>
      </tr>
      </thead>
      </table>
      </div>
      
      </div>
      `;
      $(".details_section").html(content);
      $('#attendenceDetails').click(function () {
        let fromDate = $('#fromDate').val();
        let toDate = $('#toDate').val();
        $.ajax({
          method: "POST",
          url: "./../api/attendenceReport.php",
          data: {
            fromDate,
            toDate
          },
          success: (response) => {
            let data = JSON.parse(response);
            if (data.status) {
              let attendenceRepData = data.data;
              let attendContainerElements = "";
              let attenTabeHeadingPart = `
              <thead>
              <tr class="text-center">
              <th scope="col">Employee Id</th>
              <th scope="col">Employee Name</th> 
              <th scope="col">Login Time</th> 
              <th scope="col">Logout Time</th> 
              <th scope="col">Date</th>
              </tr>
              </thead>`;
              attendContainerElements += attenTabeHeadingPart;
              for (let i of attendenceRepData) {
                let item = `
                <tbody>
              <tr class="text-center">
                <td>${i.employee_id}</td>
                <td>${i.emp_name}</td>
                <td>${i.login_time}</td>
                <td>${i.logout_time}</td>
                <td>${i.date}</td>
              </tr>
              </tbody>`;
                attendContainerElements += item;
              }
              $("#attendenceTable").html(attendContainerElements);
            }
          },
          error: (response) => { },
        });
      })

    }
  });



  // logout section

  $("#logout").click(function () {
    localStorage.removeItem("user_id");
    localStorage.removeItem('user_type');
    window.location.replace("./../login.html");
  });

 
  // get logedIn user details
  function getData() {
    $.ajax({
      method: "GET",
      url: "./../api/getUser.php?user_id=" + userId,
      success: (response) => {
        let data = JSON.parse(response);
        if (data.status) {
          $("#user").text(data.data.emp_name);
          $("#empName").text(data.data.emp_name);
          $("#empMail").text(data.data.emp_email);
          $("#empId").text(data.data.employee_id);
          $("#empPhone").text(data.data.emp_phone);
          $("#empGender").text(data.data.emp_gender);
          $("#empHire").text(data.data.hire_date);
        } else {
          window.localStorage.removeItem("user_id");
          window.localStorage.removeItem("user_type");
        }
      },
      error: (response) => { },
    });
  }
  getData();
});
