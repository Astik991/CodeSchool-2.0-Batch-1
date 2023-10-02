// Import the the main.js file to use the validation functions.
// import { validateInputRadio, validateInputSelection } from "./main.js";


// Load the components on the type of salary selected.
function loadSalaryComponents(type){

    $.ajax({
        method: "GET",
        url: "./api/salaryDetails.php",
        data: {
            type
        },
        success: function (data) {
            let jsonData = JSON.parse(data);
            let components = jsonData['data'];
            $("#salaryComponent").empty();
            $("#salaryComponent").append(`<option value="Select" selected disabled>Select</option>`);
            for(let array in components){
                $("#salaryComponent").append(`
                <option value="${components[array]["id"]}">${components[array]["salary_component"]}</option>
                `);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

}

// Search the employee through employee code and show the add salary inputs to user.
function loadSalaryDetails(empcode, feedback) {

    // On Key Down Remove Invalid Class.
    empcode.on("keydown", function () {
        empcode.removeClass("is-invalid");
    });
    // Validating Conditions.
    if (empcode.val() == '') {
        empcode.removeClass("is-valid");
        empcode.addClass("is-invalid");
        feedback.text("Please type the Employee Code");
    }
    else if (!((empcode.val()).match(/[0-9]/))) {
        empcode.removeClass("is-valid");
        empcode.addClass("is-invalid");
        feedback.text("Please enter a valid code.");
    }
    else {
        empcode.removeClass("is-invalid");
        let employeeCode = empcode.val();

        $.ajax({
            method: "GET",
            url: "./api/getEmployeeDetails.php",
            data: {
                employeeCode
            },
            success: function (data) {
                let jsonData = JSON.parse(data);
                if(jsonData["status"]){
                    $("#serverMessage").addClass("d-none");
                    console.log(jsonData['data'][0]['id'])
                    // HTML template to display the salary input fields to user.
                    let htmlTemplate = `
                        <!-- Employee Name -->
                        <div class="row mb-3 d-flex align-items-center">
                            <label for="empName" class="form-label m-0 col-md-2">Employee Name</label>
                            <div class="col-md-6">
                            <input type="text" class="form-control-plaintext" id="empName" value="${jsonData["data"][0]["first_name"]} ${jsonData["data"][0]["last_name"]}" placeholder="Employee Name" readonly>
                            <input type="text" class="d-none" value="${jsonData['data'][0]['emp_id']}" id="empid">
                            </div>
                        </div>
                        <!-- Salary Type -->
                        <div class="row mb-3 d-flex align-items-center">
                            <label for="salaryType" class="form-label m-0 col-md-2">Add Type</label>
                            <div class="col-md-6">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="salaryType" id="earnings" value="1">
                                <label class="form-check-label" for="earnings" style="font-weight: 400;">Earnings</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="salaryType" id="deductions" value="2">
                                <label class="form-check-label" for="deductions" style="font-weight: 400;">Deductions</label>
                            </div>
                            <div id="salaryTypeFeedback" class="invalid-feedback p-2"></div>
                            </div>
                        </div>
                        <!-- Component -->
                        <div class="row mb-3 d-flex align-items-center">
                            <label for="salaryComponent" class="form-label m-0 col-md-2">Component</label>
                            <div class="col-md-6">
                            <select class="form-select" id="salaryComponent" style="appearance: none !important;">
                                
                            </select>
                            <div id="salaryComponentFeedback" class="invalid-feedback"></div>
                            </div>
                        </div>
                        <!-- Enter Amount -->
                        <div class="row mb-3 d-flex align-items-center">
                            <label for="amount" class="form-label m-0 col-md-2">Amount</label>
                            <div class="col-md-6">
                            <input type="number" class="form-control" id="amount" placeholder="Enter Amount" >
                            <div id="amountFeedback" class="invalid-feedback"></div>
                            </div>
                        </div>
                        <!-- Add Amount Details -->
                        <div class="row">
                            <div class="col-8">
                            <button class="btn btn-primary float-end mb-4" type="submit">
                                Add
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </button>
                            </div>
                        </div>
                    `;

                    $("#formFields").removeClass("d-none");
                    $("#formFields").html(htmlTemplate);

                    // load the components on change of salary type.
                    let type = $("input[name='salaryType']")
                    type.click( function(){
                        loadSalaryComponents($("input[name='salaryType']:checked").val());
                    });

                } else {
                    $("#serverMessage").removeClass("d-none bg-success border-success text-success");
                    $("#serverMessage").addClass("bg-danger border-danger text-danger");
                    $("#serverMessage").text(jsonData["message"]);
                }
                
            },
            error: function (error) {
                console.log(error)
            }

        })
    }
}

// Validation for Amount enetered.
function validateAmount(amount, feedback){
    // On Key Down Remove Invalid Class.
    amount.on("keydown", function(){
        amount.removeClass("is-invalid");
    });
    // Validating Conditions.
    if(amount.val() == ''){
        amount.removeClass("is-valid");
        amount.addClass("is-invalid");
        feedback.text("Please type the amount!");
        return false;
    }
    else if(!((amount.val()).match(/[0-9]/))){
        name.removeClass("is-valid");
        name.addClass("is-invalid");
        feedback.text("Please type the amount only in numbers!");
        return false;
    }
    else {
        amount.removeClass("is-invalid");
        return true;
    }
}

function validateSalary(event){
    // Change the default behaviour of form.
    event.preventDefault();

    // Check whether the add salary details inputs are displayed to user.
    if($("#formFields").hasClass("d-none")){
        $('#employeeCode').removeClass("is-valid");
        $('#employeeCode').addClass("is-invalid");
        $('#employeeCodeFeedback').text("Please click the search button to load the details.");
    }

    // On salary details inputs are displayed to user.
    let salarytype = validateInputRadio($("input[name='salaryType']"), $("salaryTypeFeedback"));
    let component = validateInputSelection($("#salaryComponent"), $("#salaryComponentFeedback"));
    let amount = validateAmount($("#amount"), $("#amountFeedback"));


    if(salarytype && component && amount){
        component = $("#salaryComponent").val();
        amount = $("#amount").val();
        let empId = $('#empid').val();
        
        $.ajax({
            method: "POST",
            url: "./api/salaryDetails.php",
            data: {
                empId,
                component,
                amount
            },
            success: function (data) {
                let jsonData = JSON.parse(data);

                if(!(jsonData["status"])){
                    $("#serverMessage").removeClass("d-none bg-success border-success text-success");
                    $("#serverMessage").addClass("bg-danger border-danger text-danger");
                    $("#serverMessage").text(jsonData["message"]);
                } else {
                    $("#serverMessage").removeClass("d-none bg-danger border-danger text-danger");
                    $("#serverMessage").addClass("bg-success border-success text-success");
                    $("#serverMessage").text(jsonData["message"]);

                    // setTimeout(location.reload(), 3000);

                }
            }, 
            error: function (error) {
                console.log("error" + error);
            } 
        });
    }
}