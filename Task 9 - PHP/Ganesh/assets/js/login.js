$(document).ready(function () {
    let userToken = window.localStorage.getItem("token");
    if (userToken) {
        window.location.replace("./index.html");
    }
});

// Validate Password.
function validatePassword(password, feedback){
    // On Key Down Remove Invalid Class.
    password.on("keydown", function(){
        password.removeClass("is-invalid");
    });
    // Validating Conditions.
    if(password.val() == ''){
        password.addClass("is-invalid");
        feedback.text("Please add the password !");
        return false;
    } else {
        password.removeClass("is-invalid");
        return true;
    }
}

// Validate the user login.
$("#loginUser").on("submit", ()=>{
    event.preventDefault();

    let validations = [];
    let count = 0;

    let username = $("#userNameInput");
    let password = $("#userPasswordInput");

    if((username.val()).match(/^\d+$/)){
        validations.push(validateUserPhone(username, $("#userNameInputFeedback")));
    } else {
        validations.push(validateUserEmail(username, $("#userNameInputFeedback")));
    }

    validations.push(validatePassword(password, $("#userPasswordInputFeedback")));


    validations.forEach(bool => {
        if(bool){
            count++;
        }
    });
    
    if(validations.length == count){

        $.ajax({
            method: "POST",
            url: "./api/login.php",
            data: {
                "username": username.val(),
                "password": password.val()
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
                    // Set the local Storage.
                    window.localStorage.setItem("token", jsonData['data'][0]);
                    window.localStorage.setItem("name", jsonData['data'][1]);
                    window.localStorage.setItem("user", jsonData['data'][2]);
                    if(jsonData['data'][2] == 1){
                        setTimeout(()=>{
                            location.replace("./admin.html");
                        }, 3000);
                    } else {
                        setTimeout(()=>{
                            location.replace("./index.html");
                        }, 3000);
                    }
                    
                }
            },
            error: function(error){
                console.log(error);
            }
        });

    }

});