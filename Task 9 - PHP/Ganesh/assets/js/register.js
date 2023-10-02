$(document).ready(function () {
    let userToken = window.localStorage.getItem("token");
    if (userToken) {
        window.location.replace("./index.html");
    }
});

// Validate Name.
function validateUserName(name, feedback){
    // On Key Down Remove Invalid Class.
    name.on("keydown", function(){
        name.removeClass("is-invalid");
    });
    // Validating Conditions.
    if(name.val() == ''){
        name.addClass("is-invalid");
        feedback.text("Name is required !");
        return false;
    }
    else if(!((name.val()).match(/[a-zA-Z ]/))){
        name.addClass("is-invalid");
        feedback.text("Name should only contain alphabets!");
        return false;
    }
    else {
        name.removeClass("is-invalid");
        return true;
    }
}

// Validate Phone Number.
function validateUserPhone(phone, feedback){
    // On Key Down Remove Invalid Class.
    phone.on("keydown", function(){
        phone.removeClass("is-invalid");
    });
    // Validating Conditions.
    let phoneRegExp = /[0-9]/;
    if(phone.val() == ''){
        phone.addClass("is-invalid");
        feedback.text("Phone number is required!");
        return false;
    }
    else if(!((phone.val()).match(phoneRegExp))){
        phone.addClass("is-invalid");
        feedback.text("Phone number should only contain numbers 0-9!");
        return false;
    }
    else if((((phone.val()).length) != 10)){
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
        option.addClass("is-invalid");
        feedback.text("Please select input!");
        return false;
    } else {
        option.removeClass("is-invalid");
        return true;
    }
}

// Validate Email.
function validateUserEmail(email, feedback){
    // On Change Remove Invalid Class.
    email.on("keydown", function(){
        email.removeClass("is-invalid");
    });
    // Validating Conditions.
    if(email.val() == ''){
        email.addClass("is-invalid");
        feedback.text("Email is required !");
        return false;
    } 
    else if(((email.val()).match(/\.\./))){
        email.addClass("is-invalid");
        feedback.text("Consecutive dots are not allowed !");
        return false;
    }
    else if(((email.val()).match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]{2,})\.([a-zA-Z]{2,5})$/))){
        email.removeClass("is-invalid");
        return true;
    }
    else {
        email.addClass("is-invalid");
        feedback.text("Domain is invalid !");
        return false;
    }
}

// Validate Password.
function validateUserPassword(password, feedback){
    let strongPassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    // On Key Down Remove Invalid Class.
    password.on("keydown", function(){
        password.removeClass("is-invalid");
    });
    // Validating Conditions.
    if(password.val() == ''){
        password.addClass("is-invalid");
        feedback.text("Please add the password !");
        return false;
    }
    else if(!((password.val()).match(strongPassRegex))){
        password.addClass("is-invalid");
        feedback.text("Password should contain one A-Z, one a-z, one 0-9 and one special character (e.g., !, @, #, $, %, etc.) !");
        return false;
    }
    else {
        password.removeClass("is-invalid");
        return true;
    }
}

// Confirm Password.
function confirmPassword(password, confirmpwd, feedback){
    // On Change Remove Invalid Class.
    confirmpwd.on("change", function(){
        confirmpwd.removeClass("is-invalid");
    });
    // Validating Conditions.
    if(confirmpwd.val() != password.val()){
        confirmpwd.addClass("is-invalid");
        feedback.text("Password does not match !");
        return false;
    } else {
        confirmpwd.removeClass("is-invalid");
        return true;
    }
}

// On Submit validate the product.
$('#registerUser').on("submit", function (event) {

    event.preventDefault();

    let validations = [];
    let count = 0;

    validations.push(validateUserName($("#userName"), $("#userNameFeedback")));
    validations.push(validateUserEmail($("#userEmail"), $("#userEmailFeedback")));
    validations.push(validateUserPhone($("#userPhone"), $("#userPhoneFeedback")));
    validations.push(validateUserPassword($("#userPassword"), $("#userPasswordFeedback")));
    validations.push(confirmPassword($("#userPassword"), $("#userConfirmPassword"), $("#userConfirmPasswordFeedback")));
    validations.push(validateInputSelection($("#userRole"), $("#userRoleFeedback")));

    validations.forEach(bool => {
        if(bool){
            count++;
        }
    });
    
    if(validations.length == count){

        $.ajax({
            method: "POST",
            url: "./api/register.php",
            data: {
                "name": $("#userName").val(),
                "email": $("#userEmail").val(),
                "phone": $("#userPhone").val(),
                "password": $("#userPassword").val(),
                "confirm_password": $("#userConfirmPassword").val(),
                "user_role_id": $("#userRole").val()
            },
            success: function(data){
                let jsonData = JSON.parse(data);
                if(!(jsonData["status"])){
                    $("#serverMessage").removeClass("d-none bg-success border-success text-success");
                    $("#serverMessage").addClass("bg-danger border-danger text-danger");
                    $("#serverMessage").html(jsonData["message"]);
                } else {
                    $("#serverMessage").removeClass("d-none bg-danger border-danger text-danger");
                    $("#serverMessage").addClass("bg-success border-success text-success");
                    $("#serverMessage").html(jsonData["message"]);
                    setTimeout(()=>{
                        location.replace("./login.html");
                    }, 3000);
                }
            },
            error: function(error){
                console.log(error);
            }
        })
    }



});