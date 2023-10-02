// Load Input Fields.
function loadInputOptions(data) {
    let jsonData = JSON.parse(data);
    // List of Working Status.
    for (let index in jsonData[0]) {
        $("#workingStatus").append(`
        <option value="${jsonData[0][index].id}" >${jsonData[0][index].status_description}</option>
        `);
    }
    // List of Designations.
    for (let index in jsonData[1]) {
        $("#designation").append(`
        <option value="${jsonData[1][index].id}" >${jsonData[1][index].employee_designation}</option>
        `);
    }
    // List of Locations.
    for (let index in jsonData[2]) {
        $("#location").append(`
        <option value="${jsonData[2][index].id}" >${jsonData[2][index].address}</option>
        `);
    }
}


// LOAD SERVER ON DOCUMENT READY.
$(document).ready(function () {
    $.ajax({
        method: "GET",
        url: "./api/main.php",
        success: function (data) {
            loadInputOptions(data);
        },
        error: function (error) {
            console.log("Server Connection Error!" + error);
        }
    });
});


// Validate Name.
function validateUserName(name, feedback){
    // On Key Down Remove Invalid Class.
    name.on("keydown", function(){
        name.removeClass("is-invalid");
    });
    // Validating Conditions.
    if(name.val() == ''){
        name.removeClass("is-valid");
        name.addClass("is-invalid");
        feedback.text("* Field is required!");
        return false;
    }
    else if(!((name.val()).match(/[a-zA-Z]/))){
        name.removeClass("is-valid");
        name.addClass("is-invalid");
        feedback.text("Name should only contain alphabets!");
        return false;
    }
    else {
        name.removeClass("is-invalid");
        return true;
    }
}


// Validate Dates.
function validateUserDate(date, feedback){
    // On Change Remove Invalid Class.
    date.on("change", function(){
        date.removeClass("is-invalid");
    });
    // Validating Conditions.
    if(date.val() == ''){
        date.removeClass("is-valid");
        date.addClass("is-invalid");
        feedback.text("* Field is required!");
        return false;
    } else {
        date.removeClass("is-invalid");
        return true;
    }
}


// Validate Phone Number.
function validatePhoneNum(phone, feedback){
    // On Key Down Remove Invalid Class.
    phone.on("keydown", function(){
        phone.removeClass("is-invalid");
    });
    // Validating Conditions.
    let phoneRegExp = /[0-9]/;
    if(phone.val() == ''){
        phone.removeClass("is-valid");
        phone.addClass("is-invalid");
        feedback.text("* Field is required!");
        return false;
    }
    else if(!((phone.val()).match(phoneRegExp))){
        phone.removeClass("is-valid");
        phone.addClass("is-invalid");
        feedback.text("Phone number should only contain numbers 0-9!");
        return false;
    }
    else if((((phone.val()).length) != 10)){
        phone.removeClass("is-valid");
        phone.addClass("is-invalid");
        feedback.text("Phone number must be 10 digits!");
        return false;
    }
    else {
        phone.removeClass("is-invalid");
        return true;
    }
}


// Validate Selections.
function validateInputSelection(option, feedback){
    // On Change Remove Invalid Class.
    option.on("change", function(){
        option.removeClass("is-invalid");
    });
    // Validating Conditions.
    if(option.val() == null){
        option.removeClass("is-valid");
        option.addClass("is-invalid");
        feedback.text("* Field is required!");
        return false;
    } else {
        option.removeClass("is-invalid");
        return true;
    }
}


// Validate Gender.
function validateInputRadio(radio, feedback){

    // On Change Remove Invalid Class.
    radio.on("change", function(){
        radio.removeClass("is-invalid");
    });
    // Validating Conditions.
    if(!(radio.is(":checked"))){
        radio.removeClass("is-valid");
        radio.addClass("is-invalid");
        feedback.text("* Field is required!");
        return false;
    } else {
        radio.removeClass("is-invalid");
        return true;
    }
}


// Validating function on submit.
function validateForm() {
    event.preventDefault();
    
    let fname = validateUserName($("#firstName"), $("#firstNameFeedback"));
    let lname = validateUserName($("#lastName"), $("#lastNameFeedback"));
    let joinDate = validateUserDate($("#dateOfJoin"), $("#dateOfJoinFeedback"));
    let birthDate = validateUserDate($("#dateOfBirth"), $("#dateOfBirthFeedback"));
    let genderVal = validateInputRadio($("input[name='employeeGender']"), $("genderFeedback"));
    let phone = validatePhoneNum($("#phoneNum"), $("#phoneNumFeedback"));
    let status = validateInputSelection($("#workingStatus"), $("#workingStatusFeedback"));
    let designation = validateInputSelection($("#designation"), $("#designationFeedback"));
    let location = validateInputSelection($("#location"), $("#locationFeedback"));

    if(fname&&lname&&joinDate&&birthDate&&genderVal&&phone&&status&&designation&&location){

        let first_name = $("#firstName").val();
        let last_name = $("#lastName").val();
        let date_of_join = $("#dateOfJoin").val();
        let date_of_birth = $("#dateOfBirth").val();
        let gender = $("input[name='employeeGender']:checked").val();
        let phone = $("#phoneNum").val();
        let working_status_id = $("#workingStatus").val();
        let designation_id = $("#designation").val();
        let location_id = $("#location").val();

        $.ajax({
            method: "POST",
            url: "./api/employee.php",
            data: {
                first_name,
                last_name,
                date_of_join,
                date_of_birth,
                gender,
                phone,
                working_status_id,
                designation_id,
                location_id
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

        return true;
    } else {

        return false;

    }
    
}
