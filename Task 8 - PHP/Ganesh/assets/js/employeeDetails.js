// Load Employee details by employee code.
function loadEmployeeDetails(empcode, feedback) {

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

                    let htmlTemplate = `
                    <div class="d-block position-relative my-2">
                        <button class="btn btn-primary position-absolute end-0 me-4" type="button">Edit</button>
                    </div>
                    <!-- First Name. -->
                    <div class="row mb-3 mt-4">
                        <label for="firstName" class="form-label col-md-2">First Name</label>
                        <div class="col-md-6">
                            <input type="text" class="form-control-plaintext" value="${jsonData["data"][0]["first_name"]}" id="firstName" placeholder="First Name" readonly>
                            <div id="firstNameFeedback" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <!-- Last Name. -->
                    <div class="row mb-3">
                        <label for="lastName" class="form-label col-md-2">Last Name</label>
                        <div class="col-md-6">
                            <input type="text" class="form-control-plaintext" value="${jsonData["data"][0]["last_name"]}" id="lastName" placeholder="Last Name" readonly>
                            <div id="lastNameFeedback" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <!-- Date of Join. -->
                    <div class="row mb-3">
                        <label for="dateOfJoin" class="form-label col-md-2">Date of Join</label>
                        <div class="col-md-6">
                            <input type="date" class="form-control-plaintext" value="${jsonData["data"][0]["date_of_join"]}" id="dateOfJoin" placeholder="Date of Join" readonly>
                            <div id="dateOfJoinFeedback" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <!-- Date of Birth. -->
                    <div class="row mb-3">
                        <label for="dateOfBirth" class="form-label col-md-2">Date of Birth</label>
                        <div class="col-md-6">
                            <input type="date" class="form-control-plaintext" value="${jsonData["data"][0]["date_of_birth"]}" id="dateOfBirth" placeholder="Date of Birth" readonly>
                            <div id="dateOfBirthFeedback" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <!-- Gender -->
                    <div class="row mb-3">
                        <label for="gender" class="form-label col-md-2">Gender</label>
                        <div class="col-md-6">
                            <input type="text" class="form-control-plaintext" value="${jsonData["data"][0]["gender"]}" id="gender" placeholder="Gender" readonly>
                            <div id="genderFeedback" class="invalid-feedback p-2"></div>
                        </div>
                    </div>
                    <!-- Phone Number -->
                    <div class="row mb-3">
                        <label for="phoneNum" class="form-label col-md-2">Phone Number</label>
                        <div class="col-md-6">
                            <input type="text" class="form-control-plaintext" value="${jsonData["data"][0]["phone"]}" id="phoneNum" placeholder="Phone Number" readonly>
                            <div id="phoneNumFeedback" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <!-- Working Status -->
                    <div class="row mb-3">
                        <label for="workingStatus" class="form-label col-md-2">Working Status</label>
                        <div class="col-md-6">
                            <input type="text" class="form-control-plaintext" value="${jsonData["data"][0]["status_description"]}" id="workingStatus" placeholder="Working Status" readonly>
                            <div id="workingStatusFeedback" class="invalid-feedback"></div>
                        </div>  
                    </div>
                    <!-- Designation -->
                    <div class="row mb-3">
                        <label for="designation" class="form-label col-md-2">Designation</label>
                        <div class="col-md-6">
                            <input type="text" class="form-control-plaintext" value="${jsonData["data"][0]["employee_designation"]}" id="designation" placeholder="Designation" readonly>
                            <div id="designationFeedback" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <!-- Location -->
                    <div class="row mb-3">
                        <label for="location" class="form-label col-md-2">Location</label>
                        <div class="col-md-6">
                            <input type="text" class="form-control-plaintext" value="${jsonData["data"][0]["address"]}" id="location" placeholder="Location" readonly>
                            <div id="locationFeedback" class="invalid-feedback"></div>
                        </div>
                    </div>
                    `;
                    
                    $("#formFields").removeClass("d-none");
                    $("#formFields").html(htmlTemplate);

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