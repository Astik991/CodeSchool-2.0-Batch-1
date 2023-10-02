$(document).ready(function () {
  let userId = window.localStorage.getItem("user_id");
  let userType = window.localStorage.getItem("user_type");
  if (userType && userId) {
    window.location.replace("./dashboard/admin.html");
  } else if (userId) {
    window.location.replace("./index.html");
  }
});

function login(event) {
  event.preventDefault();

  let username = $("#username").val();
  let password = $("#password").val();

  if (username.length < 3 || username.length > 25) {
    $("#usernameError").text(
      "Username should be at least 3 Characters and at most 25 Characters"
    );
    return false;
  } else {
    $("#usernameError").text("");
  }

  if (password.length < 3 || password.length > 25) {
    $("#passwordError").text(
      "Password should be at least 3 Characters and at most 25 Characters"
    );
    return false;
  } else {
    $("#passwordError").text("");
  }

  $.ajax({
    method: "POST",
    url: "./api/login.php",
    data: {
      username,
      password,
    },
    success: function (response) {
      let data = JSON.parse(response);

      if (data.status) {
        window.localStorage.setItem("user_id", data.data.id);
        window.localStorage.setItem("user_type", data.data.type);
        if (data.data.type) {
          window.location.replace("./dashboard/admin.html");
        } else {
          window.location.replace("./index.html");
        }
      } else {
        $("#userNotFoundErr").text(data.message);
      }
    },
    error: function (error) {},
  });
}
