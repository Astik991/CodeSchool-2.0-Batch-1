$(document).ready(function () {
  let userId = window.localStorage.getItem("user_id");
  if (userId) {
    window.location.replace("./dashboard");
  }
});

function register(event) {
  event.preventDefault();

  let name = $("#personName").val();
  let mail = $("#mail").val();
  let userName = $("#userName").val();
  let password = $("#password").val();

  $("#userNameErr").text("");
  $("#passwordErr").text("");
  $("#mailErr").text("");
  $("#personNameErr").text("");

  if (name.length < 3 || name.length > 25) {
    $("#personNameErr").text(
      "Name should be at least 3 charecters and most 25 charecters"
    );

    return false;
  }
  if (userName.length < 3 || userName.length > 25) {
    $("#userNameErr").text(
      "Username should be at least 3 Characters and at most 25 Characters"
    );

    return false;
  }

  if (password.length < 3 || password.length > 25) {
    $("#passwordErr").text(
      "Password should be at least 3 Characters and at most 25 Characters"
    );
    return false;
  }
  if (mail.length < 3 || password.length > 25) {
    $("#mailErr").text(
      "Mail should be at least 3 Characters and at most 25 Characters"
    );
    return false;
  }

  $.ajax({
    method: "POST",
    url: "./api/register.php",
    data: {
      name,
      mail,
      userName,
      password,
    },
    success: function (data) {
      data = JSON.parse(data);
      if (data.status) {
        window.location.replace("./login.html");
      } else {
        $("#usernameErr").text(data.message);
      }
    },
    error: function (error) {},
  });
}
