let userId = localStorage.getItem('user_id');

$(document).ready(function () {


  var offcanvas = new bootstrap.Offcanvas(
    document.getElementById("offcanvasWithBothOptions"),
    {
      backdrop: true,
      scroll: true,
    }
  );

  $("#offcanvasToggleButton").click(function () {
    $("body").toggleClass("offcanvas-show");
    offcanvas.toggle();
  });

  $("#offcanvasWithBothOptions").on("hidden.bs.offcanvas", function () {
    $("body").removeClass("offcanvas-show");
  });

  $(".navbar-toggler").click(function () {
    $(".left_section").toggle(50);
  });


  $('#salary').click(function () {

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
          </div>
`;
    $(".details_section").html(content);

    $.ajax({
      method: "GET",
      url: "./../api/empSalaryDetails.php?userid=" + userId,
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


  });
  $('#project').click(function () {

  });
  $('#attendence').click(function () {

  });


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
        }
      },
      error: (response) => { },
    });
  }
  getData();

  $("#logout").click(function () {
    localStorage.removeItem("user_id");
    localStorage.removeItem('user_type');
    window.location.replace("./../login.html");
  });


});