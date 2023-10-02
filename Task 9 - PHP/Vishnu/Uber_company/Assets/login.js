$(document).ready(function () {
  window.onload = function () {
    if (window.history.replaceState) {
      window.history.replaceState(null, null, window.location.href);
    }
  };

  function validateUserCredentials() {
    const userEmail = $("#login-email").val();
    const userPassword = $("#login-password").val();
    const selectedLoginType = $('input[name="login-type"]:checked').val();
    console.log(selectedLoginType);
    $.ajax({
      method: "POST",
      url: "./../api/userAuthentication.php",
      data: {
        userEmail,
        userPassword,
        loginType: selectedLoginType,
      },
      success: function (data) {
        const response = JSON.parse(data);
        if (!response.status) {
          $("#login-form-error").text(response.message);
        } else {
          response.data === 1
            ? window.location.replace("./dashboard.html")
            : window.location.replace("./driver_interface.html");
        }
      },
      error: function (error) {
        $("#login-form-error").text(error.responseText);
      },
    });
  }

  $("#login-form-submission").submit(function (event) {
    event.preventDefault();
    if ($("#login-email").val() !== "" && $("#login-password").val() !== "") {
      $("#login-form-error").text("");
      validateUserCredentials();
    } else {
      $("#login-form-error").text("*Username and Password cannot be empty");
    }
  });
});
